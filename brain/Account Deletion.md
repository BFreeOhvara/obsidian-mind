---
date: 2026-10-17
description: "What Delete my account (P775) removes and what it keeps: agents and Fulfillment, app and website. Admins can't self-delete. Server path: delete-account + account_delete()."
tags:
  - brain
  - ohvara
  - privacy
---

# Account Deletion

Built in P775 for Apple guideline 5.1.1(v): **Delete my account** in More (phone, all roles) and Settings → Sign-in & security (website). Type `DELETE`, press the button. Code: `delete-account` edge function + `account_delete()` (migration 156). Related: [[App Store Launch Checklist]], [[Ohvara Notifications Plan]].

## Who can
- **Agents and Fulfillment**: yes, themselves only.
- **Admins**: not from the app or website. Another admin removes an admin. The last-admin guard (P770) still applies.

## Order (server)
1. **Agent's Stripe plan cancelled now** (not at period end). If Stripe can't be reached, **nothing is deleted** and they're asked to try later. Sample (App Review), comped and plan-less accounts skip this.
2. `account_delete()`: deletes and anonymises (below), switches the account off, tells every admin (bell + email "Someone deleted their account", role and short id only).
3. Profile photo removed from storage.
4. Login deleted (Supabase soft delete). The auth row stays scrambled so ids in kept records still resolve. Nobody can sign in with it.

## Deleted
- Login (email/password), sessions.
- Name → "Deleted user". Email → `deleted-<id>@deleted.invalid`. Phone, username, photo, niche, NPN, E&O carrier/date, working hours, upline link.
- Caller ID number and Twilio caller-ID link, text follow-up opt-in.
- Notification settings, all their notifications, queued emails, phone alerts and **push device tokens**.
- Direct messages they sent (and an agent's whole DM threads), policy messages they sent, read markers.
- Bug reports, agent licenses, carrier appointments, monthly goals, rep credentials, unused invites they made.

## Kept (anonymous, under the same id)
| Kept | Why |
|---|---|
| Fulfillment pay records (`fulfillment_payouts`, `fulfillment_pay`, time entries, Stripe Connect account id, payout account status) | Tax: 1099s, payout history |
| Agent Stripe customer / subscription ids, billing status | Billing and tax records of what was charged |
| Call recordings + AI checks (`fulfillment_recordings`, `fulfillment_cancels`) | Their retention window; proof for paid cancels |
| Bookings (`policies`) and their history (`policy_events`), missed-call strikes | The cancellation work was done for the client; reps were paid for it. They show the agent as "Deleted user" |
| Admin audit log entries | Security record (append-only, P770). Includes the account's original creation row |

## Not decided yet (Brayden)
- **A deleted agent's future booked calls still happen** (the client asked for the cancellation). Say if they should be withdrawn instead.
- **How long kept records stay.** Nothing auto-purges them yet. A retention rule (e.g. recordings X days, then delete; client contact on a deleted agent's bookings after Y years) is a follow-up.
- The privacy policy (ohvara.com/privacy) should say this. Draft wording is in [[App Store Launch Checklist]] step 13.

## Checked (P775)
Rolled-back SQL on live: rep with a paid payout deleted → profile scrubbed, `is_active` off, payout kept, admin notified + emailed; agent deleted → push devices and queue gone, bookings kept; admin refused; signed-in users can't call `account_delete`. Node tests on `delete-account` (8): Stripe-first ordering, nothing deleted on Stripe failure, admin refused, sample/comped skip Stripe. UI harness: DELETE gating, admin message, sign-in notice.
