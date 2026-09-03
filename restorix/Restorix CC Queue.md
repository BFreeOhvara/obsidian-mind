---
date: 2026-09-01
description: "The live CC task queue for Restorix — open build items only, written by the manager/Cowork chat, emptied by CC on ship. The one file CC reads at session start."
tags:
  - restorix
  - cc-queue
---

# Restorix CC Queue

> **The live task queue for CC (the builder).** Manager/Cowork chats (Eagle/Falcon) **append** prompt specs here; CC executes top to bottom, **deletes each item the moment it ships**, and writes the full record to [[Restorix Memories]]. An empty queue below means there is nothing for CC to do.
>
> **Why this is its own file** (added 2026-09-01 after a stale-clone incident): keeps ownership clean — manager chats own this file, CC owns [[Restorix LIVE_STATE]] + [[Restorix Memories]] — and keeps it small enough to read whole, append to, and re-read to verify in seconds. See vault-root `CLAUDE.md` → "Reaching Atlas safely".
>
> **Rules for whoever writes here:**
> - Write into the **connected local vault folder** `C:\Users\freem\obsidian-mind`, never a clone. Confirm it's attached first.
> - After writing, **re-read this file from disk** and confirm your text is present before telling Brayden it's queued.
> - **Numbering:** next prompt number = one past the highest referenced in [[Restorix LIVE_STATE]] + [[Restorix Memories]]. Don't reserve numbers anywhere but here.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline (or in a `<details>` block). Order = execution order.


---

## Prompt 576 — Apply the restorix-portal frontend half of the closer request-leads fix (backend already live)

> Brayden's request came in labeled "Prompt 538" (a number already used, 2026-08-26, for the unrelated Stats-page date-pill fix — see [[Restorix Memories]]). Renumbered to 576 per the queue's own numbering rule (one past the last-shipped, Prompt 575). Full spec, audit findings, and the exact backend SQL that's ALREADY LIVE are in [[Restorix Memories]] 2026-09-03 "Prompt 576 — closer lead requests workflow (DB shipped, frontend blocked)".

**DB migrations `prompt538_closer_request_status_and_dedup` + `prompt538_drop_old_request_closer_leads_overload` are live on `avgvmzshujwphneykuvu`, verified via JWT-impersonated RPC calls this session** (New pool ✓ niche-scoped, Follow-up due-only ✓ niche-scoped, dedup blocks re-request after release ✓, `not_interested` rejected ✓). Do NOT re-apply or modify these migrations.

**What's left — frontend only, fully written and ready to paste in verbatim, NOT yet applied to `restorix-portal` (this session's GitHub write scope was fixed to `obsidian-mind` only; two attempts to delegate to a sibling Claude Code Remote session against `restorix-portal` both stalled on that session's own permission prompts with no channel available to approve them remotely — see [[Restorix Memories]] for the full account). Apply the 4 diffs below verbatim, run lint+build, commit, push to `main`, then do the live `test_closer` verification with real screenshots to `restorix/qa-screenshots/` (prefix `prompt576-`), and update this queue entry + [[Restorix LIVE_STATE]] when shipped.**

<details>
<summary>Full patch — 4 files (click to expand)</summary>

### 1. `src/hooks/useLeads.js`

**`useRequestCloserLeads` — add `p_status`.** Replace:
```js
export function useRequestCloserLeads() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ count, niche }) => {
      const { data, error } = await supabase.rpc('request_closer_leads', {
        p_count: count,
        p_niche: niche,
      })
      if (error) throw error
      return data
    },
```
with:
```js
export function useRequestCloserLeads() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ count, niche, status }) => {
      const { data, error } = await supabase.rpc('request_closer_leads', {
        p_count: count,
        p_niche: niche,
        p_status: status ?? 'new',
      })
      if (error) throw error
      return data
    },
```
(the `onSuccess` block below is unchanged).

