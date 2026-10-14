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

## Prompt 759 — Admin side, part 2 of 5: Admin Pipeline (everyone's clients, view only, enforced on the server)

> **✅ APPROVED by Brayden 2026-10-14 (Eagle).** Reference: `media/admin-redesign/admin-pipeline.dc.html`. Same rules as P758. **Run on Opus 5.5** (server-side read-only rule).

Brayden: "the admin pipeline would just be everyone's pipelines put together. I could just see the status of everything, but only the certain people can interact with it." He also wants **Needs attention** kept.

### Build
- The agent-style Pipeline layout from the mockup: left column with the colored **"Find any client"** search box (name, phone, agent or carrier, across every client and every status) and **Latest activity** (everyone's last few changes, each showing the agent); below it the **Everyone's pipeline** summary (client count, cancelled count, an **All agents** filter dropdown, the colored split bar, rows per status with count and percent) and a **View only** note at the bottom ("Only the agent and Fulfillment can change a client's status.").
- Right: four status tabs **Needs attention** (first, amber, selected by default), **Booked**, **No answer**, **Cancelled**, each with its count, then the table: Client (name, city/state, phone), Cancel with, Call (date tile + time + when), Booked by, Status. A live call shows "On a call now" in red; Needs attention rows show their reason ("Past call time", "Stuck 48h+") using the existing `lib/fulfillmentFlags.js` rules.
- The agent filter narrows everything on the page (tabs, counts, summary, table). Users (P762) links here with the agent already filtered (`?agent=<id>`).
- Clicking a row opens the client's details **read-only**: no status buttons, no edit controls, no booking changes.

### Enforce it on the server
- Admin can read every client. Admin must **not** be able to change a client's status or booking: check every path that changes a policy's status/booking (direct `policies` updates under RLS, `fulfillment_start_call`, `fulfillment_end_call`, `fulfillment_correct_result`, booking/move/cancel RPCs) and make them refuse when the caller's role is admin and they are not the assigned agent/Fulfillment rep. Keep admin's existing powers that are not client status (users, settings, payouts, reassigning a Fulfillment call in P760).
- This overlaps the open agent-portal QA finding "server-side guards for policies update/delete". Do the admin part here and note in Memories what is left of that finding.

### Verify
- Logged in as admin: search finds any client by name, phone, agent and carrier; tabs and counts match the data; the agent filter works and the `?agent=` link works; no control on the page or in the drawer changes anything.
- Direct calls as admin to each status-changing path for a policy that isn't theirs are refused (test on rolled-back rows); the agent and Fulfillment rep can still do their normal actions.
- Screenshots at 1440/1920 against the mockup; `eslint`, `vite build`.

**P759: Opus 5.5**

---

## Prompt 760 — Admin side, part 3 of 5: Admin Fulfillment (the whole desk, live)

> **✅ APPROVED by Brayden 2026-10-14 (Eagle).** Reference: `media/admin-redesign/admin-fulfillment.dc.html` (1440×900). Same rules as P758. **Run on Opus 5.5** (reassign RPC and live data).

Brayden wants to see "calls on each day and who's making those calls each day and at what time." Who they're calling doesn't matter on this page: **dots, not client names**.

### Build
1. **Header (colored, thick):** previous/next day arrows (flip through days like Activity), "Today" chip when on today, the big date, "{N} calls today" and "{N} people on the desk" on the right. Under it, **today's track**: one thick bar from the desk's first to last hour with the part up to now glowing teal, **every call on the desk that day as a colored dot** (cancelled green, no answer grey, live red with white ring, stuck amber, still to call blue ring), a white now line and a red bubble "Now 3:42 · N live" (just "Now 3:42" when nobody is live). A key under the bar with a count per color. On another day the track shows that day's calls; no now line on other days.
2. **Four boxes** under the header, always four:
   - **Done today:** finished calls of total, with a segmented bar (cancelled / no answer / live / remaining).
   - **Cancelled today:** count, "{x}% of finished calls", and the no-answer count under it.
   - **On a call now:** who is on a call and for how long (the Fulfillment person, not the client); "Nobody is on a call" otherwise, plus how many others are free.
   - **Need a hand:** count of calls past their time and not started (amber) with a **"Give them to"** button. When the count is 0 the box stays and turns green: "All calls on time".
3. **The schedule:** an hour header with a teal "Now" label, then one row per Fulfillment person who has calls that day. Left cell: avatar with a status dot, status line ("On a call · 12 min", "Next at 4:45 PM", "Free until 5:30 PM", "Off today"), a small segmented bar with one piece per call in its result color, and "N calls · N cancelled". Right: hour grid lines, the teal now line, and **each call as a dot at its time with the time under it** (no names).
4. Clicking a dot opens that call read-only (who booked it, carrier, result), with **Give to** if it is stuck or not started yet.

### Give to (the only change admin can make here)
- "Give them to" / "Give to" opens a picker of Fulfillment people, showing who is free at that time (shift and calendar), and moves the call's `assigned_fulfillment_id`. Reuse the admin Reassign that exists today if it fits; otherwise a new admin-only security-definer RPC. It must refuse non-admins, refuse calls that are live or finished, avoid double-booking the new person's slot, log a `policy_events` entry, and notify the new assignee (and the old one) in-app.

### Verify
Frozen clock: dots, now line, counts and the four boxes match the data; the Need a hand box shows green at 0; other days have no now line; Give to moves a stuck call and is refused for a non-admin and for a live call (rolled-back test rows). Screenshots 1440/1920 against the mockup; `eslint`, `vite build`.

**P760: Opus 5.5**

---

## Prompt 761 — Admin side, part 4 of 5: Admin Payouts (approve Fulfillment's weekly pay)

> **✅ APPROVED by Brayden 2026-10-14 (Eagle).** Reference: `media/admin-redesign/admin-payouts.dc.html` (1440×900). Same rules as P758. **Run on Opus 5.5** (money). Builds on P753 (`fulfillment_payouts`, `fulfillment_payout_accounts`, `fulfillment_week_figures`, `fulfillment-pay-week`, `payouts_live`).

Brayden wanted this page to read **left to right**, not as tall stacks. Keep the approved layout exactly.

### Build
1. **Top row:**
   - Left (420px) **colored box**: "Week of {Mon} to {Sun}", the amount waiting ("$1,240 waiting on you"), a "2 of 3" chip (people waiting / people that week), a white **"Approve and pay both"** (or "Approve and pay all N") button, and "Through Stripe, lands in 1 to 2 days".
   - Right **Pay by week** chart: one bar per week for the last 8 weeks plus the current week, amount on top, week start under. Paid = green, waiting = amber with a glow and white outline, the current (still open) week = dashed blue "So far". Clicking a bar selects that week for everything below.
2. **Section title** "{Mon} to {Sun}" + "Hours come from each person's shifts. Check them, then approve."
3. **One wide strip per Fulfillment person** for that week: avatar, name, bank name + last 4 (from `fulfillment_payout_accounts`), then **Mon to Sun boxes** each showing that day's hours and filled to match (8 h = full; days off dashed with "—"), then the pay amount and "{hours} hrs × ${rate}", then the actions: **Fix hours** + **Approve** while waiting; a green "Paid {date}" pill once paid; "Held · bank not connected" in amber when their account isn't ready; "Failed" in red with the reason.

### Rules
- Amounts always come from the server (`fulfillment_week_figures`); the page never sends an amount.
- **Approve** calls `fulfillment-pay-week` for that person and week. **Approve and pay all** does each waiting person (same function, one per person, idempotent).
- **Fix hours** opens a small editor for that person's days that week with a required reason. Save writes an adjustment the figures function uses (new admin-only table or columns with an audit trail: who, when, reason, before/after). Approved or paid weeks can't be edited.
- While `payouts_live` is **off**, keep the page fully usable but show a slim banner "Payouts aren't live yet. Approving marks the week approved; no money moves." and make sure nothing calls Stripe. Brayden turns it on only after his accountant confirms contractor vs employee.
- Admin only (RLS + function checks already in P753; re-check them).

### Verify
Mocked Stripe tests for approve one / approve all / held / failed / idempotency; Fix hours audit row and recomputed amount; nothing reaches Stripe while `payouts_live` is off; chart week selection drives the strips. Screenshots 1440/1920 against the mockup; `eslint`, `vite build`. **Do not move real money.**

**P761: Opus 5.5**

---

## Prompt 762 — Admin side, part 5 of 5: Admin Users (agents and Fulfillment, a person's numbers, invites and access)

> **✅ APPROVED by Brayden 2026-10-14 (Eagle).** Reference: `media/admin-redesign/admin-users.dc.html` (1440×900). Same rules as P758. **Run on Opus 5.5** (role and access changes). Replaces the current Users & Access page.

Brayden wants to see what each person did without filtering the Pipeline, add people, and manage access. **No Admins tab.**

### Build
1. **Left list (380px card):**
   - **Agents / Fulfillment** switch with counts (people plus pending invites).
   - Search ("Find an agent" / "Find a Fulfillment person") with a sort ("Most booked" default; also Name, Last on).
   - One row per person: avatar with online dot, name, "N booked · N cancelled" (Fulfillment: "N calls · N cancelled"), and a small bar comparing them to the top person. Selected row highlighted.
   - Pending invites as a dashed row: "Invite sent N days ago · Resend".
   - White **Add someone** button at the bottom: reuses the existing invite flow (text or email, `send-agent-invite`), with a role choice Agent / Fulfillment.
2. **Right, the selected person:**
   - **Colored panel:** big avatar with online dot, name, "{Role} · {City, ST} · joined {date} · {on now / last on …}", **View pipeline** (goes to the Admin Pipeline with `?agent=<id>`; for Fulfillment, to the Admin Fulfillment page on that person) and **Message** (opens their standing thread, mig 123). Four numbers: agents = booked this week, cancelled this week, clients all time, rank among agents; Fulfillment = calls this week, cancelled this week, hours this week, rank.
   - **This week, day by day:** booked vs cancelled bars per day (Fulfillment: calls vs cancelled), future days dimmed.
   - **Latest clients:** the person's last 6 clients with status color (Fulfillment: their last 6 calls).
   - **Access strip:** Role dropdown (Agent / Fulfillment), "Signs in with {email or phone}", and **Turn off access** (confirm dialog). Turning access off blocks sign-in and hides them from assignment and booking; it is reversible ("Turn access back on"). Their clients and history stay.
3. A this week / this month / all time choice is not needed here; numbers are this week except "all time".

### Rules
- Role change and access on/off go through admin-only security-definer RPCs (reuse the current page's if they exist). They must refuse non-admins and refuse changing your own role or turning off your own access. Changing an agent with live clients to Fulfillment (or the other way) warns first.
- Pending invite Resend / Cancel reuse the existing invite functions. **Never send a real invite to a real person while testing.**

### Verify
Switch, search, sort and selection work; numbers match the Pipeline and Fulfillment data for that person; View pipeline lands filtered; Message opens the right thread; role change and access off/on work for admin and are refused for non-admins and for yourself (rolled-back tests); a turned-off user can't sign in. Screenshots 1440/1920 against the mockup; `eslint`, `vite build`.

**P762: Opus 5.5**
