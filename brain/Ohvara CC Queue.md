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

## Prompt 725 — Billing: the comped account looks and behaves exactly like a paying Premium agent

> **🟡 2026-10-09 CC: BUILT + PUSHED (`ohvara-dashboard` `693b45d`), only the migration is left — needs Brayden.** The auto-mode classifier denied `apply_migration` for `supabase/migrations/131_comped_agent_cap.sql` (committed in the repo). Brayden pastes that file into the Supabase SQL editor, or approves `apply_migration` for CC; then CC deletes this item. Until then Test Agent's bookings card says "Nothing limits your bookings" instead of N of 16. Full spec and ship note: [[Memories]] 2026-10-09 "P725". CC skips this item until it's applied.

## Prompt 731 — Invite an agent: a pop-up in the account menu that sends a personal sign-up link by text or email

> **🟡 2026-10-09 CC: BUILT + PUSHED (`ohvara-dashboard` `6bdc710`). Not live yet. Waiting on Brayden, in this order:** (1) apply `supabase/migrations/135_agent_invites.sql` (paste it into the Supabase SQL editor, or approve `apply_migration` for CC; the auto-mode classifier denied it); (2) **only after (1)**, redeploy `claim-invite`: `npx supabase functions deploy claim-invite --no-verify-jwt --project-ref jjextitmbptoaolacocs` (deploying it first would make every invite link invalid); (3) deploy `send-agent-invite`: `npx supabase functions deploy send-agent-invite --project-ref jjextitmbptoaolacocs` (JWT check left ON); (4) for email: a Resend account with a verified sending domain, then Supabase secrets `RESEND_API_KEY` and `INVITE_FROM_EMAIL` (e.g. `invites@<that domain>`). Texting stays "coming soon" until P696's A2P approval and `recovery_config.sms_live` is on. Until then the menu row and pop-up are live but both tabs say "coming soon". When (1)–(3) are done CC re-tests RLS as an agent and deletes this item. Ship note: [[Memories]] 2026-10-09 "P731".

