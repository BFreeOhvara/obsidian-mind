---
date: 2026-06-07
description: "Generate two Stripe payment links per close (setup fee + monthly subscription) when closer makes a stack recommendation"
tags:
  - skill
  - payments
  - stripe
status: active
---

# Skill: Stripe Payment Links

**Category:** Payments
**Created:** 2026-06-07
**Last used:** 2026-06-07

## Ohvara Package Pricing (FINAL — locked 2026-06-07)

| Package | Setup Fee | Monthly | Stripe Setup Price ID | Stripe Monthly Price ID |
|---------|-----------|---------|----------------------|------------------------|
| Basic | `$497` | `$497/mo` | `STRIPE_BASIC_SETUP_PRICE_ID` | `STRIPE_BASIC_MONTHLY_PRICE_ID` |
| Pro | `$497` | `$797/mo` | `STRIPE_PRO_SETUP_PRICE_ID` | `STRIPE_PRO_MONTHLY_PRICE_ID` |
| Premium | `$497` | `$1,297/mo` | `STRIPE_PREMIUM_SETUP_PRICE_ID` | `STRIPE_PREMIUM_MONTHLY_PRICE_ID` |
| Elite | `$497` | `$1,797/mo` | `STRIPE_ELITE_SETUP_PRICE_ID` | `STRIPE_ELITE_MONTHLY_PRICE_ID` |

## Payment Link Generation

Every close generates **two Stripe links**:
1. **Setup fee link** — `$497` one-time payment
2. **Monthly subscription link** — recurring at tier price

Both links sent together to client immediately after verbal commitment.

## Edge Function: `generate-stripe-links`

```typescript
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const setupPriceMap = {
  basic:    Deno.env.get('STRIPE_BASIC_SETUP_PRICE_ID')!,
  pro:      Deno.env.get('STRIPE_PRO_SETUP_PRICE_ID')!,
  premium:  Deno.env.get('STRIPE_PREMIUM_SETUP_PRICE_ID')!,
  elite:    Deno.env.get('STRIPE_ELITE_SETUP_PRICE_ID')!,
}

const monthlyPriceMap = {
  basic:    Deno.env.get('STRIPE_BASIC_MONTHLY_PRICE_ID')!,
  pro:      Deno.env.get('STRIPE_PRO_MONTHLY_PRICE_ID')!,
  premium:  Deno.env.get('STRIPE_PREMIUM_MONTHLY_PRICE_ID')!,
  elite:    Deno.env.get('STRIPE_ELITE_MONTHLY_PRICE_ID')!,
}

const metadata = {
  business_name: businessName,
  closer: closerName,
  appointment_id: appointmentId,
}

const [setupLink, monthlyLink] = await Promise.all([
  stripe.paymentLinks.create({
    line_items: [{ price: setupPriceMap[tier], quantity: 1 }],
    after_completion: { type: 'redirect', redirect: { url: 'https://ohvara.com/welcome' } },
    metadata,
  }),
  stripe.paymentLinks.create({
    line_items: [{ price: monthlyPriceMap[tier], quantity: 1 }],
    after_completion: { type: 'redirect', redirect: { url: 'https://ohvara.com/welcome' } },
    metadata,
  }),
])

return { setupLink: setupLink.url, monthlyLink: monthlyLink.url }
```

## Required Env Vars

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_BASIC_SETUP_PRICE_ID=price_...
STRIPE_BASIC_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_SETUP_PRICE_ID=price_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PREMIUM_SETUP_PRICE_ID=price_...
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_...
STRIPE_ELITE_SETUP_PRICE_ID=price_...
STRIPE_ELITE_MONTHLY_PRICE_ID=price_...
```

## ROI Recommendation Logic

| Monthly Labor Cost | Recommended Package |
|--------------------|---------------------|
| < `$3,000` | Basic |
| `$3,000`–`$4,000` | Pro |
| `$4,000`–`$5,000` | Premium |
| > `$5,000` OR multiple locations | Elite |

## Gotchas

- Use live keys in production, test keys in dev — never mix
- Always pass metadata (business name, closer, appointment ID) for tracking
- Display BOTH links in closer dashboard immediately — do not wait for confirmation
- `STRIPE_SECRET_KEY` goes in Supabase Edge Function secrets, never in client code
- Setup fee link is one-time; monthly link is recurring subscription — don't swap them

## Related

- [[North Star]] — package pricing, ROI anchors
- [[rep-call-script]] — upstream rep call flow
- [[ohvara-dashboard]] — closer dashboard implementation

## Verified Working

2026-06-07 — Final pricing locked
