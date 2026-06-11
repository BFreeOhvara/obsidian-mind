---
date: 2026-06-07
description: "Master index of all Ohvara skills — what each does, category, and status"
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

| Task | Go To |
|------|-------|
| Writing or fixing UI | [[DESIGN]] + [[ui-animations]] |
| Writing a rep call script | [[rep-call-script]] |
| Closing a deal / Stripe links | [[stripe-payments]] |
| Session start / loading context | [[eagle-startup]] |
| Ending a session / handoff | [[auto-handoff]] |
| Capturing knowledge from a session | [[auto-knowledge-capture]] |
| Building or fixing dashboard features | [[ohvara-dashboard|work/active/ohvara-dashboard]] |
| Finding tools to improve Claude Code | [[claude-repos-top10]] + [[claude-10x-tools]] |
| Leveling up the Claude workflow | [[claude-mastery]] |
| Installing specialist agents | [[claude-agents]] |
| Evaluating memory upgrades | [[claude-mem]] |
| High-fidelity UI design from mockups | [[stitch-mcp-workflow]] |
| Social media / content research (Phase 2–3) | [[social-media-research]] |

---

## Ohvara Core Skills

These are purpose-built for Ohvara operations.

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[rep-call-script]] | AI / Sales | Generate Profile A niche-aware call scripts — surface pain, book discovery call | ✅ Active |
| [[stripe-payments]] | Payments | Generate two Stripe links per close (setup fee + monthly) | ✅ Active |
| [[auto-knowledge-capture]] | Memory | Scan sessions for decisions and auto-log to brain at session end | ✅ Active |
| [[auto-handoff]] | Memory / Session | Preserve context across long sessions — handoff protocol + token efficiency rules | ✅ Active |
| [[eagle-startup]] | Memory / Session | Startup briefing for new chats — Ohvara summary, stack, blockers, state-check rule, resume prompt format | ✅ Active |
| [[ui-animations]] | UI / Design | Glass morphism, animated orbs, counting KPIs, staggered animations | ✅ Active |

---

## Claude Performance & Tools

Reference guides and tools for improving Claude Code workflows.

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[claude-repos-top10]] | Reference | 10 most impactful GitHub repos for Claude Code — Ohvara status on each | ✅ Reference |
| [[claude-10x-tools]] | Reference | Top 5 tools from @chase.h.ai Part 1 — Codex plugin, obsidian-skills, autoresearch, skill-creator, notebooklm-py | ✅ Reference |
| [[claude-mastery]] | Framework | 6-level mastery framework — where Ohvara sits, traps to avoid, "less is more" rule | ✅ Reference |
| [[claude-agents]] | Agents | 147-agent library (wshobson/agents) — install sales-deal-strategist for closer flow | 🔲 Install needed |
| [[claude-mem]] | Memory | Automatic persistent memory compression — evaluate as Memories.md upgrade | 🔲 Evaluate |
| [[stitch-mcp-workflow]] | Design | Google Stitch → MCP → Claude Code — higher fidelity than DESIGN.md alone | 🔲 Try next UI session |
| [[social-media-research]] | Research / Content | Apify MCP + TribeV2 brain model + Modal GPU — neuroscience content analysis | 🔜 Phase 2–3 |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Active | In use, verified working |
| ✅ Reference | Reference guide, no install needed |
| 🔲 Install needed | Documented, action required |
| 🔲 Evaluate | Needs evaluation before adopting |
| 🔲 Try next session | Ready to try, not yet used |
| 🔜 Phase 2–3 | Documented now, install when phase begins |

---

## Rules

- Keep total skills under 30
- Every new skill needs: frontmatter with `description`, at least one `## Related` link
- Skills that haven't been used in 90 days → archive or delete
- Reference skills count against the limit — don't hoard

## Related

- [[Memories]] — session log with skill creation history
- [[North Star]] — Ohvara context and Claude rules
- [[auto-knowledge-capture]] — skill that triggers skill updates
