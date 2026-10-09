## Prompt 736 — Billing: show the card that's really on file, and receipts are emailed (no "Receipt" link)

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
