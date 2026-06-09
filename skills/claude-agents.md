---
date: 2026-06-07
description: "147 production-ready Claude specialist agents from wshobson/agents — drop into ~/.claude/agents/ for any domain"
tags:
  - skill
  - agents
  - reference
status: active
source: "Instagram video — instagram-147-claude-agents-drop"
media: "media/instagram-147-claude-agents-drop.mp4"
---

# Skill: Claude Specialist Agents (147-Agent Library)

**Category:** Claude Performance / Agents
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Reference guide for the `wshobson/agents` repo (~91k stars) — 147 production-ready specialist agents that drop into `~/.claude/agents/` and work in any Claude Code project.

**"This is an entire discipline no one knows exists — agent engineering."**

---

## How to Install

```bash
# Clone the repo
git clone https://github.com/wshobson/agents.git ~/wshobson-agents

# Copy specific agents you want into your global agents folder
cp ~/wshobson-agents/agents/sales-deal-strategist.md ~/.claude/agents/
cp ~/wshobson-agents/agents/engineering-devops-automator.md ~/.claude/agents/
```

Agents in `~/.claude/agents/` are available in every Claude Code session automatically.

---

## Agents Visible in Video

| Agent | Category |
|-------|----------|
| `engineering-ai-engineer.md` | Engineering |
| `engineering-devops-automator.md` | Engineering |
| `marketing-ai-citation-strategist.md` | Marketing |
| `marketing-growth-hacker.md` | Marketing |
| `marketing-seo-specialist.md` | Marketing |
| `design-ui-designer.md` | Design |
| `design-ux-architect.md` | Design |
| `product-sprint-prioritizer.md` | Product |
| `product-behavioral-nudge-engine.md` | Product |
| `finance-tax-strategist.md` | Finance |
| `finance-bookkeeper-controller.md` | Finance |
| `sales-deal-strategist.md` | Sales |
| `legal-client-intake.md` | Legal |

---

## Priority Agents for Ohvara

| Agent | Use Case | Priority |
|-------|----------|----------|
| `sales-deal-strategist.md` | Power the closer AI recommendation engine | 🔴 Install immediately |
| `marketing-growth-hacker.md` | Lead generation strategy, rep recruiting | 🟡 Evaluate |
| `design-ui-designer.md` | Dashboard UI sessions | 🟡 Evaluate |
| `engineering-devops-automator.md` | Vercel/Supabase deployment tasks | 🟡 Evaluate |

---

## Install Instructions for Ohvara

```bash
# 1. Clone the full library
git clone https://github.com/wshobson/agents.git ~/wshobson-agents

# 2. Install priority agents
mkdir -p ~/.claude/agents
cp ~/wshobson-agents/agents/sales-deal-strategist.md ~/.claude/agents/
cp ~/wshobson-agents/agents/engineering-devops-automator.md ~/.claude/agents/

# 3. Verify
ls ~/.claude/agents/
```

After installation, the sales-deal-strategist agent will be available in every Claude Code session — invoke it in closer dashboard AI recommendation work.

---

## Notes

- Repo: https://github.com/wshobson/agents
- Same repo referenced in [[claude-repos-top10]] (#8 — wshobson/agents)
- Level 4 tool per the [[claude-mastery]] framework — be surgical, only install what you'll use

---

## Related

- [[claude-repos-top10]] — same repo, different angle
- [[claude-mastery]] — agent use is Level 4 (Integrator)
- [[North Star]] — closer dashboard AI recommendation flow
