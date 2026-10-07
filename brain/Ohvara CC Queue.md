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

## Prompt 714 — Agent Overview redesign (pilot for the portal-wide visual upgrade)

> **⏸ HOLD — waiting on Brayden's sign-off on the mockup (Eagle, 2026-10-06). CC: skip this item until this line is removed.** Mockup is on Brayden's Claude account ("Ohvara Overview Redesign" design canvas: dark, light, phone, with a tweak for the zero state). Static copies CC can read are in the vault at `media/p714-overview-redesign/mockup-dark.html`, `mockup-light.html`, `mockup-phone.html`. If Brayden asks for changes, Eagle edits this spec and the mockup files before lifting the hold.

**What this is.** A visual-quality pass on `/agent` (`src/pages/agent/Overview.jsx`), plus five content/layout changes Brayden asked for by name. Brayden's read of the current page: "bland, plain, outdated, thrown together." He wants it to look like a premium product: bigger and calmer type, more space, clear hierarchy, less on the page. This page is the pilot; if it lands, the same language rolls out to the rest of the portal in later prompts. **Do not roll it out anywhere else in this prompt.**

**What Eagle checked before writing this (so CC doesn't have to re-derive it):**
- Looked at the live page as Test Agent in both themes, and read `Overview.jsx`, `AgentUI.jsx`, `LiveClock.jsx`, `exportStyles.js`, `index.css`, `agentBookings.js`, `DashboardLayout.jsx` at `ohvara-dashboard` `d2d8fc4`.
- Compared against Restorix's `src/pages/Overview.jsx` (`restorix-portal` `ed5654e`). Restorix is **not** a higher bar here: Ohvara's current page is already a port of Restorix's closer Overview (eyebrow tile over a number, accent-filled clock chip). Matching Restorix more closely would change nothing. This design is new, built from Ohvara's existing tokens.
- `StatTile`, `StatGrid` and `LiveClock` are shared with `src/pages/fulfillment/Overview.jsx`. **Leave all three untouched.** New pieces are new exports.

### 1. Files

- `src/pages/agent/Overview.jsx` — rewrite the render, trim the now-unused data.
- `src/components/agent/AgentUI.jsx` — add two new exports, `MetricCard` and `AttentionCard`. Do not edit `StatTile` / `StatGrid`.
- `src/components/ui/DayClock.jsx` — new. Do not edit `LiveClock`.
- No migration, no new dependencies, no new colour tokens, no new fonts. Every colour is an existing `var(--…)` from `src/index.css`; no hex in JSX. Fonts are the three already loaded (`DISPLAY` Space Grotesk, Manrope body, `MONO` JetBrains Mono for every number).
- Inline styles can't carry breakpoints. For the responsive values below use Tailwind classes (arbitrary values are fine) or a small block of `.ov-*` classes in `index.css` — CC's call, whichever is cleaner.

### 2. Brayden's five changes (execute as given)

1. **"No answer" tile becomes "Needs your attention"** — an action prompt, not a bare metric. Spec in section 5. The count is still `g.noAnswer`; only the framing changes.
2. **Remove the "With Fulfillment" tile.**
3. **Keep "Booked this week" and "Cancelled this week"** — same numbers, same sub-lines ("since Monday", "old policy confirmed cancelled"), same click destinations (`/agent/clients?range=week&stage=all` and `/agent/clients?stage=cancelled`).
4. **Remove the whole "Your calls" section** — the `SectionHead`, the "All my clients" button, the `ListCard` and its empty state. Drop what that leaves unused: `upcoming`, `UPCOMING_LIMIT`, `open()`, the `waiting` / `inProgress` counts, and the `SectionHead`, `ListCard`, `GroupRow`, `ClientRow`, `EmptyNote`, `ghostBtn`, `ArrowRight`-for-that-button imports if nothing else uses them. `todays` stays (the sub-line under the greeting reads it). `live` stays (the live-call banner reads it).
5. **Header swap** — date and time move to the top-right, where "Book a call" sits now, and get much bigger. "Book a call" moves to its own row directly under them.

### 3. Header

Two columns on one row, top-aligned, `justify-content: space-between`, 32px gap, wrapping allowed.

**Left: greeting.**
- Make it a real `<h1>` (it's a `<p>` today), with inline style overriding the base `h1` rule: `DISPLAY`, weight 500, `font-size: clamp(32px, 3.4vw, 44px)`, `line-height: 1.08`, `letter-spacing: -0.03em`, `var(--text-primary)`, margin 0. Same text logic as now ("Good morning / afternoon / evening, {first name}").
- Sub-line: 17px (15px below `sm`), `var(--text-secondary)`, 12px above it. Same three strings as now ("Loading your calls…", "N call(s) on the books today.", "Nothing on the books today yet.").

**Right: `DayClock`, then "Book a call" under it.** A column, right-aligned (`align-items: flex-end`), 20px gap.
- `DayClock` (new component, props `timezone`, `compact`). Same 1-second tick and the same `formatInTimezone` / `DEFAULT_TIMEZONE` handling as `LiveClock`. It renders two lines, right-aligned:
  - Date as an eyebrow: `TUESDAY · OCT 6` (weekday long, month short, day; middle dot between weekday and date). Use the existing `eyebrow` style at 12px. Date uses the same timezone as the time.
  - Time: `MONO`, 44px, weight 500, `line-height: 1`, `letter-spacing: -0.04em`, `var(--text-primary)`, tabular numerals, 6px under the date. The AM/PM is its own span: 16px, `letter-spacing: 0.06em`, `var(--text-secondary)`, 8px to the right of the digits, baseline-aligned.
  - **No filled accent chip.** The blue box around the time is gone on this page; the time is plain large text.
- "Book a call": `primaryBtn`, but 44px tall, `padding: 0 22px`, 15px text, `CalendarPlus` at 17. Same `navigate('/agent/book')`.

**Below `sm` (phones):** one column, in this order, 20px apart:
1. `DayClock compact` — a single eyebrow line, `TUESDAY · OCT 6 / 10:47 PM`, 12px, the slash in `var(--text-muted)` and the time in `var(--text-primary)`. (Today the date and clock are hidden on phones. Showing them as one quiet line is Eagle's call; say so in the ship note.)
2. Greeting (32px) and sub-line.
3. "Book a call" at full width, 50px tall, 16px text.

**Spacing:** 56px between the header block and the cards at `md` and up (28px on phones). `main` already has 32px top padding; add 24px above the header at `md+` so the greeting sits 56px under the top bar.

### 4. The two metric cards (`MetricCard`)

Props: `label`, `value`, `sub`, `onClick`.

- Element: a real `<button type="button">` (the current tile is a clickable `div`, which the keyboard can't reach). Reset it: `text-align: left`, `width: 100%`, `font: inherit`.
- Surface: `var(--bg-surface)`, `var(--border-w) solid var(--border)`, radius 16. No fill tint, no shadow, no gradient.
- Layout: flex column, `justify-content: space-between`, `min-height: 208px`, padding `24px 28px 26px`.
  - Top row (`min-height: 36px`, so all three cards' top rows line up with the Review button in section 5): the label in the existing `eyebrow` style on the left, and `ArrowUpRight` at 16 in `var(--text-muted)` on the right as the "this opens something" cue.
  - Bottom block: the number, then the sub-line.
    - Number: `MONO`, **64px**, weight 500, `line-height: 1`, `letter-spacing: -0.04em`, `var(--text-primary)`, tabular numerals. Loading shows `—` as now.
    - Sub-line: 14px, `var(--text-secondary)`, 10px under the number.
- Hover: border goes to `var(--border-hover)` over 120ms. Nothing else moves. Focus-visible: 2px `var(--accent)` outline, 2px offset.
- Phones (below `lg`): padding `16px 18px 18px`, no `min-height`, `justify-content: flex-start` with a 22px gap (so the two numbers line up even when one sub-line wraps), number 44px, sub-line 12.5px, label 10px with `letter-spacing: 0.08em` and `white-space: nowrap`, no arrow icon.

### 5. "Needs your attention" (`AttentionCard`)

Props: `count`, `loading`, `onReview`. Same surface, radius, padding and min-height as `MetricCard`. Three states.

**`count > 0` — something to do.**
- Border is `var(--warning-bd)`. **The fill stays `var(--bg-surface)`** — today's whole-tile amber tint goes away. The amber lives in the dot, the label and the number only.
- Top row: an 8px round dot in `var(--warning)`, then the eyebrow label "Needs your attention" in `var(--warning)`, then, pushed to the right, a **Review** button: `ghostBtn` shape (36px tall, pill, `var(--bg-elevated)` fill, `var(--border-strong)` border, `var(--text-primary)` text, 13px / 600) with `ArrowRight` at 15. On phones it is 44px tall.
- Bottom block:
  - One row, baseline-aligned, 14px gap: the count (`MONO`, 64px, same metrics as the metric cards, colour `var(--warning)`), then the headline at 18px / 600 in `var(--text-primary)`: **"client didn't pick up"** when the count is 1, **"clients didn't pick up"** otherwise. Read together it says "3 clients didn't pick up."
  - Under it, 10px down, 14px in `var(--text-secondary)`: **"Re-book a time, or Fulfillment will try again."** (This is the wording My Pipeline's detail panel already uses for a plain no-answer.)
- Review, and a click anywhere on the card, both go where the old tile went: `navigate('/agent/clients?stage=noAnswer')`.
- Phones: number 52px, headline 17px, padding `18px 18px 20px`.

**`count === 0` — nothing to do.** Border back to `var(--border)`. Dot in `var(--success)`. Label in the normal eyebrow colour. No number and no button. In their place: **"You're all caught up"** in `DISPLAY`, 26px / 500, `letter-spacing: -0.02em`, `var(--text-primary)`; under it, 14px `var(--text-secondary)`: **"Nothing needs you right now."** Not clickable.

**`loading`.** Neutral border, normal eyebrow colour, no dot, `—` where the number goes, no headline, no button.

### 6. Card grid

- `lg` and up: three equal columns, 20px gap. Order: Booked this week, Cancelled this week, Needs your attention.
- Below `lg`: the two metric cards side by side (two equal columns, 12px gap) and the attention card full width underneath.

### 7. What does not change

- The live-call banner ("Fulfillment is on a call with … right now.") stays exactly as it is, in the same place: after the cards, only when `g.live.length > 0`.
- All data hooks, counts and week maths. `DashboardLayout`'s top bar ("Overview · Your day at a glance") and the sidebar.
- Every other page. `StatTile`, `StatGrid`, `LiveClock`, the fulfillment Overview.
- No new information on the page. No client names, no lists, no charts, no extra copy beyond the strings above.

### 8. Guardrails (the things that made the old page read as generic)

- No shadows, no gradients, no glass, no card lift on hover, no left-border accent bars, no icon badges in coloured circles.
- No colour that isn't an existing token, and status colours only on the attention card.
- Don't tighten the spacing to "fill" the page. With "Your calls" gone the page is short on a desktop, and that is intended; the empty space below the cards stays empty.
- The mockup's hex values are copies of the tokens for preview only. Build with the `var(--…)` names.

### 9. One thing to report, not fix

`g.noAnswer` counts every lead `stageOf()` calls No answer. My Pipeline's "No answer" pill filters with `agentStageOf()`, which moves some of those leads into "Confirm number" and "Needs attention". So once P696 texting is live, the card can say 3 while the list it opens shows fewer. That mismatch exists today on the old tile. **Don't change it here** — note in the ship note whether Test Agent's count and the list agree, so Brayden can decide later whether this card should count only the leads the agent has to act on.

### 10. Verify and log

- `vite build` passes; eslint clean on the touched files.
- Check by reading the result against `media/p714-overview-redesign/mockup-*.html`: sizes, spacing, order, both themes' tokens, the three attention states, the `lg` and `sm` breakpoints.
- CC can't log in as an agent, so say plainly in the ship note that it was not seen in a browser. Brayden checks `/agent` as Test Agent in dark, light and on his phone.
- Ship note in [[Memories]]: commit, what was removed, the phone date/time call, the section 9 answer, and a short "Overview pilot (P714)" entry in `DESIGN.md` recording the type scale used here (44px display greeting, 44px mono clock, 64px mono card numbers, 208px cards, 56px section gap) so the later portal-wide rollout has one place to read it from.
