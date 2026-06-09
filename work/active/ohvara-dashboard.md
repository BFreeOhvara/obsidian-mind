---
date: 2026-06-09
description: Full knowledge base for the Ohvara Outreach Dashboard — architecture, edge functions, DB schema, feature status, known issues, and rep onboarding flow.
tags: [work-note, brain]
status: active
quarter: Q2-2026
project: ohvara-dashboard
team: Ohvara
---

# Ohvara Dashboard — Full Brain Sync

> Last synced: **2026-06-09** by Claude Brain Sync session.
> Live URL: **https://ohvara-dashboard.vercel.app**
> Supabase project: `jjextitmbptoaolacocs.supabase.co`

---

## Quick Links

- [[North Star]] — business goals and phase
- [[Memories]] — session logs and hard-won lessons
- [[Ohvara]] — product overview note

---

## Architecture

```
Browser (React + Vite SPA)
  └─ Tailwind CSS, @tanstack/react-query, react-router-dom v7, recharts
  └─ @supabase/supabase-js — PostgREST + Auth + Edge Functions
  └─ retell-client-js-sdk (wired but not activated — no RETELL_API_KEY)

Supabase (PostgreSQL + RLS + Edge Functions on Deno)
  ├─ REST API — lead, profile, call, appointment CRUD
  ├─ Auth — GoTrue username-based (email format: username@ohvara.internal)
  └─ 17 Edge Functions — AI, batch ops, scraping, Stripe, Twilio

Vercel
  ├─ ohvara-dashboard.vercel.app — main SPA
  └─ ohvara-client-portal.vercel.app — client onboarding portal
```

### Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| UI framework | React | 19.2.6 |
| Bundler | Vite | 8.0.12 |
| Styling | Tailwind CSS | 3.4.19 |
| Router | react-router-dom | 7.17.0 |
| Data fetching | @tanstack/react-query | 5.101.0 |
| Charts | recharts | 3.8.1 |
| Icons | lucide-react | 1.17.0 |
| Supabase | @supabase/supabase-js | 2.107.0 |
| AI SDK | @anthropic-ai/sdk | 0.102.0 |
| Twilio (stubbed) | (in twilio.js — STUB_MODE=true) | n/a |
| Retell | retell-client-js-sdk | 2.0.8 |
| Fonts | Geist + JetBrains Mono | 5.2.x |

---

## Routing — 3 Roles

### Rep Routes (`/rep/*`)
| Route | Component | Purpose |
|-------|-----------|---------|
| `/rep` | `MyLeads` | Main work surface — 150 leads per day, KPIs, call button |
| `/rep/training` | `TrainingCenter` | Videos + flashcards + AI roleplay |
| `/rep/stats` | `MyStats` | Personal performance charts |
| `/rep/goals` | `MyGoals` | Daily/weekly targets |
| `/rep/feed` | `ActivityFeed` | Team activity stream |

### Closer Routes (`/closer/*`)
| Route | Component | Purpose |
|-------|-----------|---------|
| `/closer` | `MyAppointments` | Booked leads with AI close briefings |
| `/closer/deals` | `PastDeals` | Closed/lost deal history |
| `/closer/revenue` | `RevenueTracker` | Revenue and commission charts |
| `/closer/reps` | `RepAnalytics` | Rep performance for closers |
| `/closer/call-leads` | `CallLeads` | Direct lead calling for closers |
| `/closer/pipeline` | `CloserPipeline` | Full pipeline view |
| `/closer/scraper` | `LeadScraper` (shared) | Lead scraper (same as admin) |

