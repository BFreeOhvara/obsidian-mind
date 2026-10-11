---
date: 2026-10-10
description: "P743 agent portal acceptance pass: 29 checks run against the real code, a throwaway harness with a frozen clock, and rolled-back tests on the live database. Results, fixes, findings, and Brayden's 15-minute live pass."
tags:
  - ohvara
  - qa
  - agent-portal
quarter: Q4-2026
status: completed
---

# Agent Portal QA Report (P743)

Run 2026-10-10/11 by CC (Opus 5.5) against `ohvara-dashboard` `082dafb` → fixes at `52832ac` (QA-1) and `14aeefb` (QA-2). Queued by Eagle in [[Ohvara CC Queue]]; ship note in [[Memories]].

## Summary

| Result | Count | Checks |
|---|---|---|
| **Pass** | 22 | 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 24, 25, 28, 29 |
| **Fixed** | 2 | 13 (QA-1), 19 (QA-2) |
| **Fail** | 3 | 3 (agents see a zone name), 9 (booking rules are UI-only, as expected), 27 (failed loads look empty) |
| **Can't test** | 2 | 23 (Stripe dashboard settings), 26 (live function probe was blocked) |

**How it was tested.**
- **Database:** five `DO` blocks against the live database, each running as Test Agent (`set local role authenticated` plus its JWT claims) and each ending in `raise exception`, so nothing was saved. Two blocks also seeded a throwaway second agent inside the transaction.
- **Logic:** 96/96 Node checks on the real `timezones.js`, `scheduling.js` and `billing.js`.
- **UI:** the real app (every page, hook and route) running in a throwaway Vite harness. Only `src/lib/supabase.js` was swapped for an in-memory stand-in, and its data mirrored Test Agent's live statuses and times with made-up names. Playwright drove local Chrome with a frozen clock (`page.clock`) and an emulated browser time zone. Every outbound request was blocked, and none were attempted.
- **UI results:** 338 checks: account 55/56, booking and time zones 82/83, change/pipeline/activity/overview/messages 51/51, billing 34/34, every page 116/124. Four of the eight every-page flags were reviewed by eye and are false positives (see 27).
- **Clean-up:** the harness is deleted. A count query at the end found **0** test rows (policies, users, messages, invites). Test Agent is unchanged: Premium, comped, 26 bookings.

**Fixed (each in its own commit):**
- **QA-1** (`52832ac`): the weekly reset day and the billing week dates now use the agent's profile zone, the same zone the database's week uses. Before, a Pacific browser on a Central profile showed "Resets Sun" and "Resets Sunday at midnight". After: "Resets Mon" and "Resets Monday", re-checked in the harness.
- **QA-2** (`14aeefb`): the Messages inbox note said "From Test, oct 9" in lowercase. It now says "From Test, Oct 9", and "yesterday" is still lowercase.

