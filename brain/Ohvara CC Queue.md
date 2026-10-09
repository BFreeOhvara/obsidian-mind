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

## Prompt 728 — Book a call: carrier search with live suggestions, the carrier's open hours set the bookable times (looked up once, then cached)

> **✅ REQUESTED by Brayden 2026-10-09 (Falcon session).** CC: build this. **Run on Opus 5.5** (migration, new edge function calling the Anthropic API with web search, changes the booking-window rule everywhere a call can be booked). Builds on top of P724 + P727 (do those first).

**Why.** The Fulfillment call is the 3-way cancellation call: the client, Fulfillment **and the carrier they're leaving** must all be on the line. So the bookable times are **whenever that carrier is open**, not 9-4 on the client's clock. Brayden: *"it's up to the carrier... if the carrier is using Pacific time, then everyone, even the East Coast, will have to abide by those times."* Times still **show in the client's local time** (P724 rule; the agent never sees or picks a zone).

**Brayden's flow, in his words:** *"they type in M and then carriers like Mutual of Omaha or Midland National pop up... not just from a list, just... literally almost every life insurance carrier... the more letters, it cuts more and more off... then we automatically pull that carrier's hours. If we checked it once, then we already have it on deck. If we never have, then we just check it... once we got their hours, then they can select a time."* No dropdown: nothing shows on an empty click.

### 1. Data (next free migration number)

- **Reuse the existing `carriers` table** (admin-write / everyone-read RLS, used by `useCarriers()` and Carrier Portals). Audit it first; don't make a second carrier table. Add nullable columns: `aliases text[]` (other names people say, e.g. "United of Omaha", "AIG", "American General"), `service_phone text`, `hours jsonb` (per weekday `{ mon: { open: "08:30", close: "16:30" } | null, ... }`), `hours_tz text` (IANA, US zones only), `hours_source_url text`, `hours_status text` (`verified` / `ai` / `fallback` / `pending`), `hours_checked_at timestamptz`. Keep `portal_url` and everything existing.
- **Seed the names: "almost every life insurance carrier".** Build a seed of **every US life insurer an agent or client would plausibly name**: the big brands, final expense / mortgage protection / burial carriers, and the legal-entity names behind them as aliases (aim for **at least 250 brands**; use NAIC / state DOI company lists and your own knowledge; life insurers only, no P&C or health-only). Names only; hours fill in lazily. Don't duplicate rows that already exist in `carriers`; merge into them.
- **Seed the 20 researched carriers with hours** from `brain/carrier-hours.md` in the vault: status `verified` for the 16 confirmed on the carrier's own page, `ai` for Prudential (third-party source) and Mutual of Omaha (zone inferred CT), and **leave State Farm, Corebridge and TruStage with no hours** (they get looked up live on first use like any other).
- **Policies:** keep the existing carrier text column the booking already writes; add `policies.carrier_id` (nullable FK to `carriers`) so a booking points at the row whose hours it used.

### 2. The carrier field (Book a call step 1, and the My Pipeline drawer's Move / Re-book)

- **Required now** (was optional). Label "Carrier they're leaving". A plain text input, **no dropdown and no list on focus or empty click**.
- From the **first letter** typed: a suggestion list (max 6) under the field, ranked: name starts with the text > a word in the name starts with it > alias match; case- and punctuation-insensitive ("mutual of o", "omaha", "aig" all work). The top match also shows as **inline ghost completion** after the cursor. Tab / → / Enter accepts; ↑ / ↓ move; Esc closes. Each typed letter narrows the list.
- If what they typed matches nothing, they can still keep it: a last row "Use "<text>"" (and Enter on no match does the same). That creates a `carriers` row (status `pending`) so it gets looked up and is suggested to everyone next time.
- Picking / confirming a carrier **triggers the hours fetch** (section 3). The day + time picker stays dimmed until **city + state AND the carrier's hours** are known (extend P724's dimmed state; copy: "Add the client's city, state and carrier first…").

### 3. Getting a carrier's hours: cached, else looked up once

New edge function **`carrier-hours`** (verify_jwt on; agents and admins may call it). Input: carrier id (or the new name).
1. **Cached:** if the row has `hours` and `hours_checked_at` is under **180 days** old, return it at once. (Most picks after the first week hit this path.)
2. **Not cached:** do a live lookup **once**, with a row-level lock / `pending` claim so two agents picking the same new carrier at the same time trigger only one lookup (the second waits for the first). Call the **Anthropic Messages API with the server-side web search tool** (use the cheapest current model that gets it right in your tests; start with Haiku 5.5, step up to Sonnet 5.5 only if Haiku misses), asking for the carrier's **existing-policyholder customer service line** for **individual life insurance**: phone, open/close per weekday, time zone, and the **URL it read them from**. Force a JSON answer and validate it: a real US IANA zone, times parse, at least one weekday open, close after open, a source URL present. Save it with status `ai`, `hours_checked_at = now()`.
3. **If the lookup fails** (timeout **20 s**, bad JSON, nothing found, validation fails): save a **fallback** window **Mon–Fri 9:00 AM–5:00 PM ET** with status `fallback`, so booking is never blocked, and the carrier shows in the admin list (section 5) to fix.
4. **DEMO_MODE:** this function must **not** be stubbed by `DEMO_MODE=true` (still on for the other AI functions). A stubbed answer would put fake hours in the cache. Give it its own switch `CARRIER_LOOKUP_LIVE` (default on); when off, it behaves as "lookup failed" → fallback. Add the cost line to `brain/costs.md` (a few cents per *new* carrier, once; cached after).
- While it runs, step 2 shows "Checking <Carrier>'s hours…" (skeleton slots). The agent can keep typing other fields.

