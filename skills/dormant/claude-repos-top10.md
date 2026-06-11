---
date: 2026-06-07
description: "Reference guide to the 10 most impactful GitHub repos for Claude Code performance — what each solves and Ohvara status"
tags:
  - skill
  - claude
  - tools
  - reference
status: active
source: "Instagram @raycfu — '10 Claude Github Repos that actually matter'"
media: "media/instagram-10-claude-github-repos-raycfu.mp4"
---

# Skill: Top 10 Claude GitHub Repos

**Category:** Claude Performance / Tools
**Source:** Instagram @raycfu — "10 Claude Github Repos that actually matter"
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Reference guide to the 10 most impactful GitHub repos for improving Claude Code performance. Each repo solves a specific weakness. Use this skill when setting up a new Claude Code project or wanting to level up an existing one.

---

## The 10 Repos

### 1. NightTrek/superpowers-mcp

**What it does:** Gives Claude a full structured development workflow
Brainstorm → Spec → Plan → Test → Review → Merge
**Why it matters:** Claude stops winging it and follows a repeatable engineering process
**Status for Ohvara:** ✅ Already baked into CLAUDE.md
**GitHub:** https://github.com/NightTrek/superpowers-mcp

---

### 2. hesreallyhim/awesome-claude-code

**What it does:** Master index of the entire Claude Code ecosystem
Skills, Hooks, Orchestrators, Slash Commands, Plugins — all categorized
**Why it matters:** One-stop shop for finding any Claude Code enhancement
**Best use:** Browse before building anything — it probably already exists
**GitHub:** https://github.com/hesreallyhim/awesome-claude-code

---

### 3. claude-squad (parallel agents)

**What it does:** Runs multiple Claude agents in parallel simultaneously
One writes features, another writes tests, a third refactors — all at once
**Why it matters:** Massively speeds up complex builds
**Best use:** Large sessions with multiple workstreams (like Ohvara overhauls)
**GitHub:** Search `claude-squad` on GitHub

---

### 4. Karpathy CLAUDE.md (4 principles)

**What it does:** Single CLAUDE.md file with 4 surgical rules:
1. Keep it simple
2. Touch only what you're asked to touch
3. Ask when uncertain — don't guess
4. No silent assumptions

**Why it matters:** Stops Claude from touching files it wasn't supposed to or making wild assumptions
**Status for Ohvara:** ✅ Already baked into CLAUDE.md as Karpathy Principles
**GitHub:** Search `karpathy claude.md` on GitHub

---

### 5. Persistent Memory (session watcher)

**What it does:** Watches Claude Code sessions and builds a persistent memory file
"Persistent Memory — 14 facts learned" — logs across sessions automatically
Claude stops forgetting everything between sessions
**Why it matters:** Exactly what we built with Memories.md — but more automated
**Status for Ohvara:** ✅ We built this with `brain/Memories.md` + [[auto-knowledge-capture]] skill
**GitHub:** Search `claude persistent memory` on GitHub

---

### 6. claude-code-hooks (TDD enforcement)

**What it does:** Hooks that block Claude from committing without tests
- Block commits without tests
- Coverage threshold enforcement
- Test file naming conventions
- Pre-commit hook integration

**Why it matters:** Claude stops skipping tests under pressure
**Best use:** Add to any production repo to enforce quality
**GitHub:** Search `claude code hooks TDD` on GitHub

---

### 7. Playwright MCP (browser + scraping)

**What it does:** MCP server that gives Claude full browser control
Navigate, click, fill forms, scrape dynamic content, take screenshots
**Why it matters:** Claude can interact with any website — not just APIs
**Best use for Ohvara:** Scraping Indeed leads, testing the dashboard UI, automating client onboarding
**Status for Ohvara:** ✅ Installed — see install notes below
**GitHub:** https://github.com/microsoft/playwright-mcp

---

### 8. wshobson/agents

**What it does:** Production-ready subagent library — Claude Code Plugins: Orchestration and Automation
- 185 specialized AI agents
- 16 multi-agent workflow orchestrators
- 163 agent skills
- 100 commands
- 80 focused single-purpose plugins

**Why it matters:** Drop pre-built specialist agents into any Claude Code workflow
Agents: Design Agent, Data Agent, Research Agent, Security Agent, QA Agent, Docs Agent, Perf Agent, DevOps Agent
**Best use for Ohvara:** Security Agent for RLS reviews, QA Agent for testing, DevOps for Vercel deploys
**GitHub:** https://github.com/wshobson/agents

---

### 9. repomix (codebase packer)

**What it does:** Packs your entire codebase into a single file (XML or markdown)
Claude can read the whole project in one shot
**Why it matters:** Claude stops making assumptions about files it hasn't seen
**Best use:** Before any major refactor — give Claude the full picture first
**GitHub:** https://github.com/yamadashy/repomix

---

### 10. everything-claude-code

**What it does:** The most comprehensive Claude Code setup — built from 30 months of real usage
30 agents, 136 skills, 60 slash commands, 1,282 tests — all passing
Drop-in to any existing Claude project
**Why it matters:** Battle-tested production-ready harness
**GitHub:** Search `everything-claude-code` on GitHub

---

## Priority Actions for Ohvara

### Install immediately

1. **Playwright MCP** ✅ Installed — unlocks browser control for Indeed scraping + dashboard testing
2. **wshobson/agents** — Security Agent for RLS reviews, QA Agent for testing
3. **repomix** — pack `ohvara-dashboard` before every major session

### Already have (don't reinstall)

- Superpowers methodology ✅
- Karpathy CLAUDE.md principles ✅
- Persistent Memory (`brain/Memories.md`) ✅

---

## Playwright MCP Install

```bash
npm install -g @playwright/mcp
```

Add to `~/.claude/claude_desktop_config.json` under `mcpServers`:

```json
"playwright": {
  "command": "npx",
  "args": ["@playwright/mcp"]
}
```

Test: navigate to `ohvara-dashboard.vercel.app` and take a screenshot.

---

## Media Reference

**Video:** `media/instagram-10-claude-github-repos-raycfu.mp4`
Extracted from Instagram video by Claude via frame analysis — 2026-06-07

## Related

- [[auto-knowledge-capture]] — persistent memory we built instead of repo #5
- [[North Star]] — Ohvara infrastructure and tooling decisions
- [[Memories]] — session log, technical lessons