> **✅ APPROVED by Brayden 2026-10-09 (Eagle session) after the "Ohvara Invite an Agent" canvas (https://claude.ai/artifact/3PfPYy9i8D8GfbS6A3LZUV; static copies in `media/p731-invite-an-agent/`).** His words: an agent should be able to invite another agent so it can "spider web". "Put it where [the account menu has] get phone app, report problem, theme and then invite another agent". "It's just a pop-up that looks like any other pop-up. You select if you want to send it via email or phone number, and then you type out their email or phone number. But I don't want them to be able to copy a link and send it. I want them to send it to phone numbers or emails specifically." And: "there's no concept of teams anyway... you're just inviting another agent to use the platform. You don't have any ties to them whatsoever through portals." Final copy: the only note in the pop-up is **"The link is single-use and expires in 7 days."** **Run on Opus 5.5** (new edge function that creates accounts' sign-up links, an RLS change on `rep_invites`, and a change to `claim-invite`).

**What this is.** A small pop-up, not a page. The agent picks **Text message** or **Email**, types the number or address, presses **Send invite**, and Ohvara sends the person a personal link. The agent never sees or copies the link. The invited person signs up like any new agent (name, email, password, then picks and pays for a plan). **There is no team, no upline, no tie between the two accounts, and the inviter sees nothing of the invitee.** No new page, no new sidebar item, no list of sent invites for the agent.

### 1. The pop-up (`src/components/shared/InviteAgentModal.jsx`, new)

Build to the canvas (boards "Text", "Email", "Sent"). Same mechanics as `BugReportButton.jsx` (portal to `<body>`, dark overlay, click-outside and Escape close, `maxWidth` 460, autofocus the field), but in the v16 language of the canvas: pill buttons (`.ov-solid` white primary, `.ov-ghost` secondary), `--ov-*` tokens, sentence case, 20px display title.

- **Title** "Invite an agent"; subtitle **"We send them a personal link to sign up for Ohvara. It only works for the number or email you enter."**; close X.
- **Segmented control** "Text message | Email" (default Text). Switching clears the field and the error.
- **Field** labelled "Their phone number" (phone icon, `formatPhoneInput`, US 10-digit) or "Their email" (mail icon). Focused style as the canvas.
- **Note** (info-style box, lock icon): **"The link is single-use and expires in 7 days."** Nothing else in it. Don't add copy about teams, accounts or visibility.
- **Buttons:** Cancel (ghost) and **Send invite** (white, user-plus icon). Disabled until the field is valid (email regex as `claim-invite`; phone = 10 digits, or 11 starting with 1). While sending: "Sending…", disabled.
- **After sending:** the "Sent" board: a green check box, **"Invite sent to (713) 555-0142"** (or the email) and **"They'll get their own account once they sign up."**, buttons "Invite another" (resets to the form) and "Done".
- **Errors** show above the buttons in the danger colour, using the function's message (e.g. "That person already has an account.", "You've sent a lot of invites today. Try again tomorrow.", "Couldn't send that. Try again.").
- **A channel that isn't switched on yet:** on open, call the function's `status` action (below). If a channel isn't available its tab stays visible but muted; selecting it shows the note **"Texting invites is coming soon."** / **"Email invites are coming soon."** in place of the field and Send is disabled. Never let an agent "send" when nothing can go out.
- Phone width: the modal is full width minus 16px padding, buttons stack on very narrow screens.

**Menu.** `src/components/layout/AccountMenu.jsx` gets a new row **"Invite an agent"** (lucide `UserPlus`, same row style as "Get the phone app") **between "Get the phone app" and "Report a problem"**, with the same stagger timing (shift the later rows' delay by one step). New prop `onInvite`, wired where `onPhoneApp`/`onReport` are (the sidebar user card and the collapsed rail), opening the modal. **Agents only**: don't show it to admin, fulfillment or any other role (`profile.role === 'agent'`). Keyboard/menuitem behaviour unchanged. The row works on the collapsed rail's menu too.

### 2. Sending — new edge function `send-agent-invite`

`supabase/functions/send-agent-invite/index.ts`, **verify_jwt ON** (it's called from the signed-in app via `supabase.functions.invoke`). Service-role client for writes. Two actions:

- `{ action: 'status' }` → `{ email: boolean, sms: boolean }`: `email` is true when `RESEND_API_KEY` and `INVITE_FROM_EMAIL` are set; `sms` is true when Twilio is configured (same lookup as `recovery-sms`: `RECOVERY_TWILIO_*` else `CALLER_ID_TWILIO_*`, from number) **and `recovery_config.sms_live` is true** (that flag means the number is SMS-capable and A2P-registered; don't build a second flag).
- `{ action: 'send', channel: 'email' | 'sms', to }`:
  1. Caller = the JWT's user; load the profile; require `role = 'agent'` (and `is_active`). Else 403.
  2. Validate and normalise: email lowercased and trimmed; phone to E.164 (`toE164` as in `recovery-sms`). Else 400 "Enter a valid email" / "Enter a valid phone number".
  3. Refuse if the channel isn't available (`status` says false): 409 "Email invites are coming soon." / "Texting invites is coming soon."
  4. **Rate limit:** at most **10 invites per agent per rolling 24h** (count `rep_invites` rows by `created_by` and `created_at`) and at most **3 to the same destination per agent per 24h**. Else 429 with the message above.
  5. **Existing account:** for email, if `auth.users` already has that email (`adminClient.auth.admin.listUsers` filtered, or a `profiles` email lookup if one exists; read how `claim-invite` reports "already exists"), return 409 "That person already has an account." (Accepted trade-off: it reveals that an address is registered; it's agents inviting people they know. Don't add the same check for phone numbers; there's nothing to look up.)
  6. **Supersede:** delete any unused, unexpired invite this agent already sent to the same destination, so the destination has one live link.
  7. Insert `rep_invites` (service role): `role = 'agent'`, `created_by` = caller, new random 12-char URL-safe token (same generator as the admin flow; read `useCreateInvite` in `useProfiles.js`), `expires_at = now + 7 days`, plus the new columns below.
  8. **Send** with the link `${PUBLIC_APP_URL ?? 'https://portal.ohvara.com'}/join/<token>`:
     - **Email** via Resend's HTTP API (`POST https://api.resend.com/emails`, `Authorization: Bearer $RESEND_API_KEY`), from `INVITE_FROM_EMAIL`, subject **"<Agent first name> invited you to Ohvara"**, short plain HTML: one line saying who invited them, one button "Create your account" to the link, and "This link works once and expires in 7 days." Reply-to the agent is **not** set (don't expose the agent's email).
     - **SMS** via Twilio Messages (same call as `recovery-sms`): **"<Agent first name> invited you to Ohvara. Create your account: <link> (works once, expires in 7 days)."** Keep it under 160 chars, plus the carrier opt-out wording the existing recovery texts use.
  9. If sending fails (non-2xx from Resend/Twilio), **delete the invite row you just inserted** and return 502 "Couldn't send that. Try again." Never leave a live token that nobody received. Log the provider's error server-side only.
  10. On success return `{ ok: true }` and nothing else. **The response, logs and any column readable by the agent never include the token or link.**
- CORS headers as the other functions. Don't write the destination or token to console logs.

**Deploy:** this function needs deploying; the auto-mode classifier has blocked deploys before. If CC can't deploy it, commit it and tell Brayden the exact command (`supabase functions deploy send-agent-invite --project-ref jjextitmbptoaolacocs`, JWT verification left ON). It also needs **new secrets**: `RESEND_API_KEY` and `INVITE_FROM_EMAIL` (a sender on a domain verified in Resend). Texting reuses the existing Twilio secrets and waits on P696's A2P approval. List exactly what Brayden has to do in the ship note, mirroring how P673/P696's blockers are written. Build and verify everything that doesn't depend on those.

### 3. Database (next free migration number; check the folder, P730 may have taken 134)

1. `alter table public.rep_invites add column if not exists invited_email text, add column if not exists invited_phone text, add column if not exists channel text check (channel in ('email','sms'));` An invite sent this way has `channel` set; admin-made invite links (the existing Users page flow) leave them null and behave exactly as today.
2. **Close the copy-the-link loophole.** Today `rep_invites_select` lets the creator read their own rows (tokens included) and `rep_invites_insert` lets any agent insert an `agent` invite (migration 072, role renamed by 107), so an agent could already mint and copy a link through the API. Replace them: **select = `public.is_admin()` only**, **insert = `public.is_admin()` only** (with `created_by = auth.uid()`), delete = admin only. The edge function inserts with the service role, which bypasses RLS. Grep for what used the old agent access: `useSentInvites` (`useProfiles.js`, My Calls Activity feed) and any Hierarchy `InvitePanel`; if something agent-facing breaks, remove that use rather than loosening the policy, and say what you removed in the ship note.
3. Nothing else: no change to `profiles`, no new table, no change to billing or the cap.

### 4. `claim-invite` (and the Join page)

- **No upline for these invites.** In `claim` (supabase/functions/claim-invite/index.ts), **skip the `profiles.upline_id` update when `invite.channel` is not null.** The invitee is a free-standing agent: `upline_id` stays null, so the inviter can't see their bookings and the hierarchy/visibility functions (`can_view_agent`, `upline_of`) are untouched. Admin-made invites keep today's behaviour (creator becomes upline). Add `channel, invited_email` to `fetchValidInvite`'s select. Comment why.
- **Email invites are locked to their address:** `check` additionally returns `{ valid, role, email }` where `email` is `invited_email` (null otherwise). `claim` rejects with 400 "This invite was sent to a different email address." if `invite.invited_email` is set and `email.trim().toLowerCase()` differs. `src/pages/Join.jsx` prefills that email and makes the field read-only when `check` returned one. SMS invites can't be matched to a phone; the token only ever goes to that number, single-use, and the form asks for the email as usual.
- Keep `check` revealing nothing about who sent it. The Join page copy doesn't name the inviter (no inviter name, no "team"). Leave the rest of Join as it is; a new agent still lands on the plan gate (`BillingGate`) after signing in, same as any new agent.
- Don't change expiry for admin links (7 days already), the 12-char token format or single-use marking.

### 5. Admin visibility (small)

Brayden wants to be able to see who brought someone in, nothing more. In `src/pages/admin/Users.jsx`'s pending-invite bar, show agent-sent invites as "Sent by <agent> to <phone/email>" with the **Copy button hidden** (the token is still readable by admin; it just isn't offered for these). Used invites keep `created_by` and `used_by`, so the "who invited whom" answer exists in the data; don't build a new view. No agent-facing list of sent invites.

### 6. Files and rules

- **New:** `src/components/shared/InviteAgentModal.jsx`, `supabase/functions/send-agent-invite/index.ts`, `supabase/migrations/<next>_agent_invites.sql`.
- **Edit:** `src/components/layout/AccountMenu.jsx` and its caller(s), `src/components/layout/Sidebar` (or wherever `onReport` is wired), `src/hooks/useProfiles.js` (a `useSendAgentInvite` mutation and `useInviteStatus` query; remove or neutralise `useSentInvites` if the policy change breaks it), `supabase/functions/claim-invite/index.ts`, `src/pages/Join.jsx`, `src/pages/admin/Users.jsx`.
- No new dependencies. Sentence case, existing tokens/classes. **Never send a real invite to a real person during testing**; mock `fetch` to Resend/Twilio. No test data left in production.

### 7. Verify and log

- `vite build` passes. Throwaway Vite harness with mocked hooks (as earlier prompts did), logged-in screens can't be seen:
  - account menu shows "Invite an agent" between the phone app and Report a problem for an agent, and not for an admin; works on the collapsed rail
  - pop-up: Text and Email tabs, validation, formatted phone, Send disabled until valid, sending state, sent screen with the right destination, "Invite another" resets, Escape/click-out close, error message shown
  - a channel reported unavailable: muted tab, "coming soon" note, Send disabled
  - copy audit: the rendered pop-up text contains no "team", "account" (outside the sent line) or "clients" wording beyond the approved strings
  - phone width and light mode
  - Join with an email-locked invite: email prefilled and read-only
  Delete the harness.
- Edge function logic with mocked Resend/Twilio/Supabase (Deno test or a Node shim): invalid input, non-agent caller, unavailable channel, rate limits (10/day, 3/destination), existing-account email, supersede, provider failure deletes the row and returns 502, success returns only `{ ok: true }`, token/link never in the response.
- `claim-invite`: an invite with `channel` set leaves `upline_id` null; an admin invite still sets it; email mismatch rejected.
- RLS: as an agent, `select`/`insert` on `rep_invites` returns nothing/denied (only if the migration is applied; otherwise state that it wasn't tested).
- Ship note in [[Memories]]. Say plainly it wasn't seen logged in, whether the migration was applied and the function deployed, and **exactly what Brayden still has to do** (Resend account and domain verification, `RESEND_API_KEY`, `INVITE_FROM_EMAIL`, deploy, and that texting stays "coming soon" until P696's A2P is approved and `recovery_config.sms_live` is on). Brayden checks: the menu row, the pop-up in both modes, that an unavailable channel says "coming soon", and that nothing shows or copies a link.
- Update `DESIGN.md`: Invite an agent is an account-menu pop-up; invites go by text/email only; invited agents have no upline and no tie to the inviter.

## Prompt 732 — "Needs attention" means the Needs attention tab only: fix the Overview box, No answer rows and drawer, the Change a booking search, and the Next call line

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from screenshots of the live portal. Sonnet 5.5 is enough** (agent UI plus one filter; no migration, no new hooks, no new dependencies). Queued after P731; nothing here touches P731's files.

**Why.** P723's Overview box "Needs your attention" fills from the **No answer** count, so Test Agent's Overview shows "3 Needs your attention" with a **Re-book** button on each, while in My Pipeline **Needs attention is 0** and those same three sit in **No answer**. The page and the box disagree. Brayden's rule: **No answer = Fulfillment is still working it, the agent has nothing to do** (if the client texts back wanting a change, the agent changes the booking, nothing more). **Needs attention = only the Needs attention tab** (P726's two groups: *Confirm the number* and *Call and rebook*). Four fixes follow from that, plus one small tidy-up.

### 1. Overview "Needs your attention" box follows the Needs attention tab

- **Rows** = exactly the clients where `tabOf(...) === 'needs'` (both groups), the same helper My Pipeline's tab uses. **A No answer client never appears here.** Find every place the Overview derives "needs attention" from the No answer count (the `AttentionCard` list, its count badge, the switch between the amber box and P723's "Up next" box, any pill or number in the hero) and move all of them to the needs count, so the Overview, the My Pipeline tab, the header pill and the sidebar badge always show the same number. `grep -n -i "noanswer\|no_answer\|needsAttention\|AttentionCard" src/pages/agent/Overview.jsx src/components/agent/*`.
- **Button on each row:** replace **Re-book** with a ghost pill **"Open"** + arrow (`ArrowRight`, `.ov-ghost`, same size as today's button). It goes to `/agent/clients?open=<id>&stage=needs` (My Pipeline, Needs attention tab, that client's drawer open). The whole row is clickable to the same place. **No re-book or confirm flow starts from the Overview any more**; it only takes the agent there.
- **Row text:** name, then "Carrier · <the phase line My Pipeline shows for that row>" using the same helper (e.g. "The number didn't connect", "Texts + retry, no reply"). No "1 try, last on Oct 1" unless that is what the My Pipeline row shows for it.
- **Intro line** under the title: "N to confirm · N to call. Open one to see what to do." (omit a part that is zero). The bottom button "Open in My Pipeline" stays and goes to `/agent/clients?stage=needs`.
- **Zero needs-attention clients:** the box falls back to the "Up next" box exactly as P723 built it. With today's Test Agent data (3 No answer, 0 Needs attention) the Overview should now show Up next, not the amber box.

### 2. My Pipeline: No answer rows become plain rows

- **No answer tab rows lose the Re-book button.** They end in the same chevron as Booked rows; the whole row opens the drawer as today.
- **The "Next try" column** currently says "Re-book a time, or Fulfillment tries again" with a refresh icon. That tells the agent to act. Change it for No answer rows to a neutral line: **"Fulfillment will try again"**, keeping whatever timing the row already knows (e.g. "Retry call today", "Text tomorrow morning"; use what the recovery phase provides, don't invent timings). `grep -rn -i "re-book a time" src/`; change only strings a No answer row shows. **Needs attention rows keep their wording and their Confirm number / Rebook buttons exactly as they are.**
- **Drawer for a No answer client:** the bottom button becomes **"Change this booking"** (pencil, same ghost button and same target as a Booked client's: `/agent/book?change=<id>`), replacing "Re-book a call". The Journey, status line and everything else in the drawer is unchanged. Keep the in-drawer re-book mover (`useMove`, `?rebook=1`) for **Needs attention** clients, which still use it; just don't offer it to No answer. A `?rebook=1` URL for a No answer client simply opens the drawer.

### 3. Book a call → Change a booking: only show what can be changed

Step 1's type-ahead (`ChangeBooking.jsx`) lists **only** clients that are:
- **Booked**,
- **No answer**, or
- **Needs attention → Call and rebook** (not *Confirm the number*).

Everything else is **not shown at all**, not greyed: Cancelled and Complete, "on a call right now", and Confirm the number (P730 currently shows those greyed with "Can't be changed" / "On a call right now" / "Confirm their number first"; remove those greyed rows and their captions from the list). Do the filter with the **same `tabOf` helper** the My Pipeline tabs use plus the Confirm-the-number check, so the two screens can never disagree about a client's status. If what the agent typed only matches hidden clients, show the existing "no match" line. Deep links (`?change=<id>`) to a client that can't be changed keep the explanation page P730 built. The server guards in `agent_change_booking` stay exactly as they are.

### 4. My Pipeline → Your pipeline → "Next Fulfillment call": name only

- The line under "Next Fulfillment call" shows **only the client's name** (one line, truncates with an ellipsis). Remove the time and anything else from that line. Keep the small date tile on the left as it is (Falcon's call: it's the row's icon, and the date is the one thing a name alone doesn't give; Brayden can say if he wants it gone). Everything else about the call (time, carrier, city) is what the drawer shows when he presses **Open**.
- **"Open" stays an "Open" ghost pill** but must be **vertically centred on the row** (it currently sits visibly higher than the text). Centre the row with `align-items: center`, same height for the pill, and measure: the pill's centre is within 1px of the centre of the tile and the text block, at 1920×930 and 1440×900, with a short and a very long name. No call coming up: unchanged ("No calls booked" + the Book a call pill).

### 5. Files and rules

Expect `src/pages/agent/Overview.jsx` (and wherever `AttentionCard` lives), `src/components/agent/AgentUI.jsx` (`PipelineList` No answer rows, `ClientDrawer` bottom button, `PipelineSummary` next-call row), `src/pages/agent/ChangeBooking.jsx`, `src/index.css`, `DESIGN.md` (add a "P732" line under v16 and fix any line that says the Overview box is No answer). No migration. Design tokens only; light mode must work. Don't touch Fulfillment, admin or P731's files.

### 6. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks (delete it, stop its server before deleting its folder, never commit), Playwright + local Chrome, dark and light, 1920×930 and 1440×900, and 390px:
  - **Overview:** 3 No answer + 0 Needs attention → Up next box, no amber box, no "Re-book" anywhere. 2 Confirm-the-number + 1 Call-and-rebook → amber box with 3, the intro "2 to confirm · 1 to call", each row's **Open** lands on `/agent/clients?open=<id>&stage=needs` with the drawer open on the Needs attention tab. No answer clients never appear in it.
  - The Overview count, My Pipeline's Needs attention tab count, the header pill and the sidebar badge agree in each of those states.
  - **My Pipeline:** No answer rows show a chevron and no button; the Next try column has no "Re-book a time"; opening one shows "Change this booking" at the bottom and it opens `/agent/book?change=<id>` with that client picked. A Needs attention client still shows its Confirm number / Rebook buttons and the in-drawer mover works as before.
  - **Change a booking:** with sample clients in every status, the search shows only Booked, No answer and Call-and-rebook clients. Cancelled, Complete, on-a-call-now and Confirm-the-number never appear, however the agent types them, and there are no greyed rows left in the list.
  - **Next call:** name only, centred Open pill (measure), long name truncates and never pushes the button.
  - `grep` the agent pages for "Re-book" and confirm the only places left are the Needs attention flow and its drawer.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in. Brayden checks as Test Agent: (1) Overview no longer shows the amber box for the 3 No answer clients; (2) in My Pipeline, No answer rows have an arrow and no Re-book button, and the drawer's bottom button says Change this booking; (3) Book a call → Change a booking: cancelled clients don't show up at all; (4) Next Fulfillment call shows just the name and the Open button is centred. **Test Agent has no Needs attention clients, so the amber Overview box can't be seen live until one exists** (CC: don't seed any; Brayden asked for none).
