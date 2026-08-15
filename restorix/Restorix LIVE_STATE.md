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

### ⚠️ Prompt 430 needs Brayden — code done, live deploy blocked

**Code is finished, verified, committed, and pushed to GitHub** (`github.com/BFreeOhvara/restorix-marketing` `main` @ `7aa1213`). The live site at `restorix-marketing-ohvara.vercel.app` is NOT updated yet — CC's Vercel deploy tool got `403 forbidden` on both a preview AND a production deploy attempt for this project (something changed project-side since Prompt 429 — the project is also still unreadable via `get_project`, so CC can't see what changed). Trying `create_git_project` to link the pushed repo instead hit a `409 conflict` ("project already exists") rather than reusing it.

**Fix:** Vercel dashboard → `restorix-marketing` project → Settings → Git → **Connect Repository** → `BFreeOhvara/restorix-marketing`. This deploys the pushed commit immediately and makes every future push auto-deploy — permanently removes the need for CC's one-off `deploy_to_vercel` calls (and whatever changed that broke them). Once connected, CC will verify the live site matches.

### Prompt 428 — Restorix setter portal (MVP)

MVP dialer/prospecting portal for setters cold-calling behavioral health facility owners/admissions directors to book Strategy Calls (the same CTA the marketing site drives to), then handing booked calls to a closer. This mirrors the shape of Ohvara's own rep/setter dashboard (same type of attributes: a leads queue, call-outcome logging, booking-to-closer) — use that as the layout/UX reference, but this is a **brand-new build, brand-new standalone project**, not a revival of Ohvara's dead `leads`/`appointments` tables (see [[ohvara_legacy_setter_pipeline_dead]] memory — don't touch that code, it's unrelated and stays dead).

**Deploy target:** its own separate Vercel project, apart from `restorix-marketing` (the marketing site) — same split pattern as marketing-site-vs-dashboard on the Ohvara side. New repo, new Vercel project.

**Visual style:** match `restorix-marketing`'s actual look exactly — same palette/fonts/component language (light sage/mint `#e5ecea` bg, teal accents `#07775f`/`#2fd6b4`/`#055c49`, Space Grotesk + Manrope + JetBrains Mono, pill-shaped buttons, soft teal glow blobs — see CURRENT STATE above for the full token set CC already extracted from regenix.io). This is an internal tool, not the public marketing site, so layout is dashboard-style (tables/queues/forms), but it should look like it belongs to the same product, not a bare default UI.

MVP scope: a queue/list of leads (facility name, contact, phone, notes — manually entered or CSV-imported for v1, no scraper needed yet), a call-logging action (outcome: booked / no answer / not interested / callback later), and a booking step that captures a Strategy Call date/time and hands it to a closer once someone says yes. **No call-script system** — Brayden inputs/manages scripts himself outside this build; don't build script generation, script fields, or AI-script logic. Keep this genuinely minimal — the goal is setters can start dialing and booking, not a full CRM. Ask Brayden directly if anything here is ambiguous when you get to it rather than over-building.

Verify with screenshots of the queue, a logged call, and a booked Strategy Call.

---

