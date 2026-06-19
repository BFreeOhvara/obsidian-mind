---
date: 2026-06-19
description: "CC prompt — verify multi-rep fair distribution via assign_daily_batches + remove dead indeed-scraper.js dead-code stub from ohvara-dashboard."
tags:
  - cc-prompt
  - ohvara
status: active
---

# CC Prompt: Two Tasks — Multi-Rep Distribution Test (Thread #14) + Dead-Code Cleanup

> Related: [[LIVE_STATE]] · [[work/active/ohvara-dashboard]]

## Task 1 — Verify Multi-Rep Fair Distribution (Thread #14)
This runs against existing seed data — no Apify credentials, no production risk, safe to fully execute today.

`assign_daily_batches` has only ever been run with a single rep (apex11). Before any real appointment-setters get plugged in, confirm it actually splits a shared lead pool evenly across multiple reps.

### Recon first
Before designing the test: check how reps are currently modeled with respect to niche. The original framing assumed "niche-pooled setters" — each rep assigned to specific niche(s), drawing from that niche's pool. But the scraping strategy has since pivoted to niche-agnostic (broad scrape, niche is now just metadata, not a targeting filter). Does the rep-assignment model still segment by niche, or does/should it now draw from one shared pool regardless of niche? Report what's actually there before assuming either way — don't build the test on a stale assumption.

### Test
Set up at least 3–6 test reps (matching the real concern about "thin shared pool, multiple setters") using the existing 412 seed leads. Run `assign_daily_batches` and verify: does it split evenly across reps? Does behavior break or skew if multiple reps draw from one pool?

### Known confound to check, not necessarily fix
The niche-casing drift (Roofing/roofing, Electrical/electrical, etc., not yet normalized) could distort results if it's still present in seed data. Check whether it's actually corrupting this test's results. If it is, flag it as a blocker for trusting the test. If it doesn't materially affect distribution fairness, note it separately as a still-open cleanup item — don't block this test on fixing it unless it's actually skewing numbers.

### Done means
Report back: does fair distribution actually work for multiple reps today? If not, what's broken and what would it take to fix?

---

## Task 2 — Dead-Code Cleanup PR (ohvara-dashboard)
In the prior Apify session, you offered to open a PR in ohvara-dashboard removing `scrapers/indeed-scraper.js`. That offer is accepted — go ahead and open it. The file is confirmed dead: it writes to columns (`hourly_min`, `hourly_max`) that don't exist in the current schema, so it would fail if run today. It's been superseded by the new `supabase_bridge.py` in the `indeed-supabase-bridge` branch. The file is not a working fallback; removing it cleans up a misleading dead-code stub. Nothing to preserve there.

---

## Parallel context (not a CC task — Brayden is handling this separately)
Brayden is gathering the five credentials needed to run the Apify pipeline end-to-end:
- Apify token → Apify console, account settings → API tokens
- Google Places API key → Google Cloud Console → APIs & Services → enable Places API
- Google service account credentials (JSON key) → Google Cloud Console → IAM & Admin → Service Accounts
- Supabase URL + service role key → Supabase project → Settings → API

Once those are added as repo secrets and `SUPABASE_DRY_RUN=true` is set, the first modest validation batch (300 leads) can run. That's a separate track and doesn't block Task 1 or Task 2 above.
