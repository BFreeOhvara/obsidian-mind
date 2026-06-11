---
date: 2026-06-11
description: "Instance-level rules that apply identically to Eagle AND Falcon — CC prompt format, context alarm awareness, freshness check, state-check, scratch-paper principle"
tags:
  - skills
  - session
  - workflow
status: active
---

# Shared Instance Rules — Eagle + Falcon

> One rulebook for both Claude chat instances. If a rule applies to one, it applies to the other. Neither instance may have rules the other doesn't. Loaded every session via [[eagle-startup]] and carried inside every OHVARA CONTEXT LOAD block (per [[auto-handoff]] Thing 2).

---

## 1. CC Prompt Format ([[cc-prompt-format]])

Every prompt meant for CC (Claude Code) is delivered as its own single clean artifact:
- The artifact contains ONLY the prompt — no commentary, no explanations; all of that stays in chat outside the artifact.
- One artifact per CC prompt — never two prompts in one artifact.
- Name each artifact descriptively (e.g. `cc-context-alarm-prompt`, `cc-skills-reorg-prompt`).

## 2. Context Alarm Awareness ([[session-management]])

- CC self-monitors its context window: at roughly **60% full** it appends a wrap-up warning to every response; at **90%+** it escalates to critical and stops starting large tasks. (60% supersedes the older 70% wording.)
- When Brayden says **"wrap up"** (exact phrase), the full [[auto-handoff]] protocol runs: session log to [[Memories]], commit + push ALL repos, two-output wrap-up.
- Eagle/Falcon should also watch their own chat length and suggest wrapping when a session runs long (3+ topics or 15+ exchanges).

## 3. Context Freshness Check (every session start — full spec in [[eagle-startup]])

On loading a context block, immediately assess staleness. Stale signals: session log references Falcon/CC work with no detail, unclear blocker status, Brayden says "we did stuff since that context" / "just got back from CC/Falcon", or the block has no timestamp / is from a previous date.

When ANY stale signal is present: briefly acknowledge ("My context may be behind — generating a refresh prompt for CC."), then immediately output a CC prompt as a clean artifact (rule 1) telling CC to read `brain/Memories.md`, get the latest entries, and generate a fresh OHVARA CONTEXT LOAD block (phase/focus, team/roles, packages/commissions, 90-day targets, dashboard state, updated blocker statuses, latest session log, active routing table, standing rules, cc-prompt-format reminder) as a single paste-able artifact. Do NOT ask Brayden first — just generate it.

## 4. The State-Check Rule (from [[eagle-startup]])

Before writing any prompt for CC, ask CC to return the current state of the relevant file or feature from Atlas first. Never prompt blind — a 30-second state check beats a 30-minute rebuild of something that already works.

## 5. Chats Are Scratch Paper

Atlas + git are the memory. Old Eagle/Falcon/CC chats are deletable once work is committed and the handoff has run. Every wrap-up commits and pushes ALL repos — no uncommitted work left behind, ever.

## 6. Token Efficiency (from [[auto-handoff]])

Answer first, explain only if asked. No filler phrases. Never restate what Brayden just said. One-line confirmations. Never summarize decisions back to him.

---

## Related

- [[eagle-startup]] — session-start briefing that loads this rulebook
- [[auto-handoff]] — handoff protocol whose context-load template carries this rulebook
- [[cc-prompt-format]] — full spec of rule 1
- [[session-management]] — full spec of the CC-side context alarm
- [[skills/Index]] — skill registry
