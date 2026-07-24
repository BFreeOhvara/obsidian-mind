---
date: 2026-07-24
description: "Self-contained Claude Chrome prompt — apply ohvara-dashboard migration 072 (insurance launch schema) and redeploy the claim-invite edge function. Blocks Prompt 326's real launch."
tags:
  - brain
  - handoff
---

# Claude Chrome — apply migration 072 + redeploy claim-invite

Paste the block below into Brayden's own Claude Chrome session (the one already
logged into Supabase). CC can't do this from here — no DB password, and per
[[North Star]] Rule 10 browser work goes to Brayden's session, not CC's.

Related: [[Memories]] 2026-07-24 entry, [[LIVE_STATE]] Prompt 326.

---

## Prompt to paste

> Two tasks in the Supabase dashboard for project `jjextitmbptoaolacocs`
> (Ohvara). Do them in order — the second depends on the first.
>
> **1. Apply migration 072.** Open the SQL Editor and run the full contents of
> `ohvara-dashboard/supabase/migrations/072_insurance_launch.sql` from the
> local repo (I'll paste it). It creates: the `policy_status` and
> `cancellation_status` enums, `profiles.upline_id` plus three helper
> functions (`downline_of`, `upline_of`, `can_view_agent`), the `carriers`
> table, the `policies` table with RLS, and it replaces `rep_invites`' three
> admin-only RLS policies so a closer can mint their own `closer` invites.
> Report back the exact error text if anything fails — do not "fix" the SQL
> on your own.
>
> **2. Redeploy the `claim-invite` edge function.** Its source changed: it now
> stamps `profiles.upline_id` from the invite's `created_by`, which is what
> makes the Hierarchy page's invite chain actually build a downline. Deploy it
> the same way it was deployed originally — **with JWT verification disabled**,
> since the signup page runs pre-auth:
> `supabase functions deploy claim-invite --no-verify-jwt --project-ref jjextitmbptoaolacocs`
> If you're doing it through the dashboard UI instead of the CLI, make sure
> "Verify JWT" stays OFF for this function.
>
> **3. Confirm back:** whether both steps succeeded, and paste any error text
> verbatim.

---

## Why this is blocking

Nothing in the new insurance dashboard reads or writes anything until 072 is
applied — My Policies, Submissions, Carrier Portals and Hierarchy all query
tables that don't exist yet on the live database. The frontend is already
pushed and will deploy on its own; it just has nothing to talk to.

## What still needs a real answer from Brayden after this

These were flagged with Prompt 326 and are unresolved — see [[LIVE_STATE]]:

1. **Quoter** — does the team have a real quoting-toolkit account? Without one
   it stays a placeholder, not an embed.
2. **Carrier Portals** — real carrier names, portal URLs, new-business and
   agent-service numbers for whoever Nate/Jordan/Rego are appointed with.
   The table ships empty on purpose; admin enters these in the app itself.
3. **Cancellation Calendar** — is there a dedicated cancellation-handling
   number, or does the closer who sold the deal run their own 3-way call?
4. **In-system messaging** — real for launch, or a later add?
5. The three Claude Design export dependencies still missing: `data3.js`,
   `support.js`, `sprite.svg`.
