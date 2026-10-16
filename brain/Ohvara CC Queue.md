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

## Prompt 767 — Notifications: new bell panel for every role + the approved notification list (bell + email)

**What:** redo the notifications bell panel (all roles) from the approved mockup, and wire up the notifications Brayden approved for each role. The full list, word for word, is in [[Ohvara Notifications Plan]]. Read it first; it's the source of truth.

**Mockups:** `media/notifications/panel.dc.html` (the panel component; Tweaks: role, tab), `on-page.dc.html` (Admin Overview with the bell clicked, how it sits on the page) and `all-roles.dc.html` (the three roles side by side). Copy them exactly.

### 1. The panel (same for all roles, contents differ by role)
- Opens under the bell as a dropdown with a small pointer. The bell gets a highlighted ring while open and an unread-count badge. The page behind dims slightly. Click outside or Esc closes it.
- **Header:** "Notifications", an unread count, and "Mark all read".
- **Two tabs:**
  - **Needs you**, with an amber count. Only items that need the person to do something.
  - **Everything.**
- **Red banner at the top** for money problems only (Admin: payout short / failed. Agent: weekly payment failed. Fulfillment: no bank connected / transfer failed). Icon, title, one line and a fix button that goes to the right page. It stays until the problem is fixed, and can't be dismissed.
- **Rows:**
  - Every row is **exactly the same height (64px)**, no buttons inside rows.
  - Each row has a colored icon tile by type, a one-line title (bold if unread), a one-line detail, the time, an unread dot, a left accent edge when unread, and a chevron.
  - Long text is cut with "…".
  - **Clicking a row marks it read and takes you straight to the thing**: the client, the call, Payouts, the message thread, the user, and so on.
- **Groups:** Today, Yesterday, Earlier, newest first. The list scrolls inside the panel.
- **Footer:**
  - **Notification settings**, which opens a simple Settings section where each person can turn email on or off per notification type.
  - A phone-alert status line: "Phone alerts off · Get the app" until the mobile phase.
- Remove the old panel and its old items, such as "X just joined the team" for non-admins.

