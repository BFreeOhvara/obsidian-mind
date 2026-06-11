---
date: 2026-06-09
description: "Auto-handoff protocol and token efficiency rules — preserve context across long sessions, keep responses tight"
tags:
  - skills
  - memory
  - session
status: active
---

# Auto-Handoff + Token Management

> Preserve context across long sessions. Keep responses tight. Never lose work to context limits.

---

## When to Trigger a Handoff

Trigger automatically when **any** of these are true:
- Session has covered 3+ distinct topics
- Brayden says "new chat", "fresh chat", or "start over"
- Claude warns that context is getting long (15+ exchanges)

---

## Handoff Protocol

When Brayden says **"wrap up"**, before the session ends:

1. **Write session log** to [[Memories]] with:
   - Date + session label
   - Topics covered (bullet list)
   - Decisions made (bullet list, specific)
   - Current state (what's done, what's broken, what's partial)
   - Blocked on (API keys, credits, etc.)

2. **Commit and push ALL repo changes — no uncommitted work left behind, ever.** Atlas first, then every code repo touched this session (ohvara-dashboard, Scraper, client portal, etc.):
   ```bash
   cd ~/obsidian-mind
   git add .
   git commit -m "Session handoff: [brief topic summary]"
   git push
   # then repeat for every other repo with uncommitted changes
   ```
   A wrap-up is not complete while `git status` is dirty in any repo this session touched.

3. **Give Brayden TWO things:**

   **Thing 1 — New Claude Code session prompt.** A prompt to paste into a fresh Claude Code session:
   > "Read ~/obsidian-mind/brain/Memories.md and ~/obsidian-mind/brain/North Star.md before doing anything. I'm continuing Ohvara work.
   > Current state: [last session's current state]
   > Next action: [exact next task in 1–2 sentences]"

   **Thing 2 — Context load instruction.** The new Claude Code session's **first job** is to read Atlas and generate a clean Eagle chat context load — a single paste-able text block containing: North Star summary (phase, focus, goals), latest Memories session log + blockers, active project state from [[ohvara-dashboard]], and the routing table from [[skills/Index]]. Brayden pastes that block into the Eagle claude.ai chat so both surfaces start from the same state.

   Every OHVARA CONTEXT LOAD block must include a **Shared Instance Rules** section carrying the full rulebook from [[shared-instance-rules]] — CC prompt format ([[cc-prompt-format]]: every CC-bound prompt is its own single, descriptively-named artifact containing ONLY the prompt), context alarm awareness (CC warns at ~60%, "wrap up" triggers this protocol), the context freshness check (stale context → auto-generate a refresh prompt for CC as an artifact, without asking), the state-check rule (ask CC for current state before prompting), and the scratch-paper principle (chats deletable once committed; Atlas + git are the memory). This applies identically whether the block is pasted into Eagle or Falcon — the two instances always carry the same rules. The block's Standing Rules section must also carry this line: *"Session commands: Save / Resume / Reload — say the word, get the artifact instantly."*

---

## Context Alarm (standing rule — canonical copy in `~/.claude/CLAUDE.md`, full skill in [[session-management]])

1. Continuously self-monitor context fullness (long conversation, many file reads, large outputs).
2. At roughly **60% full or more**, append to the END of the message, exactly:
   > ⚠️ Context at 60%+ — wrap up this session soon. Run the session wrap-up skill and start a fresh CC chat.
3. Once fired ONCE, repeat at the end of EVERY subsequent message — no exceptions, even short replies — until Brayden says "wrap up."
4. On **"wrap up"** (exact phrase): immediately run the full Handoff Protocol above — commit and push ALL repo changes, write session state to Atlas, produce the two-output wrap-up.
5. At roughly **90%+ full**, escalate to: "🚨 CONTEXT CRITICAL: Wrap up NOW or work may be lost." and stop starting any new large tasks.

---

## Token Efficiency Rules

- Answer first, explain only if Brayden asks
- No filler phrases ("Great question!", "Absolutely!", "Certainly!")
- Never restate what Brayden just said
- Create files for anything over 50 lines — never paste walls of code in chat
- Keep confirmations to one line
- Never summarize decisions back — he knows what he decided
- One tool call per thought, not five sequential reads that could be parallel

---

## Handoff Entry Template

```markdown
## YYYY-MM-DD | Session Handoff — [Label]

**Session length:** [Approximate — short/medium/long/very long]
**Topics covered:**
- [topic 1]
- [topic 2]

**Decisions made:**
- [decision + outcome]

**Current state:**
[What's done, what's broken, what's in progress]

**Blocked on:**
- [blocker + what's needed]

**Resume prompt:**
Paste into new chat:
"Read ~/obsidian-mind/brain/Memories.md and ~/obsidian-mind/brain/North Star.md before doing anything. I'm continuing Ohvara work.

[Exact next action in 1-2 sentences]"
```

---

## Related

- [[Memories]] — where handoff entries are written
- [[North Star]] — always re-read at session start in new chat
- [[auto-knowledge-capture]] — complementary skill for capturing decisions mid-session
- [[skills/Index]] — full skill registry