**`useMyFollowUps` — also match a closer's claimed follow-ups.** Replace the query body:
```js
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', 'follow_up')
        .eq('last_action_by', setterId)
        .order('follow_up_at', { ascending: true })
```
with:
```js
      // Prompt 576 — a closer who *requests* a follow-up lead claims it via
      // assigned_setter (last_action_by stays whoever originally logged the
      // follow-up, e.g. a setter). Setters' own follow-ups always have
      // assigned_setter null by design (handle_lead_pipeline nulls it), so
      // this OR clause is never true for them — their results are unchanged.
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', 'follow_up')
        .or(`last_action_by.eq.${setterId},assigned_setter.eq.${setterId}`)
        .order('follow_up_at', { ascending: true })
```

### 2. `src/pages/Overview.jsx` — `SetterOverview`

Replace the function signature:
```js
export function SetterOverview({ profile, title = 'Overview', headerRight, niche, nicheTabs, embedded = false, todayFollowUpOnly = false, compactStats = false }) {
```
with:
```js
export function SetterOverview({ profile, title = 'Overview', headerRight, niche, nicheTabs, embedded = false, todayFollowUpOnly = false, compactStats = false, statusFilter: controlledStatusFilter, onStatusFilterChange }) {
```

Replace:
```js
  const [statusFilter, setStatusFilter] = useState(embedded ? 'no_answer' : 'new')
```
with:
```js
  // Prompt 576 — externally controllable so My Leads' Request Leads button
  // can see which tab is active and request the matching bucket. Omitted
  // by every other call site (plain /overview, the embedded My Pipeline →
  // Setter tab), so they render byte-identical to before.
  const [internalStatusFilter, setInternalStatusFilter] = useState(embedded ? 'no_answer' : 'new')
  const statusFilter = controlledStatusFilter ?? internalStatusFilter
  const setStatusFilter = onStatusFilterChange ?? setInternalStatusFilter
```

Nothing else in the file changes — every other reference to `statusFilter`/`setStatusFilter` stays as-is.

### 3. `src/pages/MyLeads.jsx` — full replacement

