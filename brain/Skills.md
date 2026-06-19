---
date: 2026-04-07
description: "Vault-specific workflows and slash commands — reusable patterns for review prep, project tracking, and vault maintenance"
tags:
  - brain
  - index
---

# Skills

Custom slash commands, subagents, and reusable workflows. Defined in `.claude/commands/` and `.claude/agents/`.

## Slash Commands

### Daily Workflow

| Command | Purpose |
|---------|---------|
| `/om-standup` | Morning kickoff — load context, review yesterday, surface tasks, identify priorities |
| `/om-dump` | Freeform capture — dump anything, gets routed to the right notes automatically |
| `/om-wrap-up` | Full session review — verify notes, indexes, links, suggest improvements. Auto-triggered on "wrap up". |

### Editing & Synthesis

| Command | Purpose |
|---------|---------|
| `/om-humanize` | Voice-calibrated editing — makes Claude-drafted text sound like you wrote it |
| `/om-weekly` | Weekly synthesis — cross-session patterns, North Star alignment, uncaptured wins |

### Meeting Prep & Capture

| Command | Purpose |
|---------|---------|
| `/om-incident-capture` | Capture an incident into structured vault notes — timeline, people, analysis |
| `/om-meeting` | Prep for any meeting by topic — subject-forward briefing with open items, blockers, and brainstormed considerations |
| `/om-intake` | Process meeting notes inbox — classify raw exports in `work/meetings/` and route to the right vault notes |

> Archived 2026-06-19: `/om-prep-1on1`, `/om-capture-1on1`, `/om-slack-scan`, `/om-peer-scan`, `/om-review-brief`, `/om-self-review`, `/om-review-peer` — corporate-employee template features (1:1s, Slack, performance reviews) with no use case in solo-founder Ohvara work. See `archive/template-cruft/`.

### Vault Maintenance

| Command | Purpose |
|---------|---------|
| `/om-vault-audit` | Deep structural audit — indexes, frontmatter, links, Bases, folder placement, stale context |
| `/om-vault-upgrade` | Import content from an existing vault — detects version, classifies notes, transforms frontmatter, rebuilds indexes |
| `/om-project-archive` | Move completed project from `work/active/` to `work/archive/YYYY/`, update all indexes |

## Usage Notes

**Daily:**
- `/om-standup` replaces the manual session start — reads North Star, active work, tasks, git log
- `/om-dump` processes freeform text and routes each piece to the correct note type and folder
- `/om-wrap-up` is auto-triggered when you say "wrap up" — runs full session review

**Editing & Synthesis:**
- `/om-humanize` calibrates against your actual writing samples, not a word blacklist. Detects context from frontmatter (review → corporate-confident, incident → precise, 1:1 → conversational). Run after drafting any note to make it sound human.
- `/om-weekly` bridges standup and review brief — run at end of week for cross-session patterns, North Star drift, and uncaptured wins. Output is transient by default; offer to promote findings to brag doc or North Star.

**Maintenance:**
- `/om-vault-audit` should be run at the end of substantial sessions — catches stale indexes and mixed context
- `/om-vault-upgrade` imports content from an existing vault (older obsidian-mind or any Obsidian vault). Detects version, classifies notes, transforms frontmatter, fixes wikilinks, rebuilds indexes. Use `--dry-run` to preview.
- `/om-project-archive` handles the active/ → archive/ move with index updates

## Subagents

| Agent | Purpose | Invoked by |
|-------|---------|------------|
| `context-loader` | Loads all vault context about a person, project, incident, or concept | Direct — "load context on X" |
| `cross-linker` | Finds missing wikilinks, orphans, broken backlinks across the vault | `/om-vault-audit` |
| `vault-librarian` | Deep vault maintenance — orphan detection, broken links, frontmatter validation, stale notes | `/om-vault-audit` |
| `vault-migrator` | Classify, transform, and migrate content from a source vault | `/om-vault-upgrade` |

