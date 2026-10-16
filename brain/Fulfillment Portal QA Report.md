---
date: 2026-10-16
description: "P769 Fulfillment portal hardening: every rep rule checked on the live database as a throwaway rep, Test Fulfill and Admin (rolled back). Results, the 4 fixes (migrations 148–151), findings, Brayden's steps."
tags:
  - ohvara
  - qa
  - fulfillment
quarter: Q4-2026
status: completed
---

# Fulfillment Portal QA Report (P769)

Run 2026-10-16 by CC (Opus 5.5) on `ohvara-dashboard` `6feddfa` → fixes `b0dcf87` (P769-1), `2f6164f` (P769-2), `b86be7a` (P769-3), `cb123be` (P769-4). Migrations 148–151 are live (Brayden's go in-session). Queued in [[Ohvara CC Queue]], ship note in [[Memories]]. Same kind of pass as [[Agent Portal QA Report]].

## Summary

| Result | Count | Checks |
|---|---|---|
| **Pass** | 15 | 1.3, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.5, 4.1, 4.2, 4.3, 5.1, 6.2, 6.3, 7 |
| **Fixed** | 6 | 1.1, 1.2, 2.1, 2.2, 3.4, 6.1 |
| **Fail** | 0 | |
| **Can't test** | 2 | 4.4 (no live probes of the Twilio/Stripe endpoints: blocked), 4.5 (three functions aren't deployed yet) |

**How it was tested.** `DO` blocks on the live database, each ending in `raise exception`, so nothing was saved. They ran as a throwaway second rep ("Rep B", made inside the block), as Test Fulfill (26 assigned calls), as Test Agent and as Admin (`set local role authenticated` plus JWT claims). The edge functions were read line by line; deployed JWT settings come from the function list. Zone and DST maths: the real `fulfillmentDay.js` loaded through Vite, plus SQL on the same instants. The UI change is two mutations moved to RPCs: eslint and `vite build` pass, and nothing on screen changed. No Playwright run (see Not checked). Clean-up: 0 test users, profiles, policies or payouts left. Test Fulfill still has 26 calls, Test Agent 45 bookings.

**Before the fix (proved on live as Rep B):** saw all 26 of Test Fulfill's calls; read all 45 rows of agents' commission (`team_performance_policies`); could post in another rep's call thread; edited another rep's call (1 row), moved it to themselves (1 row) and marked it Cancelled. That **created a $10 cancel in Rep B's name**.

## Fixed (one migration per area)

- **P769-1, migration 148, reads.** `fulfillment_select_assigned` now needs `assigned_fulfillment_id = auth.uid()`. Call history (`policy_events`) covers the calls you can see, plus results you logged yourself, so a call you passed on still counts on your Overview. `can_message_policy` lets in the agent, an admin, or the assigned rep only (it used to let in any rep). `team_performance_policies` only returns rows to agents or admin. Nothing in the app calls it, so 150 also revokes it.
- **P769-2, migration 149 + UI, writes.** Dropped `fulfillment_update_assigned`, so a rep has no direct UPDATE on `policies`. New `fulfillment_mark_cancelled` and `fulfillment_save_notes` RPCs (assigned rep, active, not already Complete) replace the portal's last two direct writes: Mark cancelled (drawer, focus card) and the phone's result screen. `policies_insert` now also needs agent or admin, so a rep can't book a "client" under their own id.
- **P769-3, migration 150, pay once.** A real double-pay path: when a transfer failed, its cancels kept the failed payout's id. The next Monday's payout counted them in its amount but didn't re-point them, so they were never stamped paid and went out again the week after. `fulfillment_claim_payout` now points every cancel it counts at itself. The same migration revokes the dead `fulfillment_sync_payouts`, `fulfillment_fix_hours` and `fulfillment_cancel_locked`.
- **P769-4, migration 151, access off.** A rep turned off kept up to an hour of working token against the database. Now `is_fulfillment()` needs `is_active`, and a new `a0_block_inactive_writer` trigger on `policies`, the details, both kinds of message, the message reads and the shifts refuses any write by a signed-in user whose access is off. Admin, cron and edge functions are unaffected.

## 1. What a rep can see

