---
date: 2026-10-16
description: "Approved notification list for the Ohvara portal, per role (Agent, Fulfillment, Admin). Decided with Brayden Oct 15-16. Not built yet; becomes the notifications prompt(s)."
tags:
  - ohvara
  - notifications
---

# Ohvara Notifications Plan

Approved by Brayden. "Push" = phone alert (needs the mobile app / installed web app). Bell = in-portal. Quiet hours for phone alerts: 9 PM to 8 AM, except payment/payout failures.

## Agent
1. Policy cancelled for their client (push + bell)
2. Client didn't answer, confirm the number (push + bell)
3. We missed the call, rebooking underway (bell)
4. Couldn't reach the client after retries, now theirs to call (push + bell)
5. Needs attention, something stuck or overdue (bell + daily digest)
6. Weekly booking limit reached (7 of 7 / 16 of 16) and when it resets (bell)
7. Weekly payment failed, new bookings paused (push + email + bell)
8. New message (push + bell)
9. Monday summary: bookings and cancels last week (email)
- Removed by Brayden: "call booked" confirmation.

## Fulfillment
1. New call booked for them, including calls moved to them (push + bell)
2. 5 minutes before, Call client unlocks (push)
3. Call time is now and not started (push)
4. Paid, Monday's payout on its way (push + email)
5. Payout problem: no bank connected or transfer failed (push + email + bell)
6. Missed call strike recorded, warning at strike 2 (push + bell)
7. New message (push + bell)
- Removed by Brayden: tomorrow's calls summary, cancel verified, cancel sent for a listen, call moved/given as its own item.

## Admin (Brayden)
1. Needs a listen: cancel AI couldn't verify, or agent flagged (push + bell)
2. A rep missed a call (push + bell)
3. A rep hit 3 strikes in 30 days (push + bell)
4. Payout problem: short Stripe balance, failed transfer, or Monday run didn't finish (push + email)
5. An agent's weekly payment failed (push + email)
6. Not enough reps for bookings: rep out or slots nearly full (push + bell)
7. Something broke: a background job failed (push + bell)
8. Someone accepted an invite (bell)
9. New message (push + bell)
10. Monday summary: payout total, cancels, bookings (email)
- Plus one daily 8 AM email listing anything that went wrong; not sent if nothing did.

## Not built yet / blockers
- Needs the hardening prompt first (4 crons fail every run: `recovery-sms`, `redistribute-no-answers`, `process-reminders`, `trigger-re-engagement`; `app.supabase_url` not set).
- Push needs the mobile phase. Desktop first: bell + email.
- Texts to clients need Twilio A2P.
