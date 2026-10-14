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

---

---

---

## Prompt 764 — Fulfillment pay per verified cancel: record calls, AI checks each cancel, new My pay

**What changes and why.** Fulfillment reps are no longer paid by the hour. Brayden decided (Oct 14): a flat **$10 per verified cancel**, paid **weekly on Monday**, no hours, no schedule. A cancel is "verified" when the **call recording** shows the carrier confirming the cancellation. AI listens to every cancel call. Anything it can't confirm goes to Brayden as **Needs a listen**. The client is never asked to confirm anything, and the rep does **not** need a confirmation number. This prompt builds the pay engine, the recording and AI check, and the new rep **My pay** page. The admin Payouts page is redesigned in the next prompt (P765), so here it only has to keep working.

**Mockups (copy exactly):** `media/fulfillment-pay-per-cancel/my-pay-per-cancel.dc.html` (My pay; Tweaks: bank connected, weekly minimum), `phone.dc.html` (pop-up phone component: Recording pill, Result screen) and `phone-recorded-stages.dc.html` (the two stages in context). Same container width as the rep Overview, v16 backdrop, like the other Fulfillment pages.

### 1. Record every fulfillment call (behind a new switch)
- P751 runs each call as one Twilio Conference (`fulfillment-voice`, `fulfillment-call`). Record the conference from the start, every leg mixed.
- Play a short recording notice at the start of each leg (client and carrier). Make the wording an admin setting. Default: "This call may be recorded."
- New admin switch **`recording_live`** (default **off**), in the same place as `voice_live`. With it off, nothing is recorded and no notice plays. Brayden turns it on only after he has checked the consent rules for his states.
- Store recordings in a new table (call, policy, rep, Twilio recording SID, duration, created). Recordings stay at Twilio. Playback goes through an admin-only edge function that streams the audio with Twilio auth. Never store or return a public recording URL. Reps and agents can't list or play recordings.
- Pop-up phone: show the red **Recording** pill while a recorded call is live (see mockup), and no pill when `recording_live` is off.

### 2. One row per cancel
- When a rep saves the result **Cancelled** (`fulfillment_end_call` / `fulfillment_correct_result`), create one row in a new `fulfillment_cancels` table, one per policy. It holds rep, policy, client, carrier, agent, logged time, the pay amount copied from the current rate, and a status.
- Status starts **`checking`** if the call has a recording, or **`needs_listen`** (reason: no recording) if it doesn't.
- If the result is changed away from Cancelled before the cancel is paid, mark the row **void**, never delete it. Once a cancel is paid, the result can't silently remove it. Show that the change needs Brayden.
- The confirmation-number field on the Result screen stays, but labelled **(optional)**. It is never required, and saving without it is fine.

### 3. AI checks the recording
- New edge function, triggered by Twilio's recording-status callback once the recording is ready. Verify the Twilio signature.
- Turn the audio into text with a speech-to-text API. Pick one with a simple HTTP API and timestamps, and say which in your notes. Its key is a new secret that Brayden adds.
- Send the transcript to the **Claude API** (new secret `ANTHROPIC_API_KEY`) along with the carrier name, client name and policy. Ask one question: *did the carrier confirm that this client's policy is being cancelled?* Ask for strict JSON: `{ "confirmed": true|false, "quote": "...", "at_seconds": n, "reason": "..." }`.
- `confirmed: true` with a quote leads to **`verified`**. Save the quote and the time. Anything else, including errors, timeouts, an empty transcript or JSON that can't be read, leads to **`needs_listen`** with the reason and a best-guess time. **The AI can only ever verify or send to Brayden. It must never mark a cancel as not paid.**
- Retry a failed AI or speech-to-text call a few times, then fall back to `needs_listen`. Store transcripts admin-only.

### 4. Decisions (server side, admin UI comes in P765)
- `fulfillment_decide_cancel(cancel_id, pay boolean, note)`: admin only. It sets **`verified_by_admin`** or **`not_paid`**, with who, when and the note in an append-only audit.
- `agent_flag_cancel(cancel_id, reason)`: only the agent who owns that client, within 2 days of logging, and only if the cancel isn't paid. It moves the cancel to `needs_listen` (reason: agent flag) even if it was verified. Add the RPC now. Its agent-side button comes later, so leave a note in Memories.
- Every rule is enforced in the database, not just hidden in the UI. Reps can't change their own cancel status.

