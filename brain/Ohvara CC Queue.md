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
> - **Numbering:** next prompt number = one past the highest referenced anywhere in the vault — the counter is shared across Ohvara AND Restorix. Check [[LIVE_STATE]] + [[Memories]] AND [[Restorix LIVE_STATE]] + [[Restorix Memories]] + [[Restorix CC Queue]] before assigning a number.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline. Order = execution order.
> - **Committing this file:** CC's Ohvara session has standing `git add`/`commit`/`push` permission as of 2026-10-01 (added after the Prompt 664 blocker), so CC's own next ship sweeps up and commits whatever's sitting here uncommitted — a manager chat queuing an item does **not** need to separately commit/push it by hand. (Historical note: this rule originally asked for an immediate manual commit, after an uncommitted queue edit got wiped on 2026-09-30 — the real cause turned out to be the device-bridge connection itself dropping mid-write, not uncommitted git state, and a manual commit wouldn't have protected against that anyway. The re-read-to-verify rule above is the real safeguard.)

## Prompt 673 — Agent billing: $350/week flat retainer via Stripe

> **⛔ 2026-10-02 (CC): `agent-billing` deployed (v1, `5b7f4e3`), waiting on the webhook secret.** Brayden needs to create the Stripe webhook endpoint and set `STRIPE_WEBHOOK_SECRET`. Exact steps: [[LIVE_STATE]] "BLOCKED ON BRAYDEN — Prompt 673". After that, CC's remaining work is the end-to-end test + go-live. Next runnable item for CC is 676.

> **✅ UNBLOCKED 2026-10-02 — Brayden confirmed `STRIPE_SECRET_KEY` is set in Supabase secrets** (sandbox/test key, `sk_test_...`, from a Stripe Sandbox under the existing Ohvara Stripe account — the account itself is a leftover from a pre-pivot AI-agency idea and currently unused for anything live, but the sandbox keeps this build fully isolated from it regardless). Scaffolding already shipped (`8bcb971`, mig 113): schema, Settings → Billing tab, admin column and the access gate, with enforcement off. **CC: resume this item — build the Stripe edge functions + webhook now that the secret is in place.** A second secret, `STRIPE_WEBHOOK_SECRET`, will be needed once the webhook endpoint exists — flag that back to Brayden/Eagle when you reach that point rather than guessing a value.

**Hard prerequisite, blocks everything past schema/UI scaffolding — same category as Prompt 393 (Daily.co) and Prompt 666 (Twilio): CC cannot create third-party accounts.** Brayden needs a Stripe account (confirm whether one already exists before assuming it doesn't) and real API keys handed over as Supabase secrets before billing logic can be built. If not available when CC picks this up, stop at that point, build what's ready, and flag blocked exactly like 393/666 — don't guess at a workaround.

**Business model, Brayden's own framing — direction of money matters, this is NOT agent commissions:** agents pay **Ohvara** (not the reverse) a flat recurring retainer — $350/week per agent — for portal access and that week's batch of client cancellations to be worked. If they want the service again the following week, they pay $350 again. This is a weekly recurring subscription gating portal access, not a one-time charge and not a payout to agents.

**Don't confuse this with, or build on top of, the old dead Payouts system.** `ohvara_legacy_setter_pipeline_dead.md` confirms `Payouts.jsx` / `/admin/payouts` already exists in the codebase from the pre-pivot model — it paid "reps" **via Stripe** against the old `commission_payouts`/`appointments`/`leads` tables, which are emptied and unused. That page is unreachable from nav but still present. This new prompt is the opposite direction of money flow and a different Stripe integration (Billing/Subscriptions, not payouts) — don't revive or extend the old page/tables; this is a fresh build, though the fact Stripe was integrated before may mean an existing Stripe account/connection to check on, worth asking Brayden about directly rather than assuming a clean slate.

**Technical shape (real latitude, Opus's call):** Stripe Billing/Subscriptions with a weekly recurring price; a webhook handler for payment success/failure that flips a `billing_status` (new column, migration needed — flag it) on `profiles`, gating portal access when unpaid; an agent-facing billing view (Settings is the obvious place) showing current status and next charge date, using Stripe-hosted Checkout/Customer Portal rather than a custom card form to stay out of PCI scope. Admin-side visibility for Brayden into who's current/who's lapsed.

**Not yet decided, Opus's call once building:** grace-period behavior on a failed payment (immediate access cutoff vs. some buffer) and exactly what "access paused" looks like in the UI (locked overlay vs. read-only) — document the decision and why in the ship note.

**Log in the ship note:** whether a Stripe account/keys were present and usable (and whether it's the same account as the old dead Payouts integration or a new one), the exact migration applied, and — if blocked — exactly what Brayden needs to go create, mirroring how Prompt 393/666's blockers are written.

## Prompt 676 — Visual refresh round 4: account popup cleanup + sidebar groupings

Direct follow-up to 675, based on Brayden looking at the shipped result. Four fixes:

**1. Revert the white outline from 675 — the bubble should have no outline at all.**
675 added a white outline around the avatar bubble; Brayden's now clarified he doesn't want an outline/ring there at all — he wants it to look like the "Overview" nav item does when selected: just the fill color, no outline. Remove the ring/outline entirely rather than changing its color again.

**2. Remove "Settings" from the account popup menu — Sign out only.**
When clicking the "Test Agent" bubble, the popup currently shows Settings as a clickable item above Sign out. Remove that menu item from the popup completely — **Settings stays as its own sidebar tab** (already under Account in the left nav, don't touch that), it just shouldn't also be clickable from inside this popup. The popup's only action should be Sign out.

**3. Make the divider line in the popup white, not gray.**
There's a horizontal divider line inside the popup (between the name/avatar header area and the menu item(s) below). Currently gray — change it to white. This applies after item 2 above, so it'll be the line directly above "Sign out" once Settings is removed from the popup.

**4. Group the left sidebar into sub-sections like Restorix Portal does.**
Right now everything (Overview, Book a call, My Clients, Performance, Team, Training) sits flat under one "Work" heading — 6 items, no further structure. Restorix Portal's sidebar breaks things into multiple labeled groups (e.g. a "Resources" section separate from core work items). Reorganize Ohvara's agent sidebar the same way — split the current flat Work list into logical sub-groups (for example, core daily-task items stay under Work; Training, and possibly Team, move into a new Resources-style group) — real latitude on exact grouping/naming, Opus's call, just don't leave it as one flat 6-item list. Settings stays under Account as-is.
