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

*(Queue is empty — nothing left to build until Brayden queues something new. Prompt 428 is code-complete; see the Brayden flag directly below for what's left.)*

---

### ⚠️ Prompt 428 needs Brayden — code done, same two blockers as 427/429/430

**Code is finished, verified working end-to-end, committed locally** (`441703b`, `C:\Users\freem\restorix-setter-portal`). Two things only Brayden can finish — same shape as every prior Restorix ship:

1. **Turn off Vercel Authentication on the `restorix-setter-portal` project.** Deployed successfully (build succeeded, production target) to `restorix-setter-portal-ohvara.vercel.app` — but it's behind Vercel's default deployment-protection SSO wall, and CC's Vercel tools can't see this brand-new project yet to toggle it off itself (`get_project_deployment_protection` 404s; `update_project_deployment_protection` was blocked twice by the permission classifier, correctly, since flipping a security setting is exactly the kind of action that should get a human nod). Vercel dashboard → `restorix-setter-portal` project → Settings → Deployment Protection → turn off "Vercel Authentication."
2. **Create an empty GitHub repo `BFreeOhvara/restorix-setter-portal`** (no README/gitignore/license) so CC can push the already-committed local repo. Same reason as every prior repo: no `gh` CLI or GitHub token on this machine.

Once the GitHub repo exists, also connecting it in Vercel's Settings → Git (like was done for `restorix-marketing` after Prompt 430) fixes both the auth wall and future auto-deploy in one step — that's the pattern that worked cleanly last time.

**One more thing worth knowing:** the portal's real backend is live and working right now regardless of the frontend deploy status — a dedicated Supabase project (`avgvmzshujwphneykuvu`, "restorix-setter-portal") with the schema, RLS, and edge function already built and tested. Brayden's own admin login already works: **username `brayden`, password `5FgHsdY0Sfd7Ze39yZws`** (temporary — there's no change-password UI in this MVP; can be reset via Supabase Auth directly if wanted). From that account he can create setter/closer accounts himself once the frontend is reachable.

---

### Prompt 428 original spec (for reference — now shipped, see CURRENT STATE)

MVP dialer/prospecting portal for setters cold-calling behavioral health facility owners/admissions directors to book Strategy Calls (the same CTA the marketing site drives to), then handing booked calls to a closer. This mirrors the shape of Ohvara's own rep/setter dashboard (same type of attributes: a leads queue, call-outcome logging, booking-to-closer) — use that as the layout/UX reference, but this is a **brand-new build, brand-new standalone project**, not a revival of Ohvara's dead `leads`/`appointments` tables (see [[ohvara_legacy_setter_pipeline_dead]] memory — don't touch that code, it's unrelated and stays dead).

**Deploy target:** its own separate Vercel project AND its own separate GitHub repo, apart from `restorix-marketing` (the marketing site) — same split pattern as marketing-site-vs-dashboard on the Ohvara side. Same Vercel team (`ohvara`), same GitHub account (`BFreeOhvara`), but a fully distinct project/repo — not a folder inside `restorix-marketing`.

**Visual style:** match `restorix-marketing`'s current, post-Prompt-430 look (cornflower blue accent, not teal).

MVP scope: a queue/list of leads (facility name, contact, phone, notes — manually entered or CSV-imported for v1, no scraper needed yet), a call-logging action (outcome: booked / no answer / not interested / callback later), and a booking step that captures a Strategy Call date/time and hands it to a closer once someone says yes. **No call-script system** — Brayden inputs/manages scripts himself outside this build.

**Lead scraper — not in scope for this build, note for later:** when a scraper eventually gets built to populate the queue, source from SAMHSA's Behavioral Health Treatment Services Locator (findtreatment.gov) as the primary source rather than scraping Google Maps/Places — it's the free, structured, publicly-maintained directory of every licensed facility in the niche, so it avoids ToS scraping risk and gives cleaner data than a Maps crawl. Google Places can be a fallback for contact-info enrichment (phone/website) if a listing is missing it.

---

*(Seeded 2026-08-14 during the Prompt 426 vault split — moved verbatim from [[LIVE_STATE|Ohvara's LIVE_STATE.md]] where they originally lived, no wording changed.)*

## CURRENT STATE

**Prompt 428 — code done 2026-08-15, live deploy blocked (see Brayden flag above).** Built `restorix-setter-portal` — new standalone Vite + React 19 + Tailwind + Supabase project at `C:\Users\freem\restorix-setter-portal`, dedicated Supabase project `avgvmzshujwphneykuvu` (org "Ohvara," free tier, $0/mo).

- **Auth model (per Brayden's explicit call):** admin-controlled, no self-signup, mirrors `ohvara-dashboard`'s username→synthetic-email pattern (`{username}@restorix.internal`) and `profiles`+role-enum architecture. `profiles` (setter/closer/admin) + `leads` (facility_name/contact_name/phone/notes/status/callback_at/strategy_call_at/assigned_closer) with RLS: any authenticated role can read leads, setter+admin can write, only admin manages users. `admin-create-user` edge function has a **self-closing bootstrap exception** — allows creating the very first account with no auth required ONLY while `profiles` is empty, permanently closes the moment any profile row exists (can never fire again for this project). Brayden's own admin account bootstrapped this way — see credentials in the Brayden flag above.
- **Real bug found + fixed during testing:** the `profiles` SELECT/UPDATE/INSERT RLS policies had a classic Postgres self-recursion (`infinite recursion detected in policy for relation "profiles"`, error 42P17) — a policy on `profiles` queried `profiles` again to check the caller's role. Login failed with silent 500s until this was root-caused via Supabase's `auth_logs` (not obvious from the browser console alone, which just showed generic "500" with no body). Fixed with the standard Supabase pattern: a `SECURITY DEFINER my_role()` helper function (owned by the migration role, which has BYPASSRLS, so it doesn't re-trigger the policy it's evaluating for). Also ran `get_advisors` afterward and tightened function grants (revoked public/anon EXECUTE on `handle_new_user` and `my_role`, kept `authenticated` access to `my_role` since RLS depends on it).
- **Second real bug found + fixed:** an HTML `pattern` attribute (`[a-z0-9_-]+`) for username validation crashed with "Invalid character in character class" in this browser's stricter regex parser (trailing unescaped hyphen in a character class) — fixed by escaping it (`[a-z0-9_\-]+`).
- **Built:** Login page, role-aware nav shell (Queue+Booked+Users for admin, Queue+Booked for setter, Booked-only for closer), Queue page (add-lead modal, CSV import with a lightweight client-side parser, per-lead "Log call" action), LogCallModal (4 outcome buttons — No Answer/Not Interested/Callback Later/Booked — with conditional date/time + optional closer-handoff fields), Booked page (chronological list of upcoming Strategy Calls), Users page (admin creates setter/closer/admin accounts via the edge function, sees active/deactivated status). No call-script system anywhere, per spec.
- **Verified live, interactively, not just build-checked:** logged in as admin via Chrome MCP form interaction (not just `get_page_text`), added a real test lead, logged it as Booked with a strategy-call date/time, confirmed it appeared correctly on the Booked page, created a test closer account through the Users UI, signed out, logged in as that closer, confirmed the nav correctly hid Queue/Users and that direct navigation to `/users` and `/queue` redirected away (client-side gate; the real security boundary is the server-side RLS, also verified). Deleted all test data (lead + closer account) before shipping so the database starts clean for Brayden.
- Anon key hardcoded directly in `src/lib/supabase.js` rather than env-var-based — it's a public, RLS-scoped credential by Supabase's own design (same as what would get baked into the bundle via `VITE_` env vars anyway), and this way the deploy doesn't depend on Vercel project env config existing.
- `npm run build` clean, zero console errors after both bug fixes.

**Prompt 430 — fully closed 2026-08-15.** Git repo connected in Vercel dashboard (`restorix-marketing` project → Settings → Git → Connect Repository), resolving the earlier `403`/`409` deploy-tool gap — live site now auto-deploys on push and reflects the new look; Brayden confirmed he likes it. Differentiated the site from regenix.io on all three axes Brayden called out:

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
