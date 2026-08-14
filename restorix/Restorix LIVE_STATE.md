---
date: 2026-08-14
description: "Single current-state doc for all Restorix sessions — overwritten on update, never appended. Restorix's own vertical, independent of Ohvara's brain/LIVE_STATE.md."
tags:
  - restorix
  - live-state
---

# Restorix LIVE_STATE

> **This is the ONE file any Restorix session reads to become fully operational.** It is a CURRENT-STATE document — overwritten on every update, not appended to. [[Restorix Memories]] is the historical append-only log; this file is "what is true right now." Mirrors the shape of Ohvara's [[LIVE_STATE]] but is fully independent — a Restorix session never needs to read Ohvara's state, and vice versa.

## Next Up for CC

> CC reads this section FIRST. Execute top to bottom, log each completion to [[Restorix Memories]], delete each item once done.

### Prompt 428 — Restorix setter portal (MVP)

MVP dialer/prospecting portal for setters cold-calling behavioral health facility owners/admissions directors to book Strategy Calls (the same CTA the marketing site drives to). This is conceptually similar to Ohvara's own old rep/setter pipeline (lead → call → book appointment → hand to closer) — that's a fine reference for the shape of the workflow, but this is a **brand-new build in Restorix's own new project**, not a revival of Ohvara's dead `leads`/`appointments` tables (see [[ohvara_legacy_setter_pipeline_dead]] memory — don't touch that code, it's unrelated and stays dead).

MVP scope: a queue/list of target facilities (name, contact, phone, notes — manually entered or CSV-imported for v1, no scraper needed yet), a call-logging action (outcome: booked / no answer / not interested / callback later), and a booking step that captures a Strategy Call date/time once someone says yes. Keep this genuinely minimal — the goal is setters can start dialing and booking, not a full CRM. Ask Brayden directly if anything here is ambiguous when you get to it rather than over-building.

Verify with screenshots of the queue, a logged call, and a booked Strategy Call.

---

*(Seeded 2026-08-14 during the Prompt 426 vault split — moved verbatim from [[LIVE_STATE|Ohvara's LIVE_STATE.md]] where they originally lived, no wording changed.)*

---

### ⚠️ Prompt 427 needs Brayden — two small unblocks, not more build work

**Code is done and locally verified** (see CURRENT STATE below). Two things only Brayden can finish:

1. **Turn off Vercel Authentication on the `restorix-marketing` project.** Deployed to `https://restorix-marketing-ohvara.vercel.app` (production, team `ohvara`) — but Vercel's deployment-protection SSO wall is on by default and the tool CC has access to can't see this brand-new project yet to toggle it off itself (`get_project`/`list_projects` both 404 on it, even though the deploy itself succeeded — a real gap in the MCP tool's read side, not a code problem). Brayden: Vercel dashboard → `restorix-marketing` project → Settings → Deployment Protection → turn off "Vercel Authentication." Two clicks, then the site is publicly live.
2. **Create an empty GitHub repo `BFreeOhvara/restorix-marketing`** (no README/gitignore/license — keep it truly empty) so CC can push the already-committed local repo. CC has no `gh` CLI and no GitHub API token on this machine (checked — not present in env or git config), so it can't create the repo itself; same category as "CC cannot create accounts." Once it exists, CC pushes in one command.

Neither is a build gap — the site itself is finished.

## CURRENT STATE

**Prompt 427 shipped 2026-08-14 (code + local verification done; live-public + GitHub push pending Brayden, see above).** Built `restorix-marketing` — new standalone Vite + React 19 + Tailwind + framer-motion project at `C:\Users\freem\restorix-marketing`, fully separate from `ohvara-dashboard`.

**Visual-direction correction, worth remembering:** the brief (and Restorix North Star) described regenix.io as "dark theme, gradient accents... glow effects." Actually loading the live site and reading its computed styles showed the opposite — regenix.io is a **light sage/mint theme** (`#e5ecea` background, near-black `#0f1f1b` text) with a **teal accent** (`#07775f` / bright `#2fd6b4` / deep `#055c49`), soft radial teal glow blobs, Space Grotesk (headings) + Manrope (body) + JetBrains Mono (eyebrow/stat labels), and fully pill-shaped (`9999px`) outlined/filled buttons — not dark/neon at all. Flagged this to Brayden via AskUserQuestion rather than guessing; he confirmed **match regenix.io exactly**, so that's the palette actually built. [[Restorix North Star]] still says "dark theme" in its Reference Site note — stale, worth fixing next time that file is touched.

**Built, section by section (all content adapted from the brief, all 4 stats real/sourced, no fabricated numbers anywhere):** Hero (headline + 2 CTAs + capability ticker) → The Leak (4 stat cards: 60–75% phone inquiries / 9–21× 5-min conversion lift / <20% avg conversion / 18.5% vs 2.8% click-to-call) → The Restorix System (RestorixCORE — animated ring emblem + 5 capability cards: lead capture, missed-call recovery, level-of-care & insurance triage, structured intake & booking, follow-up & nurture) → Process (Consult/Architect/Install/Optimize, vertical timeline) → Who It's For (5 segments + "adjacent specialty" card) → Outcomes (honest **placeholder** framing — em-dash stat tiles + explicit "Restorix is early" banner, no invented numbers) → Testimonials (empty-state card, no fabricated quotes, "be one of our first clients" CTA) → final CTA band. Scroll-triggered reveals via framer-motion `whileInView` throughout, matching Regenix's section-reveal behavior. "Book a Strategy Call" wired to a `mailto:hello@restorix.io` placeholder — flagged per the prompt's own instruction; swap for a real scheduler link (Calendly etc.) when Brayden has one.

**Verified:** `npm run build` clean. Local dev server (port 5174, new `.claude/launch.json` entry `restorix-marketing` alongside the existing `dashboard` entry so they don't collide) — zero console errors, page text confirmed section-by-section via `get_page_text`, computed-style checks confirmed the actual rendered palette/fonts/button styles match regenix.io's real tokens exactly (not just "looks about right" — literally diffed against the live site's `getComputedStyle` output), zero horizontal overflow at both desktop and 375px mobile width. Could not get real screenshots this session — the Browser pane's `computer` screenshot action isn't compositing in this environment ("pane is not displayed") — verified via `get_page_text` + `javascript_tool` computed-style extraction instead, which is a lower bar than a visual screenshot; **Brayden should eyeball the live site himself once the auth wall is off**, especially the RestorixCORE ring emblem and scroll-reveal motion, which text/computed-style checks can't fully confirm.

**Housekeeping while building:** replaced create-vite's default purple abstract-blob favicon with a small teal "R" mark matching the real palette; deleted the unused default `public/icons.svg` (Vite/React template's Bluesky/Discord/GitHub icon sprite, not referenced anywhere in this project).

Local repo: committed (`39b8ddb`), not yet pushed — see the Brayden unblock list above.

## Related

- [[Restorix North Star]]
- [[Restorix Memories]]
