---
date: 2026-06-07
description: "6-level Claude Code mastery framework — traps at each level, unlock conditions, and where Ohvara sits"
tags:
  - skill
  - claude
  - reference
  - framework
status: active
source: "Instagram video — instagram-6-levels-claude-code-mastery"
media: "media/instagram-6-levels-claude-code-mastery.mp4"
---

# Skill: 6 Levels of Claude Code Mastery

**Category:** Claude Performance / Reference
**Created:** 2026-06-07
**Last used:** 2026-06-07

## The Framework

### Level 1 — The Beginner
"Build me a landing page" — one shot, command → output. Claude seen as vending machine.

**Skills to master:** Clear prompts, reading output, basic terminal
**TRAP — Regression to the Mean:** No context = Claude guesses = slop. 90% of people live here.
**Unlock Level 2:** Stop commanding. Start asking Claude to *plan with you*.

---

### Level 2 — The Planner
Ask Claude to plan before it acts.

**Skills:** Understanding what Claude sees vs doesn't, using `/clear` between tasks
**TRAP — Planning Blind:** Great conversation but Claude is still guessing about your stack and preferences.
**Unlock Level 3:** The conversation doesn't matter if Claude doesn't have the right *information*.

---

### Level 3 — The Context Engineer
You write and maintain CLAUDE.md files.

**Skills:** Lean CLAUDE.md (not bloated), few-shot examples over long instructions, context window management + `/clear`, right context at the right moment
**TRAP — Bloated CLAUDE.md:** ETH Zurich study — LLM-generated context files made agents **WORSE** in 5/8 settings. Less is more. *(1 of 3)*
**Unlock Level 4:** You need capabilities beyond what Claude has natively.

---

### Level 4 — The Integrator
You connect Claude to the outside world via MCPs.

**Skills:** Surgical MCP selection (right tool, right job, per project), understanding building blocks (frontend/backend/auth/data), asking Claude "explain HOW you did that"
**TRAP — The Candy Shop:** Capability ≠ Performance. 15 tools = Claude picks the wrong one. More options = worse decisions. Less is more. *(2 of 3)*
**Unlock Level 5:** You experiment with frameworks and encode YOUR way of working.

---

### Level 5 — The Skilled
"Claude becomes YOURS."

You create custom skills encoding your standards and workflows. Your Claude setup is unique to you. Nobody else's Claude works like yours.

**Skills:** Skill authoring, slash commands (`.claude/commands/`), workflow skills (multi-step pipelines), Skill Creator for building your own
**TRAP — Skill Overload:** Too many skills = Claude can't pick the right one. 20–30 curated beats 1,000 generic. Less is more. *(3 of 3)*

---

### Level 6 — The Architect *(implied)*
Multi-agent orchestration. Claude runs other Claudes. You define the system, not the steps.

---

## The Pattern: "Less is More" Appears 3 Times

| Level | Trap | Less is More |
|-------|------|-------------|
| 3 | Bloated CLAUDE.md | Lean context beats comprehensive context |
| 4 | The Candy Shop | Few surgical MCPs beat 15 generic ones |
| 5 | Skill Overload | 20–30 curated skills beat 1,000 generic |

This is not a coincidence. It's the central lesson of the framework.

---

## Where Ohvara Sits

**Current level: 3–4 (Context Engineer → Integrator)**
**Target level: 5 (The Skilled)**

Progress toward Level 5:
- ✅ Custom skills library (`skills/`)
- ✅ CLAUDE.md maintained
- ✅ Supabase + Playwright MCPs installed
- ✅ Slash command structure in place
- 🔲 Audit CLAUDE.md for bloat (ETH Zurich trap)
- 🔲 Audit MCP count — only keep what's actively used
- 🔲 `/clear` between tasks — underused, add to session protocol

---

## Action Items for Ohvara

1. **Audit `~/.claude/CLAUDE.md`** — trim anything not directly used every session. The ETH Zurich finding is real: more context can hurt.
2. **Add `/clear` to session start protocol** — use between unrelated tasks in long sessions.
3. **Keep skills under 30** — we currently have 6 purpose-built + 4 reference = 10 total. Good. Don't add noise.
4. **Stay surgical with MCPs** — currently 2 (Supabase, Playwright). Only add a third if it solves a real gap.

---

## Related

- [[auto-knowledge-capture]] — our Level 5 skill system
- [[claude-repos-top10]] — tool selection (Level 4 material)
- [[claude-10x-tools]] — companion video series
- [[North Star]] — CLAUDE.md rules and session protocols
