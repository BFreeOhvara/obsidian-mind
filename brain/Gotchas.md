---
description: "Things that have bitten before and will bite again — pitfalls, edge cases, and testing traps"
tags:
  - brain
---

# Gotchas

Things that have bitten before and will bite again.

- **OneDrive "Delete these items?" popup with hash-named files = git auto-gc, not data loss.** Both `ohvara-dashboard` and `Scraper` live inside OneDrive Desktop, so OneDrive syncs `.git` internals. When git repacks loose objects (auto-triggered by fetch/pull), hundreds of 38-char hex files vanish at once and OneDrive asks to confirm. Correct answer: **Delete all items** — the contents live in the new pack file and everything is on GitHub. "Keep" restores stale objects into `.git` and re-triggers the dialog later. First seen 2026-06-11 (673 items, matched dashboard repo's 679-in-pack/6-loose exactly). Long-term fix if it gets annoying: move repos out of OneDrive or exclude `.git` folders from sync. Related: [[Memories]]

- **Chrome-MCP visual verification must run from Claude DESKTOP, not the Claude Code CLI.** On this machine the Chrome extension's native-messaging host (`com.anthropic.claude_browser_extension`, registered in `HKCU\Software\Google\Chrome\NativeMessagingHosts`) points at — and runs under — the **Claude Desktop app** (MSIX pkg `Claude_pzs8sxrjxfjjc`, `…\ChromeNativeHost\chrome-native-host.exe`). So a Claude **Code CLI** session (`…\Roaming\Claude\claude-code\<ver>\claude.exe`, a separate process; `claude` not even on PATH) calls `mcp__Claude_in_Chrome__list_connected_browsers` and gets **`[]`** — the extension is bridged to Desktop, not the CLI. **Workflow for any rep-auth-gated visual check (standing rule #11):** write a self-contained QA prompt with the spec embedded, have Brayden paste it into the **Claude Desktop** chat (which owns the bridge + the saved apex11 login on the vercel domain), Desktop drives Chrome + screenshots + reports PASS/FAIL, then CC fixes from the CLI. Don't burn time trying to make the CLI own the browser — re-pairing the extension to the CLI was explicitly PARKED (quitting Desktop to free the host = too many unknowns, not worth it for a one-off verify). First hit 2026-06-17 verifying Thread #17. Related: [[Memories]]
