---
date: 2026-06-07
description: "Auto-generate Stripe payment links for the correct Ohvara tier when a closer makes a stack recommendation"
tags:
  - skill
  - payments
  - stripe
status: planned
---

# Skill: Stripe Payment Link Generation

**Category:** Payments
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Automatically generates Stripe payment links for the correct Ohvara tier when a closer makes a stack recommendation. Link is displayed immediately in the closer dashboard for instant send to client.

## When to Use This Skill

- Closer expands appointment and gets AI briefing
- AI recommends a tier
- Stripe link is generated and shown alongside the recommendation

## Pricing Tiers

| Tier | Price | Env Var |
|------|-------|---------|
| Starter | `$497/mo` | `STRIPE_STARTER_PRICE_ID` |
| Growth | `$797/mo` | `STRIPE_GROWTH_PRICE_ID` |
| Full Stack | `$1,297/mo` | `STRIPE_FULLSTACK_PRICE_ID` |

## Implementation

### Edge Function: `generate-stripe-link`

```typescript
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const priceMap = {
  starter:   Deno.env.get('STRIPE_STARTER_PRICE_ID')!,
  growth:    Deno.env.get('STRIPE_GROWTH_PRICE_ID')!,
  fullstack: Deno.env.get('STRIPE_FULLSTACK_PRICE_ID')!,
}

const paymentLink = await stripe.paymentLinks.create({
  line_items: [{ price: priceMap[tier], quantity: 1 }],
  after_completion: {
    type: 'redirect',
    redirect: { url: 'https://ohvara.com/welcome' }
  },
  metadata: {
    business_name: businessName,
    closer: closerName,
    appointment_id: appointmentId
  }
})

return paymentLink.url
```

### Required Env Vars

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_GROWTH_PRICE_ID=price_...
STRIPE_FULLSTACK_PRICE_ID=price_...
```

## Gotchas

- Use live keys in production, test keys in dev — never mix
- Always pass metadata (business name, closer, appointment ID) for tracking
- Payment link is one-time use by default — set reusable if needed
- Display link in closer dashboard immediately — do not wait for confirmation
- Store `STRIPE_SECRET_KEY` in Supabase Edge Function secrets, never in client code

## Related

- [[North Star]] — Full Stack tier includes this flow
- [[ohvara-dashboard]] — where this gets implemented

## Verified Working

Not yet — to be implemented in dashboard overhaul session
