---
date: 2026-09-30
description: "The live CC task queue for Ohvara — open build items only, written by the manager/Cowork chat, emptied by CC on ship. The one file CC reads at session start for \"run the next Ohvara task.\" Mirrors [[Restorix CC Queue]]'s same split."
tags:
  - ohvara
  - cc-queue
---

# Ohvara CC Queue

> **The live task queue for CC (the builder), Ohvara side.** Manager/Cowork chats (Eagle/Falcon) **append** prompt specs here; CC executes top to bottom, **deletes each item the moment it ships**, and writes the full record to [[Memories]]. An empty queue below means there is nothing for CC to do — check [[North Star]]'s Current Focus instead.
>
> **Why this is its own file** (added 2026-09-30, mirroring [[Restorix CC Queue]]'s own fix from 2026-09-01): keeps ownership clean — manager chats own this file, CC owns [[LIVE_STATE]] + [[Memories]] — and keeps it small enough to read whole, append to, and re-read to verify in seconds. Also closes a real gap Brayden hit the same day: Ohvara's queue used to live inside a "Next Up for CC" section of the combined [[LIVE_STATE]] file, and saying "run the next Ohvara task" had no file name of its own to point at the way "run the next Restorix task" does — genuinely easy to get confused with, or for a queued item to get lost in unrelated edits to the same shared file. Splitting it out gives Ohvara the same unambiguous queue file Restorix already had.
>
> **Rules for whoever writes here:**
> - Write into the **connected local vault folder** `C:\Users\freem\obsidian-mind`, never a clone. Confirm it's attached first.
> - After writing, **re-read this file from disk** and confirm your text is present before telling Brayden it's queued.
> - **CC: re-read this file from disk immediately before any write that removes a completed item — not just once at session start.** This file gets appended to by manager chats *while CC is still mid-task*, so a stale in-memory copy from session start can silently revert a newly-queued item when CC's own ship-sweep writes back "item shipped, remove it." This has already happened twice (Prompts 683 and 686 both vanished this way, had to be manually re-added after Brayden caught CC saying it couldn't find the next task). Re-reading right before every write that modifies this file — not just the first read of a session — is the actual fix.
> - **Numbering:** next prompt number = one past the highest referenced anywhere in the vault — the counter is shared across Ohvara AND Restorix. Check [[LIVE_STATE]] + [[Memories]] AND [[Restorix LIVE_STATE]] + [[Restorix Memories]] + [[Restorix CC Queue]] before assigning a number.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline. Order = execution order.
> - **Committing this file:** CC's Ohvara session has standing `git add`/`commit`/`push` permission as of 2026-10-01 (added after the Prompt 664 blocker), so CC's own next ship sweeps up and commits whatever's sitting here uncommitted — a manager chat queuing an item does **not** need to separately commit/push it by hand. (Historical note: this rule originally asked for an immediate manual commit, after an uncommitted queue edit got wiped on 2026-09-30 — the real cause turned out to be the device-bridge connection itself dropping mid-write, not uncommitted git state, and a manual commit wouldn't have protected against that anyway. The re-read-to-verify rule above is the real safeguard.)

## Prompt 673 — Agent billing: $350/week flat retainer via Stripe

