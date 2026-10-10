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

## Prompt 736 — Billing: show the card that's really on file, and receipts are emailed (no "Receipt" link)

> **🟡 2026-10-09 CC: BUILT + PUSHED (`ohvara-dashboard` `5c6af83`). Not live yet; waiting on Brayden, in this order:** (1) redeploy `agent-billing`: `npx.cmd supabase functions deploy agent-billing --no-verify-jwt --project-ref jjextitmbptoaolacocs` from `C:\Users\freem\ohvara-dashboard` (CC can't deploy); (2) open Manage billing as Billing Test: Payment method should show his card (or "Link" / the wallet); if it still says "No card on file", send CC the function logs (`agent-billing overview card via=… type=…`) before anything else changes; (3) Stripe Dashboard (live mode) → Settings → Customer emails → turn on **Successful payments**, and confirm paid-invoice emails are on in Billing's subscription email settings, then tell CC: until then "Receipt emailed" is not confirmed to be true; (4) optional: Stripe → Settings → Branding. Then CC deletes this item. Ship note: [[Memories]] 2026-10-09 "P736".

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from the first look at P734's Manage billing live as Billing Test. Sonnet 5.5** (one function lookup, one UI string; no migration, no new dependencies). `agent-billing` changes, so **Brayden redeploys** after it ships. Queued after P734 (P735 shipped).

**What Brayden sees.** `/agent/billing?manage=1` as Billing Test (`braydenohvara+agenttest@gmail.com`, Test $1, active, next charge Fri Oct 16). The page works and he likes how it looks as built. Two things:
1. **Payment method says "No card on file."** He paid the $1 with his real card on the embedded checkout, and the invoice shows **Paid**, so Stripe has a payment method for this customer. The page can't find it.
2. **Invoices show a "Receipt ↗" link.** He doesn't want a link to a Stripe page. He wants **the receipt emailed every time a payment goes through**, and the row to just say that it was sent.

### 1. Find the card (`supabase/functions/agent-billing/core.ts`, `defaultCard` and the `overview` shape)

Today `defaultCard` looks at `subscription.default_payment_method`, then `customer.invoice_settings.default_payment_method` / `default_source`, and `cardOf` only reads `pm.card`. Anything else shows "No card on file". Likely causes, **all handled below, because CC can't query Stripe from here to tell which one it is**: Embedded Checkout left the payment method attached to the customer but not set as a default anywhere we look, **or** he paid with Link / a wallet, so `pm.type` isn't `card` and `pm.card` is empty.

- **Look in this order, and stop at the first hit:**
  1. `subscription.default_payment_method`
  2. `customer.invoice_settings.default_payment_method`, then `customer.default_source`
  3. **The payment method the latest paid invoice was charged with** (`invoices/<latest paid>` with `expand[]=payment_intent.payment_method`, or the charge's `payment_method_details`)
  4. The customer's first attached payment method (`GET customers/<id>/payment_methods`, no `type` filter, `limit=3`, newest first)
- **Not only cards.** `cardOf` becomes `methodOf(pm)`: for `card`, same as now (`brand`, `last4`, `exp_month`, `exp_year`), plus `wallet` when `card.wallet.type` is set ("Visa ending 4242 · Apple Pay"); for `link`, "Link" (with the email Link shows, if Stripe returns it); for a US bank account, "Bank account ending 6789"; for anything else, the capitalised `type`. The Payment method card shows that one line, and the expiry only when the method has one.
- **Heal the default.** If the card was found in step 3 or 4 (not 1 or 2) and the customer has no default, set it as `invoice_settings.default_payment_method` so the next lookup, and the next charge, agree. Ownership rules from P734 stay: only the caller's own customer, never an id from the request body.
- **Log which step found it,** server-side only, **no card data**: `agent-billing overview card via=sub|customer|invoice|attached|none type=<pm.type>`. So if it still says "No card on file" after this, the logs say why.
- **Truly no payment method** (none anywhere): the card says "No card on file" and the button reads **Add card** instead of "Update card". Everything else about Update card (SetupIntent, `set_default_card`, past-due retry) is unchanged.
- Test with the mocked Stripe in the P734 server harness: each of the four steps on its own; Link; wallet; bank; none; a payment method that belongs to another customer is never shown; the heal write happens only for steps 3 and 4.

### 2. Receipts are emailed, not linked (UI + one Stripe setting)

- **Invoices table (`ManageBilling.jsx`):** remove the **Receipt ↗** link and the PDF link. For a **Paid** row show a plain, muted line instead, with a small check or mail icon: **"Receipt emailed"** (the account's email appears as the icon's title / tooltip, not in the row). Open and Failed rows show nothing in that spot (the status chip says it). Phone cards: the same line at the bottom of the card. No row, button or link on this page opens a Stripe-hosted page any more, so P734's "only the receipt link opens Stripe" check becomes "nothing opens Stripe". Keep `receipt_url` / `pdf_url` in the `overview` response (harmless, and handy later); just don't render them.
- **The email itself is a Stripe setting, not code (Brayden does it, CC says so in the ship note):** Stripe Dashboard (**live mode**) → Settings → **Customer emails** → turn on **Successful payments** (receipts), and in Billing's subscription email settings make sure paid-invoice emails are on. Stripe emails the **customer's email on the Stripe customer** (the agent's account email; P734's checkout creates the customer with it). Stripe sends these only for **live** payments and **only going forward**, so the $1 already paid on Brayden's test account won't get an email. **CC: don't claim "Receipt emailed" works until Brayden confirms the toggle is on**; if he hasn't by the time this ships, say so plainly in the ship note.
- Optional, one line for Brayden, not CC's job: Stripe → Settings → Branding, so the receipt carries the Ohvara name and logo.

### 3. Files and rules

`supabase/functions/agent-billing/core.ts`, `src/components/agent/ManageBilling.jsx` (Payment method card + Invoices), `src/lib/billing.js` if the `overview` shape changes (keep `card` backwards compatible: `brand`, `last4`, `exp_month`, `exp_year`, plus new `label` and `kind`), `src/index.css` if the row needs a class, `DESIGN.md` (a "P736" line under P734's Billing entry). Design tokens only; light mode works. **Don't change anything else on the page:** Brayden said the rest looks right.

### 4. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks (as P734; delete it, never commit), Playwright + local Chrome, dark and light, 1440 and 390: Payment method with a Visa, a wallet card, Link, a bank account and none ("Add card"); invoices with Paid, Open and Failed rows (Paid shows "Receipt emailed", the others show nothing there, **no `a[href]` on the page points off-site**); phone cards.
- Server: the mocked-Stripe checks in section 1.
- **Deploy:** CC can't deploy functions; Brayden runs `npx.cmd supabase functions deploy agent-billing --no-verify-jwt --project-ref jjextitmbptoaolacocs` from `C:\Users\freem\ohvara-dashboard` (PowerShell needs `npx.cmd`). CC says exactly when. After the deploy, if the card still shows "No card on file", read the function logs (`via=` / `type=`) before changing anything else.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in, what was verified against mocks vs live, whether the function is deployed, and whether Brayden has switched on Stripe's receipt emails. Brayden checks as Billing Test: (1) Manage billing → Payment method shows his card (or "Link" / the wallet, whichever he paid with); (2) the Paid invoice row says "Receipt emailed" and nothing on the page opens Stripe; (3) once the Stripe toggle is on, his next real payment (or a new test subscription) puts a receipt in his inbox.

## Prompt 739 — Billing: the Payment method card says a method is on file (Link shows its email), and "Update card" becomes "Change payment method"

> **🟡 2026-10-09 CC: BUILT + PUSHED (`ohvara-dashboard` `ed06527`). Not live yet; waiting on Brayden:** (1) redeploy `agent-billing` (core.ts changed; no other deploy, no migration): `npx.cmd supabase functions deploy agent-billing --no-verify-jwt --project-ref jjextitmbptoaolacocs` from `C:\Users\freem\ohvara-dashboard`; (2) as Billing Test reload Manage billing: the line reads "Link · <his Link email>", green "On file" pill, "Charged here every week.", button "Change payment method"; clicking it shows "Pay with a card instead / This replaces Link." above the card form. Then CC deletes this item. Ship note: [[Memories]] 2026-10-09 "P739".

> **✅ REQUESTED by Brayden 2026-10-09 (Eagle session), with a screenshot of Billing as Billing Test showing "Link" and an "Update card" button:** "I'm fine with it being Link. Just add the email back, Link and then the email. But when you say Update card it makes it feel like there's no card on file, and when you click it there's no card details. I just don't think it's understood that there's a card on file." Agreed fix below. **Run on Sonnet 5.5** (wording and layout, plus one label in the existing function; no database).

**Why it says "Link" (don't re-investigate).** Stripe doesn't expose the card inside a Link payment method (P737's logs: `link_card=no source=none`). That stays. We don't fight it; we make the card clearer around it.

### 1. The Payment method card (`src/components/agent/ManageBilling.jsx`, section "2. Payment method")

When `data.card` exists (and the account isn't past due), the row becomes:

- **Line 1:** the method label, as today (15.5px/600), now with a small green **"On file"** pill right after it (check icon, same family as the Active chip on the Billing hero: the `is-active` colours, 12px/700, 22px high). Wraps under the label on a narrow screen.
- **Line 2** (13.5px, `--ov-mute`): **"Charged here every week."**
- **Button** on the right: **"Change payment method"** (ghost, `CreditCard` icon, same `ov-mb-btn`). It stays a ghost button; when `pastDue` it's `ov-solid` as today.
- **Past due:** no "On file" pill (the warning note above already says the last payment failed); line 2 says **"We'll try this again once you change it."** Don't show a green pill next to a failed payment.
- **No method at all (`!data.card`):** unchanged: "No card on file." and the **"Add card"** button.
- Phone width: the row wraps, the button goes full width below the text.

### 2. The form it opens

Above `<CardForm>` inside `.ov-mb-cardbox`, add a short heading (15.5px/600) and one line (13.5px, mute) so the card form isn't a surprise:

- Current method is Link (`data.card.kind === 'link'`): **"Pay with a card instead"** / **"This replaces Link."**
- Current method is a card or wallet: **"Use a different card"** / **"This replaces {methodLabel(data.card)}."**
- No method on file: no heading (as today).

Leave the form, "Cancel" and "Save card" as they are, and the success notice ("{name} is now your card.").

### 3. Link shows its email (`supabase/functions/agent-billing/core.ts`, `methodOf`)

P737 removed the Link email from the result. Put it back, for the caller's own payment method only:

- `pm.type === 'link'`: `label` = `Link · {pm.link.email}` when the email is present; if `linkCard` (brand + last4) was found, keep `Link · {Brand} ending ####` (never expected, but don't regress); with neither, just `Link`. Include `email` in the returned object too.
- A card with the Link wallet (`wallet.type === 'link'`) keeps `Link · Visa ending ####`.
- Update the comment above `methodOf` (it currently says the email is never put in the result) to say it's the agent's own email, shown only to them.
- **Never log the email** (the existing log line stays as is). No change to `defaultMethod`'s lookup order, healing, or invoices.

### 4. Other places that say "card"

- `src/components/agent/BillingPanel.jsx` line ~207 (`action: { ...manage, label: 'Update card' }`): read the context. If it's the general shortcut to Manage billing, change it to **"Change payment method"**; if it's specifically the past-due prompt, keep "Update card".
- The two past-due notes in ManageBilling ("Update your card below…", "Update your card and we'll try again.") become **"Update your payment method…"** for consistency.
- Search `src/` for other agent-facing "Update card" text and make the same call. Don't touch admin pages.

### 5. Files and rules

- **Edit:** `src/components/agent/ManageBilling.jsx`, `supabase/functions/agent-billing/core.ts`, `src/components/agent/BillingPanel.jsx` (label only). Add the pill/heading styles to the existing stylesheet that holds `.ov-mb-*` next to the other billing classes.
- No migration, no new dependency. Sentence case, existing tokens and classes.

### 6. Verify and log

- `vite build` passes. Throwaway Vite harness with the real `ManageBilling` and mocked `invokeBilling`, as P736/P737 did, dark and light, 1440 and 390:
  - Link with email: "Link · name@example.com", green "On file" pill, "Charged here every week.", "Change payment method"
  - a Visa: "Visa ending 4242", same pill and line
  - past due: no pill, the retry line, solid button
  - no method: "No card on file." and "Add card"
  - clicking Change opens the form with the right heading ("Pay with a card instead / This replaces Link." for Link, "Use a different card / This replaces Visa ending 4242." for a card)
- `methodOf` unit checks (a small Deno/Node shim): link with email, link without email, link with a card, card, card with Apple Pay, card with the Link wallet, bank account.
- Ship note in [[Memories]]. Say plainly it wasn't seen logged in and that **`agent-billing` needs a redeploy** (core.ts changed; no other deploy and no migration). Brayden checks as Billing Test: the line reads "Link · his Link email", the green "On file" pill and "Charged here every week.", the button says "Change payment method", and clicking it shows "Pay with a card instead / This replaces Link." above the card form.
- Update `DESIGN.md`: the Payment method card shows the method with an "On file" pill; the button is "Change payment method"; Link shows its email.