## 1. Account and access

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Sign in (email, username), sign out, wrong password, two-step off/on | Pass | Wrong password shows "Wrong email or password". Email sign-in and username sign-in (`testagent11` → `resolve_login_email`) both land on `/agent`. The account menu's Sign out goes to `/login`. With two-step on: "Two-step check" with 6 code boxes, `000000` shows "That code didn't work…", `123456` lands on `/agent`. With two-step off there's no code step. No console errors. |
| 1 | **P742:** Forgot password bottom-left, flush with the box | Pass | Left edges are label **627**, box **627**, link **627** (px). Link top 594.9 is below the box bottom 586.9. Checked by eye at 1440. |
| 2 | Profile, email, password, Forgot password | Pass | Profile saves `{full_name, phone}` only. There's no email field in Profile. Change email goes through `auth.updateUser({email})` and shows "Check … to confirm". Current password is `type=text` with a `disc` mask, read-only until focus, `autocomplete=off`. A wrong current password is refused. The right one unlocks New and Confirm. The strength bar moves Weak → Strong. A mismatched Confirm is refused. Update goes through `auth.updateUser({password})`. Settings' Forgot password names the account email and calls `resetPasswordForEmail(email, {redirectTo: <origin>/reset-password})`, the same call Login uses (fake backend, so nothing was sent). Resend waits 60 s. |
| 3 | Preferences, plus no zone names anywhere for agents | **Fail** | Theme saves and survives a reload (`data-theme` and localStorage are both `light`). The zone picker saves `timezone` and `timezone_confirmed_at`. **But** Book a call, Change a booking and My Pipeline's re-book show the carrier's hours with a zone: "Prudential takes calls Mon–Fri 8:00 AM–8:00 PM **ET**" (`hoursSummary`, `BookCall.jsx:235`, `ChangeBooking.jsx:290`, `Clients.jsx:370`). The fallback says "9–5 **Eastern**". The Preferences card text is also wrong (see Findings 4 and 5). A grep found no other zone labels on agent pages. |
| 4 | Client contact, Invite an agent | Pass | Text follow-up: the consent box gates Turn on, which then saves `no_answer_sms_opt_in: true`. The card says texting waits on the SMS number. Caller ID offers number verification. The invite pop-up opens and both tabs (Text message / Email) say coming soon. It has 0 links, 0 copy buttons, and only `send-agent-invite {action:'status'}` is called. |
| 5 | Sidebar collapse/expand, collapsed avatar menu, phone drawer | Pass | Collapse 256→72 survives a reload (dark and light). Expand works. The collapsed avatar menu opens. The phone drawer opens and closes at 390. No sideways scroll. |
| 5 | **P742:** rail sizes, avatar ring, Settings header | Pass | Expand box **32×32**. Collapsed avatar button **36×36**, `border-radius 50%`, transparent background. Ring on hover `0 0 0 2px rgba(255,255,255,.22)`, open `.40`. The Settings header line reads "Test Agent · Two-step off", not the email (dark and light, checked by eye). |

## 2. Booking (Book a call)

| # | Check | Result | Evidence |
|---|---|---|---|
| 6 | Happy path, same zone | Pass | Dallas TX (lookup mocked to Chicago), Prudential, Tue 10:00 AM. Saved row: `client_timezone America/Chicago`, `state TX`, `client_city Dallas`, `scheduled_call_at 2026-10-13T15:00:00.000Z`, `carrier_id`/`carrier_name` Prudential, `fulfillment_assigned true`. The summary and success screen say "Tuesday, October 13 at 10:00 AM" and "tomorrow at 10:00 AM". |
| 7 | Rules | Pass | At 9:20 CT the 9:30 slot is disabled with no caption (`aria-label` "unavailable"); 10:00 is open. The agent's own instant 15:30Z shows "Booked" at 10:30 AM CT. For an ET client, 12:30 PM (16:30Z) is open while CT 12:30 PM (17:30Z) and ET 11:30 AM (15:30Z) are blocked. Carrier window: Mutual of Omaha (8:30–4:30 CT, last start 1 h before close) gives a PT client 8:00 AM–1:30 PM. Saturday gives "doesn't take calls that day". On a Saturday the Today and Tomorrow cards are disabled and the grid jumps to Monday. **Weekends are only blocked through carrier hours:** a carrier with Saturday hours would be bookable, but no live carrier has any. **Unknown hours:** `carrier-hours` is called (lookup switch off), then the 9–5 ET fallback is used and the page says so. If the function fails, the same fallback applies. Carrier is required, and times stay dimmed until city, state and carrier are in. |
| 8 | Weekly cap | Pass | **Live DB, rolled back:** Premium comped had 1 used, so 15 inserts went through and the 16th attempt (17th booking) was refused with `P0001` and hint `weekly_cap`, "Weekly submission cap reached: 16 of 16 used this week on the Premium plan.", with no row written. Standard (not exempt): 6 went through and the 8th booking was refused. Comped is capped at its tier. `agent_change_booking` at 16/16 succeeded with used still 16 → 16 (it never uses a booking) and wrote 1 `edited` and 1 `moved` event. **UI:** at the cap there's a banner, the button reads "Weekly cap reached" (disabled), the sidebar says "Limit reached", and Standard offers Premium. The trigger is BEFORE INSERT only. The bypasses are in Finding 2. |
| 9 | 30-minute and double-booking rules are UI-only | **Fail (as expected)** | Direct inserts by the agent (rolled back) were **all accepted**: a call 5 minutes away, a call 2 days in the past, the same instant as an existing booking (`2026-10-12 13:00Z`), Saturday 3 AM CT, and no time at all. The same instant through `agent_change_booking` was also accepted. Only "in the past by more than 5 minutes" is checked server-side, and only in the RPCs. See Finding 3. |