> **🟡 2026-10-06 CC PASS — items (2) + (3) done; (1) + (4) NOT done, need Brayden.** Shipped `d2d8fc4`, migration 128 applied live: `profiles.billing_exempt` (default false, admin-only), Test Agent set true; gate (`billingAccess`), weekly cap (`agent_weekly_usage`), Billing page, admin Users cell and edge fn all key off `role='agent' AND NOT billing_exempt`. **Blocked:** (a) the CC classifier **denied the `agent-billing` edge-fn deploy** — Brayden must run `npx supabase functions deploy agent-billing --no-verify-jwt --project-ref jjextitmbptoaolacocs` from `ohvara-dashboard` (or approve it for CC); until then the live function lacks the `billing_exempt` checks (harmless: enforcement is still off). (b) Live e2e needs a **real card entered by Brayden** in Stripe Checkout (CC can't type card numbers) — he should subscribe with his own card, confirm webhook flips `billing_status`, then refund/void. Test Agent's stored Stripe ids are sandbox ones; it's exempt so they're ignored. **(4) `agent_billing_enforced` left OFF** until the live e2e is confirmed. Only agent profile today is Test Agent, so flipping on affects no real agent yet.

> **✅ LIVE KEY + LIVE WEBHOOK IN PLACE 2026-10-07 (Brayden, Eagle session) — CC: go ahead and finish this one.** Brayden's Stripe account was already activated for live payments (no verification checklist blocking it). He generated a new live secret key (`ohvara-portal-live`) and saved it as `STRIPE_SECRET_KEY` in Supabase, replacing the sandbox `sk_test_...` value. He then created a live-mode event destination in Stripe pointed at `https://jjextitmbptoaolacocs.supabase.co/functions/v1/agent-billing/webhook`, listening to the 6 events the code expects (`checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`), Snapshot payload style, and saved its signing secret as `STRIPE_WEBHOOK_SECRET`, also replacing the sandbox value. Both secrets are now live. **CC's remaining work per Brayden's answers above:** (1) run the same e2e test that passed in sandbox, now against live mode — can use a real card or Stripe's own live-mode test tooling if available, flag if a real charge is unavoidable so Brayden can refund/void it; (2) add the `billing_exempt` boolean to `profiles` (default `false`), set it `true` for Test Agent; (3) confirm the billing gate gets scoped to `role = 'agent' AND billing_exempt = false` — other roles (`admin`, `fulfillment`, `rep`, `client`) never gated at all; (4) flip `agent_billing_enforced` on once the above is verified working. No staging needed per Brayden — straight to enforced once confirmed.


> **Brayden's answers 2026-10-07 (Eagle session) — exemption logic + go-live timing, still waiting on the live key itself:**
>
> **Exemption logic (replaces any earlier assumption of a flat account allowlist):** billing enforcement should only ever apply to `role = 'agent'` accounts in the first place — `admin`, `fulfillment`, `rep`, and `client` roles are never subject to the gate at all, regardless of any exemption flag, current or future. On top of that role-level scoping, Test Agent specifically needs its own exemption even though its role is `agent` (it's role=agent but must never be billed) — don't key this off a hardcoded id/email, add a proper boolean (e.g. `billing_exempt` on `profiles`, default `false`) so Test Agent and any future internal/demo agent accounts can be flagged the same way without touching code. Gate check becomes: enforce only when `role = 'agent' AND billing_exempt = false`.
>
> **Go-live timing:** no staging needed — Brayden's fine with `agent_billing_enforced` flipping on immediately once the live key + live webhook are confirmed working end-to-end (same e2e pattern as the sandbox test already passed). Not urgent/blocking anything else though — portal still has other rough edges being smoothed out, so no rush to get the live key in place.
>
> **Still blocking, waiting on Brayden (not CC):** Brayden wasn't sure whether his Stripe account can even accept live payments yet — it may still need business verification (Stripe's own KYC requirement: business details, product/business-relationship info, completing Stripe's account activation checklist in the Dashboard at dashboard.stripe.com/account/onboarding) before it can leave test mode at all. Brayden needs to check this himself in the Stripe Dashboard before a live key can exist. Once he has a real `sk_live_...` key and has created a **live-mode** webhook endpoint (the existing one is sandbox-only) with its own live `STRIPE_WEBHOOK_SECRET`, he'll set both directly as Supabase secrets himself (not pasted through chat) — flag back here once that's confirmed done and CC can pick this up: run the same e2e test against live mode, add the `billing_exempt` column + exemption check per above, flip `agent_billing_enforced` on.


> **✅ E2E PASSED IN TEST MODE 2026-10-02 (CC).** Subscribe (4242) → webhook → `active`, Manage billing → portal, cancel → `canceled` (access through Oct 9), renew → `active`. Detail: [[Memories]] 2026-10-02 "P673 e2e". **Not yet exercised:** a failed *renewal* (`past_due` + 48h grace). It needs a renewal to come due (Test Agent's renews Oct 9) or a Stripe test clock. **Remaining CC work waits on Brayden's go-ahead:** live key, flip `agent_billing_enforced`, mark test accounts exempt. Until then, CC skips this item.

> **✅ FULLY UNBLOCKED 2026-10-02 — Brayden created the Stripe webhook endpoint (sandbox) and confirmed `STRIPE_WEBHOOK_SECRET` is set in Supabase secrets.** Both `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are now in place. **CC: run the end-to-end test (card 4242 + a declining card) per [[LIVE_STATE]] step 4, confirm the webhook actually fires and updates `billing_status`, then report back — going live (real key, enforcement on) still needs Brayden's explicit go-ahead, don't flip that on your own.**

> **✅ UNBLOCKED 2026-10-02 — Brayden confirmed `STRIPE_SECRET_KEY` is set in Supabase secrets** (sandbox/test key, `sk_test_...`, from a Stripe Sandbox under the existing Ohvara Stripe account — the account itself is a leftover from a pre-pivot AI-agency idea and currently unused for anything live, but the sandbox keeps this build fully isolated from it regardless). Scaffolding already shipped (`8bcb971`, mig 113): schema, Settings → Billing tab, admin column and the access gate, with enforcement off. **CC: resume this item — build the Stripe edge functions + webhook now that the secret is in place.** A second secret, `STRIPE_WEBHOOK_SECRET`, will be needed once the webhook endpoint exists — flag that back to Brayden/Eagle when you reach that point rather than guessing a value.

**Hard prerequisite, blocks everything past schema/UI scaffolding — same category as Prompt 393 (Daily.co) and Prompt 666 (Twilio): CC cannot create third-party accounts.** Brayden needs a Stripe account (confirm whether one already exists before assuming it doesn't) and real API keys handed over as Supabase secrets before billing logic can be built. If not available when CC picks this up, stop at that point, build what's ready, and flag blocked exactly like 393/666 — don't guess at a workaround.

**Business model, Brayden's own framing — direction of money matters, this is NOT agent commissions:** agents pay **Ohvara** (not the reverse) a flat recurring retainer — $350/week per agent — for portal access and that week's batch of client cancellations to be worked. If they want the service again the following week, they pay $350 again. This is a weekly recurring subscription gating portal access, not a one-time charge and not a payout to agents.

**Don't confuse this with, or build on top of, the old dead Payouts system.** `ohvara_legacy_setter_pipeline_dead.md` confirms `Payouts.jsx` / `/admin/payouts` already exists in the codebase from the pre-pivot model — it paid "reps" **via Stripe** against the old `commission_payouts`/`appointments`/`leads` tables, which are emptied and unused. That page is unreachable from nav but still present. This new prompt is the opposite direction of money flow and a different Stripe integration (Billing/Subscriptions, not payouts) — don't revive or extend the old page/tables; this is a fresh build, though the fact Stripe was integrated before may mean an existing Stripe account/connection to check on, worth asking Brayden about directly rather than assuming a clean slate.

**Technical shape (real latitude, Opus's call):** Stripe Billing/Subscriptions with a weekly recurring price; a webhook handler for payment success/failure that flips a `billing_status` (new column, migration needed — flag it) on `profiles`, gating portal access when unpaid; an agent-facing billing view (Settings is the obvious place) showing current status and next charge date, using Stripe-hosted Checkout/Customer Portal rather than a custom card form to stay out of PCI scope. Admin-side visibility for Brayden into who's current/who's lapsed.

**Not yet decided, Opus's call once building:** grace-period behavior on a failed payment (immediate access cutoff vs. some buffer) and exactly what "access paused" looks like in the UI (locked overlay vs. read-only) — document the decision and why in the ship note.

**Log in the ship note:** whether a Stripe account/keys were present and usable (and whether it's the same account as the old dead Payouts integration or a new one), the exact migration applied, and — if blocked — exactly what Brayden needs to go create, mirroring how Prompt 393/666's blockers are written.

## Prompt 696 — No-answer recovery: text → text → one locked retry call → confirm number → morning+evening text next day → hand off to the agent

> **✅ BUILT 2026-10-04 (CC, `95c04b0`, migration 122) — everything up to the SMS blocker.** Texting is OFF (`recovery_config.sms_live = false`), so no lead enters the flow yet. **Remaining, waits on Brayden:** an SMS-capable Twilio number registered for A2P 10DLC, then flip "Texting live" in Settings → Text follow-up (admin card; it also shows whether the configured number is SMS-capable). Until then, CC skips this item. Detail: [[Memories]] 2026-10-04 "P696".

**Blocked on a real external step, same category as Stripe/Twilio-voice (Prompts 393/666/673): needs an SMS-capable Twilio number registered for A2P 10DLC before any SMS actually sends.** CC should build everything up to that point and stop there, flagged exactly like those — don't guess at a workaround.

**Sixth and final pass — supersedes the version just before this one in this file. Brayden confirmed this is the last open piece of the design.** Only change from the prior pass is pinning down exact Phase 2 timing.

**Phase 1 — the locked retry day (unchanged):**

1. Original booked call ends in **No answer.** Immediately, a text fires (agent must have the opt-in toggle on, per this prompt's first pass): acknowledges the missed call, says a retry is already locked for the same time tomorrow, gives the self-serve reschedule link (with an "ASAP" option, not just specific times). **If the client uses that link to pick a new date/time, the lead flips straight back to Booked — done, no further steps.**
2. At that same moment, the next-day retry slot is reserved for real in the actual assignment/booking system (Prompt 684's logic) — **must block double-booking.**
3. If no response by the next morning (~9:00–9:30 AM local, configurable): a second text fires, same reschedule link, reminding them of today's scheduled retry.
4. If still no reply: the locked retry call happens at the original time.
   - Resolves → Cancelled, done.
   - No answer again → stays status **No answer**. Full cap on Phase 1: one retry day, two texts, two calls total — not an open loop.

**Checkpoint: pause everything, require the agent to confirm the number.** After the second no-answer, stop all automated texting and stop auto-booking any further retry calls. The lead surfaces with an explicit "Confirm this is the right number for this client" action. Nothing further runs until the agent does that — and the agent can do this at any time of day, which is what this pass pins down.

**Phase 2 — post-confirmation, exactly one day, two texts, then hand off (this is the piece that changed):**

- The agent can confirm the number at any time of day — don't fire anything the moment they confirm. **Wait for the next fresh calendar day after confirmation**, then:
  - A **morning text** (~9:00–9:30 AM local, same default as Phase 1's reminder time), same reschedule link.
  - An **evening text** later that same day (default ~6:00–7:00 PM local — real latitude on the exact hour, Opus's/CC's call, just make it configurable rather than hardcoded) — same reschedule link.
- **If there's no response to either of those two texts by end of that day, the agent gets notified to call the client themselves and try to rebook.** This is the full and final cap on Phase 2 — exactly one day, two texts, no calendar slot reserved at any point in this phase, then a clean handoff to a human. Automation for this lead ends there.

**Surfacing, not a new status:** keep the attempt/phase visible on the No-answer badge wherever it shows (My Pipeline, Needs Attention) — e.g. "No answer · retry tomorrow," "No answer · needs number check," "No answer · follow-up (AM sent)," "No answer · follow-up (PM sent)," "No answer · call agent directly."

**What CC should build now, up to the blocker:**
- The Settings opt-in toggle (unchanged, default off, one-time consent).
- Per-lead attempt tracking: phase (1 or 2), both Phase-1 texts' sent/responded state, the retry call outcome, confirmed-number flag + timestamp, Phase-2's AM/PM text sent/responded state.
- Text 1 (immediate) + the self-serve reschedule link with specific-time and ASAP options, parsed only through that link flow — not freeform reply parsing.
- The real, slot-blocking next-day retry booking — reuse Prompt 684's assignment/slot logic, must prevent double-booking.
- Text 2 (next-morning reminder, ~9 AM default, configurable).
- The hard pause + "confirm the number" agent action after the second no-answer — confirmable at any time, doesn't trigger anything until the next calendar day.
- Phase 2: the next-day AM + PM texts, same reschedule-link mechanism, no calendar slot reserved.
- The final handoff notification to the agent ("call this client yourself and rebook") once both Phase 2 texts are exhausted with no resolution — this ends the automated flow for that lead.
- **Stop at:** a real SMS-capable Twilio number + completed A2P 10DLC registration. Check first whether the existing `CALLER_ID_TWILIO_FROM_NUMBER` is already SMS-capable before assuming a second number is needed. Flag exactly what Brayden needs to go do, mirroring how Prompt 393/666/673's blockers are written, and build/verify everything that doesn't depend on it in the meantime.

Scope note: still layers on top of Prompt 695's No answer status/color/layout work, which stands as-is — this prompt is the automated recovery behavior running underneath that same status.

## Prompt 725 — Billing: the comped account looks and behaves exactly like a paying Premium agent (no "Exempt" anywhere, full 16-booking cap)

> **✅ REQUESTED by Brayden 2026-10-09 (Eagle session): "I want all that taken out... I want it to look like as if I just have purchased the premium plan... I want the portal to just detect that I just have the premium plan, so I still have the 16 bookings and things like that. I'm not technically exempt, but I just don't pay."** CC: build this. No new mockup: the target is the existing Billing page in its normal paid state (the page as it already renders for an active Premium agent). **Run on Opus 5.5** (it replaces a database function that the booking cap trigger depends on).

**What this is.** Today an account with `profiles.billing_exempt = true` (Brayden's Test Agent) sees a special "exempt preview": an "Exempt" chip, "Exempt accounts aren't charged.", a "Preview: your account is exempt…" banner, "Exempt accounts have no limit.", "Not charged while exempt", a dead Manage billing button, no Next charge date, no plan name on the Settings card, and **no weekly booking cap at all**. Brayden wants to test the product as a real top-tier agent, so all of that goes. The account should be **comped, not exempt**: it never pays and is never locked out, but everything the agent can see and every limit that applies behaves as on an active Premium plan.

Keep the `billing_exempt` column and its meaning **internally**: no Stripe customer, no gate lock, webhooks ignore the account, an agent can't change it themselves. Only the **agent-facing** presentation and the cap change. Don't rename the column. The admin Users page keeps showing "Exempt" for admins (that's how Brayden still sees who is comped); don't touch `src/pages/admin/Users.jsx` or the `exempt` entry in `BILLING_STATUS`.

### 1. The Billing page (`src/components/agent/BillingPanel.jsx`)

Treat a comped account as **`status = 'active'` on its tier** for everything it renders. Introduce `const comped = !!profile.billing_exempt` and derive from it; remove the `exempt` branches (and the `Eye` import if unused).

- **Remove the preview banner** ("Preview: your account is exempt…"). Nothing replaces it.
- **Hero (`planHero`):** the normal Active hero: chip **"Active"** (`is-active`), plan name, price, and the line **"Paid through Sun, Oct 11. Next charge of $500 on Mon, Oct 12, renews automatically."**, phone line "Next charge Mon, Oct 12", the Manage billing button (enabled, not dimmed), and the days-to-renewal ring.
  - A comped account has no Stripe period, so its **renewal date is the end of its booking week**: use `usage.week_end` (Monday 00:00 in the agent's zone, from `useWeeklyUsage`) wherever the real build uses `profile.billing_current_period_end` (`periodEnd`, `days`, the "Paid through" day). Real paying agents keep using `billing_current_period_end` exactly as today.
  - While `usage` is loading, fall back to the generic Active text ("Paid up. Renews automatically.") with no ring, as the code already does when the date is missing.
- **Which plan:** `profile.billing_tier` (migration below sets it to `premium`). Keep the fallback to the plan with the most bookings if the tier is somehow missing.
- **Bookings card:** the normal capped card (`BookingMeter` with `cap.used` / `cap.cap`, the 16 segments, "N left", note "Resets Monday at midnight. The limit is per account, not per person on the login."). At the cap it shows the paused message exactly as a real agent would; there is no next tier above Premium, so no upgrade button.
  - Remove the "Exempt accounts have no limit." note and the `exempt` branch in `bookingsCard`.
- **Plans section:** the current plan's footer note is the normal **"Renews Mon, Oct 12"** (from the derived date), not "Not charged while exempt". The other plan's switch button is enabled (`canSwitch` true for a comped account), with the normal "Switch to Standard / Upgrade" labels and helper text.
- **Buttons:** Manage billing and Switch/Upgrade are **enabled** for a comped account (don't disable them just because Stripe isn't configured or the account is comped), and **`go()` no longer short-circuits on exempt**. A click goes to the `agent-billing` function, which already answers a comped account with **409 "Your account isn't billed."**; show that message in the existing error box. Nothing is ever opened in Stripe and nothing is charged. (This is the one honest seam: Brayden sees the real flow and the real message instead of a dead button.)
- **"Billing isn't connected yet" note:** don't show it for a comped account (it has nothing to connect).
- `status` for the unsubscribed/trial views and `subscribed` use the derived `'active'`, so a comped agent never lands on the "choose a plan" view.

### 2. Everywhere else the agent sees the account

- **Header line (`DashboardLayout.jsx`, `BillingLine`):** a comped agent gets the same pieces as a paying one: the plan pill ("Premium") **and** "Next charge Mon, Oct 12" (use `usage.week_end` for a comped account). Remove the `!profile.billing_exempt` condition for the pill/next-charge logic.
- **Settings account card (`src/pages/Settings.jsx`, `AccountCard`):** show "Agent · Premium" for a comped agent (treat comped as `running`; drop the `!profile.billing_exempt` condition). Update the comment above it.
- **Sidebar user card** (bottom left, "Agent · Premium") already reads the plan; confirm it shows Premium for a comped agent and fix if it keys off status.
- Search the repo for any other agent-facing text containing "exempt", "Exempt", "comped" or "Not charged" (components, hooks, edge function responses shown to agents) and remove or neutralise it. Allowed to stay: code comments, `billing.js` internals (`billingAccess` still never locks a comped agent), the admin Users page, the 409 message above.

### 3. Database (migration 131)

Next free number after P724's `130_client_city_timezone.sql`; check the folder and use the next one. Additive and safe:

1. **Replace `public.agent_weekly_usage`** (the version from `128_billing_exempt.sql`) so a comped agent gets its tier's cap. The only change is the `weekly_cap` column of the result:
   - was: `case when v_role = 'agent' and not v_exempt and v_status <> 'exempt' then t.weekly_cap else null end`
   - now: `case when v_role = 'agent' then t.weekly_cap else null end`
   Everything else in the function stays identical (signature, `security definer`, grants, tz and week maths, the `enforced` flag). `policies_enforce_weekly_cap` reads this function, so the cap is enforced for the comped account the same as for a paying one, **when `app_settings.agent_billing_enforced` is on** (as for everyone). Read the trigger function from `119_agent_billing_tiers.sql` and any later replacement to confirm it has no separate exempt check; grep `supabase/` for `billing_exempt` in SQL (functions, policies, views) and report anything else that treats exempt as uncapped. Non-agents still get `null`.
2. **Put the comped agent on Premium:** `update public.profiles set billing_tier = 'premium' where billing_exempt and role = 'agent' and exists (select 1 from public.agent_billing_tiers where key = 'premium');` The privileged-column guard only blocks `authenticated` users; a migration runs as the owner, so this is fine. Don't touch `billing_status`, Stripe ids or `billing_exempt`.
3. Don't change the guard trigger, the webhook handler (`syncSubscription` keeps ignoring comped accounts) or `billingAccess`.

**Heads-up for the ship note:** with enforcement on, the comped account now **cannot make a 17th booking in a week** (the cap trigger refuses it, same message a paying agent gets). That is intended: Brayden wants to test the real limit. If he needs to book past it for a demo he can turn `agent_billing_enforced` off in `app_settings` or raise Premium's `weekly_cap`; don't build anything for that.

### 4. Files and rules

- **New:** `supabase/migrations/131_comped_agent_cap.sql` (or the next free number).
- **Edit:** `src/components/agent/BillingPanel.jsx`, `src/components/layout/DashboardLayout.jsx`, `src/pages/Settings.jsx`, `src/lib/billing.js` only if a tiny helper (`isComped(profile)`) helps keep the three call sites consistent.
- **No** changes to `AgentUI.jsx`, the admin pages, the edge functions, or Stripe/webhook logic. No new dependencies. Sentence case, existing tokens and classes.
- Don't send test charges, don't open Stripe, and don't write test data to production.

### 5. Verify and log

- `vite build` passes. Render `/agent/billing`, the header line and the Settings account card through a throwaway Vite harness with mocked hooks, as earlier prompts did:
  - **comped agent, Premium, 1 of 16 used:** looks identical to a paying Active Premium agent (chip "Active", the paid-through and next-charge line, the ring, 16 segments with "15 left", "Renews Mon, Oct 12" on the current plan, the Standard card's switch button enabled). **No** "Exempt", "Preview", "not charged", "no limit" text anywhere on the page (grep the rendered text).
  - comped agent at **16 of 16:** the paused message, no upgrade button
  - a **paying** Active agent: unchanged from today (still uses `billing_current_period_end`)
  - the other statuses (`past_due`, `canceled`, none) unchanged
  - click Manage billing on a comped account with the function mocked to return the 409: the "Your account isn't billed." message shows and nothing navigates
  - phone width and light mode
  Delete the harness.
- Ship note in [[Memories]]. Say plainly it wasn't seen logged in, that the migration was or wasn't applied, and that the comped agent is now capped at 16 a week when billing enforcement is on. Brayden checks:
  - Billing shows an Active Premium account with a next-charge date, and not a single word about exempt
  - the header says Premium with a next charge date, and Settings says "Agent · Premium"
  - the bookings card counts toward 16
  - clicking Manage billing tells him "Your account isn't billed" and nothing opens
- Update `DESIGN.md`: a comped account (`billing_exempt`) is presented as Active on its tier, its renewal date is the end of the booking week, and the cap applies; "Exempt" is admin-only wording.
