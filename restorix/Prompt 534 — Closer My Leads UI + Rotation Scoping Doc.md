---
date: 2026-08-25
description: "Scoping doc (research only, no code) for closer My Leads UI cleanup + automatic 24h/midnight lead rotation + My Pipeline Setter tab. Three real open questions need Brayden's answer before any build starts."
tags:
  - restorix
  - work-note
  - scoping
quarter: Q3-2026
---

# Prompt 534 — Closer My Leads UI + Rotation Scoping Doc

> Research only, per this prompt's own explicit deliverable. **Zero schema/function/RLS/cron/frontend changes made.** Reference screenshot: `restorix/qa-screenshots/closer-myleads-brayden.png`.

## What's confirmed from the real code

### 1. `SetterOverview` is a genuinely shared component — the UI ask touches the setter's page too unless changed carefully

[MyLeads.jsx](restorix-setter-portal/src/pages/MyLeads.jsx) is a thin wrapper: a `RequestLeadsCard` (the persistent "How many / Request" box) rendered above `<SetterOverview profile={profile} title="My Leads" />`. `SetterOverview` itself — [Overview.jsx:135-304](restorix-setter-portal/src/pages/Overview.jsx) — is the **exact same component** the setter's own `/overview` page mounts (`Overview.jsx:522`, `if (profile?.role === 'setter') return <SetterOverview profile={profile} />`). There is no role branching inside it today. Concretely:
- `DateClockRow` ([Overview.jsx:36-46](restorix-setter-portal/src/pages/Overview.jsx)) renders top-right, both pages.
- `FinishDayCard` ([Overview.jsx:96-123](restorix-setter-portal/src/pages/Overview.jsx)) renders whenever `counts.new === 0` ([Overview.jsx:206](restorix-setter-portal/src/pages/Overview.jsx)), both pages — confirming the prompt's own suspicion that this needs to become role-aware rather than deleted outright.

**Proposed shape** (not built): give `SetterOverview` two optional props — `headerRight` (a node to render instead of `DateClockRow` when supplied) and `hideFinishDay` (boolean, default `false`). `MyLeads.jsx` passes its own "Request Leads" button + modal as `headerRight` and `hideFinishDay={true}`; the setter's own `/overview` call site passes neither, so it renders byte-identical to today. This keeps the customization visible at the call site instead of an `if (profile.role === 'closer')` branch buried inside a component setter's page also depends on.

The `RequestLeadsCard` form itself ([MyLeads.jsx:21-66](restorix-setter-portal/src/pages/MyLeads.jsx)) doesn't need new logic — it already computes `room`/`currentCount` from `useMyPool` and calls `useRequestCloserLeads()`. The only change is presentation: move it from an always-visible card into a `Modal` (same component Users.jsx/SetterActivity.jsx already use), opened by the new header button.

### 2. The existing setter-side rotation mechanism (Prompt 515) is live and is the right thing to mirror — but its semantics don't map 1:1 onto what's being asked for closers

Confirmed live in the database (`cron.job`, queried directly):

| Cron | Schedule | Does |
|---|---|---|
| `process-setter-day-ends` | `*/15 * * * *` | `process_all_setter_day_ends()` → loops active setters → `_do_setter_day_end(id)` |
| `redistribute-no-answers` | `*/5 * * * *` | `redistribute_no_answers()` → picks up `no_answer_queue` rows past `available_at`, hands the lead to a **random other setter** (`role = 'setter'` is hardcoded in the candidate query) |

`_do_setter_day_end` ([[Prompt 515 — Lead Rotation Redesign (Blocked, SQL Ready)]], migration 5) is genuinely idempotent (gated on `profiles.last_day_end_date >= local today`) and already does almost exactly what's being asked, **for setters**:
- No Answer leads stay `assigned_setter` until day-end, then get nulled + inserted into `no_answer_queue` with `available_at = now() + 24h` for the redistribute cron to pick up later.
- New leads (plus due Follow-Up) get refilled back to 150 from the shared unassigned pool.
- `last_day_end_date` advances, same local-timezone gating this prompt wants for closers.

**But two things don't transfer cleanly, both real open questions below, not guessed:**
- **Follow-up and Not Interested are structurally different for setters than what's being asked here.** Per Prompt 515's own design, the instant a setter logs Follow-up or Not Interested, `assigned_setter` is set to `null` immediately (not held until day-end) — `handle_lead_pipeline`'s trigger does this on write, confirmed in the live function body. They're not "in a queue" waiting to rotate out; they're already terminal/pending-future rows, surfaced to the setter only via `last_action_by` (`useMyFollowUps`/`useMyNotInterested`, both filter on `last_action_by`, not `assigned_setter`). So "rotate these out at midnight" has no existing mechanism to mirror — see Open Question B.
- **`redistribute_no_answers` only ever hands a lead to another *setter*, never a closer**, and never back to the plain unassigned pool — it's a specific-new-owner handoff, not a "return to shared pool" operation. The prompt's own wording for New leads ("returned to the shared pool") is a different, simpler operation (`assigned_setter = null`, done) than what No Answer currently does for setters. See Open Question B.

