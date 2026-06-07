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

**Target niches:** Roofing, HVAC, Electrical, Landscaping, Pressure Washing, Concrete, Hotshot Trucking, Oilfield Services
**Target markets:** Texas, Oklahoma, Louisiana — expand outward
**Lead source:** Businesses hiring receptionists/dispatchers on Indeed and Google Maps

**Sales process:**
1. Appointment setter calls warm lead → books 15-min discovery call only
2. Discovery call → understand the business
3. Close call → Brayden or Nate closes with AI stack recommendation

**Closers:** Jordan, Nate
**Active reps:** Tara + commission-based team via Jahandad

### Vertical 2 — Web Agency

Single-file HTML/CSS/JS websites for small businesses.
Lead source: Google Maps businesses with no website, fewer than 50 reviews.
Bundled into Full Stack tier or standalone.

---

## Current Focus

**Phase 1 — Get the outreach machine running at full capacity.**

- [ ] Ohvara dashboard fully functional (all 3 roles)
- [ ] Indeed scraper pulling 150+ leads/day
- [ ] Google Maps scraper as fallback
- [ ] Reps working 150 leads/day each
- [ ] Target: 3–5 appointments per rep per day
- [ ] Target: 30%+ close rate

## Goals

### Short-term (This Quarter)

- Dashboard all 3 roles fully operational
- 10+ active reps booking consistently
- 50+ appointments/week

### Medium-term (This Half)

- 15+ clients on recurring plans
- `$7,500`–`$12,000` MRR
- Expand to Phase 2: larger AI automation deals (`$5K`–`$15K`)

### Long-term (This Year+)

- Phase 3: Oil and gas operators (`$25K+`)
- Systematized rep onboarding

## Anti-goals

- Do not over-engineer tooling before the sales machine is running
- Do not hire before outreach is proven at scale

---

## Active Infrastructure

| Tool | Purpose |
|------|---------|
| Retell AI | AI phone agents |
| Supabase | Database + auth (`jjextitmbptoaolacocs.supabase.co`) |
| Vercel | Dashboard (`ohvara-dashboard.vercel.app`) |
| Twilio | SMS reminders |
| Anthropic Claude API | Scripts, recommendations, briefings |
| Indeed MCP | Lead scraping |
| GitHub: BFreeOhvara | All repos |

---

## Rules Claude Always Follows

1. Read [[Memories]] before every session
2. Read [[DESIGN]] before touching any UI
3. Append to [[Memories]] after every session
4. Never ask Brayden to run commands manually
5. Never hardcode colors — use design tokens
6. Never duplicate leads in the database
7. Rep dashboard: exactly 150 leads/day per rep
8. All monetary values in mono font
9. When blocked, state blocker + two options
10. Log every mistake — mistakes written down don't repeat

---

## Shifts Log

| Date | Shift | Reason |
|------|-------|--------|
| 2026-06-07 | Initialized North Star | Ohvara vault setup |
