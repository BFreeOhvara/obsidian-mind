---
description: "Things that have bitten before and will bite again — pitfalls, edge cases, and testing traps"
tags:
  - brain
---

# Gotchas

Things that have bitten before and will bite again.

- **OneDrive "Delete these items?" popup with hash-named files = git auto-gc, not data loss.** Both `ohvara-dashboard` and `Scraper` live inside OneDrive Desktop, so OneDrive syncs `.git` internals. When git repacks loose objects (auto-triggered by fetch/pull), hundreds of 38-char hex files vanish at once and OneDrive asks to confirm. Correct answer: **Delete all items** — the contents live in the new pack file and everything is on GitHub. "Keep" restores stale objects into `.git` and re-triggers the dialog later. First seen 2026-06-11 (673 items, matched dashboard repo's 679-in-pack/6-loose exactly). Long-term fix if it gets annoying: move repos out of OneDrive or exclude `.git` folders from sync. Related: [[Memories]]
