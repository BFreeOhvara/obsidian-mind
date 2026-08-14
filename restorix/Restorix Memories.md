---
date: 2026-08-14
description: "Restorix persistent knowledge and session log — independent of Ohvara's brain/Memories.md. Read before every Restorix session."
tags:
  - restorix
  - index
---

# Restorix Memories

Persistent context and knowledge for Restorix, retained across sessions. Mirrors the role of Ohvara's [[Memories]] but scoped entirely to Restorix — a Restorix session never needs Ohvara's log, and vice versa.

- [[Restorix LIVE_STATE]] — single current-state doc (overwritten, not appended)
- [[Restorix North Star]] — living goals document, read at session start

---

## Hard-Won Lessons

*(none yet — fills in as Restorix work ships)*

---

## Session Log

*(append-only, most recent first once entries exist — same `[CC | date — summary]` tag convention as Ohvara's [[Memories]])*

- **[CC | 2026-08-14 — Prompt 427 shipped: Restorix marketing site built and deployed, pending Brayden unblock]** New standalone project `restorix-marketing` (Vite + React 19 + Tailwind + framer-motion) at `C:\Users\freem\restorix-marketing`, git-committed locally (`39b8ddb`). Before building, actually loaded regenix.io and read its computed styles rather than trusting the brief's "dark theme" description — found the real site is light sage/mint (`#e5ecea`) with a teal accent (`#07775f`/`#2fd6b4`/`#055c49`), Space Grotesk/Manrope/JetBrains Mono, pill buttons, soft radial glow blobs, not dark/neon at all. Flagged the mismatch to Brayden via AskUserQuestion instead of guessing; he confirmed matching the real site exactly. Built all 8 sections from the brief (Hero, The Leak with 4 real sourced stats, RestorixCORE system with animated ring emblem, Process, Who It's For, honest-placeholder Outcomes, empty-state Testimonials, final CTA), scroll-reveal animations throughout. Verified build clean, local dev server zero console errors, computed styles diffed against the live regenix.io site to confirm a literal palette/font/button match, no horizontal overflow at desktop or 375px mobile. Deployed to Vercel (`deploy_to_vercel`, team `ohvara`, production target) — build succeeded but the project sits behind Vercel's default deployment-protection SSO wall, and the MCP tool's read endpoints (`get_project`/`list_projects`/`get_deployment`) all 404 on this brand-new project even though the write/deploy call worked, so CC can't toggle the protection off itself. Also has no `gh` CLI or GitHub token on this machine, so couldn't create the `BFreeOhvara/restorix-marketing` GitHub repo to push to (checked env vars and git credential config — genuinely absent, didn't try to extract anything from Windows Credential Manager, that's not something to poke at). Both flagged directly to Brayden in [[Restorix LIVE_STATE]] as two-click/one-message unblocks, not further build work. Screenshot verification also blocked — the Browser pane's screenshot action isn't compositing frames in this environment; fell back to `get_page_text` + `javascript_tool` computed-style checks, which confirm structure and exact style tokens but not actual visual rendering (motion, the RestorixCORE ring layout) — Brayden should still eyeball it live once the auth wall is off. Housekeeping: swapped create-vite's default purple favicon for a teal "R" mark, deleted the unused default icon sprite.
- **2026-08-14 — Restorix vertical scaffolded.** Split out of the shared Atlas vault during Prompt 426 (vault deep-clean). This file, [[Restorix LIVE_STATE]], and [[Restorix North Star]] created; Prompts 427/428 moved here verbatim from Ohvara's `brain/LIVE_STATE.md`. No Restorix code exists yet.
