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

## Prompt 751 — The pop-up phone: calling inside the portal (ring the client, ring the carrier, hold, swap, merge, keypad), then the result with proof of the cancellation

> **✅ APPROVED by Brayden 2026-10-11 (Eagle session):** "I think that is beautiful and needs to be queued next." **Port literally** (ignore `/_blob/` URLs):
> - `media/fulfillment-my-calls/phone.dc.html`: the panel, with a `stage` prop for its 5 states.
> - `media/fulfillment-my-calls/phone-stages.dc.html`: all 5 side by side.
> - `media/fulfillment-my-calls/phone-on-page.dc.html`: docked on My calls.
>
> **Run after P748, P749 and P750** (it lives in P748's page and drawer, and its result step feeds P750's change-a-result). **Run on Opus 5.5.** It touches Twilio Voice, a new edge function, one migration (columns + a flag) and the call actions.

### 0. Brayden's process (decided 2026-10-11)

1. At the booked time the rep **rings the client first** and explains: "I'm calling [carrier] with you. We may be on hold. You can stay on, or hang up and I'll call you back the moment someone answers."
2. The rep **rings the carrier**, works the phone menu with the keypad, and waits on hold.
3. When a person answers, the rep **brings the client in** (rings them back if they chose a call back) and **merges**: the client confirms who they are and asks to cancel.
4. The rep gets the **confirmation number**, the **effective date** and a "**no more payments will be drafted**" confirmation, then records the result.

Calling happens **in the portal** (the browser, with a headset), on desktop and on a phone's browser, "like Discord". **Show names, not numbers:** the client's name and the carrier's name. No numbers on the phone itself.

### 1. Calling engine (Twilio Voice, one conference per call)

