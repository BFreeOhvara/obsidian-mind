---
date: 2026-06-21
description: "Master cost tracker for all Ohvara services — what's spending, what's free, what activates on first client. Keep this updated whenever a new service is added or removed."
tags:
  - brain
  - costs
---

# Ohvara Cost Tracker

> **Rule:** Any time CC adds a new service, API key, or external integration, it updates this file. Same when something is removed or moved to demo mode. Brayden checks here first before asking "is X costing me money?" See [[LIVE_STATE]] for current build status and [[North Star]] for phase context.

---

## 🔴 Actively Spending

| Service | What triggers cost | Where to check |
|---|---|---|
| **Retell AI** | Per-minute on training roleplay calls (rep practice). Also per-minute when client AI receptionists go live (none yet) | app.retellai.com → Billing |

---

## 🔵 Planned / Demo Mode

| Service | Status |
|---|---|
| **Anthropic API** | **Stubbed as of 2026-06-21 (Prompt 25).** `DEMO_MODE=true` Supabase secret set on `jjextitmbptoaolacocs`; all three live Anthropic callers (`recommend-stack`, `generate-ai-script`, `score-roleplay`) check the flag first and return pre-baked/deterministic responses in the exact same shape as the real AI path — zero API calls made, verified live (`recommend-stack` test invoke returned the fallback stack in ~1s, no real-call latency). No real setters/clients yet, so nothing currently needs live AI. **To go live:** `supabase secrets set DEMO_MODE=false --project-ref jjextitmbptoaolacocs`, no code changes needed. Auto-reload still set ($10 trigger → $50 top-up) for whenever it's flipped back on. |

---

## 🟡 Free Tier — Watch the Limits

| Service | Plan / Limits | Risk |
|---|---|---|
| **Supabase** | Free tier: 500MB DB, 500K edge fn invocations/mo, 2GB bandwidth | Will hit edge fn limit once real setters are active daily. Check: app.supabase.com → project → Settings → Billing |
| **Vercel** | Free Hobby: 2 deployments (ohvara-dashboard + ohvara-client-portal) | Fine until high traffic. Check: vercel.com → Settings → Billing |
| **GitHub** | Free: 2 repos (ohvara-dashboard, obsidian-mind), no active cron workflows | No risk currently |
| **Google Maps/Places API** | $200/month free credit. Charged per call above that (Place Details ~$17/1k) | Only costs if actively scraping via the in-dashboard Maps tab. Not using it right now — manual Chrome extension instead |

---

## 🟢 Only Costs When a Client Goes Live

| Service | What triggers it |
|---|---|
| **Stripe** | 2.9% + $0.30 per transaction. Only charges when a client pays the checkout link |
| **Retell (client side)** | Per-minute AI receptionist costs when a client's agent is live answering real calls. Price this into the monthly fee |
| **Twilio** | SMS appointment reminders. Secrets not set yet — not active |

---

## ⚫ Removed / Dead

| Service | Status |
|---|---|
| **Apify** | Repos deleted 2026-06-21. No longer running. |
| **ai-receptionist-leads GitHub repo** | Deleted 2026-06-21. Cron was burning Apify credits every 2 days. |
| **maps-scraper GitHub repo** | Deleted 2026-06-21. Google Maps → Sheets scraper, no longer used. |
| **generate-ai-script (Anthropic)** | Frontend-orphaned as of 2026-06-16. Rep script is now fully static — no API call, no cost. |

---

## 🔵 Planned — Not Yet Active

| Service | Notes |
|---|---|
| **Twilio** | Needed for SMS reminders + client AI number provisioning. Not set up yet — gated until first real client. |

---

*Last updated: 2026-06-21 (Falcon)*
