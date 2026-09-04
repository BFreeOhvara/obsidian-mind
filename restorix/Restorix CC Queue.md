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

## Queue empty

Nothing for CC to do. Last cleared 2026-09-04 (Prompt 576 shipped — midnight-reset visibility for closer My Leads' marked outcomes, plus the Appointment Booked structural fix). Manager/Cowork chats: append the next `## Prompt NNN` here.


---

_Prompt 576 shipped 2026-09-04 (@ `3d9eef9`) — full record in [[Restorix Memories]]._

<details><summary>Original Prompt 576 spec (shipped)</summary>

## Prompt 576 — Closer My Leads: Midnight-Reset Visibility for Marked Leads

**Scope: closer portal only.** Setter portal (`/overview`) is explicitly untouched — Brayden's words: "am only talking about the closer portal right now not the setter so don't worry about the setter portal right now only closer." Do not add a My Pipeline page for setters, do not change setter `/overview` behavior.

**The rule (Brayden, closer portal):** when a closer marks an outcome on a lead from **My Leads** (Not Interested, No Answer, Follow-up, or Appointment Booked), that lead must:
(a) appear **immediately** on **My Pipeline**, in its correct existing location — Not Interested / No Answer / Follow-up on the embedded Setter tab, Appointment Booked on the Closer tab's Pending filter — and
(b) **simultaneously** stay visible on My Leads, in its marked state, until the closer's next local midnight (calendar-day rollover in `profile.timezone || DEFAULT_TIMEZONE`), at which point My Leads clears that day's marked entries (and their tab counts). From then on the lead shows only on My Pipeline.

Booking follows the identical rule — Brayden confirmed explicitly: "booking would follow the same rule... it would be in appointment booked and on the pending tab until midnight when it gets removed from the my leads page."

**Side (a) is already correct, verify live rather than rebuilding it:** the embedded My Pipeline → Setter tab (`CloserPipeline`'s Setter tab, `<SetterOverview ... embedded />` in `src/pages/Overview.jsx`) already renders No Answer / Follow-up / Not Interested **unclipped** (no date filter applied when `embedded` is true) — so those three already show up on Pipeline the instant they're marked. The Closer tab (`useMyBooked`, `src/hooks/useLeads.js`, scoped by `assigned_closer` + `status = 'appointment_booked'`) already updates immediately on booking too, independent of anything below. No changes needed for (a) — just confirm live that all four still behave this way before touching anything.

**Side (b) is the actual gap.** Today, `SetterOverview`'s `leadsByTab` (`src/pages/Overview.jsx`) only clips one bucket to "marked today": the `fu()` helper wraps `follow_up_due`/`follow_up` when the `todayFollowUpOnly` prop is on (which `MyLeads.jsx` already passes). `no_answer`, `not_interested`, and `appointment_booked` are NOT clipped there today — they show every lead ever marked, forever, not just today's. Generalize the exact same `fu()` pattern (local-calendar-date of `last_action_at` === today, via `zonedDateStr`) to those three buckets too, gated by the same prop (rename it from `todayFollowUpOnly` to something accurate now that it covers all four, e.g. `clipMarkedToday` — update the one call site in `MyLeads.jsx` and the prop everywhere it's read in `SetterOverview`). Do **not** clip the `new` bucket — that's unworked fresh pool inventory, not a marked outcome, and every other caller of `SetterOverview` (setter's own `/overview`, My Pipeline's embedded Setter tab) must keep getting unclipped data exactly as today, i.e. must NOT pass this prop.

**Real structural gap found in the existing code — confirm live before building on it, don't assume either way:** `leadsByTab.appointment_booked` currently reads `f(pool).filter(l => l.status === 'appointment_booked')`, i.e. sourced from `useMyPool(repId)`, which queries `leads` where `assigned_setter = repId`. But booking a lead nulls `assigned_setter` — this is stated directly in three places already in the codebase: `src/hooks/useLeads.js` (~line 99-102, "excluding Appointment Booked... a booked lead is no longer a setter concern"), `src/pages/Commissions.jsx` (~line 28, "assigned_setter which the pipeline nulls out on booking"), and `src/pages/Pipeline.jsx` (~line 217-219, "New, No Answer... are the only ones where assigned_setter stays set"). If that's still true live, `leadsByTab.appointment_booked` is structurally always empty today — the same class of bug Prompt 515/535 already found and fixed for Not Interested and Follow-up (both were switched off an `assigned_setter`-scoped query onto a `last_action_by`-scoped one, since `assigned_setter` goes null by design for those outcomes). **Verify live first**: mark a lead Appointment Booked as a closer and check whether it currently shows under My Leads' Appointment Booked tab. If it's empty as expected, fix it the same established way — add a `last_action_by`-scoped booked query mirroring `useMyNotInterested`'s shape (`src/hooks/useLeads.js`), filtering `last_action_by = repId AND last_action_status = 'appointment_booked'` (`last_action_status` is the frozen per-Prompt-437 stamp already used exactly this way in `statsForUser`, `src/hooks/useStats.js`) — and source `leadsByTab.appointment_booked` from that instead of `pool`. If live behavior turns out different from this reading, flag it back rather than silently building around the wrong assumption.

**FLAG — confirm with Brayden, don't guess (same convention as Prompt 558):** No Answer already has its own, unrelated 24-hour hold (Prompt 554) — a lead marked No Answer stays assigned (`assigned_setter` untouched) and out of the Unassigned pool for a real 24h from `no_answer_at`, released only by `redistribute_no_answers()`. This new midnight display-clip is a separate, purely visual rule layered on top of that: a No Answer lead marked at, say, 11pm disappears from My Leads' No Answer tab at midnight (1 hour later) even though the closer still structurally holds it — and it's still showing, unclipped, on My Pipeline — for the other ~23 hours until the real 24h hold expires. That's the intended read of what Brayden asked for; build it that way, but flag back if this seems wrong rather than quietly building something else.

**Also flag:** "the whole page and all filters get removed" at midnight is being built as "that day's marked entries and their tab counts reset" — the New tab/pool and the page itself are untouched, only the clipped buckets empty out. If that's not the intended scope, that's worth a quick confirm before a bigger refactor rather than a silent guess either way.

No DB migration expected — this should be a client-side query/display change only (one possible new `last_action_by`-scoped hook, plus generalizing the existing date-clip helper), same class of change as Prompt 559. Frontend-only, same as most recent prompts in this queue.

</details>
