---
date: 2026-06-07
description: "Claude-Mem — automatic persistent memory compression via semantic summaries, potential upgrade from manual Memories.md approach"
tags:
  - skill
  - memory
  - brain
status: evaluate
source: "Instagram video — instagram-claude-mem-permanent-memory"
media: "media/instagram-claude-mem-permanent-memory.mp4"
---

# Skill: Claude-Mem — Automatic Persistent Memory

**Category:** Memory / Brain
**Created:** 2026-06-07
**Last used:** 2026-06-07
**Status:** Evaluate — not yet installed

## What This Skill Does

Documents Claude-Mem as a potential upgrade to our current `brain/Memories.md` approach. Claude-Mem watches sessions in real time, compresses observations into semantic summaries, and makes them available to future sessions automatically — without Claude having to remember to log.

---

## How Claude-Mem Works

> "Claude-Mem seamlessly preserves context across sessions by automatically capturing tool usage observations, generating semantic summaries, and making them available to future sessions. This enables Claude to maintain continuity of knowledge about projects even after sessions end or reconnect."

### Automatic vs Manual

| Approach | How Memory Gets Captured |
|----------|-------------------------|
| Our `brain/Memories.md` | Claude appends at session end — requires discipline, relies on session-end protocol being followed |
| Claude-Mem | Watches tool usage in real time, compresses automatically — no manual step required |

### What Claude-Mem Captures

- Tool usage observations (what Claude ran, what worked)
- Semantic summaries (not raw logs — compressed, meaningful context)
- Cross-session continuity (available immediately on next session start)

---

## Why This Matters for Ohvara

Our current system works but has one failure mode: **if Claude doesn't follow the session-end protocol, nothing gets logged.** Claude-Mem removes that dependency entirely.

Additionally, semantic compression is smarter than our current log format — it extracts meaning rather than just recording what happened.

---

## Evaluation Criteria

Before installing, check:

1. **Does it integrate with the vault structure?** — If it writes to `brain/Memories.md` or a compatible location, it's an upgrade. If it writes to its own isolated store, it's a parallel system.
2. **Does it conflict with our auto-knowledge-capture skill?** — They serve the same purpose. One should replace the other, not both run simultaneously.
3. **Does it respect the vault's frontmatter/wikilink conventions?** — Vault-incompatible output would need a translation layer.

---

## Install Path (when ready)

```bash
# Find the repo
# Search: "claude-mem persistent memory" on GitHub

# Likely install
npm install -g claude-mem
# or
# Add as MCP server in ~/.claude/claude_desktop_config.json
```

---

## Decision: Replace or Supplement?

| Scenario | Recommendation |
|----------|---------------|
| Claude-Mem writes to vault-compatible files | Replace manual Memories.md appending with Claude-Mem |
| Claude-Mem writes to its own store | Run both — Claude-Mem for automated capture, Memories.md for curated decisions |
| Integration is complex | Keep current approach — it works, don't over-engineer |

**Current status:** Keep `brain/Memories.md` + [[auto-knowledge-capture]] until Claude-Mem is evaluated.

---

## Related

- [[auto-knowledge-capture]] — our current memory skill (manual, end-of-session)
- [[Memories]] — the vault's memory file
- [[claude-mastery]] — memory is a Level 3 skill (Context Engineering)
