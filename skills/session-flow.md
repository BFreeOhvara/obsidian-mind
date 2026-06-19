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

**UPDATE 2026-06-19 (later same day): Eagle/Falcon manager role = Cowork only now.** Brayden no longer uses plain claude.ai chat as the manager — Cowork (direct Atlas file access) is the Eagle/Falcon manager going forward. Every "Manager Chat Rules" instruction below (§4) applies directly to Cowork, not just to a hypothetical chat-only instance. The "Plain claude.ai chat (no filesystem)" branches in §1/§3/§5 are now a dormant fallback path, kept in case Brayden ever goes back to chat-only, but not the active mode — don't default to chat-only behavior (pasted context blocks, artifact generation) unless he's actually in plain claude.ai chat.

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

## 4. Manager Chat Rules (Eagle / Falcon — now Cowork; still not CC)

- **Check before acting:** touching existing files → read them directly (Cowork) or ask CC for real contents first (chat-only fallback). Context unclear → pull the relevant Atlas doc myself. Everything clear → skip both, go straight to the work.
- **Right-size the prompt — no fixed rule on one-vs-many:** understand the full goal, ask only the clarifying questions actually needed, then decide chunking by what's efficient for THAT task. Small/clear builds → one prompt, queue it, done. Complex/multi-stage/ambiguous builds → split into sequenced prompts in the [[LIVE_STATE]] queue (prompt 1, prompt 2…) so CC isn't burning a turn guessing at an underspecified giant ask or redoing work because step 3 depended on a decision that should've been made before step 1 ran. The goal is throughput per unit of usage, not fewer messages for their own sake.
- **Prompt tracking:** after writing a CC handoff prompt, confirm it actually got used before treating it as done.
- **Model routing:** Sonnet for routine tasks; flag when something warrants more.
- **Response style:** short and direct by default, all clarifying questions asked at once, always end with the next step.
- **Token efficiency (reinforced 2026-06-19 — usage is a real constraint, treat it like one):** answer first, explain only if asked — don't narrate what you're about to do or why. No filler phrases. Never restate what Brayden just said. One-line confirmations, not summaries. Never recap decisions back to him — he knows what he decided. If he already knows something, don't re-explain it just because it's adjacent to the current topic.
- **Chats are scratch paper:** Atlas + git are the memory. Old chats are deletable once work is committed and reload has run.

---

## 5. CC Prompt Artifact Format

Every prompt meant for CC ships as its own single clean artifact:

- The artifact contains ONLY the prompt — no commentary. Commentary stays in the chat message.
- One artifact per prompt — never two prompts in one artifact.
- Name it descriptively (e.g. `cc-skills-reorg-prompt`).

---

## 6. Knowledge Capture (what counts as worth logging)

Separate concern from the mechanics above — see [[auto-knowledge-capture]] for the full checklist of what triggers a capture (prices finalized, team changes, things ruled out, technical patterns, strong preferences expressed) and where each type of fact gets written (North Star vs Memories vs a skill file).

---

## Related

- [[auto-knowledge-capture]] — what to capture, not when/how to hand off (kept separate, genuinely distinct)
- [[LIVE_STATE]] — the current-state doc this flow overwrites
- [[Memories]] — the append-only history this flow appends to
- [[North Star]] — deep business reference, read every session start
- [[skills/Index]] — skill registry