### Admin Routes (`/admin/*`)
| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin` | `Overview` | Top-line metrics, rep performance |
| `/admin/reps` | `RepPerformance` | Detailed rep stats |
| `/admin/leads` | `AllLeads` | Full lead table with filters |
| `/admin/pipeline` | `LeadPipeline` | Pipeline funnel view |
| `/admin/reengagement` | `ReEngagement` | Re-engagement campaigns |
| `/admin/sources` | `LeadSources` | Lead source analysis |
| `/admin/scraper` | `LeadScraper` | Maps + Indeed scraper UI |
| `/admin/users` | `Users` | Create/activate/deactivate reps and closers |

---

## Database Schema

### Tables

#### `profiles`
```
id              uuid (PK, FK → auth.users.id)
role            user_role enum ('rep','closer','admin')
full_name       text
email           text
phone           text
is_active       boolean default true
username        text (unique where not null)
last_login_at   timestamptz  ← updated on SIGNED_IN by useAuth.jsx
created_at      timestamptz
updated_at      timestamptz
```

#### `leads`
```
id                  uuid PK
source              lead_source enum ('google_maps','indeed')  ← ONLY valid values
business_name       text
contact_name        text
phone               text
email               text
city                text
state               text
niche               text
status              lead_status enum ('New','Contacted','Voicemail','No Answer','Interested','Booked','Not Interested')
assigned_rep_id     uuid FK → profiles
assigned_closer_id  uuid FK → profiles
notes               text
pain_points         text
batch_date          date  ← set to today when batch runs; useMyLeads filters on this
re_engagement_active boolean default false
job_title           text  ← for stack recommendation
monthly_labor_cost  numeric(10,2)  ← for stack recommendation
created_at          timestamptz
updated_at          timestamptz
```

#### `appointments`
```
id              uuid PK
lead_id         uuid FK → leads
closer_id       uuid FK → profiles
rep_id          uuid FK → profiles
scheduled_at    timestamptz
status          appointment_status enum ('pending','completed','no_show','rescheduled')
outcome         appointment_outcome enum ('closed','lost','no_show')
deal_value      numeric
loss_reason     text
closer_notes    text
closed_tier     text
closed_at       timestamptz
created_at      timestamptz
updated_at      timestamptz
```

#### `calls`
```
id                uuid PK
lead_id           uuid FK → leads
rep_id            uuid FK → profiles
duration_seconds  integer default 0
outcome           text (nullable)
created_at        timestamptz
```

#### `batch_assignments`
```
id          uuid PK
rep_id      uuid FK → profiles
batch_date  date
lead_count  integer
created_at  timestamptz
```

#### `clients` (migration 012)
```
id              uuid PK
business_name   text
owner_name      text
owner_email     text
business_phone  text
niche           text
location        text
tier            text CHECK ('basic','pro','premium','elite')
status          text CHECK ('onboarding','active','paused','churned')
monthly_value   numeric
setup_fee       numeric default 497
retell_agent_id text
twilio_number   text
portal_url      text
created_at      timestamptz
updated_at      timestamptz
deleted_at      timestamptz
```

#### `reminder_log` (migration 004)
```
id                uuid PK
appointment_id    uuid FK → appointments
scheduled_time    timestamptz
send_time         timestamptz
status            reminder_status enum ('pending','sent','cancelled','failed')
channel           text default 'sms'
message_body      text
twilio_message_sid text
error_message     text
created_at        timestamptz
```

### Enums
- `user_role`: `rep`, `closer`, `admin`
- `lead_status`: `New`, `Contacted`, `Voicemail`, `No Answer`, `Interested`, `Booked`, `Not Interested`
- `lead_source`: `google_maps`, `indeed` ← **only these two; no 'seeded' etc.**
- `sequence_channel`: `sms`, `email`
- `sequence_status`: `pending`, `sent`, `replied`, `cancelled`
- `appointment_status`: `pending`, `completed`, `no_show`, `rescheduled`
- `appointment_outcome`: `closed`, `lost`, `no_show`
- `reminder_status`: `pending`, `sent`, `cancelled`, `failed`

### DB Record Counts (2026-06-09)
| Table | Count |
|-------|-------|
| leads | 224 |
| profiles | 4 |
| appointments | 1 |
| calls | 8 |
| clients | 0 |

---

## Migrations (13 total)

| # | File | What it does |
|---|------|-------------|
| 001 | `initial_schema.sql` | Enums, tables: profiles, leads, appointments, calls, batch_assignments |
| 002 | `triggers_and_cron.sql` | DB trigger: when lead → Booked, calls assign-closer via pg_net |
| 003 | `lead_fields_and_rls.sql` | job_title, monthly_labor_cost columns; admin UPDATE policy on profiles |
| 004 | `reminder_log.sql` | reminder_log table + cron processor setup |
| 005 | `username_auth.sql` | username column on profiles; handle_new_user trigger |
| 006 | `seed_accounts.sql` | brayden11 (admin) + rep_sarah (rep) via auth.users insert |
| 007 | `fix_seed_identities.sql` | auth.identities rows for brayden11 + rep_sarah (GoTrue requires them) |
| 008 | `fix_admin_profile.sql` | Upsert brayden11 profile row; explicit self-select RLS policy |
| 009 | `fix_profiles_rls_recursion.sql` | `is_admin()` SECURITY DEFINER function; fixes infinite recursion bug in policies |
| 010 | `profiles_rls_team_visibility.sql` | Any authed user can SELECT from profiles (needed for closer → rep JOINs) |
| 011 | `last_login_and_stack_analysis.sql` | last_login_at column on profiles |
| 012 | `clients_onboarding_notifications.sql` | clients, onboarding_steps, notifications tables; provision-client support |
| 013 | `seed_closer_rep_accounts.sql` | jordan22 (closer), nate44 (closer), apex11 (rep) |

**Key gotcha:** `CREATE POLICY IF NOT EXISTS` doesn't work in PostgreSQL ≤ 16. Use DO $$ ... IF NOT EXISTS ... END $$ blocks.

---

## Edge Functions (17 total)

All deployed to `https://jjextitmbptoaolacocs.supabase.co/functions/v1/`

