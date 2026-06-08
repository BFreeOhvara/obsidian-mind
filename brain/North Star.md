---
date: 2026-06-07
description: "Ohvara two-vertical SMB automation business — who we are, what phase we're in, what success looks like"
tags:
  - brain
  - north-star
aliases:
  - Goals
  - Focus
---

# North Star

> Read this file first, every session. It grounds every decision.

## Who We Are

**Ohvara** — a two-vertical SMB automation business.

- **Brayden** — operations, builds, strategy
- **Nate** — sales, closing
- **Jahandad** — rep recruitment

**Status: Pre-revenue. Phase 1 is the only focus.**

---

## The Two Businesses

### Vertical 1 — AI Receptionist / Dispatcher

Sell AI phone agents to small businesses as a recurring monthly subscription.
Replace the receptionist or dispatcher they're actively trying to hire.

| Tier | Includes | Price |
|------|----------|-------|
| Starter | AI Receptionist + Missed Call Text Back | `$497/mo` |
| Growth | Starter + Review Generation + Lead Follow-Up | `$797/mo` |
| Full Stack | Everything + Website | `$1,297/mo` |

**Priority niche:** Transportation — hotshot trucking, tow trucks, 18-wheelers, owner-operators. Cast wide across all niches.
**All niches:** Roofing, HVAC, Electrical, Landscaping, Pressure Washing, Concrete, Hotshot Trucking, Oilfield Services, Towing, Transportation
**Geographic market:** Anywhere in the US
**Lead source:** Businesses hiring receptionists/dispatchers on Indeed and Google Maps

> **Core insight:** Indeed leads are warm leads. They are already problem-aware and actively trying to solve it by hiring. We are a faster, cheaper solution to the exact problem they just posted about.

### Vertical 2 — Web Agency

Single-file HTML/CSS/JS websites for small businesses.
Lead source: Google Maps businesses with no website, fewer than 50 reviews.
Bundled into Full Stack tier or standalone.

---

## Sales Process

**Two-call close. Reps gather pain only — they never pitch.**

### Rep Call (Call 1)
- Rep's only goal: book a 15-minute discovery call. Nothing else.
- Script is question-based and pain-surfacing — never a pitch
- Rep does NOT explain the product or mention pricing
- Rep asks pain discovery questions, surfaces the cost of the problem, books the call

### Closer Call (Call 2)
- Closer (Jordan or Nate) handles the pitch and close
- Reviews the pain gathered by the rep
- Gets AI briefing + stack recommendation for the business
- Stripe payment link is auto-generated the moment a tier is recommended — send it immediately

**Closers:** Jordan and Nate — both ready to close now
**Commission:** Reps earn `$150`–`$250` per closed deal

### Rep Onboarding Flow

```
Admin creates account → Rep logs in → 150 leads already loaded → Rep starts calling immediately
```

Target: rep is calling within 60 seconds of first login.

- Training is optional — available anytime, not required before calling
- Rep recruiting channel: Facebook groups (posts + DMs) via Jahandad

### Dialer

TBD — do not hardcode any dialer assumption anywhere in the codebase.

---

## Current Focus

**Phase 1 — Get the outreach machine running at full capacity.**

> **#1 priority: the dashboard must be able to onboard a rep in 60 seconds.**

- [ ] Ohvara dashboard fully functional (all 3 roles)
- [ ] Rep onboarding: account → login → 150 leads → calling in 60 seconds
- [ ] Indeed scraper pulling 150+ leads/day
- [ ] Google Maps scraper as fallback
- [ ] Reps working 150 leads/day each
- [ ] Target: 3–5 appointments per rep per day
- [ ] Target: 30%+ close rate

## Goals

### 90-Day Target

- `10+` active reps booking consistently
- `50+` appointments/week
- `15+` clients on recurring plans
- `$7,500`–`$12,000` MRR

### Medium-term (This Half)

- Proven rep onboarding playbook
- Expand to Phase 2: larger AI automation deals (`$5K`–`$15K`)

### Long-term (This Year+)

- Phase 3: Oil and gas operators (`$25K+`)
- Systematized rep onboarding and training

## Anti-goals

- Do not over-engineer tooling before the sales machine is running
- Do not hire before outreach is proven at scale
- Do not hardcode any dialer assumption

---

## Active Infrastructure

| Tool | Purpose |
|------|---------|
| Retell AI | AI phone agents |
| Supabase | Database + auth (`jjextitmbptoaolacocs.supabase.co`) |
| Vercel | Dashboard (`ohvara-dashboard.vercel.app`) |
| Twilio | SMS reminders |
| Anthropic Claude API | AI briefings, rep scripts, stack recommendations |
| Stripe | Payment link auto-generation on close recommendation |
| Indeed MCP | Lead scraping (primary) |
| Google Maps | Lead scraping (fallback) |
| GitHub: BFreeOhvara | All repos |
| Dialer | TBD |

---

## Rules Claude Always Follows

1. Read [[Memories]] before every session
2. Read [[DESIGN]] before touching any UI
3. Append to [[Memories]] after every session
4. Never ask Brayden to run commands manually
5. Never hardcode colors — use design tokens
6. Never duplicate leads in the database
7. Rep dashboard: exactly 150 leads/day per rep, ready on first login
8. All monetary values in mono font
9. When blocked, state blocker + two options
10. Log every mistake — mistakes written down don't repeat
11. Never hardcode any dialer assumption
12. Stripe link must be auto-generated the moment a closer selects a tier — never deferred
13. AI scripts are question-based and pain-surfacing — never a pitch

---

## Shifts Log

| Date | Shift | Reason |
|------|-------|--------|
| 2026-06-07 | Initialized North Star | Ohvara vault setup |
| 2026-06-07 | Full business context upgrade | Added sales process detail, warm lead insight, rep onboarding flow, commission, dialer TBD, geo market, transportation priority niche, Stripe auto-link rule, training optional |
