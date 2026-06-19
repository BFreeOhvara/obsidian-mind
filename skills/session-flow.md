---
date: 2026-06-19
description: "The single canonical session flow — start, context alarm, reload/handoff, Manager chat rules. Replaces eagle-startup, chat-distill, manager-chat-skills, auto-handoff, session-management, reload, shared-instance-rules, cc-prompt-format (8 files → 1)."
tags:
  - skills
  - session
  - memory
status: active
---

# Session Flow

> One file for the whole session lifecycle: start, context alarm, reload, Manager chat rules. If you're looking for "what happens when I say X," it's here.

Consolidated 2026-06-19 from 8 overlapping skills that had drifted into 3 contradictory versions of the same handoff mechanic. Old files moved to `archive/template-cruft/session-flow-superseded/` — nothing deleted.

---

## 1. Session Start (Eagle / Falcon Manager chat)

**Cowork (direct file access to Atlas):** read `brain/LIVE_STATE.md` + `brain/Memories.md` straight off disk. No pasted context block needed.

**Plain claude.ai chat (no filesystem):** ground from the most recent pasted context-load artifact, or ask a Cowork/CC session for a fresh one (§3 step 3) if it looks stale.

Either way, read [[North Star]] and [[Memories]] (latest entries) before doing anything.

**Ohvara in one paragraph:** two-vertical SMB automation business — Brayden (ops/build), Nate (sales/closing), Jahandad (rep recruitment). Vertical 1: AI phone receptionist/dispatcher, four packages $497–$1,797/mo + $497 setup fee. Vertical 2: web agency. Pre-revenue, Phase 1 only — get the outreach machine running at full capacity.

**The state-check rule:** before writing any prompt for Claude Code (CC), ask CC to return the current state of the relevant file or feature first. Never prompt blind.

**Freshness check:** on loading a context block, watch for staleness signals — session log references CC/Falcon work with no detail, unclear blocker status, Brayden says "we did stuff since that context," or the block has no timestamp. If any signal fires, say so briefly ("My context may be behind — pulling a fresh one from CC.") and immediately ask CC to read `brain/Memories.md` + `brain/LIVE_STATE.md` and report back current state. Don't ask permission first — just do it.

---

## 2. Context Alarm (CC self-monitoring)

CC continuously self-monitors its own context window — long conversation, many file reads, big diffs all count.

- **~60% full:** append to the end of the response, exactly: `⚠️ Context at 60%+ — wrap up this session soon.`
- Once fired, repeat at the end of every subsequent response — no exceptions — until Brayden says "wrap up" or "reload."
- **~90%+ full:** escalate to `🚨 CONTEXT CRITICAL: Wrap up NOW or work may be lost.` and stop starting new large tasks.

Canonical copy of this rule lives in `~/.claude/CLAUDE.md`; this section is the vault mirror.

---

## 3. The Reload Trigger (the actual handoff)

**"reload" or "wrap up" (no slash needed — either word, typed in CC) fires this automatically, all steps, no prompting in between.**

1. **Append a session log entry** to `brain/Memories.md` — what was done, decisions made, blocker statuses, resume prompt for next session.
2. **Overwrite `brain/LIVE_STATE.md`** with current state: Current State, Standing Rules, Open Threads, Problems & Resolutions (keep last ~10–15).
3. **Generate the context load artifact — chat-only sessions only.** Skip entirely in Cowork: it reads `brain/LIVE_STATE.md` + `brain/Memories.md` directly off disk in any new chat, so there's nothing to paste. Only build the artifact (titled `ohvara-context-load-[date]`, containing: phase/focus, team/roles, packages/commissions, 90-day targets, dashboard state, blocker statuses, open threads, standing rules, this file's Manager Chat Rules section (§4 below), and the artifact-format reminder (§5 below)) when the next session is a plain claude.ai Eagle/Falcon chat with no file access.
4. **Commit + push every repo touched this session** — obsidian-mind first, then ohvara-dashboard, Scraper, etc. A reload is not complete while `git status` is dirty anywhere.
5. **Confirm:** show the commit hash(es), confirm all repos clean. If step 3 ran, end with *"State saved. Paste the context load artifact into a new Eagle or Falcon chat to resume."* If not, end with *"State saved — next Cowork session picks it up straight from Atlas."*

**Recon-first rule:** before writing any CC implementation prompt that touches existing files, ask CC to return real file contents first — never write a prompt from memory or screenshots. Skip this only for greenfield files or pure content rewrites.

**Auto-log rule (permanent, no exceptions):** after every completed task, CC appends one line to `brain/Memories.md` — `[CC | YYYY-MM-DD HH:MM] — {what was done}` — and pushes immediately. No batching to session end. This is what keeps step 1 above trivial instead of a reconstruction job.

**Cowork sessions** (Eagle/Falcon with direct file access, like this one): "reload" = steps 1, 2, 4 — log, overwrite LIVE_STATE, commit+push. No artifact, no paste-back — the vault is the handoff.

**Chat-only sessions** (Eagle/Falcon on plain claude.ai, no filesystem): "reload" means re-grounding from the most recent pasted context load block, or asking a Cowork/CC session for a fresh one (step 3) if it looks stale.

---

## 4. Manager Chat Rules (Eagle / Falcon only — not CC)

- **Check before acting:** touching existing files → ask CC for real contents first. Context unclear → ask CC to pull the relevant Atlas doc. Everything clear → skip both, go straight to the prompt.
- **Batch prompts:** understand the full goal, ask all clarifying questions upfront, then write one large prompt that gets as much done as possible in a single CC run.
- **Prompt tracking:** after every prompt artifact, ask "Did you send this to CC? Yes / No." A "No" never discards the old prompt — rewrite folds the original plus the new changes into one updated artifact.
- **Model routing:** Sonnet for routine tasks; flag when something warrants more.
- **Response style:** short and direct by default, all clarifying questions asked at once, always end with the next step.
- **Token efficiency:** answer first, explain only if asked. No filler phrases. Never restate what Brayden just said. One-line confirmations. Never summarize decisions back to him — he knows what he decided.
- **Chats are scratch paper:** Atlas + git are the memory. Old chats are deletable once work is committed and reload has run.

---

## 5. CC Prompt Artifact Format

Every prompt meant for CC ships as its own single clean artifact:

- The artifact contains ONLY the prompt — no commentary. Commentary stays in the chat message.
- One artifact per prompt 