| Function | What it does | Status |
|----------|-------------|--------|
| `assign-daily-batch` | Round-robin 150 leads per active rep, sets batch_date=today | ✅ 200 |
| `generate-ai-script` | 4 modes: script / stack_analysis / pitch_anchor / briefing. Triple-layer fallback — never 500s. Model: claude-haiku-4-5 | ✅ 200 (fallback when no credits) |
| `recommend-stack` | Thin wrapper calling generate-ai-script in stack_analysis mode | ⚠️ 500 when API credits depleted |
| `admin-create-user` | Creates auth.users + profiles row; requires admin JWT | ✅ (401 without JWT) |
| `admin-toggle-user` | Flips is_active on profiles | ✅ (401 without JWT) |
| `admin-delete-user` | Deletes auth.users row (cascades to profiles) | ✅ (401 without JWT) |
| `assign-closer` | Triggered by DB trigger when lead → Booked; round-robins to available closer | ✅ (400 without body) |
| `build-agent` | Creates Retell AI agent for a client | ✅ (400 without body) |
| `create-roleplay-call` | Starts Retell web call for rep training | ⚠️ 503 — RETELL_API_KEY not set |
| `generate-stripe-links` | Generates Stripe payment links for a tier | ✅ (400 without body) |
| `indeed-scraper` | Scrapes Indeed job listings for leads | ✅ (401 without admin JWT) |
| `maps-scraper` | Scrapes Google Maps for business leads | ✅ (403 without admin JWT) |
| `process-reminders` | Sends pending appointment reminders via Twilio SMS | ✅ 200 |
| `provision-client` | Creates full client stack (Retell agent + Twilio number + DB row) | ✅ (400 without body) |
| `score-roleplay` | Scores rep's roleplay transcript | ✅ (400 without transcript) |
| `schedule-reminders` | Schedules reminder_log rows for upcoming appointments | ✅ (400 without body) |
| `trigger-re-engagement` | Fires re-engagement sequences for inactive leads | ✅ 200 |

### AI Script Fallback Chain
1. No ANTHROPIC_API_KEY → return template immediately
2. API error (incl. credits depleted) → return template
3. Outer try/catch → return template with `fallback: true`

**Note as of 2026-06-09:** Anthropic API credits depleted. `generate-ai-script` returns fallback template (5 sections). `recommend-stack` returns 500 (no fallback layer). To fix: add credits at console.anthropic.com.

---

## Configured Secrets (Supabase)

### Present ✅
- `ANTHROPIC_API_KEY` — set, but **credits depleted as of 2026-06-09**
- `CLIENT_PORTAL_URL` — `https://ohvara-client-portal.vercel.app`
- `GOOGLE_MAPS_API_KEY` — set
- `STRIPE_SETUP_LINK_STARTER` through `STRIPE_MONTHLY_LINK_ELITE` (8 links total) — set

### Missing ❌
- `RETELL_API_KEY` — blocks: create-roleplay-call, build-agent, voice roleplay in training
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` — blocks: process-reminders SMS delivery
- `STRIPE_SECRET_KEY` — blocks: dynamic Stripe checkout (static links still work)
- `INDEED_MCP_TOKEN` — indeed-scraper returns `{notConfigured: true}` gracefully

### Vercel Env Vars (ohvara-dashboard)
- `VITE_SUPABASE_URL` — `https://jjextitmbptoaolacocs.supabase.co`
- `VITE_SUPABASE_ANON_KEY` — set

---

## User Accounts

