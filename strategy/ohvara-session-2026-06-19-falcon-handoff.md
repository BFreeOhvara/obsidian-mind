---
date: 2026-06-19
description: "Falcon → CC session handoff (2026-06-19): Thread #14 fair-distribution fix, Apify $5 cap → manual-scraping pivot, bridge branch pushed, first 147 real leads loaded to prod Supabase, HIPAA-methodology open decision."
tags:
  - strategy
  - brain
  - session-handoff
---

# Ohvara Session Summary — 2026-06-19 (Falcon → CC handoff)

*Saved to Atlas per the Chat Notes pattern so the other manager-chat account
sees this session's decisions via `reload`. Additive to the 2026-06-17 context
load; supersedes only where noted. Companion durable state: [[LIVE_STATE]] +
[[Memories]]. Strategy context: [[ohvara-pricing-packaging-strategy]],
[[North Star]].*

This covers everything decided and built in this Falcon strategy session, building on the 2026-06-17 context load. Supersedes nothing from that load except where noted below — this is additive.

## Completed this session

### 1. Thread #14 — Multi-rep fair distribution (FIXED)
- `assign_daily_batches` was confirmed broken for multiple reps: greedy sequential fill caused early reps to drain the whole pool, starving later reps (tested: 150/150/0/0/0/0 on a 300-lead pool with 6 reps).
- Fixed via **migration 030** (commit `cdc973a`): step 3 rewritten as cross-rep round-robin allocation. Verified fair across niche-agnostic and niche-pooled scenarios (50/50/50/50/50/50 on the same pool). Caps at batch_size; excess redistributes naturally via round-robin.
- Single-rep behavior (apex11) confirmed unaffected.
- Status: **shipped, committed, pushed, applied to prod.**

### 2. Apify credit wall hit — pivoted to manual scraping
- Apify free tier hit its $5/month cap (banner: "No new Actors will start," resets 2026-06-28). Apify Starter tier ($29/mo) would remove this, but a decision was made to **scrape manually instead, for now**, to avoid both Apify costs and Google Places API costs.
- Google Places API was also ruled out as the phone-enrichment method due to cost (~$35–50/1k leads). **Free web search (per-business search, no paid API) is the enrichment method going forward.**
- The existing automated scraper (`indeed_scraper.yml` on `main`, cron `0 12 */2 * *`, writing to a Google Sheet tab "Rep 3 – East") is still active and has run 17/17 successfully — it is NOT currently paused. It's a separate, lower-priority legacy path now that manual scraping + Supabase is the live path. **Open decision: whether to pause this scheduled job** (no action taken yet).

### 3. Bridge branch pushed (resolves prior blocker)
- `indeed-supabase-bridge` branch pushed to origin at `b67e288` using a new PAT (repo + workflow scope), via one-shot ephemeral auth — token was never written to `.git/config` (repo is under OneDrive; this avoided syncing the token to the cloud in plaintext).
- **Open item: PAT rotation.** The PAT was pasted into a CC chat transcript during this process. Should be rotated once current dry-run/manual-load work is done, per standing security posture. Not yet done.
- All 5 original repo secrets (`APIFY_TOKEN`, `GOOGLE_CREDENTIALS`, `GOOGLE_PLACES_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`) are confirmed present and were refreshed with current values during this session.
- `SUPABASE_DRY_RUN` repo variable was added (`true`), but the Apify-based dry-run workflow was **never actually triggered** — the manual-scraping pivot (above) made it unnecessary for this batch. It remains available if the Apify path is revisited.

