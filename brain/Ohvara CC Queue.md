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

## Prompt 726 — My Pipeline layout: two equal boxes on the left, statuses on top of one fixed list box, "Needs you" becomes "Needs attention", no more page twitch

> **✅ APPROVED by Brayden 2026-10-09 (Falcon session): "Perfect. I love that. So now let's cue that for CC."** CC: build this. **Sonnet 5.5 is enough** (agent UI only, built from an approved mockup; no migration, no data changes).

**Reference mockup (source of truth for sizes, colours, spacing):** `media/p726-my-pipeline-layout/mockup-dark.html` in the vault. It's interactive: click the status tabs; the dashed "Mockup only" toggle in the corner empties Needs attention to show the empty state (that toggle is **not** part of the build). `mockup-v1-not-used.html` beside it is the rejected first try; ignore it. Static with **sample data**: every name, city, carrier, time and count is made up. The sidebar and header are P722 context; build only the page body (plus the copy changes in section 5). Fonts fall back offline; the real build uses Space Grotesk and Manrope. No light or phone mockup: derive light from the existing v16 light tokens, and phone from P717's phone behaviour (section 4).

**What this is.** `/agent/clients` (`Clients.jsx` + the P717 components in `AgentUI.jsx`) gets a new layout. Same data, same hooks, same mutations, same drawer, same URL params (`open`, `rebook`, `stage`, `range`), same admin branch. Brayden's three problems, in his words:
1. *"Needs you"* should be **"Needs attention"**, and it has two kinds: the agent has to **confirm the number**, or has to **call and rebook** the client on their own time.
2. **The page twitches** when switching statuses: the list box's height follows the number of rows, so the page scrollbar appears and disappears and everything jumps sideways (e.g. empty Needs you → Cancelled). Every status has to sit still.
3. He likes the bar and the status picker, but the page wastes the sides, and "Find any client" was too big for what it does. He wants **two identical-size boxes stacked on the left** and **the statuses on top of the box the clients are in**.

### 1. Desktop layout (≥ 1280px)