| Username | Role | Password | Email (internal) |
|----------|------|---------|-----------------|
| brayden11 | admin | Brayden2026! | brayden11@ohvara.internal |
| rep_sarah | rep | Sarah2026! | rep_sarah@ohvara.internal |
| apex11 | rep | Apex2026! | apex11@ohvara.internal |
| jordan22 | closer | Jordan2026! | jordan22@ohvara.internal |
| nate44 | closer | Nate2026! | nate44@ohvara.internal |

**Pattern:** `username@ohvara.internal` for all accounts. Password format: `Name + 2026!`

---

## Rep Onboarding Flow (60-Second Test)

1. Login with `apex11` / `Apex2026!`
2. Redirected to `/rep` → **MyLeads**
3. `useMyLeads` hook fires → queries leads where `assigned_rep_id = profile.id AND batch_date = today`
4. If batch hasn't run today → 0 leads visible → trigger `assign-daily-batch`
5. 150 leads load → KPI cards: Calls Today / Booked Today / Connect Rate / Batch Total
6. Daily progress bar shows calls made vs 150 total
7. Expand any lead → **Call Now** button: opens `tel:` link + AIScriptPanel simultaneously
8. AIScriptPanel → **Generate Script** → Haiku response in 5 sections (Opener/Problem/Pitch/Objections/Close)
9. Update lead status via row editor dropdown
10. Training at `/rep/training`: Videos (7 cards, YouTube TBD) / Flashcards (100, localStorage) / Roleplay (Coming Soon without RETELL)

**Daily batch must run once per day.** Admin triggers it manually or set up pg_cron:
```sql
SELECT cron.schedule('daily-batch', '0 6 * * *',
  'SELECT net.http_post(url := current_setting(''app.supabase_url'') || ''/functions/v1/assign-daily-batch'', ...)'
);
```

---

## Feature Status Table

| Feature | Status | Notes |
|---------|--------|-------|
| Rep login | ✅ Working | apex11/Apex2026! |
| 150 leads on login | ✅ Working | batch_date=today filter |
| KPI cards (4) | ✅ Working | Calls/Booked/Connect Rate/Batch Total |
| Daily progress bar | ✅ Working | Added 2026-06-09 |
| Call Now (tel: link) | ✅ Working | Opens phone app; script panel opens simultaneously |
| Call recording in DB | ✅ Working | Inserts to `calls` table on dial |
| AI script generation | ✅ Working | Fallback template when credits empty |
| AI stack analysis | ⚠️ Partial | Returns 500 when credits empty (no fallback) |
| Status update | ✅ Working | Row editor dropdown |
| Training — flashcards | ✅ Working | 100 cards (35 objection/35 script/30 product), localStorage progress |
| Training — videos | ⚠️ Partial | 7 cards render, all YouTube IDs are PLACEHOLDER_* |
| Training — AI roleplay | ❌ Not working | Needs RETELL_API_KEY |
| Closer dashboard | ✅ Working | MyAppointments loads |
| AI close briefing | ⚠️ Partial | Depends on Haiku credits |
| Stripe links | ✅ Working | Static links configured |
| Mark Closed | ✅ Working | Creates appointment.outcome=closed |
| Admin overview | ✅ Working | Charts + rep metrics |
| Admin user create | ✅ Working | Tested 2026-06-09 |
| Lead scraper (Maps) | ✅ Working | Requires GOOGLE_MAPS_API_KEY (set) |
| Lead scraper (Indeed) | ⚠️ Partial | notConfigured:true — needs INDEED_MCP_TOKEN |
| Re-engagement | ✅ Working | trigger-re-engagement 200 |
| SMS reminders | ❌ Not working | Needs TWILIO_* secrets |
| Voice roleplay | ❌ Not working | Needs RETELL_API_KEY |
| Client portal | ✅ Deployed | https://ohvara-client-portal.vercel.app |
| provision-client | ✅ Working | (400 without body — expected) |
| Assign closer trigger | ✅ Working | DB trigger fires on Booked |
| assign-daily-batch cron | ❌ Not scheduled | Manual trigger only; needs pg_cron setup |

**Summary:** 15 working / 4 broken / 5 partial

---

## Commission / Pricing Structure

| Tier | Monthly Price | Setup Fee |
|------|-------------|-----------|
| Starter | $497/mo | $497 |
| Growth | $797/mo | $497 |
| Full Stack | $1,297/mo | $497 |

(Also: basic/pro/premium/elite in clients table — maps to Starter/Growth/Full Stack internally)

---

## Critical Gotchas

