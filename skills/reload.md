---
date: 2026-06-11
description: "/reload command — old CC prints one prompt for a fresh CC session; new CC reads Atlas and prints a context summary for a new Claude chat"
tags:
  - skills
  - session
  - memory
status: active
---

# /reload — Fresh Session Context Chain

> One command, two pastes, zero lost context. Old CC → new CC → new Claude chat, all current on Ohvara.

---

## The Flow

```
Brayden types /reload in old CC
        ↓
Old CC prints ONE prompt (nothing else)
        ↓
Brayden pastes it into a brand-new CC session
        ↓
New CC reads Atlas in full, gets current, prints a context summary
        ↓
Brayden pastes that summary into a new Claude AI chat
        ↓
Both surfaces fully current — work continues
```

---

## What CC Does on /reload

When Brayden types **/reload**, CC prints exactly ONE prompt — no commentary before or after it, formatted as a single copyable block. The prompt is:

```
Read ~/obsidian-mind/brain/Memories.md and ~/obsidian-mind/brain/North Star.md
in full before doing anything else. I'm continuing Ohvara work.

Get fully current on all of Ohvara:
- What's built and live (dashboard state, migrations, cron jobs, scrapers, training gate)
- What's open (blockers, pending keys, follow-ups, in-progress strategies)
- What's next (priority order per North Star Phase 1)

Then print ONE clean natural-language context summary I can paste into a new
Claude AI chat so that chat is immediately fully current and ready to work.
The summary must cover: who/what Ohvara is and the current phase, packages and
pricing, what's built and verified, today's latest session log highlights, all
open blockers with what unblocks each, and the next action — written as prose
a chat instance can absorb in one read, with the CC prompt rule from
[[cc-prompt-format]] included so artifact formatting survives the handoff.
```

## Rules

1. **One prompt, nothing else.** The /reload output is the prompt — all explanation stays out of it.
2. **The new CC reads Atlas FIRST.** Memories.md and North Star.md in full, before any summarizing.
3. **The summary is for a chat, not a terminal.** Natural language, no file paths as instructions, ready to paste and go.
4. **/reload depends on Atlas being current** — which the auto-log rule in [[cc-prompt-format]] guarantees (every completed task logs `[CC | date]` to [[Memories]] and pushes).

---

## Related

- [[cc-prompt-format]] — auto-log rule that keeps Atlas fresh for /reload
- [[auto-handoff]] — the full wrap-up protocol (use for session ends; /reload is for mid-stream context refresh)
- [[session-management]] — the 60% context alarm that usually triggers the need for /reload
- [[Memories]] / [[North Star]] — what the new CC reads
- [[skills/Index]] — skill registry
