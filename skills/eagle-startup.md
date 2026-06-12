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
> **Always load [[shared-instance-rules]] alongside this note** — the one rulebook that applies identically to Eagle AND Falcon (CC prompt format, context alarm awareness, freshness check, state-check, scratch-paper principle). Neither instance may have rules the other doesn't.

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

> **[[LIVE_STATE]] is authoritative for blocker status** — check its Open Threads section before trusting this list. Snapshot as of 2026-06-12:

- ✅ ~~Anthropic credits~~ — CLEARED 2026-06-11 ($25 + auto-reload $10 → $50). AI scripts + recommend-stack live on real model output.
- ✅ ~~RETELL_API_KEY~~ — CLEARED 2026-06-11. Voice roleplay live ("Mike - HVAC Owner" agent); create-lead-call coach deployed v5.
- **TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN missing** — gates SMS appointment reminders only (cleanly stubbed). Deprioritized for Phase 1 testing, NOT descoped — required before delivering Pro+ tiers to real clients.
- **INDEED_MCP_TOKEN missing** — Indeed scraper returns notConfigured (Google Maps scraper is the working fallback)

## The One Rule

> **Before writing any prompt for Claude Code, ask Claude Code to return the current state of the relevant file or feature from Atlas first.**

Never prompt blind. The state lives in [[ohvara-dashboard]] (architecture, schema, feature status) and [[Memories]] (session logs, lessons, what broke last). A 30-second state check beats a 30-minute rebuild of something that already works.

Session commands ([[shared-instance-rules]]): "Save" = save state to Atlas, "Resume" = generate fresh context load, "Reload" = both. Respond immediately with the correct artifact.

## Context Freshness Check (runs every session start)

When Eagle loads a context block, it must immediately assess whether the state might be stale.

Stale signals include:
- Session log references work done by Falcon or CC that Eagle has no detail on
- Blocker status is unclear (e.g. "keys pending" but no confirmation either way)
- Brayden says anything like "we did stuff since that context" or "just got back from CC/Falcon"
- The context block has no timestamp or is from a previous date

When ANY stale signal is present, Eagle must:
1. Acknowledge it briefly in chat ("My context may be behind — generating a refresh prompt for CC.")
2. Immediately output a CC prompt as a clean artifact (per the [[cc-prompt-format]] rule) that tells CC to:
   - Read `brain/Memories.md` in the obsidian-mind vault
   - Get the latest session entry and any recent updates
   - Generate a fresh OHVARA CONTEXT LOAD block including: phase/focus, team/roles, packages/commissions, 90-day targets, dashboard state, blocker statuses (updated), latest session log, active skill routing table, standing rules, and the cc-prompt-format reminder
   - Output it as a single clean artifact Brayden can paste into Eagle

Eagle does NOT ask Brayden whether to do this — it just generates the artifact automatically when stale signals are present.

## Resume Prompt Format

Paste into any new chat to continue work:

```
Read ~/obsidian-mind/brain/LIVE_STATE.md first, then ~/obsidian-mind/brain/Memories.md latest entries. I'm continuing Ohvara work.

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