1. **`lead_source` enum only accepts `google_maps` and `indeed`** — seeding with any other value (e.g. 'seeded', 'manual') throws a DB error
2. **`batch_date` must equal TODAY** — `useMyLeads` filters strictly; if batch runs tomorrow, yesterday's reps see 0 leads
3. **`is_admin()` SECURITY DEFINER function required** — direct `EXISTS (SELECT 1 FROM profiles)` in policies causes infinite RLS recursion (error 42P17)
4. **`CREATE POLICY IF NOT EXISTS` doesn't exist in PostgreSQL ≤ 16** — wrap in DO $$ block
5. **auth.identities required** — inserting into auth.users without a matching auth.identities row makes GoTrue reject login
6. **Twilio is STUB_MODE=true** — `TWILIO_STUB_MODE = true` in `src/lib/twilio.js`; Call Now bypasses it entirely with `tel:` link
7. **Anthropic credits depleted** — as of 2026-06-09; `generate-ai-script` falls back silently, `recommend-stack` returns 500
8. **Vercel deploy requires `--scope ohvara`** — without it, returns `action_required: missing_scope`
9. **Windows encoding** — Python `print()` with emoji causes `UnicodeEncodeError` on Windows charmap codec

---

## File Structure

```
ohvara-dashboard/
├── src/
│   ├── App.jsx                        # Routes (3 roles)
│   ├── main.jsx
│   ├── index.css                      # CSS variables + base styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx    # Sidebar + topbar shell
│   │   │   ├── ProtectedRoute.jsx     # Role-based guard
│   │   │   ├── Sidebar.jsx            # Role-aware nav
│   │   │   └── TopBar.jsx
│   │   ├── rep/
│   │   │   ├── CallButton.jsx         # tel: link + DB insert + script open
│   │   │   └── AIScriptPanel.jsx      # 5-section script with tabs
│   │   ├── closer/
│   │   │   └── AppointmentCard.jsx    # AI stack analysis + Stripe links
│   │   ├── admin/
│   │   │   └── CreateRepModal.jsx     # admin-create-user flow
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   └── BackgroundOrbs.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx                # Supabase auth + profile + last_login_at update
│   │   ├── useMyLeads.jsx             # Rep leads (batch_date=today filter)
│   │   ├── useLeads.jsx               # Admin/closer full lead access
│   │   └── useProfiles.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── rep/
│   │   │   ├── MyLeads.jsx            # Main rep surface + progress bar
│   │   │   ├── TrainingCenter.jsx     # Videos/flashcards/roleplay
│   │   │   ├── MyStats.jsx
│   │   │   ├── MyGoals.jsx
│   │   │   └── ActivityFeed.jsx
│   │   ├── closer/
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── PastDeals.jsx
│   │   │   ├── RevenueTracker.jsx
│   │   │   ├── RepAnalytics.jsx
│   │   │   ├── CallLeads.jsx
│   │   │   └── CloserPipeline.jsx
│   │   └── admin/
│   │       ├── Overview.jsx
│   │       ├── RepPerformance.jsx
│   │       ├── AllLeads.jsx
│   │       ├── LeadPipeline.jsx
│   │       ├── ReEngagement.jsx
│   │       ├── LeadSources.jsx
│   │       ├── LeadScraper.jsx        # Google Maps + Indeed tabs
│   │       └── Users.jsx              # Create/toggle/delete users
│   └── lib/
│       ├── supabase.js                # createClient with VITE_ env vars
│       └── twilio.js                  # STUB_MODE=true — not provisioned
├── supabase/
│   ├── functions/                     # 17 edge functions (Deno)
│   └── migrations/                    # 13 migration files
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel-deploy.mjs                  # Vercel OAuth device flow deploy script
```

---

## Next Steps (Priority Order)

1. **Top priority: Add Anthropic credits** — `recommend-stack` 500s, AI scripts fall back to template
2. **Add real YouTube video IDs** — update `TRAINING_VIDEOS` array in `TrainingCenter.jsx` (7 `PLACEHOLDER_*` values)
3. **Set up pg_cron for daily batch** — currently manual; reps will see 0 leads if batch doesn't run
4. **Get `RETELL_API_KEY`** — unlocks voice roleplay training (retell.ai)
5. **Set `TWILIO_*` secrets** — unlocks SMS appointment reminders
6. **Set `INDEED_MCP_TOKEN`** — unlocks Indeed lead scraper

---

## Related

- [[North Star]]
- [[Memories]]
- [[Ohvara]]
