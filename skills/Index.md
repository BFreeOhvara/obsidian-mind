---
date: 2026-06-07
description: "Master index of all Ohvara skills — Active (Phase 1 routing) vs Dormant (parked in skills/dormant/ until needed)"
tags:
  - index
  - moc
  - skills
status: active
---

# Skills Index

> All skills in `skills/`. Browse before building — it may already exist.
> Keep under 30. 20–30 curated beats 1,000 generic.

---

## Quick Routing — Go Here First

Active Phase 1 skills only. If a task isn't covered here, check the Dormant table before building anything new.

| Task | Go To |
|------|-------|
| Session start / loading context | [[eagle-startup]] |
| Ending a session / handoff | [[auto-handoff]] |
| Context window filling up / when to warn | [[session-management]] |
| Capturing knowledge mid-session | [[auto-knowledge-capture]] |
| Writing a rep call script | [[rep-call-script]] |
| Closing a deal / Stripe links | [[stripe-payments]] |
| Building or fixing dashboard features | [[ohvara-dashboard|work/active/ohvara-dashboard]] |
| Writing or fixing UI | [[DESIGN]] + [[ui-animations]] |
| Writing a prompt for CC | [[cc-prompt-format]] |
| Researching a prospect / company / competitor | [[company-research]] |
| Rules that apply to all Claude instances (Eagle + Falcon) | [[shared-instance-rules]] |

---

## Active Skills

Purpose-built for Phase 1 Ohvara operations. These live in `skills/` and appear in the routing table above.

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[eagle-startup]] | Memory / Session | Startup briefing for new chats — Ohvara summary, stack, blockers, state-check rule, resume prompt format | ✅ Active |
| [[auto-handoff]] | Memory / Session | Preserve context across long sessions — handoff protocol + token efficiency rules | ✅ Active |
| [[session-management]] | Memory / Session | CC self-monitors context — 60%+ full appends a wrap-up warning to every response | ✅ Active |
| [[auto-knowledge-capture]] | Memory | Scan sessions for decisions and auto-log to brain at session end | ✅ Active |
| [[rep-call-script]] | AI / Sales | Generate Profile A niche-aware call scripts — surface pain, book discovery call | ✅ Active |
| [[stripe-payments]] | Payments | Generate two Stripe links per close (setup fee + monthly) | ✅ Active |
| [[ui-animations]] | UI / Design | Glass morphism, animated orbs, counting KPIs, staggered animations | ✅ Active |
| [[cc-prompt-format]] | Session / Workflow | Eagle delivers every CC-bound prompt as its own clean, named artifact — prompt only, commentary stays in chat | ✅ Active |
| [[company-research]] | Research / Sales | Exa-powered company/prospect research — Task-agent isolation, advanced search only, structured output | ✅ Active |
| [[shared-instance-rules]] | Session / Workflow | One rulebook for Eagle + Falcon — CC prompt format, context alarm awareness, freshness check, state-check, scratch-paper principle | ✅ Active |

### Pending Action (in `skills/`, not routed)

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[claude-agents]] | Agents | 147-agent library (wshobson/agents) — install sales-deal-strategist for closer flow | 🔲 Install needed |
| [[claude-mem]] | Memory | Automatic persistent memory compression — evaluate as Memories.md upgrade | 🔲 Evaluate |

---

## Dormant Skills

Parked in `skills/dormant/` — not needed for Phase 1. Nothing deleted; promote back when a phase or task requires them.

| Skill | Why Dormant | Wake When |
|-------|-------------|-----------|
| [[social-media-research]] | Phase 2–3 only — Apify MCP + TribeV2 + Modal GPU content analysis | Phase 2 begins |
| [[stitch-mcp-workflow]] | Only needed for new UI built from mockups | A from-mockup UI session starts |
| [[claude-repos-top10]] | Reference — 10 GitHub repos for Claude Code | Hunting for new tooling |
| [[claude-10x-tools]] | Reference — top tools from @chase.h.ai Part 1 | Hunting for new tooling |
| [[claude-mastery]] | Reference — 6-level mastery framework | Reviewing the Claude workflow |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Active | In use, verified working |
| 🔲 Install needed | Documented, action required |
| 🔲 Evaluate | Needs evaluation before adopting |

---

## Rules

- Keep total skills under 30
- Every new skill needs: frontmatter with `description`, at least one `## Related` link
- Skills that haven't been used in 90 days → archive or delete
- Reference skills count against the limit — don't hoard

Dormant skills live in `skills/dormant/` — promote back to this table when a phase or task requires them.

## Related

- [[Memories]] — session log with skill creation history
- [[North Star]] — Ohvara context and Claude rules
- [[auto-knowledge-capture]] — skill that triggers skill updates
