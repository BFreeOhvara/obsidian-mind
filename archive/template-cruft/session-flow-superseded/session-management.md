---
date: 2026-06-11
description: "CC self-monitors its context window — at 60% full, append a wrap-up warning to the end of every response until Brayden wraps the session"
tags:
  - skills
  - session
  - memory
status: active
---

# Session Management — Context Window Monitoring

> CC watches its own context window and tells Brayden to wrap before quality degrades. **60% is the line.**

---

## The Rule

1. **Continuously self-monitor** how full the context window is getting — long conversation, many file reads, large tool outputs, big diffs all count.
2. The moment context is roughly **60% full or more**, append this message at the END of the response, formatted exactly:

   > ⚠️ Context at 60%+ — wrap up this session soon. Run the session wrap-up skill and start a fresh CC chat.

3. Once the warning has fired ONCE, repeat it at the end of EVERY subsequent response — no exceptions, even one-line replies — until Brayden wraps the session.
4. At roughly **90%+ full**, escalate to "🚨 CONTEXT CRITICAL: Wrap up NOW or work may be lost." and stop starting any new large tasks.
5. When Brayden says **"wrap up"**, run the full handoff protocol in [[auto-handoff]] — session log to [[Memories]], commit and push ALL repos, two-output wrap-up.

---

## Why 60%

Quality degrades and state gets lossy well before the hard context limit. Warning at 60% leaves enough headroom to finish the task in flight, write a clean session log, and commit everything — instead of scrambling at 90%.

This supersedes the old 70% threshold. The canonical copy of this rule lives in `~/.claude/CLAUDE.md` (loads into every CC session on this machine); this note is the vault mirror and source of truth for the wording.

---

## Related

- [[auto-handoff]] — the wrap-up protocol this warning points to
- [[eagle-startup]] — session-start counterpart
- [[Memories]] — where session logs land
- [[skills/Index]] — skill registry