```jsx
import { useState } from 'react'
import { Plus } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../hooks/useAuth'
import { useBrand } from '../hooks/useBrand'
import { useMyPool, useRequestCloserLeads } from '../hooks/useLeads'
import { Field, inputClass } from '../components/ui/Field'
import { Button } from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { STATUS_SOLID } from '../components/ui/StatusBadge'
import { SetterOverview } from './Overview'

const POOL_CAP = 150

// Prompt 543 — closers can pull from either vertical's pool.
// Prompt 547 — My Leads was split into two niche tabs (Behavioral Health /
// Bail Bonds), the active tab driving the Request Leads modal.
// Prompt 555 — that tab is gone. `portal.restorix.co` only serves
// behavioral_health closers and `portal.suretix.co` only serves bail_bonds
// closers, so the niche is fixed by the portal (`useBrand()`), not chosen
// by hand. `request_closer_leads(p_count, p_niche)` is unchanged.
const NICHE_LABEL = { behavioral_health: 'Behavioral Health', bail_bonds: 'Bail Bonds' }
const nicheLabel = (v) => NICHE_LABEL[v] ?? v

// Prompt 576 — Request Leads is now scoped to whichever My Leads tab is
// active. New/No Answer both draw from the same genuinely-unassigned New
// pool server-side (a released No Answer lead already becomes status='new'
// the instant its 24h hold expires), so both tabs request the same bucket.
// Follow-Up Due draws from due-or-past follow-ups only. Follow-up (future),
// Not Interested, and Appointment Booked aren't requestable at all — the
// button is hidden on those tabs (Not Interested per Brayden's explicit
// rule: it routes to the admin list, never back into circulation).
const REQUESTABLE_TABS = new Set(['new', 'no_answer', 'follow_up_due'])
const TAB_TO_RPC_STATUS = { no_answer: 'no_answer', follow_up_due: 'follow_up' }
const rpcStatusForTab = (tab) => TAB_TO_RPC_STATUS[tab] ?? 'new'
const STATUS_REQUEST_LABEL = { new: 'Leads', no_answer: 'Leads', follow_up: 'Due Follow-ups' }

// Prompt 509 — closers request their own leads from the shared unassigned
// pool on demand (a real form + button), not a passive cron top-up like
// setters get. The 150 cap is the one thing genuinely shared across every
// bucket (same pool, same ceiling), enforced server-side in
// `request_closer_leads` against the closer's TOTAL New count, not just
// this form's max — so the room/cap math below stays New-count-keyed even
// when requesting the Follow-up bucket.
function RequestLeadsForm({ niche, status, currentCount, onClose }) {
  const requestLeads = useRequestCloserLeads()
  const [count, setCount] = useState(25)
  const [result, setResult] = useState(null)

  const room = Math.max(0, POOL_CAP - currentCount)
  const isFollowUp = status === 'follow_up'

  async function submit(e) {
    e.preventDefault()
    setResult(null)
    const assigned = await requestLeads.mutateAsync({ count, niche, status })
    setResult(assigned)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="font-sans text-xs text-fg-secondary">
        {isFollowUp ? (
          <>
            Pull due <span className="font-medium text-fg-primary">{nicheLabel(niche)}</span> follow-ups from the
            shared pool into your own working queue. You have{' '}
            <span className="font-medium text-fg-primary">{currentCount}</span> of {POOL_CAP} New leads right now
            — room for {room} more.
          </>
        ) : (
          <>
            Pull <span className="font-medium text-fg-primary">{nicheLabel(niche)}</span> leads from the shared
            unassigned pool into your own working queue. You have{' '}
            <span className="font-medium text-fg-primary">{currentCount}</span> of {POOL_CAP} New leads right now
            — room for {room} more.
          </>
        )}
      </p>
      <Field label="How many">
        <input
          type="number"
          min={0}
          max={room}
          value={count}
          onChange={(e) => setCount(Math.max(0, Math.min(room, Number(e.target.value) || 0)))}
          className={inputClass()}
        />
      </Field>
      {result !== null && (
        <p className={`font-sans text-sm ${result === 0 ? 'text-fg-secondary' : 'text-success'}`}>
          {result === 0
            ? `No ${STATUS_REQUEST_LABEL[status].toLowerCase()} available in the pool right now.`
            : `Got ${result} lead${result === 1 ? '' : 's'}.`}
        </p>
      )}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" disabled={room === 0 || count === 0 || requestLeads.isPending}>
          {requestLeads.isPending ? 'Requesting…' : 'Request'}
        </Button>
      </div>
    </form>
  )
}

function RequestLeadsButton({ niche, status, currentCount }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          'inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors hover:opacity-90',
          STATUS_SOLID.new
        )}
      >
        <Plus size={15} /> Request {STATUS_REQUEST_LABEL[status]}
      </button>
      {open && (
        <Modal title={`Request ${nicheLabel(niche)} ${STATUS_REQUEST_LABEL[status]}`} onClose={() => setOpen(false)}>
          <RequestLeadsForm niche={niche} status={status} currentCount={currentCount} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  )
}

export default function MyLeads() {
  const { profile } = useAuth()
  const { niche } = useBrand()
  const { data: leads } = useMyPool(profile?.id)
  // Prompt 576 — lifted so Request Leads can see the active tab.
  const [statusFilter, setStatusFilter] = useState('new')
  if (!profile) return null

  const pool = leads || []
  // Total New count across both niches — the number `request_closer_leads`
  // caps against server-side, so the form's room math must use the same.
  const currentNewCount = pool.filter((l) => l.status === 'new').length
  const requestStatus = rpcStatusForTab(statusFilter)

  return (
    <SetterOverview
      profile={profile}
      title="My Leads"
      niche={niche}
      statusFilter={statusFilter}
      onStatusFilterChange={setStatusFilter}
      // Prompt 563 — Request Leads is back beside the title. Prompt 576 —
      // only rendered on requestable tabs; falls back to SetterOverview's
      // own DateClockRow (via its `headerRight ?? <DateClockRow .../>`)
      // everywhere else, same as /overview shows when nothing is passed.
      headerRight={
        REQUESTABLE_TABS.has(statusFilter) ? (
          <RequestLeadsButton niche={niche} status={requestStatus} currentCount={currentNewCount} />
        ) : undefined
      }
      compactStats
      // Prompt 559 — Follow-up leads clear from My Leads at local midnight
      // (kept permanently on My Pipeline → Setter).
      todayFollowUpOnly
    />
  )
}
```