## 3. Time zones

| # | Check | Result | Evidence |
|---|---|---|---|
| 10 | All zones and split states, failed/slow lookup, typo | Pass | Tomorrow 10:00 AM client time through the real form: NY→14:00Z ET; IL→15:00Z CT; CO→16:00Z MT; AZ Phoenix→17:00Z (no DST); CA→17:00Z PT; AK Anchorage→18:00Z; HI→20:00Z; FL Pensacola→Chicago, Miami→New_York; TX El Paso→Denver; TN Memphis→Chicago, Knoxville→New_York; IN Gary→Chicago, Indianapolis→Indianapolis; KY Paducah→Chicago; MI Ironwood→Menominee; ND Dickinson, SD Rapid City, NE Scottsbluff, KS Goodland, NV West Wendover→Denver; ID Boise→Boise, Coeur d'Alene→Los_Angeles; OR Ontario→Boise; AK Adak→Adak; AZ Tuba City→Denver. All 26 saved exactly. A failed lookup and a hanging one (aborted at 3 s, done in ~3.75 s) both fall back to the state's zone (FL→New_York). A city typo falls back to the state's zone and saves the city as typed. Node: all 15 split states covered, and a city hit in another state is ignored. |
| 11 | Agent zone ≠ client zone | Pass | **Pacific agent, Eastern client:** grid 8:00 AM–7:00 PM ET, saved 14:00Z, summary and success say 10:00 AM. **Eastern agent, Pacific client:** 8:00 AM–4:00 PM PT, saved 17:00Z. For both viewers, My Pipeline (Ora GA 9:00 AM, Pat TX 10:30 AM), the drawer ("Mon, Oct 12 · 9:00 AM"), Overview Up next (10:30 AM, 1:30 PM), header search (Rae OH "Tue, Oct 13 · 9:30 AM") and Change a booking ("Stays Wed, Oct 14 · 10:00 AM") all show **client** time. Activity times are the viewer's (the drawer's "Booked Fri, Oct 2 · 5:00 AM" for PT vs "8:00 AM" for ET). Pre-P724 rows with no `client_timezone` show in the viewer's zone, by design. |
| 12 | Daylight-saving edges | Pass | Booked Fri Oct 30 for Mon Nov 2 9:00 AM: ET 14:00Z, PT 17:00Z, AZ 16:00Z. Booked Fri Mar 12 2027 for Mon Mar 15 9:00 AM: ET 13:00Z, PT 16:00Z, AZ 16:00Z. A booking made Oct 30 for Tue Nov 3 10:00 AM ET, viewed Nov 2 by a CT and by a PT agent, shows 10:00 AM. Node: every 8 AM–8 PM slot round-trips on both change Sundays in 7 zones, and AZ vs an ET carrier moves from a 4:00 PM to a 5:00 PM last slot after Nov 1. Midnight crossing: a PT agent at 9:30 PM Sunday sees an ET client's "Today" as Mon Oct 12. |
| 13 | Weekly reset agrees at the boundary | **Fixed** (QA-1) + Finding | The meter (database week, profile zone): Sun 11:50 PM CT shows 2, Mon 12:10 AM CT shows 0. Before the fix, a PT browser on a CT profile showed "Resets Sun" in the sidebar and "Resets Sunday at midnight" on Billing; after QA-1, "Resets Mon" and "Resets Monday". **Still off:** Overview "Booked this week" uses the browser's week, so at Sun 10:10 PM PT (Mon 00:10 CT) Overview said 2 while the meter said 0. See Finding 6. |

## 4. Change a booking

