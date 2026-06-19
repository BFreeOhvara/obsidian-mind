---
date: 2026-06-12
description: "Distill Manager chat transcripts into Atlas — replaces wrap-up as the session handoff flow"
tags:
  - skills
  - session
status: active
---

# Chat Distill — Session Handoff

> CC already logs every task to Atlas automatically. Distill only captures what the Manager chat knows that Atlas doesn't.

This replaces [[auto-handoff|wrap-up]] entirely as the session handoff flow.

---

## When to Use

Any time you want to switch between Eagle and Falcon, or end a session.

---

## The Flow

1. Copy the current Manager chat (Eagle or Falcon)
2. Paste it into the other instance's CC
3. Type: **distill**
4. CC logs everything net-new to Atlas, outputs a fresh context load artifact
5. Paste that artifact into the new Manager chat → fully current

**First-time only:** Copy both Manager chats (Eagle + Falcon) and paste both. Label them clearly:

```
=== EAGLE MANAGER CHAT ===
[paste here]

=== FALCON MANAGER CHAT ===
[paste here]

distill
```

After the first distill, only copy the current session's Manager chat going forward.

**If CC was cut off mid-run:** Also paste the last CC message so the incomplete task gets logged as an open thread.

---

## What CC Does on "distill"

1. **Reads [[LIVE_STATE]]** (`brain/LIVE_STATE.md`) to know what's already in Atlas.
2. **Scans the pasted Manager chat(s)** for anything NOT already captured:
   - Problems hit + how they were resolved
   - Decisions made
   - Ideas raised but parked
   - Friction points or workarounds
   - Tasks discussed in chat but never sent to CC
   - Incomplete CC tasks → log as open thread with last known state
3. **Deduplicates against LIVE_STATE** — skips anything already there.
4. **Writes net-new items to the correct Atlas sections:**
   - Problems/resolutions → LIVE_STATE Problems & Resolutions + [[Memories]] Hard-Won Lessons
   - Open threads / parked ideas → LIVE_STATE Open Threads
   - Decisions → LIVE_STATE Current State
5. **Generates a fresh OHVARA CONTEXT LOAD artifact** titled `ohvara-context-load-[date]` including all standard sections PLUS the Manager Chat Skills section (from [[manager-chat-skills]]).
6. **Commits + pushes** obsidian-mind.
7. **Confirms:** commit hash, then: "Distill complete. Paste the context load artifact into your new Eagle or Falcon chat to resume."

---

## Related

- [[manager-chat-skills]] — the Manager-chat operating rules folded into every context load artifact
- [[reload]] — the other context-load entry point (reads LIVE_STATE; distill adds Manager-chat capture on top)
- [[LIVE_STATE]] — the current-state doc distill dedupes against and writes to
- [[Memories]] — append-only history; distill adds Hard-Won Lessons here
- [[cc-prompt-format]] — artifact rules the context load travels with
- [[skills/Index]] — skill registry