### 4. `src/components/LogCallModal.jsx`

Replace:
```js
  const [hasAttempted, setHasAttempted] = useState(!lead.phone)
```
with (adding the new `bypassCallGate` line right before it, immediately after the existing `const [when, ...]` line):
```js
  // Prompt 576 — a closer can mark an outcome whether they called through
  // the portal's dialer or off their own personal phone; the Call
  // button/dialer itself is unchanged, this only lifts the Save/outcome
  // gate below for closers specifically. Setters keep the original
  // call-required gate (Prompt 446) exactly as today.
  const bypassCallGate = profile?.role === 'closer'
  const [hasAttempted, setHasAttempted] = useState(!lead.phone || bypassCallGate)
```
Replace:
```js
  const [callConcluded, setCallConcluded] = useState(!lead.phone)
```
with:
```js
  const [callConcluded, setCallConcluded] = useState(!lead.phone || bypassCallGate)
```
Replace:
```jsx
          {!hasAttempted && (
            <p className="mb-2 font-sans text-xs text-fg-faint">Call the lead to unlock outcomes.</p>
          )}
```
with:
```jsx
          {!hasAttempted && !bypassCallGate && (
            <p className="mb-2 font-sans text-xs text-fg-faint">Call the lead to unlock outcomes.</p>
          )}
```
Replace:
```jsx
        {outcome && !callConcluded && (
          <p className="font-sans text-xs text-fg-faint">Save unlocks once the call actually ends.</p>
        )}
```
with:
```jsx
        {outcome && !callConcluded && !bypassCallGate && (
          <p className="font-sans text-xs text-fg-faint">Save unlocks once the call actually ends.</p>
        )}
```
Nothing else in this file changes — `CallSection`, the Twilio dialer, `onAttempt`/`onCallConcluded` wiring, and the Save button's own `disabled` expression are untouched (a closer who DOES use the dialer still gets the same call-row/recording tracking; `callConcluded` just already reads `true` for them).

### Validation before pushing
- `npm run lint`, `npm run build` (check `package.json` for exact script names) — both clean.
- Grep to confirm `<SetterOverview profile=...` call sites other than `MyLeads.jsx` (plain `/overview`, the embedded My Pipeline → Setter tab in `CloserPipeline`) still pass no `statusFilter`/`onStatusFilterChange` props.
- Confirm `bypassCallGate` is `false` for any non-closer role.

### After pushing — live verification (test_closer / Test1234!, screenshots to `restorix/qa-screenshots/prompt576-*`)
1. My Leads → New tab → Request Leads → request e.g. 5 → confirm 5 New leads appear, screenshot.
2. Switch to Follow-Up Due tab (only visible if count > 0 that day) → Request Leads → confirm it pulls due follow-ups only, screenshot.
3. Request New again for a large count → confirm the original 5 don't reappear (dedup).
4. Open a lead's Call modal WITHOUT clicking Call → confirm outcome buttons and Save are already unlocked → log an outcome → confirm it saves.
5. Confirm Not Interested / Follow-up (future) / Appointment Booked tabs show no Request Leads button at all.

</details>

Files touched: `src/hooks/useLeads.js` (`useRequestCloserLeads` gains `p_status`; `useMyFollowUps` also matches `assigned_setter`), `src/pages/Overview.jsx` (`SetterOverview`'s `statusFilter` becomes externally controllable), `src/pages/MyLeads.jsx` (Request Leads becomes tab-aware, hidden on non-requestable tabs), `src/components/LogCallModal.jsx` (closer-only bypass of the call-before-outcome gate).

---

## Queue empty (except Prompt 576 above)

Last fully cleared 2026-09-02 (Prompt 575 shipped — visual polish pass on `PhoneCallsPreview`: reordered layout, tapering funnel chart, fixed-height call box). Manager/Cowork chats: append the next `## Prompt NNN` here.


---

_Prompt 575 shipped 2026-09-02 (@ `050534c`) — full record in [[Restorix Memories]]._