| # | Check | Result | Evidence |
|---|---|---|---|
| 14 | Search, edit markers, keep vs new time, one update, no booking used | Pass | Search by first name, last name and phone (`010-1015` → Pat). Each edit shows "Changed · was …", and putting the value back clears it. Keep time: "Stays Wed, Oct 14 · 10:00 AM" and one `agent_change_booking` call with `p_at null`, no insert. New time: `p_at 2026-10-13T15:00:00.000Z`. Meter 0 → 0. Live DB: used 16 → 16. |
| 15 | No answer / Needs attention re-book, already-called, hidden statuses, RLS, `edited` event | Pass | No answer: "Save and re-book" is disabled until a time is picked, then sends `p_at`. Keep-time isn't offered. Pre-P724 rows need city, state and carrier first. Needs attention gets the same flow. Already called: "Pick a new time" is disabled but details save. The DB says "Fulfillment has already called this one — message them to move it." Search hides Cancelled (Ava–Finn), Confirm-the-number (Hal) and live (Ned), and shows No answer (Gail), Needs attention (Kim) and Booked. Deep links explain themselves ("Ava Qatest: can't be changed.") and Save stays disabled. Live DB: another agent's booking gives "Not your booking"; Cancelled gives "This one can't be changed"; number check gives "Confirm their number first"; no carrier, a bad state or an unknown zone are refused; `edited` events went 0 → 1. |

## 5. My Pipeline, Activity, Overview, Messages

| # | Check | Result | Evidence |
|---|---|---|---|
| 16 | My Pipeline matches the DB (Test Agent) | Pass | DB: 17 booked, 3 no answer (no recovery step), 0 needs, 6 cancelled = 26. UI at the DB's "now": Booked **17 / 65%**, No answer **3 / 12%**, Needs attention **0 / 0%**, Cancelled **6 / 23%**. Next Fulfillment call is Oct 12 → Ora (13:00Z = 9:00 AM ET), matching the DB's `min(scheduled_call_at)` of `2026-10-12 13:00Z`. Find any client and Recently booked work. The drawer opens with the client-time call. A brand-new agent's empty states have no Book a call link. Switching tabs doesn't change the top card heights at 1440 or 1920. |
| 17 | Activity | Pass | Morning → Afternoon → Evening, earliest first. The hero count equals the feed rows. The day arrows move back and forward. A row opens the drawer and sets `?client=&event=`. That deep link reopens the drawer. |
| 18 | Overview matches the DB | Pass | At the DB's "now" (Sat Oct 10, CT): Booked this week **1** (23 fewer than last week's **24**) and Cancelled this week **0** (5 fewer). Last week, Sep 28 – Oct 4, totals **24 / 5** (DB by CT day: booked 2,0,1,4,17,0,0, cancelled 2,0,0,2,1,0,0). "You're all caught up" with Up next when nobody needs the agent. The amber box lists Kim and Hal, and Gail (No answer) isn't in it. |
| 19 | Messages | Pass + **Fixed** (QA-2) | The inbox shows the thread and the sidebar badge is 1. Opening the thread writes a `direct_message_reads` row. The thread head shows the "TF" avatar. Send writes one `direct_messages` row (`peer_id` = Test Fulfill) and the message appears. The inbox note's lowercase date is fixed by QA-2. |

## 6. Billing (read-only and unit tests)

| # | Check | Result | Evidence |
|---|---|---|---|
| 20 | Comped Test Agent | Pass | Billing shows the Premium plan, Active, 16/week, and never "Exempt". Manage billing is read-only: "Switch to Standard", "Change payment method" and "Cancel subscription" are all disabled. **0** `agent-billing` requests while opening it (the page itself makes the usual `status` call). A comped `?subscribe=` link opens no checkout. Server: `core.ts` returns 409 "Your account isn't billed." for any action from an exempt profile. |
| 21 | Access gate, every state | Pass | Node, 14 cases, and UI with enforcement on: active → open; cancelled at period end → open until the end, then locked; past due inside the 48 h grace → open with the "payment didn't go through … Fix payment" banner; past due after grace → locked; no plan → locked; lapsed → locked; comped → never locked; fulfillment or admin → never gated. When locked, Billing ("Pick a plan to start booking") and Settings stay reachable. Stripe keeps retrying a past-due card; when it gives up (`canceled`/`unpaid`) the webhook sets `lapsed`. |
| 22 | Webhook and function | Pass (code + logs) | `invoice.payment_failed` → refetch the subscription → `past_due` with the grace clock starting at the first failure (a repeat keeps the first `grace_until`). A customer with no profile returns 200 `{ignored}`. Repeated events write the same state, so it's idempotent. The HMAC signature is checked with a time-skew limit. Old subscriptions' late events are ignored. Labels: `Link · email` / "Visa ending ####" (`methodOf`, P737/739). Return URL is `/agent/billing`. **Live logs, last 24 h:** no Stripe events, just 2 browser GETs to `/webhook` answered 400 "Bad signature". Not run against real Stripe. |
| 23 | Stripe email settings | Can't test | Brayden's item: see Brayden's live pass, step 8. |