*(Seeded 2026-08-14 during the Prompt 426 vault split — moved verbatim from [[LIVE_STATE|Ohvara's LIVE_STATE.md]] where they originally lived, no wording changed.)*

## CURRENT STATE

**Prompt 430 — code done 2026-08-15, live deploy blocked (see Brayden flag above).** Differentiated the site from regenix.io on all three axes Brayden called out:

- **Accent color:** teal → **Cornflower blue** (`#3a63d6` base / `#7c9eff` bright / `#24469e` deep). Proposed 2 blue + 2 coral swatches via AskUserQuestion, all pre-checked for WCAG contrast against the `#e5ecea` bg and white button text (a true pastel light-blue/coral fails contrast as a solid accent, so the options were the freshest shades that still pass) — Brayden picked Cornflower. Background/text/fonts/pill-button shape untouched.
- **Animation:** `Reveal` component reworked — per-direction offsets (up/down/left/right) instead of one fixed fade-up, custom cubic-bezier easing, slower duration, optional scale-in — used with varied directions per section instead of the previous uniform fade.
- **Layout (the big one):** every section's composition rebuilt while keeping all copy/stats/CTAs unchanged — Hero is now two-column with an original "live intake" mini-timeline visual card (nothing like this exists on regenix.io); The Leak is an alternating zigzag stat list (giant number + caption swapping sides) instead of a 2×2 card grid; System dropped the centered ring diagram for an alternating connected list with a small "RestorixCORE" pill badge in the heading; Process changed from a vertical sticky-number timeline to a horizontal 4-up stepper; Who It's For became a numbered index/directory list instead of a card grid; Outcomes is one divided stat bar instead of four separate tiles; Testimonials and the final CTA both restructured into bordered/split layouts instead of centered stacks.
- **Verified:** `npm run build` clean, dev server zero console errors, `get_page_text` confirmed every section's content is unchanged word-for-word, computed-style check confirmed the new accent renders (`rgb(58, 99, 214)` on buttons/stats, `rgb(36, 70, 158)` on eyebrow labels), zero horizontal overflow at desktop and 375px mobile.
- Committed locally (`7aa1213`) and pushed to GitHub — that part succeeded. Getting it onto the live Vercel deployment is what's blocked; see the Brayden flag at the top of this file.

**Prompt 427 + 429 both fully closed 2026-08-14 — restorix-marketing is live, public, and on GitHub.** Live at `https://restorix-marketing-ohvara.vercel.app` (Vercel Authentication off, confirmed via a fresh unauthenticated page load — full content renders, no login wall). Source pushed to `github.com/BFreeOhvara/restorix-marketing` (`main`, 2 commits: `39b8ddb` scaffold + `fb8a1d8` favicon/icon cleanup that had only been sent to Vercel's deploy API before, not git — now the git history and the deployed site match). New standalone Vite + React 19 + Tailwind + framer-motion project at `C:\Users\freem\restorix-marketing`, fully separate from `ohvara-dashboard`.

**Visual-direction correction, worth remembering:** the brief (and Restorix North Star) described regenix.io as "dark theme, gradient accents... glow effects." Actually loading the live site and reading its computed styles showed the opposite — regenix.io is a **light sage/mint theme** (`#e5ecea` background, near-black `#0f1f1b` text) with a **teal accent** (`#07775f` / bright `#2fd6b4` / deep `#055c49`), soft radial teal glow blobs, Space Grotesk (headings) + Manrope (body) + JetBrains Mono (eyebrow/stat labels), and fully pill-shaped (`9999px`) outlined/filled buttons — not dark/neon at all. Flagged this to Brayden via AskUserQuestion rather than guessing; he confirmed **match regenix.io exactly**, so that's the palette actually built. [[Restorix North Star]] still says "dark theme" in its Reference Site note — stale, worth fixing next time that file is touched.

**Built, section by section (all content adapted from the brief, all 4 stats real/sourced, no fabricated numbers anywhere):** Hero (headline + 2 CTAs + capability ticker) → The Leak (4 stat cards: 60–75% phone inquiries / 9–21× 5-min conversion lift / <20% avg conversion / 18.5% vs 2.8% click-to-call) → The Restorix System (RestorixCORE — animated ring emblem + 5 capability cards: lead capture, missed-call recovery, level-of-care & insurance triage, structured intake & booking, follow-up & nurture) → Process (Consult/Architect/Install/Optimize, vertical timeline) → Who It's For (5 segments + "adjacent specialty" card) → Outcomes (honest **placeholder** framing — em-dash stat tiles + explicit "Restorix is early" banner, no invented numbers) → Testimonials (empty-state card, no fabricated quotes, "be one of our first clients" CTA) → final CTA band. Scroll-triggered reveals via framer-motion `whileInView` throughout, matching Regenix's section-reveal behavior. "Book a Strategy Call" wired to a `mailto:hello@restorix.io` placeholder — flagged per the prompt's own instruction; swap for a real scheduler link (Calendly etc.) when Brayden has one.

**Verified:** `npm run build` clean. Local dev server (port 5174, new `.claude/launch.json` entry `restorix-marketing` alongside the existing `dashboard` entry so they don't collide) — zero console errors, page text confirmed section-by-section via `get_page_text`, computed-style checks confirmed the actual rendered palette/fonts/button styles match regenix.io's real tokens exactly (not just "looks about right" — literally diffed against the live site's `getComputedStyle` output), zero horizontal overflow at both desktop and 375px mobile width. Could not get real screenshots this session — the Browser pane's `computer` screenshot action isn't compositing in this environment ("pane is not displayed") — verified via `get_page_text` + `javascript_tool` computed-style extraction instead, which is a lower bar than a visual screenshot; **Brayden should eyeball the live site himself once the auth wall is off**, especially the RestorixCORE ring emblem and scroll-reveal motion, which text/computed-style checks can't fully confirm.

**Housekeeping while building:** replaced create-vite's default purple abstract-blob favicon with a small teal "R" mark matching the real palette; deleted the unused default `public/icons.svg` (Vite/React template's Bluesky/Discord/GitHub icon sprite, not referenced anywhere in this project).

Repo: `github.com/BFreeOhvara/restorix-marketing`, `main` branch, pushed and confirmed matching local HEAD (`fb8a1d8`).

## Related

- [[Restorix North Star]]
- [[Restorix Memories]]
