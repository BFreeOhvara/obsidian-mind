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

## Ohvara Core Skills

These are purpose-built for Ohvara operations.

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[rep-call-script]] | AI / Sales | Generate Profile A niche-aware call scripts — surface pain, book discovery call | ✅ Active |
| [[stripe-payment-links]] | Payments | Generate two Stripe links per close (setup fee + monthly) | ✅ Active |
| [[auto-knowledge-capture]] | Memory | Scan sessions for decisions and auto-log to brain at session end | ✅ Active |
| [[premium-ui-animations]] | UI / Design | Glass morphism, animated orbs, counting KPIs, staggered animations | ✅ Active |

---

## Claude Performance & Tools

Reference guides and tools for improving Claude Code workflows.

| Skill | Category | What It Does | Status |
|-------|----------|-------------|--------|
| [[top-10-claude-github-repos]] | Reference | 10 most impactful GitHub repos for Claude Code — Ohvara status on each | ✅ Reference |
| [[10x-claude-code-part1]] | Reference | Top 5 tools from @chase.h.ai Part 1 — Codex plugin, obsidian-skills, autoresearch, skill-creator, notebooklm-py | ✅ Reference |
| [[claude-code-mastery-levels]] | Framework | 6-level mastery framework — where Ohvara sits, traps to avoid, "less is more" rule | ✅ Reference |
| [[claude-specialist-agents]] | Agents | 147-agent library (wshobson/agents) — install sales-deal-strategist for closer flow | 🔲 Install needed |
| [[claude-mem-memory]] | Memory | Automatic persistent memory compression — evaluate as Memories.md upgrade | 🔲 Evaluate |
| [[google-stitch-mcp-workflow]] | Design | Google Stitch → MCP → Claude Code — higher fidelity than DESIGN.md alone | 🔲 Try next UI session |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Active | In use, verified working |
| ✅ Reference | Reference guide, no install needed |
| 🔲 Install needed | Documented, action required |
| 🔲 Evaluate | Needs evaluation before adopting |
| 🔲 Try next session | Ready to try, not yet used |

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
