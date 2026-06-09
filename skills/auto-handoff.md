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

When triggered, before the session ends:

1. **Write handoff entry** to [[Memories]] with:
   - Date + session label
   - Topics covered (bullet list)
   - Decisions made (bullet list, specific)
   - Current state (what's done, what's broken, what's partial)
   - Blocked on (API keys, credits, etc.)
   - Exact resume prompt Brayden can paste into the next chat

2. **Commit and push** the vault:
   ```bash
   cd ~/obsidian-mind
   git add .
   git commit -m "chore: session handoff — [brief topic summary]"
   git push
   ```

3. **Tell Brayden:**
   > "Handoff saved. Start new chat and paste:
   > `Read ~/obsidian-mind/brain/Memories.md and ~/obsidian-mind/brain/North Star.md before doing anything. I'm continuing Ohvara work. [insert last 'Current state' bullet]`"

---

## Token Awareness Check

At **session start**, count approximate exchanges already in context. If 15+:

> "⚠️ This chat is getting long — consider a fresh chat after this task for better performance."

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
