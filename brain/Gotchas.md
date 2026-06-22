---
description: "Things that have bitten before and will bite again — pitfalls, edge cases, and testing traps"
tags:
  - brain
---

# Gotchas

Things that have bitten before and will bite again.

- **OneDrive "Delete these items?" popup with hash-named files = git auto-gc, not data loss.** Both `ohvara-dashboard` and `Scraper` live inside OneDrive Desktop, so OneDrive syncs `.git` internals. When git repacks loose objects (auto-triggered by fetch/pull), hundreds of 38-char hex files vanish at once and OneDrive asks to confirm. Correct answer: **Delete all items** — the contents live in the new pack file and everything is on GitHub. "Keep" restores stale objects into `.git` and re-triggers the dialog later. First seen 2026-06-11 (673 items, matched dashboard repo's 679-in-pack/6-loose exactly). Long-term fix if it gets annoying: move repos out of OneDrive or exclude `.git` folders from sync. Related: [[Memories]]

- **Claude in Chrome binds to whichever claude.ai ACCOUNT is signed into that Chrome profile, not to "Eagle" or "Falcon" as a concept.** Eagle/Falcon are just Brayden's own labels for two separate claude.ai Pro logins (account 2 / account 1) — the extension doesn't know or care about that naming, it only knows the account session in the browser profile. Hit 2026-06-22: Brayden was logged out of the Falcon account (no usage left) and switched to Eagle in this Cowork chat, but the Chrome extension was still signed into the old Falcon account in the one Chrome profile that existed → `list_connected_browsers` returned `[]` from the Eagle session because no browser was connected to *that* account. **Fix shipped:** Brayden created a second Chrome profile, each profile's extension signed into its own account (one Falcon, one Eagle) — so each chat now has a matching profile to pair with, instead of one shared profile that only ever matches whichever account logged in most recently. **Standing rule going forward:** if `list_connected_browsers` returns `[]`, don't assume the bridge is broken — check which account each Chrome profile's extension is signed into before troubleshooting further, and confirm the profile matches the chat's own account. When verifi