## 7. Security and data

| # | Check | Result | Evidence |
|---|---|---|---|
| 24 | RLS as an agent (rolled back) | Pass, with findings | Own bookings visible: 26. Another agent's policies, events, details and messages: all 0. `agent_weekly_usage(other)` → "Not allowed". `profiles`: rows are selectable, but `billing_status`, `email` and `phone` give "permission denied" (column-scoped). `get_my_profile` → 1 row. Updating own `billing_exempt`, `billing_tier`, `billing_status`, `role`, `upline_id` (set to an admin), `is_active` or `stripe_customer_id` → "Only an admin can change that part of a profile". Another agent's profile: 0 rows. `rep_invites`: 0 visible, insert blocked by RLS. `app_settings`, `agent_billing_tiers`, `recovery_config` updates: 0 rows. Another agent's booking via RPC → "Not your booking"; via direct update or delete → 0 rows; reassigning own booking to someone else → RLS error. **But** an agent can freely update and delete its *own* bookings; see Findings 1 and 2. |
| 25 | Advisors | Pass (listed) | Security: 35 SECURITY DEFINER functions executable by `anon` (32 on Oct 6) and 49 by `authenticated` (45). New since then: `agent_set_booking_carrier`, `carrier_add` and `agent_change_booking`, all guarded by `auth.uid()`. Still there: 20 mutable `search_path`, `pg_net` in public, leaked-password protection off, `recovery_sms_log` with RLS on and no policy. Performance: new unindexed FK `policies_carrier_id_fkey` on the booking table; 76 RLS init-plan warnings and 187 multiple-permissive warnings, as before. See Finding 8. |
| 26 | Functions with a bad or missing JWT | Can't test live | The live probe (`curl` with no JWT and with a bad one) was blocked by this session's permission classifier. From the code and settings: `agent-billing` (verify_jwt **off**) → `getUser` gives 401 "Not signed in" (signed-out `status` returns only booleans). `send-agent-invite` (**on**) is a gateway 401. `carrier-hours` (**on**) is a gateway 401. `start-agent-caller-id-call` (**on**) is a gateway 401. `agent-caller-id` (**off**) → `getUser` gives 401. `claim-invite` (**off**, public by design) needs a valid token. `recovery-reschedule` (**off**, public client link) needs `recovery_token`. `recovery-sms` (**on**). Also: `run-migration-034` is deployed with verify_jwt **off**; see Finding 9. |

## 8. Every agent page

| # | Check | Result | Evidence |
|---|---|---|---|
| 27 | 12 views × dark/light × 1440/1920/820/390 | **Fail** (error states) | 96/96 page loads render with no console errors, no sideways scroll and no outbound requests. 4 overlap flags were reviewed by eye and are false positives: Billing at 820 measured a bold date across a line wrap, and Book a call at 390 has the fixed bottom bar over the scrolling form, which is intended. Keyboard, 14/14: the main action on each page is reachable by Tab with a visible focus ring (inputs show it on the `.ov-input` wrapper), and Enter or the arrow keys work (Pipeline tabs use arrow keys, per ARIA). Loading states: 5/5 show skeletons or "Loading…". **Error states: only My Pipeline says a load failed.** When their query fails, Overview, Activity, Messages and Change a booking look like a brand-new empty account ("Nothing on the books yet", zeros). See Finding 7. |
| 28 | Build, eslint, leftovers | Pass | `vite build` passes (only the existing >500 kB chunk warning). eslint: agent-side errors are only the known `Login.jsx:58` and `DashboardLayout.jsx:244` `set-state-in-effect`. Other existing errors are in legacy/pre-pivot files (scrapers, `DayFilterBar`, `RangeCalendar`, `SecretsContext`, `usePolicies` unused vars). `grep` for `console.log`/`debug`, `authdebug` and TODO/FIXME in `src`: none. |