### 4. Which times can be booked (replaces P724's 9:00–4:00 client-clock window)

- A slot (every 30 min, as now) is bookable only if, **at that instant**, the carrier is open **and** the call starts **at least 1 hour before the carrier closes** (Brayden picked 1 hour so a 3-way call with hold time isn't cut off). First slot = carrier open time.
- Converted to the **client's** local clock for display (P724). Example: Pacific Life (6:00 AM–5:00 PM PT) for a client in Florida (ET): slots 9:00 AM–7:00 PM ET.
- **Plus a client-courtesy guard:** never earlier than **8:00 AM** or later than **8:00 PM** on the **client's** clock, so an ET carrier opening at 8 AM doesn't offer a 5 AM slot to a California client. (Falcon added this; Brayden can drop it.)
- Days the carrier is closed (weekends for all 20 researched; Fri half-days like Midland National's 12:30 PM close) just have fewer or no slots. A day card with no slots left is disabled, plain gray, no caption (same P727 style).
- Still enforced unchanged: the 30-minute notice cutoff and no two open bookings at the same instant (P724/P727), and Fulfillment's own slot-free check where it already applies.
- Under step 2, one quiet line: "<Carrier> takes calls Mon–Fri 8:30 AM–4:30 PM CT · times shown are <City>'s local time." If status is `fallback`: "We couldn't find <Carrier>'s hours, so we're using 9–5 Eastern. Fulfillment will confirm."
- **The same rules apply in the My Pipeline drawer's Move / Re-book picker**, using the booking's carrier. An older booking with no carrier: the drawer asks for the carrier first (same field), then shows times.

### 5. Admin: carrier hours

On the existing admin Carriers / Carrier Portals screen, add columns: phone, hours (compact, e.g. "Mon–Fri 8:30–4:30 CT"), status chip (Verified / Found by AI / Fallback / Checking), source link, checked date. Admins can **edit hours by hand** (saves as `verified`) and **"Look up again"** (re-runs the function). A filter "Needs review" = `fallback` + `ai`. Agents never see this page.

### 6. Files and rules

- Expect `BookCall.jsx`, the shared `SlotGrid` / slot logic in `lib/scheduling.js`, `AgentUI.jsx` (new `CarrierInput`), the My Pipeline drawer, `useCarriers` (+ a `useCarrierHours` hook), the admin carriers page, a new migration, the new `supabase/functions/carrier-hours`, `brain/costs.md`, `DESIGN.md`. Design tokens only; light mode; phones (the suggestion list is full width, 44px rows; no horizontal scroll at 390px).
- Never log or print the Anthropic key. Deploy the function with the project's usual command; if the CC classifier denies the deploy, surface it as a blocker for Brayden (same as 673).

### 7. Verify and log

- `vite build` + eslint clean. **Lookup quality check (real, not mocked):** run `carrier-hours` live against the 3 unknowns (State Farm, Corebridge, TruStage) plus 5 final-expense carriers not in the 20 (e.g. Aetna/CVS final expense, Foresters, Royal Neighbors of America, Colonial Penn, Gerber Life). Paste the results (hours, zone, source URL) into the ship note and **spot-check every one against its source page**. If more than 1 in 8 is wrong, stop and flag it to Brayden before turning the live lookup on.
- Throwaway harness (mocked hooks + mocked function, frozen clock; delete after): typing "m" shows Mutual of Omaha / Midland National / MassMutual…, more letters narrow it, ghost completion + Tab, nothing on empty focus, "Use "<text>"" creates a pending carrier; cached carrier = instant slots; uncached = "Checking…" then slots; fallback line; Pacific Life + Florida client = 9:00 AM–7:00 PM ET with the last start 1 h before close; an ET carrier + California client starts at 8:00 AM PT (courtesy guard); Midland National Friday ends 11:30 AM CT; weekend disabled; 30-min cutoff and same-instant blocking still work; drawer Move / Re-book with and without a carrier; admin edit + "Look up again"; dark, light, 390px.
- Ship note in [[Memories]]: say plainly what was and wasn't seen logged in, whether the migration was applied and the function deployed, and the lookup quality results. Update the P724 line in [[DESIGN]]. Brayden checks: (1) type "m" in the carrier box and see carriers pop up; (2) pick one we researched and the times appear at once in the client's time; (3) pick one we didn't, see "Checking…", then times; (4) the last slot is an hour before the carrier closes.