| # | Check | Result | Evidence |
|---|---|---|---|
| 1.1 | Only their own calls and those clients | Fixed | Rep B before: 26 calls. After: 0 policies, events, threads, details, cancels and payouts. Test Fulfill still sees 26. |
| 1.2 | No other reps' calls or pay, agents' clients or commission | Fixed | `team_performance_policies` 45 rows → 42501. `fulfillment_payable` / `week_figures` / `week_days` for another rep → 42501 (already guarded). |
| 1.3 | No recordings, transcripts or AI results | Pass | `fulfillment_recordings`, `fulfillment_cancel_checks` and `fulfillment_cancel_events` are admin-only: 0 rows for a rep. Other people's profile emails, phones and Stripe ids are column-blocked for every signed-in user. |
| — | Pipeline and search | Pass (via 1.1) | Both read `useFulfillmentQueue`, which RLS now limits. They used to filter on screen only. |

## 2. What a rep can change

| # | Check | Result | Evidence |
|---|---|---|---|
| 2.1 | Only their own calls, only through RPCs | Fixed | Rep B: direct update 0, steal 0, delete 0. Test Fulfill direct update of its own call: 0. Start, end, correct, reason, pass on, mark cancelled and notes on another rep's call → 42501. |
| 2.2 | Can't book as a rep | Fixed | Valid Mon 2 PM CT MoO slot: agent passes RLS, rep gets "new row violates row-level security". |
| 2.3 | Can't start more than 5 min early | Pass | Call 2 h out → `too_early`. 4 min out → starts. |
| 2.4 | Can't correct after paid; can't verify own cancel, change its amount, or reassign | Pass | Correcting a locked cancel → "This cancel is already paid. Message Brayden…". Cancel/payout UPDATE or INSERT → 42501 (no grant). Paid amount change → 42501. `fulfillment_decide_cancel` → 42501. `agent_flag_cancel` as rep → 42501. `admin_give_call` → 42501. Mark cancelled twice → 22023. |
| 2.5 | Can't change own role, access, or another profile | Pass | Own role, own Stripe id → 42501 (guard trigger). Another profile → 0 rows. `admin_set_user_access` / `admin_set_user_role` → 42501. `recovery_config` and `fulfillment_pay` → 0 rows. |
| — | Own call, the normal path | Pass | Notes save trimmed. Mark cancelled with proof → Complete / In Effect / `C-1` / drafts stopped, notes kept. Cancel row `needs_listen`, $10, rep correct. |

## 3. Pay and money

| # | Check | Result | Evidence |
|---|---|---|---|
| 3.1 | Amounts computed on the server | Pass | The cancel amount comes from `recovery_config.pay_per_cancel_cents` in the trigger, and the run amount from `fulfillment_payable`. The rep's RPCs take no amount. |
| 3.2 | Connect session opens only your own account | Pass | `fulfillment-connect-session`: the account id comes from the caller's own profile, never the body. `stripe_account_id` can't be self-edited. |
| 3.3 | Pay run: only the cron | Pass | `fulfillment-pay-week` returns 403 without the Vault cron secret. Admins get the same 403 ("automatic"), which is stricter than the spec. `fulfillment_claim_payout` / `finish_payout` aren't callable by a rep (42501). |
| 3.4 | Paid once, with two runs or a retry | Fixed | Simulated: W1 transfer fails, W2 claim takes X+Y ($20, 2 cancels), X re-pointed. After W2 paid, X and Y are stamped paid. W3 payable is 0. A second W2 claim returns null, and a repeat W1 claim returns the same row. |
| 3.5 | `payouts_live` off and Pause block every path; webhook signatures | Pass | Both checked before anything moves (core.ts 128–129). The transfer uses a Stripe idempotency key. `agent-billing/webhook` checks Stripe-Signature (HMAC, 5-min skew, two secrets). |

## 4. Calls and recordings

