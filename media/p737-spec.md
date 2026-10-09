## Prompt 737 — Billing: for a Link payment show "Link" and the card's last four (no email); no expiry line on any card

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), after P736's card fix went live.** **Sonnet 5.5** (one lookup and one string; no migration, no new dependency). `agent-billing` changes, so **Brayden redeploys** after it ships. Queued after P736.

**What Brayden sees.** Billing Test (`braydenohvara+agenttest@gmail.com`) paid the $1 with **Stripe Link**. After P736, Manage billing → Payment method reads **"Link · braydenohvara+agenttest@gmail.com"** (an improvement on "No card on file"). He wants **to keep Link on** (it helps checkout, his call; do not suggest turning it off) and wants the line to read like a card: **"Link · Visa ending 4242"**, **not the email**. He also wants **only the last four digits**, so no "Expires MM/YY" line on any card.

**Known catch, don't pretend otherwise.** A Stripe PaymentMethod of `type: 'link'` carries only the Link email; the underlying card isn't on it. Whether Stripe exposes the card behind a Link payment anywhere else (the charge's `payment_method_details`, a `card` block with `wallet.type: 'link'`) can't be checked from here, and CC has no Stripe access outside Brayden's live check. So **build it defensively against both shapes and report honestly what the live account returns.**

### 1. The lookup (`supabase/functions/agent-billing/core.ts`, `methodOf` / `defaultMethod`)

- When the chosen payment method is `kind: 'link'` (or a card with `wallet.type === 'link'`), also look for the card behind it, in this order, stopping at the first hit that has `brand` and `last4`:
  1. the method itself (`pm.card`, if Stripe returns one),
  2. the **latest paid invoice's charge**: list invoices (`expand[]=data.latest_charge` or `data.payment_intent.latest_charge`, whichever the pinned `2024-06-20` API supports, as P736 already expands `payment_intent.payment_method`) and read `charge.payment_method_details.card` (`brand`, `last4`) and, if present, `payment_method_details.link`,
  3. nothing: then the label is just **"Link"**.
- **Label:** Link with a card → **"Link · Visa ending 4242"** (brand capitalised as the other cards do); Link without one → **"Link"**. **The Link email never appears in the row** (not as text, not as a tooltip). Keep `link.email` out of the `overview` response entirely unless something else needs it (nothing should).
- Plain cards stay **"Visa ending 4242"**, with the wallet suffix when there is one ("· Apple Pay"); bank accounts and others stay as P736 made them.
- **Log, server only, no card data:** extend the P736 line with `link_card=yes|no` and which source answered (`pm` / `charge` / `none`), so Brayden's reload tells us whether Stripe exposes it.

### 2. No expiry line (`ManageBilling.jsx`)

Remove the **"Expires MM/YY"** line for every payment method. The Payment method box shows the one-line label and the Update card / Add card button, nothing else. Keep `exp_month` / `exp_year` in the `overview` response (harmless).

### 3. Files and rules

`core.ts`, `ManageBilling.jsx`, `src/lib/billing.js` only if the shape changes (keep the P736 fields), `DESIGN.md` (a "P737" line next to P736's). Don't touch anything else on Billing. Design tokens only; light mode works.

### 4. Verify and log

- `vite build` + eslint clean on touched files. **Server** against the mocked Stripe (extend the P736 harness): Link with a card on the PM; Link with the card only on the charge (both `card` and `link` details shapes); Link with neither (label "Link"); a plain Visa; a wallet; a foreign customer's method still refused; the email is in no response field the UI reads. **UI** harness (throwaway, never committed), Playwright, dark and light, 1440 and 390: "Link · Visa ending 4242", "Link", "Visa ending 4242", "Visa ending 4242 · Apple Pay"; no "Expires" text and no email address anywhere in the Payment method box.
- **Deploy:** Brayden runs `npx.cmd supabase functions deploy agent-billing --no-verify-jwt --project-ref jjextitmbptoaolacocs` from `C:\Users\freem\ohvara-dashboard` (PowerShell needs `npx.cmd`). CC says exactly when.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in and that **whether Stripe exposes the card behind Link is unknown until Brayden reloads Manage billing after the deploy.** If the live label is still just "Link", say so: the limit is Stripe's, and the options are to leave it as "Link" or, if Brayden ever wants a last-four on every account, have agents add a typed card with Update card.
- Brayden checks as Billing Test: (1) Payment method reads "Link · Visa ending ####" (or just "Link" if Stripe doesn't expose it); (2) no email and no "Expires" line in that box.