### 5. Pay
- Retire hours as the basis of pay. Leave the shift and hour-fix tables and data in place (don't drop anything). They just stop feeding pay.
- New pay setting: **Pay per cancel** (default **$10.00**). Replace the hourly-rate field in Settings → Fulfillment pay. A change applies to cancels logged after it, because each cancel keeps its own amount.
- Optional **Weekly minimum**: default off, empty. When it's set, a rep with at least one verified cancel that week gets at least that amount.
- Payout amount = the sum of the cancels it pays. A cancel is paid **once**, in the first Monday pay run after it becomes verified or verified by admin. Record which payout paid it. Cancels still `checking` or `needs_listen` roll to a later run. Rework `fulfillment_week_figures` / `fulfillment-pay-week` around this, keeping the existing safety: amounts are recomputed server side and never taken from the request, there is idempotency, and with **`payouts_live` off nothing moves**.
- **Payouts are fully automatic. Brayden never approves or clicks pay** (his decision, Oct 14). A scheduled job runs every **Monday at 8 AM Central** and pays each rep the sum of their newly verified cancels through Stripe Connect. There is no Approve step anywhere. Remove the approve requirement from the server and the UI.
- Safety rails, since no one approves:
  - **`payouts_live` off** means nothing moves.
  - A new admin **Pause payouts** switch skips runs while it's on.
  - **Not enough Stripe balance** for the whole run: pay nobody that day, notify Brayden, retry daily. Never pay some reps and not others.
  - **A rep with no bank connected:** their amount is held and paid in the first run after they connect.
  - **Unusual volume:** a rep with more than 40 verified cancels in a week gets the extra held as Needs a listen. Make the number a setting.
  - A failed Stripe transfer notifies Brayden and the rep, and retries next run.
  - Log every run with its totals.
- Admin Payouts page (until P765): it must still load. Swap "hours × rate" text for "N cancels × $10", and hide Fix hours and the Approve buttons. No redesign here.

### 6. My pay (rep), copied from the mockup
- **Top box:**
  - This week / Last week toggle.
  - "You've earned this week", which is verified plus checking amounts, with the cancels × $10 line.
  - Three chips: **$ verified**, **$ being checked**, **N needs a listen**.
  - The pay date ("Paid Mon, Oct 19 to Chase •••• 4821", or "your bank (add it below)").
  - The weekly minimum line, only when that setting is on.
- **Cancels by day:** Mon–Fri bars stacked by status (verified teal, checking striped blue, needs a listen amber). Future days are dashed.
- **Your cancels:**
  - Tabs All / Verified / Checking / Needs a listen with counts.
  - Rows: logged day and time, client (initials avatar), carrier · for agent, status pill and note ("Carrier confirmed on the call", "AI is listening · a few minutes", "Not clear on the call · with Brayden", "Brayden listened · paid"), and $10.00.
  - The footer line from the mockup.
- **Right column:** Get paid to (unchanged, "Paid every Monday by Stripe") and Payouts history ("N cancels · to bank").
- **Remove from this page:** the shifts table, hours by day, and "Brayden hasn't set your schedule yet". A rep never sees transcripts, recordings or AI quotes, only status and note.

### Checks before shipping
- Don't place real calls or move real money. Test with mocked Twilio callbacks and **fake transcripts**:
  - a clear carrier confirmation, which should become verified,
  - a mumbled or unclear one, which should become needs a listen,
  - a speech-to-text error and an AI error, both needs a listen,
  - a call with no recording, which should become needs a listen.
- Test the automatic run with Stripe mocked: normal run, run with `payouts_live` off, paused, short balance (nobody paid), rep without a bank (held then paid next run), over the 40 cap, a failed transfer, and running twice (no double pay).
- Also test: cancel then change result (void), paid cancel can't be voided by the rep, the agent flag window (in time, late, wrong agent), admin decide (and non-admin refused), rate change mid-week, weekly minimum on/off, and pay-week math with roll-over.
- Confirm reps and agents can't read recordings or transcripts (RLS + function auth).
- Screenshots of My pay at 1440 and 1920, bank connected and not connected, saved as `media/fulfillment-pay-per-cancel/p764-*.jpg`. eslint + vite build clean.

### Brayden steps (list them in Memories)
- Add the speech-to-text key and `ANTHROPIC_API_KEY` as Supabase secrets.
- Deploy the new and changed functions.
- Set the recording-status callback if it isn't set in code.
- Check the call-recording consent rules (a lawyer, for his states) **before** turning on `recording_live`.
- `payouts_live` stays off until the accountant confirms contractor vs employee.

**Model: Opus 5.5**

---

