---
date: 2026-06-12
description: "reload command — CC runs the full 5-step state save automatically: Memories log, LIVE_STATE overwrite, OHVARA CONTEXT LOAD artifact, commit+push all repos, confirm. 'reload' (no slash) is the canonical trigger."
tags:
  - skills
  - session
  - memory
status: active
---

# reload — Full State Save + Context Handoff

> One word, one shot: log the session, refresh LIVE_STATE, generate the context load artifact, push everything. No prompting, nothing on-request.

---

## Trigger

**"reload" (no slash) is the canonical trigger** — `/reload` gets autocorrected by the browser, so Brayden often types it bare. **Treat `reload` and `/reload` as identical.** Either one, typed in CC, fires the full procedure below — all five steps, automatically, in one shot, no prompting between steps and no "want me to…?" questions.

---

## What CC Does on reload (all 5 steps, every time)

### 1. Append a complete session log entry to `brain/Memories.md`

What was done this session, open loops, blocker statuses, decisions made, and a resume prompt for the next session. [[Memories]] stays the append-only historical log.

### 2. Overwrite `brain/LIVE_STATE.md` with current state

All four sections refreshed in place: **Current State**, **Standing Rules**, **Open Threads**, **Problems & Resolutions** (keep last ~10–15 entries). [[LIVE_STATE]] is overwritten, never appended.

### 3. Generate a fresh OHVARA CONTEXT LOAD block — AUTOMATICALLY

A single clean artifact (per [[cc-prompt-format]]) titled **`ohvara-context-load-[date]`**, containing:

- Phase / focus
- Team / roles
- Packages / commissions
- 90-day targets
- Dashboard current state (latest commit, migrations, what's verified)
- Blocker statuses (current)
- Open threads (full list, current priority order)
- Standing rules 1–9 summary
- Shared instance rules summary
- cc-prompt-format reminder

**This artifact is the whole point of reload** — it's what Brayden pastes into a new Falcon or Eagle chat to resume. It is ALWAYS generated automatically as step 3, **never on-request only**. Asking "want the paste-back block?" is a bug.

### 4. Commit + push ALL repos

obsidian-mind plus any repo with uncommitted changes (ohvara-dashboard, Scraper, etc.). No uncommitted work left behind, ever ([[auto-handoff]]).

### 5. Confirm

Show the commit hash(es), confirm all repos are clean, and end with:

> **"State saved. Paste the context load artifact into a new Falcon or Eagle chat to resume."**

---

## Rules

1. **All five steps run in one shot** — no prompting, no asking, no partial runs. `reload` typed alone is full authorization for the entire procedure.
2. **Order matters:** steps 1–2 (state save) before step 3, so the context load artifact is generated from freshly saved state; step 4 commits all of it together.
3. **The context load artifact is mandatory output**, not optional — the old "condensed paste-back block if requested" behavior is superseded.
4. **[[LIVE_STATE]] remains the single current-state doc**; [[Memories]] the append-only history; [[North Star]] the deep reference (who we are, packages, goals).
5. **reload depends on Atlas being current** — which the auto-log rule in [[cc-prompt-format]] guarantees (every completed task logs `[CC | date]` to [[Memories]] and pushes).
6. **Non-CC sessions** (Eagle/Falcon Manager chats with no filesystem): reload there means re-grounding from the most recent pasted OHVARA CONTEXT LOAD block; the chat asks CC for a fresh one if it's stale.

---

## Recon-First Rule (non-trivial tasks)

Before writing any CC implementation prompt for a task that touches existing files, always query CC first to get the actual current code. Do not write prompts based on screenshots, assumptions, or memory.

Standard recon prompt:

> "Read and return the full contents of [relevant files]. Also run ls on any directories needed to understand the structure."

Build the implementation prompt only after CC returns real file contents.

**Applies to:** UI changes, bug fixes, schema changes, new features in existing components.
**Does NOT apply to:** greenfield files, pure content rewrites, or tasks where structure is fully known from the context doc.

---

## Related

- [[cc-prompt-format]] — artifact rules + auto-log rule that keeps Atlas fresh for reload
- [[auto-handoff]] — the full wrap-up protocol (reload now performs the same state save mid-stream)
- [[session-management]] — the 60% context alarm that usually triggers the need for reload
- [[LIVE_STATE]] / [[Memories]] / [[North Star]] — what reload writes and reads
- [[skills/Index]] — skill registry