### 3. There's no column tracking "when was this lead assigned to its current owner" — a real, confirmed gap for the 24h-from-request rule

Read `leads`' full column list directly (`information_schema.columns`). It has `created_at` (when the row was first created/scraped into the shared pool) and `updated_at`, but **no `assigned_at`/`requested_at` column** recording when `assigned_setter` was most recently set. `created_at` is the wrong timestamp to use for "24 hours since being requested" — a lead can sit in the unassigned pool for days before a closer requests it, and using `created_at` would make already-old-but-just-requested leads rotate out almost immediately. **A new column is needed** — see Open Question A.

### 4. The "Setter tab" on My Pipeline has a real round-robin tension, but it resolves cleanly using an already-existing column

[MyPipeline.jsx](restorix-setter-portal/src/pages/MyPipeline.jsx) is currently a 3-line wrapper around `CloserOverview` ([Overview.jsx:327-411](restorix-setter-portal/src/pages/Overview.jsx), `useMyBooked` filters `assigned_closer = closerId`). Here's the tension, confirmed by reading `handle_lead_pipeline`'s live `appointment_booked` branch: **every booking always round-robins `assigned_closer`** to whichever closer has gone longest since their last assignment (`order by last_closer_assignment_at asc nulls first`), with no exception for "the closer who booked it themselves." So if Closer A self-requests a lead via My Leads, works it, and books it, the round-robin could hand the resulting strategy call to Closer B — meaning `assigned_closer` is the **wrong** column to scope a "leads I personally booked as my own setter" view.

**This resolves without new schema**: `handle_lead_pipeline` already stamps `last_action_by := v_actor` on every status transition, where `v_actor` resolves to `old.assigned_setter` at the moment of the transition — i.e., whoever actually owned the lead when it was booked, regardless of subsequent round-robin reassignment. So the Setter tab's query is `leads` where `last_action_by = thisCloserId AND status = 'appointment_booked'` — a new hook (`useMySelfBooked(closerId)`, mirroring `useMyBooked`'s exact shape but swapping the filter column), feeding the exact same `CloserOverview` rendering (stat tiles from `closer_outcome`, table, `CloserLeadModal`) the Closer tab already uses. No trigger change, no migration — just a second hook + a tab toggle in `MyPipeline.jsx`.

### 5. Per-user timezone already exists, confirmed

`profiles.timezone` (Prompt 458) + `TimezoneForm` in `Settings.jsx` already lets any role (including closer) set their own timezone, and `_do_setter_day_end` already reads `profiles.timezone` generically (falls back to `America/Chicago` if null) — no new column needed for the midnight-in-the-closer's-own-timezone requirement.

### 6. LogCallModal is fully generic — closers logging Follow-up/No Answer/Not Interested on self-requested leads is a real, reachable state today, not theoretical

`LogCallModal.jsx`'s outcome options (`no_answer`/`not_interested`/`follow_up`/`appointment_booked`) have no role gating. `Overview.jsx`'s own comment on `SetterOverview` (line 129-134) says a closer "never sees Follow-Up Due/Follow-up/Not Interested rows **in practice**" — confirmed this is describing typical usage, not an enforced impossibility. Any closer who requests leads via My Leads and logs a Follow-up or Not Interested outcome today lands in exactly the same state a setter would, just currently with no rotation applied to it.

---

## Open questions — genuinely uncertain, need Brayden's answer before building