## 9. Not live yet

| # | Check | Result | Evidence |
|---|---|---|---|
| 29 | Texting, invites | Pass | `recovery_config.sms_live = false` (live). `send-agent-invite` text is gated on `sms_live`. Invite email needs `RESEND_API_KEY` + `INVITE_FROM_EMAIL`; secrets can't be read from here, but [[Memories]] (P731) still lists them as Brayden's to add. No invites were created in the last 2 days (live count 0). Both invite tabs say coming soon (harness, with status returning both false). |

## Findings for Brayden

Ordered by how much they matter. **None of these were built.**

1. **Agents can write their own bookings directly, around every rule.** `policies_update` / `policies_delete` let an agent change any column of its own rows through the API (no column limits). In the rolled-back test an agent marked its own client Cancelled (`fulfillment_stage='Complete'`), moved a call Fulfillment had already made and reset `call_attempts`, and deleted a booking. The portal never does this, but anyone with the agent's login and the public anon key can. *Suggested fix:* revoke direct UPDATE/DELETE on `policies` from agents and send every agent write through the existing RPCs (`agent_change_booking`, `agent_rebook_call`, `agent_set_booking_carrier`, `agent_confirm_recovery_number`). Fulfillment keeps `fulfillment_update_assigned`. Check first that nothing in the app still writes `policies` directly as an agent (`usePolicies.js` update/delete are pre-pivot paths).
2. **The weekly cap can be beaten two ways** (both shown live, rolled back). (a) Insert with `fulfillment_assigned=false`, then update it to `true`: the trigger is BEFORE INSERT only, which got to 17/16. (b) Delete a booking from this week to free a slot (16 → 15). *Suggested fix:* Finding 1 closes (b). For (a), also fire the trigger on `UPDATE OF fulfillment_assigned`, or count "booked" events instead of live rows.
3. **Notice, double-booking, time required and carrier hours are UI-only.** Direct inserts at 5 minutes out, 2 days ago, the same instant as an existing booking, Saturday 3 AM, or with no time were all accepted. *Suggested guard:* a BEFORE INSERT/UPDATE OF `scheduled_call_at` trigger for agent callers: time not null, at least about 25 minutes ahead, and no other open booking by the same agent at the same instant. A partial unique index on `(agent_id, scheduled_call_at) where fulfillment_stage <> 'Complete'` works; no duplicates exist today. Carrier hours could stay advisory.
4. **Agents see a time zone name.** The carrier hours line reads "Prudential takes calls Mon–Fri 8:00 AM–8:00 PM **ET** · times shown are Dallas's local time", and the fallback reads "using 9–5 **Eastern**" (Book a call, Change a booking, My Pipeline re-book). That breaks the "never show a zone" rule. *Suggested fix:* show the hours in the client's time ("Prudential takes calls 7:00 AM–7:00 PM Dallas time"), or drop the hours and keep "times shown are Dallas's local time". The fallback could read "We couldn't find their hours, so we're using standard business hours."
5. **The Preferences time zone card text is wrong.** It says "Call times, reminders and Activity show in this zone." Since P724 call times are the client's, and Activity's days follow the browser. *Suggested text:* "Your clock and your booking week (it resets Monday at midnight here) use this zone. Call times always show in the client's own time."
6. **Profile zone vs browser zone.** Every agent's `profiles.timezone` defaults to `America/Chicago`. The server week (cap, reset) uses it, but Overview's "Booked this week", the greeting, "calls today" and Activity's days use the browser's zone. For a Pacific agent who never opens Preferences, the cap resets at 10 PM Sunday their time, and for two hours Overview and the meter disagree (measured: Overview 2, meter 0). QA-1 fixed the labels only. *Suggested fix:* on first sign-in, when `timezone_confirmed_at` is null, set the profile zone from the browser (or ask once), and use the profile zone for Overview's week and day math.
7. **A failed load looks like an empty account.** If the bookings, events or threads query fails, Overview shows zeros and "Nothing on the books yet". Activity, Messages and Change a booking look empty too. Only My Pipeline shows an error. *Suggested fix:* the same small "Couldn't load your calls · Try again" note My Pipeline uses.
8. **Advisor clean-up (security).**
   - `resolve_login_email` is callable by anyone and returns the email for a username. Only three usernames exist, but one is `brayden11`, so Brayden's sign-in email is exposed.
   - Pre-pivot `request_rep_leads`, `assign_daily_batches`, `eod_pipeline_sweep` and `process_lead_queues` are callable by `anon`.
   - Leaked-password protection is off.
   - *Suggested fix:* one migration that revokes `anon` execute on everything except what login needs, and retires the usernames or limits the resolver. Also add an index on `policies(carrier_id)`.