Subagents run in isolated context windows via `.claude/agents/`. They don't pollute the main conversation.

> Archived 2026-06-19: `brag-spotter`, `people-profiler`, `review-prep`, `slack-archaeologist`, `review-fact-checker` — see `archive/template-cruft/`.

## Hooks

| Hook | When | What |
|------|------|------|
| SessionStart | On startup/resume | QMD re-index, inject North Star, active work, recent changes, tasks, file listing |
| UserPromptSubmit | Every message | Classify content (decision, incident, 1:1, win, architecture, person, project update) and inject routing hints |
| PostToolUse | After writing `.md` | Validates frontmatter, checks for wikilinks |
| PreCompact | Before context compaction | Back up session transcript to `thinking/session-logs/` |
| Stop | End of session | Checklist: archive, update indexes, check orphans |

## Project Skills

Reusable skill files for Ohvara-specific domains. Active skills live in `skills/`; dormant skills are parked in `skills/dormant/`. Full index → [[skills/Index]].

**Active (Phase 1):**

| Skill                  | File                       | Purpose                                                     |
| ---------------------- | -------------------------- | ----------------------------------------------------------- |
| Rep Call Script        | [[rep-call-script]]        | Profile A question-based scripts, pain surfacing, booking   |
| Stripe Payments        | [[stripe-payments]]        | Two links per close: setup fee ($497) + monthly sub         |
| Auto Knowledge Capture | [[auto-knowledge-capture]] | Scan sessions for decisions, auto-log to brain              |
| UI Animations          | [[ui-animations]]          | Glass morphism, animated orbs, countup KPIs, staggered rows |
| Claude Agents          | [[claude-agents]]          | 147-agent library — install sales-deal-strategist (pending) |
| Claude Mem             | [[claude-mem]]             | Automatic memory compression — evaluate as upgrade (pending) |

**Dormant (`skills/dormant/` — promote back when needed):**

| Skill                  | File                       | Purpose                                                     |
| ---------------------- | -------------------------- | ----------------------------------------------------------- |
| Claude Mastery         | [[claude-mastery]]         | 6-level framework, traps to avoid, "less is more" rule      |
| Stitch MCP Workflow    | [[stitch-mcp-workflow]]    | Google Stitch → MCP → Claude Code for UI sessions           |
| Claude Repos Top 10    | [[claude-repos-top10]]     | Top 10 GitHub repos for Claude Code                         |
| Claude 10x Tools       | [[claude-10x-tools]]       | Top tools from @chase.h.ai Part 1                           |
| Social Media Research  | [[social-media-research]]  | Apify MCP + TribeV2 + Modal GPU (Phase 2–3)                 |

## Semantic Search (QMD)

If QMD is installed (`npm install -g @tobilu/qmd`), the vault has semantic search. Every command takes `--index <name>` where `<name>` is `vault-manifest.json`'s `qmd_index` field (default: `obsidian-mind`):

- `qmd --index <name> query "..."` — hybrid BM25 + vector + LLM reranking (best quality)
- `qmd --index <name> search "..."` — fast BM25 keyword search
- `qmd --index <name> vsearch "..."` — semantic vector search (exploratory)
- `qmd --index <name> update && qmd --index <name> embed` — refresh index after bulk changes

SessionStart hook runs `qmd --index <name> update` automatically, reading the index name from the manifest. First-time setup on a fresh clone: `node --experimental-strip-types scripts/qmd-bootstrap.ts`. See `.claude/skills/qmd/SKILL.md` for full reference, and [[Memories]] for the topics QMD is most often asked to find across the vault.

## Workflow: Weekly Review

1. **`/om-weekly`** — synthesize the week's activity, check alignment, find patterns
2. Update North Star if focus shifted
3. **`/om-wrap-up`** — close the session cleanly

## Workflow: Project Ramp-Up

1. Create work note from gathered context
2. **`/om-vault-audit`** — ensure everything links properly
