---
date: 2026-10-16
description: "P770 Admin portal hardening: admin powers checked on live (rolled back) as Admin, Test Agent and Test Fulfill. Sign-up-as-admin closed, append-only audit log, 17 open functions retired. Results, fixes, findings, Brayden's steps."
tags:
  - ohvara
  - qa
  - admin
quarter: Q4-2026
status: completed
---

# Admin Portal QA Report (P770)

Run 2026-10-16 by CC (Opus 5.5) on `ohvara-dashboard` `cb123be`. Fixes: `e1cb028` (P770-1), `151110f` (P770-2), `b09ba14` (P770-3), `1f0146d` (P770-4), `d803bb8` (P770-5). Migrations 152–154 are live, and 21 edge functions were redeployed (Brayden's go in-session). Queued in [[Ohvara CC Queue]], ship note in [[Memories]]. Same kind of pass as [[Agent Portal QA Report]] and [[Fulfillment Portal QA Report]].

## Summary

| Result | Count | Checks |
|---|---|---|
| **Pass** | 13 | 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.4, 4.1, 4.2, 4.3, 5.1, 5.4, 6.1 |
| **Fixed** | 10 | 1.5, 1.6, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 5.2, 6.2 |
| **Fail** | 0 | |
| **Can't test** | 1 | 5.3 (reset-link expiry is an Auth dashboard setting) |

**How it was tested.** Rolled-back SQL on live: each run created the new migrations, ran a `DO` block and ended in `raise exception`, so nothing was saved. It ran as Admin (Brayden's id through JWT claims; his login was never used), Test Agent, Test Fulfill, three throwaway users made inside the block, and signed out (`anon` grants). The block ran about 60 checks; a second run covered Give to and role changes. After the fixes were live: a real public sign-up through the Auth API with `role: admin` in the data, and signed-out calls to every retired function. Edge functions were read line by line. The bundle came from `vite build` and was searched with grep. Clean-up: 0 test users, invites, payouts or cancels left. Test Fulfill still has 26 calls, Test Agent 45 bookings, and the weekly cap is still 40.

**Before the fix (proved on live, rolled back):** a sign-up with `role: admin` in its user data **became an admin** and could list every profile. An admin could make an admin invite, change their own role by writing `profiles` directly, and turn off the last admin. History rows (`policy_events`) could be edited.

## Fixed

- **P770-1, migration 152 + claim-invite, who becomes an admin.** Public sign-up is on in Auth, and `handle_new_user` copied `role` from the sign-up's user data, which the person signing up writes themselves. Now the role comes only from `app_metadata`, which only the service role can set, and it must be agent or fulfillment. A plain sign-up is refused ("Database error saving new user"). `claim-invite` passes the role there and now **takes the invite in one conditional update** before making the account, so two people using the same link at the same moment can't both get an account. Invites can only be for agent or fulfillment (check constraint). Nobody signed in can change role or access by writing `profiles` directly, admin included; the Users page RPCs still work. Signed-in users can't insert profiles. **The last active admin can't be demoted, turned off or deleted by any path**, SQL included. `is_admin()` is false for an admin whose access is off.
- **P770-2, migration 153, the record.** New `admin_audit_log`: who, how (API role), what changed (old and new values of the changed columns only), when. It records role/access/upline/comped/tier changes, new and deleted accounts, every settings switch (`recovery_config`, `app_settings`, billing tiers, pay rates), invites (never the token), a cancel paid / re-pointed / **un-paid**, every payout status change, and a deleted call. Cancel decisions stay in `fulfillment_cancel_events` and Give to in `policy_events`. **All three logs are append-only for everyone**, the service role and SQL included: UPDATE, DELETE and TRUNCATE are refused. Two narrow exceptions: a row goes when its call or cancel is deleted (FK cascade), and an event can be annotated in the same transaction that wrote it (`fulfillment_correct_result` does this). Admins can read the log; nobody else can.
- **P770-3, migration 154, TRUNCATE.** Supabase's default grants gave `anon` and `authenticated` TRUNCATE on almost every table, payouts included. TRUNCATE skips RLS. Revoked, and for future tables too.
- **P770-4, three legacy admin functions.** `admin-create-user` (any role including admin, no record, kept the password in plain text in `rep_credentials`), `admin-toggle-user` (skipped the self/last-admin checks, the sign-out and the call release) and `admin-delete-user` (could delete yourself or the last admin). Nothing called them. They now answer 404, and their dead hooks are gone from `useProfiles.js`.
- **P770-5, 17 open pre-pivot functions.** See 6.2. They now answer 404.

## 1. Admin-only, everywhere

| # | Check | Result | Evidence |
|---|---|---|---|
| 1.1 | Give to, decide cancel, role, access refuse non-admins | Pass | As agent and as rep: `admin_give_call`, `fulfillment_decide_cancel`, `admin_set_user_access`, `admin_set_user_role` → 42501. `admin_list_profiles` → 0 rows. |
| 1.2 | Settings switches (`voice_live`, `recording_live`, `sms_live`, `payouts_live`, Pause, rate, minimum, cap, notice) | Pass | One UPDATE flipping all of them, as agent and as rep → 0 rows. `app_settings` 0, billing tiers 0, pay rate insert 42501, invite insert 42501. |
| 1.3 | Recordings, Users, Payouts and admin views | Pass | As agent and as rep, the sum of recordings + pay runs + invites + audit log + secrets + credentials + cancel events + other people's payouts = 0. `fulfillment-recording` and `fulfillment-stripe-balance` check `role = admin` in code. |
| 1.4 | Signed-out callers | Pass | No `admin_*`, decide, claim/finish-payout or new trigger function can be run by `anon`. The internal helpers (`admin_user_guard`, `admin_open_work`, `admin_release_calls`, …) can't be run by signed-in users either. |
| 1.5 | Legacy admin edge functions | Fixed | See P770-4. Signed out → 404. |
| 1.6 | A turned-off admin | Fixed | Before, `is_admin()` looked at role only. Now a second admin made in the block and turned off → `is_admin() = false`. |

## 2. Safe even for the admin

| # | Check | Result | Evidence |
|---|---|---|---|
| 2.1 | Can't change a client's status or set results | Pass | Admin direct UPDATE of a call's stage → 0 rows. Mark cancelled, end call, correct result → 42501 (assigned rep only). |
| 2.2 | Can't edit pay by hand | Pass | Admin UPDATE of a cancel's amount, a payout's amount, or INSERT of a payout → 42501 (no grant). Pay comes from `fulfillment_payable` (cancels + `recovery_config`). |
| 2.3 | Paid once; un-paid only with a record | Fixed | Deciding a paid cancel → 22023 "already paid" (Pass). A paid payout moved to failed un-paid its cancel with no trace before. Now `admin_audit_log` has the cancel's `paid_at` going to null and the payout's status change. The P769 double-pay fix stands. |
| 2.4 | Own access/role; the last admin | Fixed | Before: admin direct own-role UPDATE = 1 row, last admin turned off = 1 row. After: own role / own access direct → 42501; RPC on self → 42501; last admin off, demoted, or auth user deleted (as the owner) → 42501. Admin editing someone's name still works (1 row). |
| 2.5 | Every decision, role, access, Give to and settings change is recorded and can't be edited | Fixed | Logged with actor = admin, via = authenticated: invite (no token), cap change, access off/on, role agent→fulfillment (`{"role":"agent"}`→`{"role":"fulfillment"}`). Give to → `policy_events` 'reassigned' with the admin as actor. As the owner: log update/delete/truncate, old event update/delete, events truncate, cancel-event delete → all 42501. Same-transaction annotation → 1 row. Deleting a call with events works and is logged. |

## 3. Who becomes an admin

| # | Check | Result | Evidence |
|---|---|---|---|
| 3.1 | Sign-up | Fixed | Before: user data `role: admin` → admin profile. After: that, a plain sign-up, and `app_metadata.role = admin` → all 42501. Invite-style (app = agent, user data = admin) → agent. Live: real `POST /auth/v1/signup` with `role: admin` → refused, 0 users made. |
| 3.2 | Invites | Fixed | Admin invite with role admin → 23514 (check). `send-agent-invite` already allowed only agent or fulfillment. Two claims of one link at once: closed by the conditional take (code; no real invite was claimed). |
| 3.3 | `profiles.role` by its owner, or by anyone writing directly | Fixed | Owner → 42501 (already true for non-admins). Admin → 42501 now. Profile insert → 42501. |
| 3.4 | Role RPC | Pass | `admin_set_user_role(…, 'admin')` → 22023 "Pick Agent or Fulfillment". There is no in-app way to make a second admin (see Finding 4). |

## 4. Secrets and data exposure

| # | Check | Result | Evidence |
|---|---|---|---|
| 4.1 | Built bundle | Pass | Searched `dist` for Supabase secret keys, Stripe `sk_`/`rk_`/`whsec_`, Twilio `AC`/`SK` ids, Anthropic, Resend, Deepgram tokens, JWTs, `service_role`: none. Only the publishable key (expected). The bundle also carries the TwiML App SID and the InsuranceToolkits embed token (public by design; Finding 6). |
| 4.2 | API responses | Pass (code) | `fetch-secrets` returns yes/no flags and secret names only, never values (the `secrets` table is empty). `username-sign-in` returns tokens only for the right password (P768). No function echoes an env value. |
| 4.3 | Admin views leaking to other roles | Pass | See 1.3: 0 admin rows for agent and rep. |

## 5. Sign-in and sessions

| # | Check | Result | Evidence |
|---|---|---|---|
| 5.1 | Turned-off user signed out, can't refresh | Pass | `admin_set_user_access` off → 0 sessions, banned until 2999, refresh tokens deleted. P769 made `is_fulfillment()` and the write block check `is_active`. |
| 5.2 | Invite links single-use and expire | Fixed | 7-day expiry and `used_at` were checked before; the race is closed now (3.2). |
| 5.3 | Password reset links | Can't test | Supabase recovery links are single-use. How long they last is the Auth → Email "OTP expiry" setting, which no tool here can read (Brayden step 3). |
| 5.4 | Admin pages redirect non-admins | Pass (code) | All five `/admin/*` routes use `ProtectedRoute allowedRoles={['admin']}`, and the data calls fail on the server anyway (section 1). |

## 6. Advisors and edge functions

**6.1 Advisors (security), before → after: unchanged.** anon can run a definer function 5 → 5 (the RLS helpers, kept on purpose). Signed-in can run a definer function 40 → 40. Mutable search_path 23 → 23. RLS with no policy 2 → 2 (`notification_emails`, `recovery_sms_log`, service-only). pg_net in public 1 → 1. Leaked-password check off 1 → 1. The new trigger functions are not callable through the API.

**6.2 The JWT setting doesn't stop signed-out callers. Fixed for the open ones.** Probe: a JWT-on function called with only the public key (`apikey`, the one every browser has) **reached the function code**. Only a call with no headers at all is turned away. So a function is safe only if its own code checks the caller. 17 pre-pivot functions checked nobody, and nothing in the app or cron calls them. Some could spend money (Retell roleplay calls, Twilio lead calls, Claude scripts, Stripe links). They were retired to 404 stubs on Brayden's go: `recommend-stack`, `provision-client`, `provision-demo-client`, `build-agent`, `generate-stripe-links`, `create-checkout-session`, `create-roleplay-call`, `score-roleplay`, `create-lead-call`, `cleanup-lost-demo`, `enrich-business-info`, `assign-closer`, `assign-daily-batch`, `schedule-reminders`, `generate-ai-script`, `get-demo-preview`, `twilio-voice-webhook`.

| Function (verify_jwt) | Who it lets in | Right? |
|---|---|---|
| `process-reminders`, `trigger-re-engagement`, `redistribute-no-answers`, `recovery-sms`, `notify-email` (off) | Vault cron secret | Yes |
| `fulfillment-pay-week`, `fulfillment-cancel-check` (not deployed; P764) | Cron secret (+ Twilio signature) | Yes, once deployed |
| `fulfillment-voice` (off) | Twilio signature | Yes |
| `agent-billing` (off) | Stripe signature on the webhook; signed-in user + role for actions | Yes |
| `claim-invite`, `recovery-reschedule` (off) | The secret link token | Yes |
| `username-sign-in` (off) | The password | Yes |
| `agent-caller-id` (off), `start-agent-caller-id-call`, `carrier-hours`, `send-agent-invite`, `fulfillment-call`, `fulfillment-connect-session`, `fulfillment-stripe-balance`, `fulfillment-recording` (not deployed) (on) | Signed-in user + role, checked in code | Yes |
| `twilio-token` (on) | Signed-in user; the token is for that user | Yes |
| `fetch-secrets` (on) | Anyone gets yes/no flags; admin role for names and writes | Yes (legacy; Finding 5) |
| `indeed-scraper`, `maps-scraper`, `stripe-connect-onboard`, `stripe-pay-commission`, `create-commission-payout` (on) | Signed-in user (+ a role check in most) | Pre-pivot; delete (step 1) |
| `admin-create-user`, `admin-toggle-user`, `admin-delete-user`, `run-migration-034` + the 17 above | Nobody (404) | Yes; delete (step 1) |

## Findings for Brayden (not built)

1. **Turn off "Allow new users to sign up"** in Supabase → Authentication → Sign In / Providers. The trigger now refuses plain sign-ups, but the switch closes the door before the database is reached. Invites keep working; they use the admin API.
2. **Delete the dead functions** in Supabase → Edge Functions: the 21 stubs (P770-4, P770-5, `run-migration-034`) and the 5 pre-pivot ones in the table that still run.
3. **The `rep_credentials` table** held plain-text passwords for admin lookup. It's empty and nothing writes to it now. Dropping it is a one-line follow-up.
4. **There's no in-app way to make a second admin.** The role RPC only allows Agent or Fulfillment (P762). That's stricter than the spec. If a second admin is ever wanted, it's a small RPC change with its own log entry.
5. **`fetch-secrets`** encrypts with a built-in fallback key if `SECRETS_ENCRYPTION_KEY` isn't set. The `secrets` table is empty and unused (all keys live in Supabase secrets), so it's harmless today. Retire it with the Settings capability flags whenever that page changes.
6. **Leaked-password protection** is still off (Auth → Passwords), as in P768.

## Not checked

- Not seen logged in on live. No Playwright run: nothing on screen changed (four unused hooks were removed).
- No real invite was claimed after the claim-invite redeploy. The app_metadata path was proved in SQL, and the function's code path was checked by reading it. The first real invite is the live test (step 4).
- The admin Settings / Payouts / Users pages weren't clicked through after migration 153. Their writes are the same UPDATEs as before, now with an extra log row.

## Brayden's live pass (10 minutes)

1. Do Findings 1 and 2 in the Supabase dashboard.
2. In Admin → Settings, flip one switch (e.g. Pause payouts) on and back off. Then in the SQL editor, `select * from admin_audit_log order by id desc limit 5` shows both changes with your name.
3. Auth → Email: check the reset/OTP link expiry (1 hour is fine).
4. Admin → Users → invite a throwaway Agent, open the link in a private window and join. The account should be an Agent. Opening the same link again should say "already used". Then turn its access off.

## Related

- [[Agent Portal QA Report]] · [[Fulfillment Portal QA Report]] · [[Memories]] · [[LIVE_STATE]] · [[Gotchas]]