### 2. The notifications themselves
- One `notifications` table: recipient, type, title, detail, link, created, read_at, needs_action, and a dedupe key so the same event never notifies twice. Recipients read and mark only their own (RLS). Rows are created **only server side** (triggers / functions), never from the client.
- **Channels now:** bell, plus email (Resend) where the plan says email. Phone push comes with the mobile phase. Store which types are push-eligible now, so mobile only has to deliver them. Quiet hours (9 PM–8 AM, money failures excepted) apply to push later and to non-urgent emails now.
- **Wire every type whose feature exists today:**
  - Agent: policy cancelled, client didn't answer, couldn't reach after retries, needs attention, weekly limit reached, weekly payment failed, new message, Monday summary.
  - Fulfillment: new call booked (including calls given to them), 5 minutes before, call time now and not started, paid, payout problem, new message.
  - Admin: needs a listen, payout problem, agent payment failed, background job failed, invite accepted, new message, Monday summary, and the **daily 8 AM "anything that went wrong" email** (not sent when there's nothing).
- **Types whose feature isn't built yet** (missed-call rebooking and strikes, "not enough reps" capacity): create the type, the wording and the link now, but don't fire them. List them in Memories so the bench/booking and missed-call prompts wire them up.
- **Scheduled ones** (5 minutes before, call time now, Monday summaries, the 8 AM email) need working crons. Falcon found that four existing crons fail every run because `app.supabase_url` isn't set (`recovery-sms`, `redistribute-no-answers`, `process-reminders`, `trigger-re-engagement`). **Fix that shared cause first**, the same way P764's crons authenticate (Vault secret, nothing hard-coded), then confirm all four now succeed. Don't change what those four jobs do.

### Checks before shipping
- Fake data harness for all three roles at 1440 and 1920:
  - both tabs, the money banner on and off, an empty state ("You're all caught up"), and long text cut with "…";
  - every row exactly 64px, measured;
  - a row click goes to the right page and marks it read;
  - mark all read.
- SQL tests (rolled back): each wired trigger creates exactly one notification for the right person, no duplicates on retry, users can't read other people's notifications or insert their own, and the email toggle is respected.
- Never send real emails while testing; mock Resend.
- Screenshots in `media/notifications/p767-*.jpg`. eslint and vite build clean. Log in Memories, including the not-yet-fired types and the cron fix, and clear this item.

**Model: Opus 5.5**

---

## Prompt 768 — Agent portal hardening: enforce the booking rules on the server, close the open doors

**Why:** the P743 QA ([[Agent Portal QA Report]]) found that several agent rules live only in the UI. Someone calling the database directly could get around them. Real agents pay $350–$500 a week and payouts are about to go live, so these must be enforced server side **before real agents use the portal**. No screens to design. Behavior for a normal agent clicking normally must not change at all.

**First:** `git fetch`, re-read the QA report's Findings, and **check each one against the live database as it is today** (P759/migration 141 changed the policies policies for admin). Fix only what is still open, and say in Memories which were already closed.

### 1. Agents can't edit or delete bookings directly (Finding 1)
- Today an agent can update or delete their own `policies` rows straight from the API: mark one Cancelled themselves, move a time that was already called, or delete a booking.
- Remove direct UPDATE and DELETE on `policies` (and `policy_fulfillment_details`) for agents. Every agent change must go through the existing security-definer RPCs (`agent_change_booking`, `agent_rebook_call`, `agent_set_booking_carrier`, `agent_confirm_recovery_number`, and any others the agent UI calls). Those RPCs keep their own checks.
- Agents can never set a fulfillment result or status (Cancelled, No answer, etc.). Only Fulfillment's RPCs can.
- Agents can't delete bookings at all, which is Brayden's rule: agents only change bookings.
- Find every place the agent UI writes to `policies` directly and switch it to the RPC, so nothing breaks.

### 2. The weekly cap can't be dodged (Finding 2)
- Today: insert a booking unassigned and then flip it (17 of 16), or delete one to free a slot.
- The cap must hold on **every path that makes a booking count**: insert, any update that makes it count (assigning it to fulfillment, changing its week), and rebooks. Deleting is gone (above).
- Keep `agent_weekly_usage` / `enforce_weekly_submission_cap` as the single source of truth, so the UI meter and the server can never disagree.
- Respect `agent_billing_enforced` exactly as today, and the comped account rules from migration 131. Check whether 131 was ever applied, and report it.

### 3. Booking rules enforced on the server (Finding 3)
- **30-minute notice:** no booking less than 30 minutes ahead.
- **No double-booking:** the same client and instant can't be booked twice by the same agent. The team-wide openings limit comes later with the bench prompt. Don't build that here.
- **Time required:** a booking must have a time.
- **Carrier hours and weekends:** the same rules the UI uses today.
- Add these as checks in the booking RPC or a BEFORE INSERT/UPDATE trigger, using the client's and agent's zones exactly like the UI.
- The server's refusal messages should match the UI wording, so a refusal reads naturally.

### 4. Close the open doors (Findings 8–9)
- **`resolve_login_email` is callable by anyone signed out** and returns a real email for a username (`brayden11` → Brayden's email). Keep username login working, but stop it leaking. Have the sign-in path resolve and sign in on the server, or return nothing usable to the caller. Pick the safest way that keeps `useAuth.signIn(username)` working, and explain it.
- **Pre-pivot RPCs callable by anon:** list them. Revoke anon (and authenticated, if nothing uses them) on any that the app doesn't call. Never drop a function or table. Say what you revoked.
- **`run-migration-034`** edge function is public (verify_jwt off). It shouldn't exist in production. Make it refuse everything (admin JWT check, or return 404) and tell Brayden to delete it from Supabase.
- **Dead crons:** `send-appointment-reminders` (404s every 5 min) and any job still pointed at the pre-pivot `appointments` table. P767 fixes the shared cron setting first, so check after it. **Unschedule** jobs that only serve the dead `appointments` table; don't touch the four P767 revived. List what you unscheduled.
- Run the Supabase security advisors before and after, and paste both summaries in Memories.

### 5. Small agent-side fixes from the QA (Findings 4–7, 10)
- **(4)** The carrier hours line tells agents "ET" / "9–5 Eastern". Show it in the agent's own zone.
- **(5)** The Preferences zone card copy is wrong. Make it say what the setting actually does.
- **(6)** The Overview week and the cap meter disagree for agents outside Central. Both should use the agent's profile zone.
- **(7)** Failed loads look empty on Overview, Activity, Messages and Change. Show a clear "Couldn't load, try again" instead of an empty page.
- **(10)** A comped account shows "Next charge of $500". Comped accounts should say they aren't charged.

### Checks before shipping
- Rolled-back SQL as Test Agent against live:
  - direct update and direct delete refused;
  - each RPC still works;
  - status can't be set by an agent;
  - the cap holds on insert, flip, rebook and change-week (16 → 17 refused);
  - notice, double-book, no-time and outside-hours refused with the right message;
  - enforcement off lets the cap pass, exactly like today.
- Also: anon can't get an email from a username; username login still works (harness); `run-migration-034` refuses; advisors improved.
- Playwright harness on the real agent UI: book, change, rebook and confirm number all still work, and a refusal shows the server's message.
- Nothing left in the live database. eslint and vite build clean.
- Update the QA report's Findings with "Fixed in P768". Log in Memories and clear this item.

### Brayden steps (list in Memories)
- Delete `run-migration-034` from the Supabase dashboard.
- Turn on leaked-password protection in Supabase Auth, if his plan allows it.
- Do the 15-minute live pass from the QA report once this ships.

**Model: Opus 5.5**

---

## Prompt 769 — Fulfillment portal hardening: check every rep rule on the server, fix what's open

**Why:** same reason as P768 for agents. The Fulfillment side (P745–P757, P764, P767) was built fast and mostly tested on fake data. Before real reps are paid per cancel, every rule a rep relies on must be enforced in the database or edge functions, not just the UI. A normal rep clicking normally must see no change.

**How:** a security and acceptance pass like P743, but this time **fix server-side gaps directly** (that's the point of this prompt). Write the report to `brain/Fulfillment Portal QA Report.md` with Pass / Fixed / Fail / Can't test per check. No real calls, texts, emails, recordings or Stripe transfers. Use rolled-back SQL as a test rep, Test Agent and Admin against live, plus the Playwright harness pattern from P743 (swapped `supabase.js`, frozen clock). Leave nothing in the live database.

### What to check, and fix if open
**1. What a rep can see**
- A rep can read only their own calls and the clients on them. They can't see other reps' calls, other reps' pay, other agents' clients, recordings, transcripts or AI check results.
- Pipeline and search return only what they're allowed to see.

**2. What a rep can change**
- A rep can change results only on calls assigned to them, and only through `fulfillment_start_call` / `fulfillment_end_call` / `fulfillment_correct_result`. No direct UPDATE or DELETE on `policies`, `policy_events`, `fulfillment_cancels`, payouts or pay settings.
- A rep can't start a call more than 5 minutes early (P756 `too_early`), can't end or correct another rep's call, and can't correct a result after it's been paid.
- A rep can't mark their own cancel verified or verified by admin, can't change its amount, and can't reassign calls. **Give to** is admin only.
- A rep can't change their own role, access, or another person's profile.

**3. Pay and money (P753, P764)**
- Amounts are always computed on the server. A rep's Connect session can only open their own account.
- The pay run refuses any caller except the cron or an admin.
- `payouts_live` off and Pause both block every path.
- A cancel is paid once, even with two runs or a retry.
- Webhook signatures (Stripe, and Connect) are checked.

**4. Calls and recordings (P751, P764)**
- The Twilio voice token gives access only to the rep's own conference.
- `fulfillment-voice`, `fulfillment-call`, `fulfillment-cancel-check` and `fulfillment-recording` check Twilio signatures or JWTs as intended.
- `fulfillment-recording` streams only to admins and never exposes a public URL.
- With `voice_live` / `recording_live` off, nothing dials or records.

**5. Messages and notifications (P754, P767)**
- A rep reads only their own threads and notifications, and can't create notifications or messages as someone else.

**6. Edge cases**
- A rep turned off (P762 access off) is signed out, can't use any RPC, and their future calls are released.
- Time zones: a rep outside Central sees the right day and the right unlock time.
- The day of a DST change (Nov 1 2026).

**7. Advisors**
- Run the Supabase security advisors before and after, and paste both summaries.

### Rules
- Fix server-side gaps in focused migrations, one per area, and commit each one separately (`P769-n`).
- Small clear UI bugs can be fixed too.
- Anything bigger, or anything that changes how a rep works, goes under **Findings for Brayden**, not built.
- eslint and vite build clean. Log in Memories, with the report link and Brayden's steps, and clear this item.

**Model: Opus 5.5**

---

## Prompt 770 — Admin portal hardening: admin powers only for admins, and safe even for the admin

**Why:** same as P768 (agents) and P769 (Fulfillment). The Admin side (P758–P766) gives powerful actions: pay decisions, Give to, role and access changes, invites, settings switches, recordings. Each must be enforced on the server: only a real admin can use them, and some must be safe even for the admin. Normal use must not change.

**How:** a security and acceptance pass. Report to `brain/Admin Portal QA Report.md` (Pass / Fixed / Fail / Can't test). **Fix server-side gaps directly** in focused migrations, one per area, committed separately (`P770-n`). Anything that changes how Brayden works goes under **Findings for Brayden**. Rolled-back SQL as Admin, Test Agent and a test rep against live, plus the P743 harness pattern. **Never use Brayden's real admin login** (no test admin exists, so check with SQL and the harness). No real invites, calls, emails or Stripe transfers. Leave nothing in the live database.

### What to check, and fix if open
**1. Admin-only, everywhere**
- Every admin RPC and edge function refuses non-admins and signed-out callers on the server, not just by hiding the page. That covers:
  - Give to, `fulfillment_decide_cancel`, role/access changes and invites;
  - the settings switches (`voice_live`, `recording_live`, `sms_live`, `payouts_live`, Pause payouts, rate, minimum, cap, recording notice);
  - recording playback, Users data, Payouts data and the admin views of Pipeline / Fulfillment.
- An agent or rep calling them directly gets refused.

**2. Safe even for the admin**
- Admin can't change a client's status (P759 view-only) or set fulfillment results.
- Admin can't edit pay amounts by hand. Pay is computed only from cancels and settings.
- A cancel can't be paid twice. A paid cancel can't be un-paid without a record.
- Admin can't turn off their own access or change their own role (P762), and the last admin can never be removed.
- Every decision, role change, access change, Give to and settings change is written to an append-only log with who and when, and nobody can edit or delete that log.

**3. Who becomes an admin**
- No path gives the admin role except an existing admin, through the role RPC, with a log entry. That includes invites (P762 allows only agent or fulfillment), sign-up, profile updates and RPCs.
- Check that `profiles.role` can't be set by its owner.

**4. Secrets and data exposure**
- No service-role key, Stripe key, Twilio secret, Deepgram or Anthropic key, or Vault secret ever reaches the browser bundle or an API response.
- Search the built bundle to confirm.
- Admin views don't leak data to other roles through shared views or RPCs.

**5. Sign-in and sessions**
- A turned-off user is signed out and can't refresh their session.
- Password reset and invite links are single-use and expire.
- Admin pages redirect away for non-admins, and on the server the data calls fail anyway.

**6. Advisors and edge functions**
- Run the Supabase security advisors before and after, and paste both summaries.
- List every edge function with its `verify_jwt` setting and say whether that's correct. Fix code-side checks. Anything that needs a dashboard change goes in Brayden's steps.

### Rules
- Small clear UI bugs can be fixed. Anything bigger goes in Findings.
- eslint and vite build clean.
- Log in Memories with the report link and Brayden's steps, and clear this item.

**Model: Opus 5.5**

---

## Prompt 771 — When a rep misses a call: apologize, hold a retry, then hand to the No answer flow

**What:** today, if a rep never starts a booked call, it just sits "past its time" (the "14 calls past their time" on the Admin Overview). Nothing happens for the client. Brayden's flow (Oct 16) fixes that by reusing the No answer recovery from **P696** (built, waiting on `sms_live`). Read P696 in the queue and its Memories entry first; reuse its pieces (reschedule link, slot-locking retry, texts, attempt tracking). Don't rebuild them.

### The flow
1. **Missed.** A booked call counts as **missed by us** when its time passes and the assigned rep hasn't started it within **10 minutes**. Make the 10 a setting. The lead shows a new badge, **"Missed by us · rebooking"**, in the agent's and admin's Pipeline and the rep's calendar.
2. **Hold a retry right away.** Lock the **same time tomorrow** with the slot-blocking logic P696 uses. If that time is outside carrier hours, on a weekend, or full, take the nearest open time that day, then the next business day.
3. **About 15 minutes after the miss** (setting): text the client an apology with the reschedule link: *sorry we missed your call, pick a new time so we can get your old policy cancelled; if you don't, we'll call you tomorrow at <time>*. Use the P696 link (specific times plus ASAP).
4. **If they rebook with the link:** release the held retry, book their new time, done. The badge goes back to Booked.
5. **The next morning** (~9 AM their time, same setting as P696), **only if they haven't rebooked:** a second apology text with the same link.
6. **The held retry call:**
   - It's **marked priority**.
   - To the rep it simply looks like a **new booking**, and the P767 "new call booked" notification fires.
   - It goes to a **different rep** than the one who missed, whenever another rep can take that time. Use the original rep only if nobody else can.
   - If the original rep is turned off, it always goes to someone else.
7. **If the client answers:** normal call. **If not:** this counts as the client's first No answer, and the **P696 flow starts from the beginning** (text, retry tomorrow, morning text, retry, confirm the number, AM/PM texts, hand to the agent).

### Rules
- **The agent isn't charged** a weekly booking for our miss or the held retry. It's the same booking moved, not a new one. Check this against the cap rules (and P768's server-side cap).
- **Strikes:** each miss logs a strike on the rep who missed, with call, time and client.
  - Show the rep's count on the Admin Users person panel ("Missed calls: N in 30 days").
  - Strikes clear after a rolling 30 days.
  - Wire the P767 types that waited for this feature: rep "Missed call strike" (warning at strike 2), admin "A rep missed a call" and "A rep hit 3 strikes", agent "We missed the call, rebooking underway". No automatic penalty beyond notifying Brayden.
- **Texting off (`sms_live` false, until A2P):** skip the texts but still hold and make the retry call, so nothing gets lost. Flag that texts start when `sms_live` turns on.
- **Caps:** at most 2 apology texts per miss. A client never gets texts from both flows on the same day.
- All of it runs on the server (cron or trigger), using the cron auth P764/P767 use. It's idempotent and never double-books or double-texts.

### Checks before shipping
- Frozen-clock tests against live with rolled-back SQL. Cover:
  - **Misses:** a miss at 10 minutes; a call started at 9 minutes isn't a miss.
  - **Rebooking:** rebook through the link releases the hold; no rebook leads to the morning text, then the priority retry going to another rep.
  - **When the retry falls:** an outside-hours or weekend retry time; the retry slot is full.
  - **Retry outcome:** retry answered vs not answered (P696 starts fresh).
  - **Strikes and charges:** strike counts and the 30-day expiry; the agent's cap not charged.
  - **Texting and duplicates:** `sms_live` off (no texts, retry still happens); duplicates on cron retries.
- Never send a real text or place a real call.
- eslint and vite build clean. Log in Memories and clear this item.

**Model: Opus 5.5**

---

## Prompt 772 — Agent phone layout: a real app-style phone version of the agent portal

**What:** on phones (under 768px wide), the agent portal stops being the desktop page squeezed down (hamburger + stacked desktop cards) and becomes an app-style layout, copied from the approved mockups in `media/mobile-agent/`:
- `Main.dc.html` (Home)
- `Book.dc.html` (Book a call)
- `Clients.dc.html` (Clients; Tweak `filter` shows the selected state)
- `Client.dc.html` (a client, as a bottom sheet)
- `More.dc.html` (More)

**Desktop and tablet stay exactly as they are.** Same routes, data, hooks and server calls. This is a layout layer, no new server work. Agent role only. Fulfillment and Admin phones come later.

### Brayden's rules from the review (don't break these)
- **No sideways scrolling anywhere.** Nothing that swipes left/right to see more. Lists scroll down only; chips wrap; day pickers fit in one row.
- **Clients status filter:** one card split into four equal parts (Needs you · Booked · No answer · Cancelled). The **status name is the colored part**, the number sits under it in white. Tap filters, the selected part gets a soft highlight and a thin colored line, tap again to clear. No pill-button chips.
- Rows open the thing they're about, with no buttons inside list rows (same rule as the P767 notification panel).

### Shell
- **Bottom tab bar:**
  - Home, Clients, a raised round **+** (Book a call, teal→blue), Messages (with the unread badge), More.
  - It respects the iPhone home-indicator safe area (`env(safe-area-inset-bottom)`).
  - It's hidden inside the Book a call flow, which has its own back arrow and sticky bottom bar.
- **No sidebar or hamburger on phones.**
- Top of Home: a date chip, the bell (the P767 panel opens full screen on phones) and an avatar that goes to More.
- Touch targets at least 44px. Inputs at least 16px font so iOS doesn't zoom.

### Screens
- **Home:**
  - Greeting, plus the bookings ring (N of cap, left, resets day) with a **Book a call** button.
  - **Needs you** list (the same items as desktop Needs attention), **Up next** as a vertical list (the next call highlighted), and Booked / Cancelled this week tiles.
- **Book a call:**
  - Step 1 (client fields, stacked, big inputs) collapses into a one-line summary with Edit once it's filled.
  - Step 2 has five day boxes in one row (Today + next 3 days + **Pick**, which opens a date picker), then Morning / Afternoon time grids in 3 columns. Past, too-soon and full times are dimmed, with their reason.
  - A sticky bottom card says "Fulfillment calls <name> · <day, time>" with **Book it**.
  - Every existing booking rule and server refusal still applies and shows its message.
- **Clients:** title with counts, search, the status card above, then the list grouped **Needs you** first, then **Booked · next up** (then the rest), each row with initials, name, carrier · city, and the right-side status/time.
- **A client (bottom sheet):**
  - Name and status pill, the call card (day tile, time, "in 1 h 20 m · her time").
  - Info rows: Phone with a **Call** button (`tel:`), Lives in, Carrier leaving.
  - History, plus **Change booking** (opens the existing change flow) and a message button.
  - Swipe down or the X closes it.
- **More:**
  - Profile card and a Billing card (plan, weekly price, next charge, usage bar, Manage billing).
  - Rows: Activity, Invite an agent, Notifications, Theme (one tap, like P766), Settings, Report a problem. Then Sign out.
- **Messages:** use the existing phone inbox/chat layout from P721, inside the new shell.

### Checks before shipping
- Harness at 390×844 and 360×780 (small Android), dark and light. Every screen must have no horizontal overflow (measure `scrollWidth`), working tab navigation, a working sheet open/close, and the Book flow end to end with a server refusal shown.
- Desktop at 1440 must be pixel-identical to before. Screenshot-diff a few pages.
- Screenshots in `media/mobile-agent/p772-*.jpg`. eslint and vite build clean. Log in Memories and clear this item.

**Model: Opus 5.5**

---

