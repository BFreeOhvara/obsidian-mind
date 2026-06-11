---
date: 2026-06-10
description: "Eagle startup briefing — Ohvara summary, tech stack, current blockers, state-check rule, and resume prompt format for new chats"
tags:
  - skills
  - memory
  - session
status: active
---

# Eagle Startup

> Load this at the start of any new Eagle or Falcon chat. Everything here points back to [[Memories]] and [[North Star]] in Atlas.

---

## Ohvara in One Paragraph

**Ohvara** is a two-vertical SMB automation business run by Brayden (operations/builds), Nate (sales/closing), and Jahandad (rep recruitment). Vertical 1 sells AI phone receptionists/dispatchers to trades and field-service businesses (Profile A: roofing, HVAC, electrical, landscaping, etc.) as recurring monthly subscriptions — four packages from $497/mo to $1,797/mo, all with a $497 one-time setup fee. Vertical 2 is a web agency selling single-file websites to Google Maps businesses with no website. **Status: pre-revenue. Phase 1 — getting the outreach machine running at full capacity — is the only focus.** The #1 priority is the dashboard onboarding a rep in 60 seconds: account → login → 150 leads loaded → calling.

## Active Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | React 19 + Vite SPA (Tailwind, react-query, react-router v7, recharts) |
| Backend | Supabase — PostgreSQL + RLS + Edge Functions (`jjextitmbptoaolacocs.supabase.co`) |
| Hosting | Vercel (`ohvara-dashboard.vercel.app` + `ohvara-client-portal.vercel.app`) |
| AI phone agents | Retell AI |
| SMS | Twilio (currently stubbed — STUB_MODE=true) |
| Payments | Stripe (two links per close: setup fee + monthly) |
| AI scripts/briefings | Anthropic Claude API (claude-haiku-4-5 for rep scripts) |

## Current Blockers

- **Anthropic credits depleted** — AI scripts fall back to templates; recommend-stack 500s. Fix at console.anthropic.com
- **RETELL_API_KEY missing** — blocks voice roleplay training + AI call coach + build-agent
- **TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN missing** — blocks SMS appointment reminders
- **INDEED_MCP_TOKEN missing** — Indeed scraper returns notConfigured (Google Maps scraper is the working fallback)

## The One Rule

> **Before writing any prompt for Claude Code, ask Claude Code to return the current state of the relevant file or feature from Atlas first.**

Never prompt blind. The state lives in [[ohvara-dashboard]] (architecture, schema, feature status) and [[Memories]] (session logs, lessons, what broke last). A 30-second state check beats a 30-minute rebuild of something that already works.

## Resume Prompt Format

Paste into any new chat to continue work:

```
Read ~/obsidian-mind/brain/Memories.md and ~/obsidian-mind/brain/North Star.md before doing anything. I'm continuing Ohvara work.

Current state: [last "Current state" from the newest Memories session log]

Next action: [exact next task in 1–2 sentences]
```

---

## Related

- [[North Star]] — goals, packages, rules — read every session
- [[Memories]] — session logs and hard-won lessons — read every session
- [[auto-handoff]] — the session-end half of this workflow (this note is the session-start half)
- [[ohvara-dashboard]] — full dashboard state doc
- [[skills/Index]] — skill registry