| # | Check | Result | Evidence |
|---|---|---|---|
| 4.1 | Voice token only for your own conference | Pass | Token identity = JWT user. `fulfillment-voice` joins `policy-<id>` only for the assigned rep or an admin, on an assigned, unfinished call, with `voice_live` on. |
| 4.2 | Signatures and JWTs | Pass (code) | `fulfillment-voice` and `fulfillment-cancel-check` need X-Twilio-Signature (cancel-check also takes the cron secret). `fulfillment-call` and `fulfillment-recording` need JWT plus role. Deployed: voice `verify_jwt` off, call on, connect-session on. |
| 4.3 | Recording: admin-only stream, no public URL | Pass (code) | Admin role check → streams from Twilio with Ohvara's credentials, `no-store`. Only the SID is stored. |
| 4.4 | `voice_live` / `recording_live` off → nothing dials or records | Pass (code) / Can't test live | Both switches are read on every request. A signed-out probe of the live endpoints was blocked by the safety check. |
| 4.5 | `fulfillment-recording`, `fulfillment-cancel-check`, `fulfillment-pay-week` live | Can't test | **Not deployed** (still the P764 Brayden step). `fulfillment-voice` is still v1 (P751). |

## 5. Messages and notifications

| # | Check | Result | Evidence |
|---|---|---|---|
| 5.1 | Own threads and notifications only; can't post as someone else | Pass | Others' notifications: 0. Insert a notification → 42501. Post in another rep's thread, or as another person in a thread or DM → 42501. |

## 6. Edge cases

| # | Check | Result | Evidence |
|---|---|---|---|
| 6.1 | Access off: signed out, no RPC, future calls released | Fixed | Before: RPCs looked only at role. After, with access off: sees 0 calls; start, mark and clock-in → 42501; messages and DMs → 42501. The admin turn-off left 0 sessions, and the future call moved to another rep (auto-assign skips inactive reps). |
| 6.2 | Rep outside Central | Pass | LA rep: 2:00 PM PST call opens at 1:55 PM. The week runs Mon–Sun in LA time, and server and UI agree. At Sun 10:01 PM PST (Mon in Central) it's still the LA week of Oct 26. |
| 6.3 | DST day, Nov 1 2026 | Pass | LA Nov 1 is 25 hours long. 1:30 AM PDT and 1:30 AM PST are both in the week of Oct 26. Week cut is Mon 00:00 PST (08:00 UTC). The unlock is 5 min before the absolute time, so it's DST-safe. |

## 7. Advisors (security)

| Lint | Before | After |
|---|---|---|
| anon can run a security-definer function | 5 | 5 (RLS helpers, left on purpose as in P768) |
| signed-in can run a security-definer function | 42 | 40 (−4 revoked, +2 new rep RPCs that check the caller) |
| mutable search_path | 23 | 23 |
| RLS with no policy | 2 | 2 (`notification_emails`, `recovery_sms_log`, service-only by design) |
| pg_net in public / leaked-password off | 1 / 1 | 1 / 1 |

## Findings for Brayden (not built)

1. **Deploy the P764 functions:** `fulfillment-cancel-check --no-verify-jwt`, `fulfillment-pay-week --no-verify-jwt`, `fulfillment-recording`, and redeploy `fulfillment-voice --no-verify-jwt`. Until then there's no recording playback and no AI check, and the Monday cron gets a 404. That's harmless while `payouts_live` is off.
2. **Team chat channels** (`team_messages` where type = channel) are readable by any signed-in user, reps included. This is the old team chat. Decide whether reps should see it before any are hired.
3. **Reps can still update their own `email` and `phone` columns on `profiles` directly.** That's harmless today, but `email` can drift from the login email. Moving profile edits to an RPC would be a small follow-up.
4. **The phone result screen and the server disagree for one minute at midnight.** A call at 12:03 AM opens at 11:58 PM on the server, but the UI waits for the new day. The UI is the stricter one; left as is.

## Not checked

- Not seen logged in on live; no Playwright harness run (the change on screen is nil: same buttons, same results, now via RPC). Live deploy order: the migrations went in a few minutes before Vercel built `2f6164f`. In that window Mark cancelled on the live portal would have errored.
- No live HTTP probes of the functions (blocked). Signatures were checked by reading the code only.

## Brayden's live pass (10 minutes)

1. Sign in as Test Fulfill → My calls → open a call → **Mark cancelled**. It goes to Cancelled and a $10 cancel shows on My pay.
2. Edit that call's notes and save. Then **Fix result** back to No answer the same day.
3. In Admin → Users, turn Test Fulfill's access **off**, then on again. Their open calls move to another rep (or wait unassigned).
4. Do Finding 1 (deploys) when you're ready for recording or pay.

## Related

- [[Agent Portal QA Report]] · [[Memories]] · [[LIVE_STATE]] · [[Gotchas]]