**A. Does "24 hours since being requested" need a new `assigned_at`-style column?**
Confirmed gap (see #3 above) — no existing timestamp tracks this. Proposed: add `leads.assigned_setter_at timestamptz`, stamped whenever `assigned_setter` transitions from null to non-null (both `request_closer_leads` and the setter-side `assign_setter_batches`/day-end refill would need to set it) — reusable by both roles, not closer-specific. **Confirm this is acceptable** before it's added, since it touches the setter-side assignment functions too, not just the closer path.

**B. Where do rotated-out No Answer / Follow-up / Not Interested leads actually go?** Three real possibilities, each with different implications:
1. **Straight back to the fully shared unassigned pool** (`assigned_setter = null`, `last_action_by` left as-is for history) — simplest, matches the "returned to the shared pool" language already used for New leads, available to setters (via day-end refill) and closers (via request) equally.
2. **Through the existing `redistribute_no_answers` mechanism** — but that function hardcodes `role = 'setter'` for the new owner and is a specific-handoff, not a return-to-pool op. Using it as-is for closers would mean a closer's abandoned lead always ends up with a random setter, never back with closers. Extending it to also consider closers as new-owner candidates would change its behavior for the *existing* setter-to-setter case too — a bigger blast radius than this prompt implies.
3. **A closer-specific version** — a new function that only redistributes among other closers (or genuinely returns to the shared pool), a parallel mechanism to setter's own.

**Recommendation if forced to guess** (not acted on): option 1 for all three statuses, for closers only — reuses no new redistribution logic, keeps the setter-side mechanism completely untouched, and matches the plain "returned to shared pool" language the prompt already used for New leads. But this is Brayden's call, not assumed.

**C. For Follow-up specifically: does "rotate out at midnight" mean *all* Follow-up leads, or only overdue ones?**
Taken literally, "rotated out at midnight" could kill/reset a Follow-up lead scheduled several days in the future the very first midnight after it was logged — almost certainly not intended (that would make the Follow-up feature pointless for a closer). Likely intended: only follow-ups **past due** (`follow_up_at` in the past, never worked) get swept at midnight, exactly mirroring how "Follow-Up Due" already works for setters (computed live, not stored) — a due-and-unworked follow-up is arguably indistinguishable in spirit from an abandoned No Answer. **Needs Brayden's confirmation** of which one before building — this determines whether the closer day-end function touches `follow_up_queue` rows filtered by date, or all of them.

**D. For Not Interested: does "rotate out" mean anything beyond "stop counting toward the closer's own view"?**
Since `assigned_setter` is already `null` the instant Not Interested is logged (for either role), there's nothing left "assigned" to un-assign. Two real readings:
1. **Purely presentational** — after midnight, an old Not Interested lead simply stops being something the closer needs to think about (already true today — nothing currently blocks requesting fresh leads regardless of stale history rows). No data change needed at all.
2. **The lead genuinely re-enters circulation** — `last_action_by`/`status` reset so it becomes workable again by someone else (a real "recycle not-interested leads after N days" product decision, bigger in scope than this prompt's stated ask).
**Needs Brayden's confirmation** — reading 1 requires zero new code; reading 2 is a materially different, larger feature.

---

## Proposed shape (pending answers to A/B/C above) — for the follow-up build prompt, not built here

**Migration, mirroring Prompt 515's exact structure**, once A/B/C are answered:
- `leads.assigned_setter_at timestamptz` (Open Question A), stamped by `request_closer_leads` and the setter-side assignment paths.
- `_do_closer_day_end(p_closer_id)` — same idempotency gate (`profiles.last_day_end_date >= local today`, same column, no new one needed since it's per-profile not per-role) as `_do_setter_day_end`, but:
  - New: `where assigned_setter = p_closer_id and status = 'new' and assigned_setter_at < now() - interval '24 hours'` → null out (not gated on local-midnight at all — a real rolling 24h check, run every tick regardless of day boundary, unlike the setter's day-bounded refill).
  - No Answer / (due) Follow-up / Not Interested at local midnight: exact operation depends on B/C/D above.
- `run_closer_day_end()` — same `SECURITY DEFINER`, `auth.uid()`-scoped, role-checked (`closer` not `setter`) pattern as `run_setter_day_end`.
- `process_all_closer_day_ends()` — same loop-every-active-closer shape as `process_all_setter_day_ends`.
- New cron `process-closer-day-ends`, likely on a **tighter interval than 15 minutes** for the 24h-rolling New-lead check to feel responsive (the setter side only needs 15-min granularity because its refill is midnight-bounded, not a rolling window) — proposed `*/5 * * * *`, matching `redistribute-no-answers`'s existing cadence, not guessed finer than that.

**`useMySelfBooked(closerId)`** (Setter-tab data query, Open Question-free — this one's fully resolved, see #4 above):
```js
export function useMySelfBooked(closerId) {
  return useQuery({
    queryKey: ['my-self-booked', closerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('last_action_by', closerId)
        .eq('status', 'appointment_booked')
        .order('strategy_call_at', { ascending: true })
      if (error) throw error
      return data
    },
    enabled: !!closerId,
    refetchInterval: 15000,
  })
}
```
`MyPipeline.jsx` becomes a tab toggle (`'closer' | 'setter'`, default `'closer'`) between `<CloserOverview profile={profile} title="My Pipeline" />` (unchanged, `useMyBooked`) and a new `<CloserOverview profile={profile} title="My Pipeline" leads={selfBooked} />`-shaped variant — `CloserOverview` would need a small refactor to accept leads as a prop instead of always calling `useMyBooked` internally, so both tabs can reuse its exact tile/table/modal rendering without duplicating it.

---

## What this round did NOT do, on purpose

No migration, no edge function, no RLS change, no frontend change — per the prompt's own explicit "deliverable for this round" instruction. Waiting on Brayden's answers to A/B/C/D before any of the above gets built.

## Related
[[Restorix LIVE_STATE]] · [[Restorix Memories]] · [[Restorix North Star]] · [[Prompt 515 — Lead Rotation Redesign (Blocked, SQL Ready)]]