9. **Stray infrastructure.**
   - The `run-migration-034` edge function is deployed with JWT verification off. Anyone can call it, and it connects with the database superuser URL. It only runs one idempotent `ALTER TABLE … ADD COLUMN IF NOT EXISTS`, so it's low risk, but it should be deleted.
   - The cron job `send-appointment-reminders` POSTs every 5 minutes to a function that isn't deployed (404s in the logs). Unschedule it.
10. **Question, not a bug:** a comped agent's Billing says "Next charge of $500 on Mon, Oct 19". That follows the P725 design ("shown exactly as an active subscriber"), but a comped agent may read it as a real charge. Keep it, or say "Renews Mon, Oct 19"?

## Brayden's live pass

About 15 minutes, logged in as Test Agent in Opera GX. Each step has "expect" and "if not, tell Eagle".

1. **Settings → Sign-in & security, click the Current password box.** Expect: no saved-login list drops down, and the dots look like a password box. If not, tell Eagle "Opera still offers saved logins on Current password" (the next options are in P742's note).
2. **Same card.** Expect: "Forgot password?" sits under the box, lined up with its left edge, and Continue is level with the box. If not, send a screenshot.
3. **Collapse the sidebar** (the arrow beside "Ohvara Portal"). Expect: a smaller 32 px arrow box, the avatar a plain round circle with a faint ring on hover, and the collapsed sidebar still there after a reload. If not, tell Eagle which part.
4. **Settings header.** Expect: "Test Agent · Two-step off" under "Settings", not your email. If not, tell Eagle.
5. **Book a same-zone client:** Dallas, TX, Prudential, tomorrow 10:00 AM. Expect: the grid runs 8:00 AM–6:00 PM, the summary and success screen say 10:00 AM, and My Pipeline and Activity show it at 10:00 AM. If not, tell Eagle the time you saw on each.
6. **Book a Pacific client** (Los Angeles, CA, Prudential, tomorrow 10:00 AM) **and an Eastern one** (Atlanta, GA, Prudential, tomorrow 11:00 AM). Expect: every page shows 10:00 AM and 11:00 AM, the client's own times. If any page shows a Central time instead, tell Eagle which page.
7. **Try to book inside 30 minutes, then the exact time you just booked in step 5.** Expect: the next 30 minutes are greyed with no caption, and 10:00 AM Dallas shows "Booked". 11:00 AM Dallas (= Eastern 12:00) stays open. If not, tell Eagle.
8. **Stripe dashboard → Settings → Billing → Customer emails.** Expect: "Successful payments" is on and "Send emails when card payments fail" is on (not confirmed so far). Also check the retry schedule under Subscriptions and emails → Manage failed payments; the portal's grace is 48 hours. If either is off, turn it on and tell Eagle.
9. **Change a booking → pick the Dallas client and change only the phone.** Expect: "Changed · was …" under the field, "Stays Tue, Oct 13 · 10:00 AM", and after saving the meter count unchanged. If not, tell Eagle.
10. **Change the Pacific client's time to the day after, 9:00 AM.** Expect: My Pipeline shows the new time, Activity shows a "moved" entry, and the meter is unchanged. If not, tell Eagle.
11. **Billing → Manage billing.** Expect: "You're comped, so this page is read-only" and all three buttons greyed. If not, tell Eagle.
12. **Clean up:** ask Fulfillment, or Eagle via CC, to cancel or remove the three test bookings from steps 5–6 (agents can't withdraw bookings by design).

## Related

[[Ohvara CC Queue]] · [[Memories]] · [[LIVE_STATE]] · [[North Star]] · [[DESIGN]] · [[carrier-hours]]