- Page body is a grid: `grid-template-columns: 400px minmax(0, 1fr)`, gap 20px, `max-width: 1680px`, centred. It **fills the height under the header and the page itself never scrolls** at this width. Do it with flex/grid height (`height: 100%` chain or `100dvh` minus the header from a single shared CSS variable), **not** a hard-coded pixel offset; Memories line ~813 records the last time a hard-coded 160px offset brought a page scrollbar back. If the viewport is too short for the content (under ~720px tall), let the page scroll normally rather than squashing.
- **Left column:** two boxes with `grid-template-rows: 1fr 1fr`, gap 16px, so they are **always exactly the same height** whatever the data. Each box clips its own overflow; nothing in them may push the column taller.
  - **Find any client** (the existing `ClientSearch` hero, restyled smaller as in the mockup): title 24px, the one-line subtitle, the search field (50px tall, placeholder "Name, phone, city or carrier", "/" focuses it as today; the results dropdown is unchanged). City now matches too (P724 added `client_city`). Under it, **"Recently booked"**: the agent's 3 most recently created bookings (any status, newest first, from the rows `useAgentBookings` already loads), each a row with the avatar in its status colour, name, "City, ST · Carrier" (just the carrier if no city) and a status pill. Clicking one opens that client exactly like a search pick does (`?open=<id>&stage=<tab>`). If the agent has no bookings, show "Nobody booked yet" with a Book a call link instead of the list.
  - **Your pipeline** (`PipelineTabs`'s summary part): "Your pipeline", the big total + "· N cancelled", the range switch (This week / This month / All time, unchanged behaviour), the proportional bar (unchanged), then **a 2×2 grid of small tiles**, one per status: dot + name, count, and its share of the total as a % (0% when the total is 0; round so it reads cleanly). At the bottom, separated by a hairline: **"Next Fulfillment call"**: the soonest booked call still in the future (same rule as P723's `ComingUpCard`: `stageOf === 'booked'` and a future `scheduled_call_at`), as a date tile + "Name · time" (client time zone, P724's `callWhen`/`tz` rules) and an "Open" link to that client. If there isn't one: "No calls booked" + a Book a call link. The range switch changes the total, bar and tiles as it changes the counts today; the next call ignores the range.
- **Right column: one list box** filling the full height.
  - **Top of the box: the four status tabs in a row** (`grid-template-columns: repeat(4, 1fr)`, gap 10px, 16px padding, hairline under them). Same look and behaviour as P717's tabs: dot, name, sub-line, count; selected = status tint gradient + edge border + name in the status colour; a zero count is dimmed; arrow keys move between them; `?stage=` still wins on load; the page still opens on Booked. Sub-lines: Booked "Waiting for Fulfillment", No answer "Fulfillment will try again", Needs attention "**N to confirm · N to call**" (or "All caught up" at 0), Cancelled "Old policy cancelled".
  - **Under the tabs: the list for the selected tab**, in a body that **scrolls inside the box** (`overflow-y: auto`, `scrollbar-gutter: stable`, thin scrollbar as in the mockup) with the column header row sticky at the top of that scroll area. The box never changes size when the tab or the number of rows changes.
  - **Columns** (5-column grid, `minmax(0,1.5fr) minmax(0,1fr) 210px minmax(0,1fr) 150px`): keep each tab's current data and wording from P717 + P724 (client with "📍 City, ST · phone", carrier, the date tile + client-time call, status text, the chevron or action). The mockup's column titles are the guide: Booked "Client / Carrier they're leaving / Fulfillment call / Status"; No answer "Client / Carrier they're leaving / Next try / Status" (use whatever the No answer rows show today for the next try / recovery phase; don't invent data); Cancelled "Client / Carrier cancelled / Cancelled / Status". The separate "Booked · Waiting for Fulfillment · 5 clients" heading above the old list goes away (the selected tab says it).
  - Cancelled paging ("Show N more") stays as is, inside the scroll area.
  - **Empty states** sit centred in the same box (it does not shrink). Needs attention empty: green check tile, **"Nothing needs your attention"**, "When a number needs confirming or a client needs a call from you, they'll show up here." Other tabs keep their current empty copy, centred the same way.
- The client drawer, scrim, reschedule / re-book / confirm-number flows inside it are unchanged.

### 2. Needs attention: two groups inside the list

The Needs attention tab shows its rows in **two groups**, each with a small header band (amber 3.5% tint, 30px amber icon tile, bold title + count in amber, one grey line under it). Only show a group that has rows.

1. **Confirm the number** (phone icon). Line: "Fulfillment couldn't get through. Check the number with the client and it goes back to No answer for more tries." Rows: the P696 recovery phase `number_check`. Column 3 "What happened" = the existing phase text for it (e.g. "The number didn't connect"). Action: the existing **Confirm number** button (solid amber), same handler as today.
2. **Call and rebook** (calendar icon). Line: "Texts and a retry call didn't reach them. Call them on your own time and book a new call." Rows: **everything else that lands on the needs tab today** (`tabOf(...) === 'needs'`, i.e. `call_directly` plus any non-recovery rows that already sit there for opted-out agents). Column 3 = the existing phase / reason text. Action: the existing **Rebook** button (amber ghost style), same handler as today (opens the drawer with `rebook=1`).

The column header row for this tab reads "Client / Carrier they're leaving / What happened". No change to how a client moves between statuses; this is only how the tab is shown. If the mapping of rows to the two groups isn't as clean as above in the real code, pick the closest honest split and note it in the ship log.

### 3. Stop the twitch on every page

Add `scrollbar-gutter: stable` to whichever element is the app's page scroller (check whether that's `html` or DashboardLayout's main; put it on that one only so there's no double gutter). Check it on a page that scrolls (Activity) and one that doesn't (Overview): no sideways shift between them, and no visible empty strip in either theme. That fixes the jump on every page, not just this one.

### 4. Narrower screens

- **1024–1279px:** the two left boxes sit side by side in a row above the list box (`grid-template-columns: 1fr 1fr`, same equal height), the list box below them; the page scrolls normally here (the list doesn't need its own scroll). Tabs stay 4 across if they fit, else 2×2 (P717's rule).
- **Below 1024px / phones:** keep P717's behaviour: stacked boxes, the tabs as scrolling chips (44px touch targets), rows as stacked cards, the drawer as a full-screen sheet. Recently booked shows 3 rows; the 2×2 tiles stay 2×2. No horizontal scroll at 390px.

### 5. "Needs you" → "Needs attention" everywhere an agent sees it

`grep -rn -i "need you\|needs you" src/` and change every **agent-facing** string: My Pipeline tab + empty state, the P722 header pill ("3 need you" → "3 need attention", "1 needs attention"), the sidebar badge's tooltip / aria-label, global search status pill / meta, the drawer's status pill / note, the Overview box if any copy still says "need you" (P723's box already reads "Needs your attention"; leave that). Keep the internal key `needs` and every `?stage=` value (`needs`, `needsAttention`, `confirmNumber`) working. Don't touch Fulfillment or admin wording unless it's the same shared string. Update [[DESIGN]] v16's P717 line (the label and the new layout) and add a "P726 — My Pipeline layout" line.

### 6. Files and rules

- Expect `src/pages/agent/Clients.jsx`, `src/components/agent/AgentUI.jsx` (`ClientSearch`, `PipelineTabs`, `StatusList`, new small pieces for Recently booked / status tiles / next call / the needs groups), `src/lib/agentBookings.js` (labels), `src/index.css`, the header/search/sidebar files for the copy only, `DashboardLayout.jsx` only if the height chain or the scrollbar-gutter needs it. No migration, no new hooks, no new dependencies.
- Design tokens only (no hard-coded colours outside the existing `--ov-*` / status tokens; add tokens if one is missing). Light mode must work.
- Don't touch Fulfillment's Pipeline page or `Pipeline.jsx`.

### 7. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks and sample rows (delete it, never commit), Playwright + local Chrome:
  - 1920×930 and 1440×900, dark and light: click every tab, including an **empty** Needs attention, and **measure that the list box's and the left boxes' bounding rects don't change by a single pixel** and that the page has no scrollbar. Both left boxes the same height (measure).
  - A long Booked list (20+ rows): scrolls inside the box, header row stays put, the page doesn't scroll.
  - Needs attention with both groups, only one group, and none.
  - 1100px (two left boxes side by side) and 390px phone (no horizontal scroll, chips, cards, sheet).
  - Recently booked click and the Next call "Open" land on the right client's drawer and tab; empty versions of both.
  - The scrollbar-gutter check from section 3.
  - `grep` the rendered agent pages for "need you" / "Needs you": zero hits.
- Ship note in [[Memories]]: say plainly it wasn't seen logged in. Brayden checks: (1) switching between every status on My Pipeline, nothing on the page moves; (2) the two left boxes are the same size; (3) Needs attention shows "Confirm the number" and "Call and rebook" with the right buttons; (4) a long list scrolls inside the box; (5) no "Needs you" anywhere; (6) dark, light and his phone.
