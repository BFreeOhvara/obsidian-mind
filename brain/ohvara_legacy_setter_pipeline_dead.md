---
date: 2026-08-14
description: "The pre-pivot SMB rep/setter pipeline (leads → call → appointment → close) is fully dead in ohvara-dashboard — schema and one orphaned admin page remain, but all data is deleted and nothing routes to it. Don't build on or revive it."
tags:
  - brain
  - gotcha
---

# Ohvara Legacy Setter Pipeline (Dead)

Ohvara [[North Star|pivoted]] from an SMB outbound cold-calling business (setters → leads → appointments → closer) to an inbound insurance operation on 2026-07-21. The old pipeline is dead, not archived-for-reuse:

- **Data deleted.** Post-pivot cleanup removed all pre-pivot rows from Supabase: `leads` (559 rows), `calls` (35), `appointments` (19), `clients` (5), `commissions` (14), `commission_payouts` (19), plus smaller related tables. The `apex11` rep account was removed from both `profiles` and `auth.users`.
- **Schema still exists, unused.** The tables themselves weren't dropped, just emptied — no migration removed them.
- **One dead page still references them.** `Payouts.jsx` / `/admin/payouts` in `ohvara-dashboard` pays "reps" via Stripe against the pre-pivot `commission_payouts`/`appointments`/`leads` model. It's already unreachable from any nav (flagged via `spawn_task` during the pivot cleanup, not deleted).

**Why this note exists:** [[LIVE_STATE]]'s Restorix Prompt 428 (setter portal MVP) explicitly calls this pipeline out as "conceptually similar" reference material but a from-scratch build in Restorix's own project — this note is the pointer so future sessions don't mistake the dead Ohvara tables/page for something to extend.

## Related

- [[North Star]] — pivot decision record
- [[LIVE_STATE]] — current state, Restorix queue
- [[Gotchas]] — other hard-won lessons