- **Reuse the browser calling the repo already has:** `supabase/functions/twilio-token` (Voice access token; identity = the rep's auth id) and `@twilio/voice-sdk`.
- Add a **new** webhook function, `fulfillment-voice` (no JWT; validate the Twilio signature). **Don't change the pre-pivot `twilio-voice-webhook`** (it records and grades calls; this must not).
- **Model:** every call is **one Twilio Conference** named for the policy. The rep's browser joins it, and each outside party is a participant added through the REST API (a server function with JWT on and permission checks: the assigned rep or an admin, policy not done):
  - **Ring client:** add the client's number. Caller ID = the **agent's verified caller ID** when on, the same rule as `start-agent-caller-id-call`; otherwise Ohvara's Twilio number.
  - **Ring carrier:** add the carrier's `service_phone` from the carriers table. Caller ID = Ohvara's Twilio number.
  - **Hold / Resume:** participant `hold` with quiet music.
  - **Swap:** hold the active party and resume the other.
  - **Merge:** resume both.
  - **Keypad:** send DTMF to the carrier leg (phone menus).
  - **Mute:** mutes the rep's mic in the SDK.
  - **End:** hang up the shown party. **End all** ends the conference.
- **No recording.** Recording laws differ by state; Brayden turns it on later only after checking.
- **Status and timers come from Twilio callbacks** (participant join, leave, hold, ringing) to the function, so the panel shows real states. Starting the first leg runs the existing `fulfillment_start_call` (call goes live), so the timeline, counts and "On a call" stay right.
- **Off switch:** add `voice_live boolean default false` next to `recovery_config.sms_live` (admin-only update, like `sms_live`).
  - While it's off, **the panel opens in preview**: the same look, with the buttons disabled and a line saying "Calling in the portal turns on when Ohvara's phone number is approved". The existing **Call client** path (bridge or `tel:`) stays the way to call.
  - When it's on, **Call client** opens the phone.
- **Brayden does (put this in the ship note):**
  - create a Twilio **API Key** and a **TwiML App** whose Voice URL = `.../functions/v1/fulfillment-voice`
  - save secrets `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`, `TWILIO_TWIML_APP_SID` (check which already exist)
  - deploy the functions
  - turn `voice_live` on once the number is approved

  Calling needs a Twilio number, which still waits on the compliance profile (voice doesn't need the texting registration).

### 2. The panel (port `phone.dc.html`)

- A **360×640 panel docked at the bottom right**. It **stays across pages** while a call is up (mount it in the layout, not the page) and collapses to a slim pill with the chevron. On phones (<640) it's a full-screen sheet.
- Asks for mic permission the first time ("Allow your microphone to call from the portal").
- **Top:** the audio device ("Headset", opens a mic/speaker picker) and collapse.
- **Who you're talking to:**
  - round initials badge(s), the timer, the **name** (client name / carrier name)
  - a sub-line: "Client", "On hold" with animated bars, or "Merged · all three on" in green
  - when merged, both badges overlap and the name reads "{Client} & {Carrier}"
- **The other line** as a small bar at the top: "{name} · on hold 13:22" / "waiting for a call back".
- **Tip card** (glass, like iOS's "Hold this call?"), one at a time:
  - "Ready for the carrier?" → **Ring {carrier}**
  - "Someone picked up?" (on hold with the carrier while the client waits) → **Ring client**
  - "Both on the line" → **Merge**
- **Six round buttons:** Mute, Keypad, Hold / Ring carrier (Ring client when it's the client's turn), Swap, Merge, plus a red **End** (**End all** when merged). Swap and Merge are faded until there are two lines.
- **Background by state:** navy talking, amber on hold with the carrier, green merged.
- **The client's choice:** when the rep rings the carrier while the client is on, the client stays connected (on hold) by default. If the client chose a call back, the rep hangs up the client's leg; the panel remembers "waiting for a call back" and shows the Ring client tip.

### 3. The result (stage 5)

When the last leg ends (or the rep taps End all), the panel shows **How did it go?**

- **Cancelled** needs:
  - the **confirmation number** (stored in the existing `cancellation_confirmation`)
  - the **effective date** (new column `cancellation_effective_date date`; don't reuse `policies.effective_date`, which is the new policy's)
  - the **"No more payments will be drafted"** check (new `drafts_stopped boolean`)

  Then **Save** = the existing mark-cancelled path, with these fields.
- **No answer** = `fulfillment_end_call('no_answer')`, plus the optional reason picker.
- Under Save: "Picked the wrong one? Change it until the end of the day." This links to P750's Change result.
- The drawer shows the confirmation number and the effective date on a cancelled call.

### 4. Verify and log

- eslint clean, `vite build` passes.
- The Twilio functions are unit-tested with a mocked Twilio REST client: permission checks, conference and participant calls, the caller ID choice, signature validation, DTMF, hold/swap/merge.
- UI harness (P748 pattern, fake Voice SDK):
  - all 5 stages, the tip cards, faded buttons, the panel staying put across pages, collapse, the phone sheet
  - the result form's required fields and saving through the same mutations
  - preview mode while `voice_live` is off
- **No real calls.**
- Compare 1440 dark against `phone-stages.dc.html` and `phone-on-page.dc.html`.
- Ship note: "not tested with a real call (Twilio number pending)", plus the exact console steps and deploy commands for Brayden.
- Update `DESIGN.md`: the in-portal phone, its five states and the result proof.

**P751: Opus 5.5**


---

## Prompt 752 — Fulfillment gets the agent portal's header search (clients, carriers and pages, ⌘K / "/")

> **✅ ASKED FOR by Brayden 2026-10-11 (Eagle session):** "I want the fulfillment to have that same search bar in the header like the agent does." This is a small change, so no mockup. **Run after P748 and P749** (results open the P748 call drawer). **Run on Sonnet 5.5.** UI only.

### What changes

- `src/components/layout/DashboardLayout.jsx` (~line 283) shows `<GlobalSearch />` for the agent and admin roles only. **Show it for `fulfillment` too.** Same box, same width, same ⌘K / Ctrl K / "/" hotkeys, and the same phone icon that opens the full-screen sheet.
- `src/components/layout/GlobalSearch.jsx`: when `role === 'fulfillment'`:
  - **Rows:** `useFulfillmentQueue()` filtered to `assigned_fulfillment_id === profile.id` (not `useAgentBookings`). Admin is unchanged.
  - **Matching:** client name, phone, the carrier being cancelled, and the booking agent's name. Reuse `matchClients` with the agent name added for this role.
  - **Each result** shows the name, a Fulfillment status pill (`CALL_TONE` from `lib/fulfillmentDay.js`: Booked / On a call / No answer / Cancelled; no "Needs attention" or "Confirm number" wording), and a meta line:
    - "Call Sat, Oct 10 · 3:30 PM · Globe Life"
    - "On a call now · Globe Life"
    - "No answer · try 2 · next Mon 9:00 AM"
    - "Cancelled Oct 10 · Globe Life"
  - **Opening a client** goes to `/fulfillment/desk?open=<id>` (P748's drawer, on that call's day).
  - **"Go to"** lists the Fulfillment nav pages (Overview, My calls, Pipeline, Getting Paid, Messages, Settings).
  - **Placeholder:** "Search clients, carriers, pages".
- **My calls (P748):** remove the "Find a client" pill from the page header, because the header search replaces it. On the Fulfillment Pipeline, "/" stays with the page's own Find any client, the same as the agent's My Pipeline.
- **The agent and admin search must be unchanged** (before/after crops).

### Verify and log

- eslint clean, `vite build` passes.
- Harness:
  - search as a rep by name, phone, carrier and agent
  - the result opens the drawer on the right day
  - "Go to" pages work
  - ⌘K and "/" work, and "/" on Pipeline stays with the page
  - the sheet works at 390
  - the agent search is unchanged
- Ship note ("not seen logged in").
- **Brayden checks** as Test Fulfill: the search bar is in the header and finds a client.

**P752: Sonnet 5.5**


---

## Prompt 753 — "My pay" (was Getting Paid): this week's pay, hours by day, your shifts, payouts, and in-portal Payout settings on Stripe Connect

> **✅ APPROVED by Brayden 2026-10-11 (Eagle session):** "that is perfect, and that should be queued now." He wants reps to **receive money** (a bank account; PayPal later), with **all payout settings inside the portal**, "like we built for Manage billing on the agent side", not a jump to Stripe. **Port literally** (ignore `/_blob/`):
> - `media/fulfillment-my-calls/my-pay.dc.html`: the page. Its `connected` prop shows both payout card states.
> - `media/fulfillment-my-calls/payout-settings.dc.html`: the settings view. Its `editingBank` prop shows the replace form.
>
> **Run on Opus 5.5:** money moves. It adds one migration and edge functions. Run it after P748–P752 (it's independent, but keep the order).

### 1. Name and route

- Nav **"Getting Paid" → "My pay"**, with the wallet icon. Header **Work / My pay**, subtitle **"Your hours, what you've earned, and where it's paid"**.
- Route `/fulfillment/pay`. Keep `/fulfillment/getting-paid` as a redirect.
- **Payout settings** is the second view of the same route, `?settings=1`, with a **← My pay** back link (Manage billing's `BackBar` pattern).

### 2. My pay page (`my-pay.dc.html`), centered column of max 1060px

- **Hero** (`ov-hero` with the teal glow):
  - a "This week · Oct 5 – 11" chip and a This week / Last week switch
  - **"You've earned so far"** and the amount, big (= hours worked so far × rate, from the existing `useFulfillmentPay` / `lib/payPeriod` math; nothing new to clock)
  - the line **"{h}h {m}m × ${rate}/hr · {left} left on your schedule"**
  - a strip: **"Paid {Mon, Oct 12} to {Bank •••• 4821}"**, or "to your bank (add it below)" when none is set up
  - **Right side: "Hours by day":** Mon–Sun columns, each showing scheduled hours as a dashed outline filled up to the hours worked. Today is teal, the other days blue. "{N}h scheduled" sits on top.
  - If no shift or rate is set: "Brayden hasn't set your schedule yet" instead of the money.
- **Your shifts:** each day as a bar on an 8a–8p ruler, labelled "10a – 6p", with hours on the right. Today is teal, done days blue, days off read "Off". Under it, the note **"Something off? Message Brayden and he'll fix the week before it's paid."**
- **Get paid to** card:
  - **connected:** bank name, mono "•••• last4", a **Ready** pill, and "Payouts by Stripe" with a **Payout settings** link
  - **not set up:** an amber card with "Add where your pay should go. It takes about 3 minutes, and your bank details stay with Stripe, never on Ohvara.", a white **Connect a bank account** button (opens Payout settings, starting onboarding) and a dashed **"PayPal · coming later"**
  - **Stripe needs something** (verification due): amber **Action needed** with the reason and a button to the settings
- **Payouts** list:
  - date tile, week range, a sub-line ("To Chase •••• 4821" or "This week · after Brayden approves"), amount, and a status (Upcoming amber / Paid green / Failed red / On hold amber)
  - the header shows "$X paid this month"

### 3. Payout settings (`payout-settings.dc.html`), the Manage billing look (`SettingsCard`s, centered 820px)

All forms use **Stripe Connect embedded components** (`@stripe/connect-js` + `@stripe/react-connect-js`; an **Account Session** minted server-side for the signed-in rep only), styled with Stripe's Appearance options to match our tokens and placed **inside our cards**. Nothing opens a Stripe page, and bank and tax numbers never touch Ohvara. Only last 4 digits and status are stored.

1. **Payout account:**
   - shows the current external account plus a Default tag
   - **Replace bank account** opens the bank form inline (Stripe's fields, "Secured by Stripe")
   - **Use a debit card instead** is the card option
   - first-time setup runs Stripe's embedded onboarding (identity, bank, tax) in this card
2. **Payout schedule:** read-only. "Every Monday, for the week before (Mon to Sun) · after Brayden approves your hours · usually lands in 1–2 business days."
3. **Your details:** legal name, address, date of birth (masked) and a Verified / Action needed chip. **Update details** uses the embedded account-management component.
4. **Tax info:** W-9 status and masked taxpayer ID. **Update tax info** uses the embedded component. **Download 1099** is disabled until a form exists; use Stripe's tax-documents component if available, otherwise hide the button and flag it.
5. **Emails:** "Payout sent" and "Payout problem" switches, saved on the profile (new booleans, both default on).

- The footer line: "Bank and tax details are entered into Stripe's own secure fields inside this page. Ohvara only ever sees the last 4 digits."

### 4. Server side

- **Connect account:** reuse `profiles.stripe_account_id` / `stripe_onboarding_complete` (migration 049) and the existing `stripe-connect-onboard` function as the base (Express accounts).
  - New function `fulfillment-connect-session` (JWT on; a fulfillment rep for themselves only) creates the Account Session with the components above.
  - Store `payouts_enabled`, `requirements_due` and the external account's bank name and last4 from `account.updated` webhooks (extend the existing Stripe webhook; don't break `agent-billing`).
- **Pay weeks:** new table `fulfillment_payouts`:
  - columns: `rep_id`, `period_start`, `period_end`, `hours`, `rate_cents`, `amount_cents`, `status` (`upcoming` / `approved` / `paid` / `failed` / `held`), `stripe_transfer_id`, `paid_at`, `failure_reason`, timestamps
  - RLS: a rep reads their own; admin reads and writes all
  - one row per rep per week, created or updated from the schedule math (server-side; **never trust a client amount**)
- **Approve & pay** (admin): new function `fulfillment-pay-week` (admin only), modelled on `stripe-pay-commission`.
  - It recomputes hours × rate on the server, creates a Stripe **Transfer** to the rep's connected account, marks the row paid, and emails the rep through Resend (`invites@` sender) if they have "Payout sent" on.
  - Failures mark the row failed and send the "Payout problem" email.
  - For now, the minimal admin UI is an **Approve & pay** button per rep on the current Getting Paid team table (admin view unchanged otherwise; the Admin redesign comes next).
- **Off switch:** `payouts_live boolean default false` (admin-only flag, like `sms_live`).
  - While it's off, reps can still connect and fill out everything, but **Approve & pay is disabled** with "Turn on payouts when you're ready".
  - Brayden turns it on after he confirms how reps are classified. Stripe payouts suit 1099 contractors; W-2 employees need a payroll service instead.

### 5. Verify and log

- eslint clean, `vite build` passes.
- Unit tests with a mocked Stripe client: session minting is only for self, amount recomputation, transfer idempotency (one paid row per rep-week), failure path, admin-only checks, RLS via rolled-back DO blocks.
- UI harness:
  - My pay in connected / not set up / action needed states
  - the hours chart and shifts against the mockup numbers (30h × $15 = $450.00, 34h scheduled, 4h left)
  - Payout settings cards, with the embedded components mocked
  - the `/fulfillment/getting-paid` redirect
  - admin Approve & pay disabled while `payouts_live` is off
- **No real Stripe calls or transfers.**
- Ship note with Brayden's steps:
  - in Stripe, **enable Connect** (Express)
  - add the `account.updated` and transfer events to the webhook
  - deploy the new functions
  - after deciding contractor vs employee, flip `payouts_live`
- Update `DESIGN.md`.

**P753: Opus 5.5**


---

## Prompt 754 — Fulfillment reps can message Admin (the "Ohvara team" line in their Messages, like agents have)

> **✅ ASKED FOR by Brayden 2026-10-11 (Eagle session):** "I want the fulfillment to also have communications to admin … not just the agents. I also want them to be able to contact admin if need be." This is a small change with no mockup: it reuses the agent side's Admin line exactly. **Run on Opus 5.5** (it changes who may read and write message threads). One migration. It can run any time; place it after P753.

### The gap (Eagle checked)

The standing threads (migration 123, Prompt 701) are agent-centred: a thread is `(agent_id, peer_id)`, with `peer_id` = a Fulfillment rep or `NULL` for the Admin line. `can_dm_thread` allows:
- an agent their own threads
- a rep the threads where `peer_id = themselves`
- admin the `peer_id IS NULL` lines

So **a rep has no Admin line at all.** Their Messages list (screenshot) only shows agents.

### Change

- **Data:** let a Fulfillment rep own an Admin line the same way an agent does. The thread is `(agent_id = the rep's id, peer_id = NULL)`.
  - Update `can_dm_thread`:
    - a `fulfillment` user may read and write `(a = me, p is null)`
    - admin may read and write every `p is null` line, whether the owner is an agent or a rep
    - **reps still can't read other reps' or agents' Admin lines**, and admin still can't read agent↔rep lines
  - Update `my_standing_threads()` to return the rep's Admin line, and for admin to include reps' Admin lines.
  - Notifications on a new message work like the agent Admin line.
  - Rename nothing that breaks agent threads. If the column name `agent_id` gets confusing, add a comment rather than renaming it.
- **UI (`src/pages/Messages.jsx`):** for a rep, show the **Ohvara team** line **pinned at the top** of the list, exactly as an agent sees it: same avatar, the "Ohvara team" role line, and the sub "Admin · questions about your pay, schedule or anything else". Then the agent lines as today. For the rep's Admin line, the quick-start chips are "Question about my pay", "Schedule change", "Problem with a call".
- **Admin's inbox:** reps' lines show with the role chip **Fulfillment** and the rep's name, next to agents' Admin lines.
- The header subtitle for reps stays "Fulfillment and Admin, in one place" (it's now true).

### Verify and log

- Rolled-back DO blocks as rep A, rep B, an agent and admin:
  - rep A can read and write their own Admin line
  - rep B can't read rep A's
  - an agent can't read a rep's Admin line
  - admin can read and write it
  - agent↔rep and agent↔Admin behavior is unchanged
- UI harness: the rep sees the pinned Ohvara team line and can send; admin sees the rep's line labelled Fulfillment.
- Ship note ("not seen logged in"). **Brayden checks:** as Test Fulfill, message the Ohvara team; as admin, see it and reply.

**P754: Opus 5.5**


---