### 4. First real leads loaded into production Supabase ✅
- Manually scraped via Chrome's Web Scraper extension (imported sitemap config), two cities: **Dallas (131 raw rows) and Houston (135 raw rows)**.
- **HIPAA filtering**: the existing keyword-based `hipaa_guard` was tested against the Dallas batch and found to have real accuracy problems in both directions — false positives (e.g. "hospital" matching inside "hospitality," excluding hotels) and false negatives (e.g. Glaucoma Consultants, a Spanish-language clinic "Centro de mi Salud," and Botox/medspa businesses passing through uncaught). **Decision: abandoned the keyword guard for this batch in favor of direct judgment-based filtering** (CC read each company name/job title and excluded anything clearly a healthcare provider). This is a deviation from the original "HIPAA guard is the sole filter" strategy as written in the 2026-06-17 load — worth a decision on whether judgment-based filtering becomes the new standing approach or whether the keyword guard should be hardened and used going forward instead.
- Filtering result: 266 total raw rows (minus dupes/junk) → **147 passed, 113 excluded as healthcare-related.**
- **Phone enrichment**: free web search, one search per business, conservative (null when not confident) — no paid API used. Result: **104 of 147 got a confident phone number (71% hit rate), 43 came back null.**
- **Schema changes required and applied**: migration 031 (commit `fca4317`) added `manual_scrape` to the `lead_source` enum (previously only allowed `indeed`/`google_maps`). Niche values were derived per-industry (hotel, law firm, salon, veterinary, automotive, etc.) rather than reusing the existing trade-only niche taxonomy, since none of those industries fit the existing trade values — this is also a deviation from prior niche-agnostic framing and is now genuinely industry-labeled metadata.
- **Final load**: all 147 inserted as `status='New'`, `assigned_rep_id=null`, `state='TX'`, `source='manual_scrape'`. Total leads in system: **412 seed (still fake) + 147 real = 559.**
- Niche breakdown: hotel (52, the largest single category), other (20), salon/spa (11), law firm (10), education (7), veterinary (6), pet services (6), automotive (6), plus smaller categories.
- Known minor cleanup item: a few near-duplicate hotel rows slipped through under slightly different name spellings (not merged).
- CSV "Job location" column was empty for every row in both scrapes — city was set to the metro (Dallas/Houston) rather than actual suburb; the scraper's location field extraction did not work on the live US Indeed site (the imported sitemap config was originally built for the French Indeed site).

## Standing decisions/strategy updates from this session

- **Manual scraping (via Chrome Web Scraper extension) + free web-search phone enrichment is the active lead-sourcing method**, replacing Apify + Google Places API for now. This is a cost-driven pivot, not a permanent architectural decision — revisit if/when volume needs outpace what manual scraping can sustain.
- **Target: ~5,000 leads**, built incrementally city-by-city via manual scraping, topped up as the unassigned pool runs low. No automated "low lead" alert exists yet — this was discussed as a future want, not yet built.
- **HIPAA filtering approach is now ambiguous** — the original keyword guard exists and is committed, but this batch bypassed it in favor of direct judgment calls due to confirmed accuracy problems. This needs a clear decision: harden the keyword guard to match judgment-level accuracy and use it consistently going forward, or formalize judgment-based filtering (by CC, per batch) as the standing method. Recommend resolving this before the next batch is loaded, so HIPAA-exclusion methodology is consistent and auditable.

## Still open / unchanged from 2026-06-17 load

- Brayden+Nate script wording review (last content gate before a real setter)
- Booking Rate stat card
- Dead-code PR for `scrapers/indeed-scraper.js`
- Near-duplicate hotel lead merge (new, minor)
- PAT rotation (now more urgent — PAT was used and appeared in a CC chat transcript this session)
- Decision on whether to pause the legacy scheduled Apify scraper on `main`
- Decision on HIPAA filtering methodology going forward (new, see above)

## Repos/state as of end of session

- `ohvara-dashboard` — master, includes migration 030 (fair-share rewrite) and migration 031 (manual_scrape enum value). Live on Vercel.
- `ai-receptionist-leads` — `indeed-supabase-bridge` branch now pushed to origin at `b67e288`. Bridge code itself (Apify-based) untouched/unused this session — the manual load bypassed it entirely.
- `obsidian-mind` — Atlas updated throughout (Memories.md entries + LIVE_STATE header now leads with "FIRST REAL LEADS IN PROD").
- Production Supabase: 559 total leads (412 seed + 147 real), fair round-robin distribution active, real leads unassigned and ready for a setter.

## Related

- [[LIVE_STATE]] — current-state doc (header now leads with the first-real-leads milestone)
- [[Memories]] — append-only session log (detailed per-round entries for this session)
- [[ohvara-pricing-packaging-strategy]] — niche/pricing strategy (HIPAA-exclusion rationale lives here)
- [[North Star]] — phase/goals
