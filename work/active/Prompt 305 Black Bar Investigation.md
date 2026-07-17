---
date: 2026-07-17
description: "Real Playwright screenshots across 6 viewport widths hunting Training Center's reported black-bar glitch — not reproduced"
tags:
  - work-note
  - mobile
quarter: Q3-2026
status: active
---

# Prompt 305 — Training Center Black Bar Investigation

Investigate-only — no code changes shipped, `ohvara-dashboard` is clean. Screenshots live in `work/active/prompt-305-screenshots/`.

## Method

Prompt 303 tried DOM/CSS inspection via the live Browser-pane tool at 700px and 1280px and found nothing — but that tool's `screenshot`/`zoom` actions were broken all session (timeouts), so that investigation never actually *saw* the page. This time used real Playwright (`chromium`, already a dev dependency in `ohvara-dashboard`) driving a throwaway harness that mounts the real `TrainingCenter` component unauthenticated (same pattern as [[Prompt 292 Mobile Screenshot Audit]] — `enabled: !!profile?.id` guards on the data hooks mean the page renders its empty/zero-progress state without crashing). Harness scaffolding (`QaHarness305.jsx`, its `App.jsx` route, 2 throwaway Playwright scripts) reverted before this note was written.

Captured the Videos tab — the exact location Brayden's screenshot showed the bar — at 6 widths spanning phone to ultra-wide: 375, 768, 1024, 1280, 1440, 1920px.

## Screenshots

### 375px (mobile)
![[prompt-305-screenshots/videos-375.png]]

### 768px
![[prompt-305-screenshots/videos-768.png]]

### 1024px
![[prompt-305-screenshots/videos-1024.png]]

### 1280px (desktop — the width Brayden's original screenshot was at)
![[prompt-305-screenshots/videos-1280.png]]

### 1440px
![[prompt-305-screenshots/videos-1440.png]]

### 1920px
![[prompt-305-screenshots/videos-1920.png]]

## Result: not reproduced

No black bar at any of the 6 widths — the gap between the tab row and "Heads up — you'll get a quick mini quiz after every video." renders clean in every capture.

Went further than the width sweep: also captured rapid-fire screenshots (0ms/50ms/100ms/200ms) immediately after clicking the Videos tab, and again after switching away to Script and back to Videos, to try to catch a transient render flash a settled screenshot might miss (e.g. during the tab-switch transition, or before lazy-loaded video thumbnails finish downloading). At 0ms, thumbnails render as their gray placeholder box mid-load — no black bar there either. Also grepped `TrainingCenter.jsx` for any hardcoded black background (`'black'`, `#000`, literal near-black hex) — the only hit is `#13131F` on `ErrorToast`, a `position:fixed` top-right toast unrelated to this region.

## Why it might not have reproduced

- **A real device/browser difference.** This harness runs headless Chromium via Playwright — Brayden's actual browser (Chrome, Safari, Edge — unknown which) or OS-level GPU compositing could behave differently on the exact same markup.
- **Real data vs. empty state.** This harness always shows 0/8 watched — a rep with real in-progress data (partially watched videos, a real network round-trip for `training_progress`) exercises a different runtime path than this synthetic harness's instant empty-state render. If it's tied to a specific data shape or a loading-state transition under real network latency, this harness wouldn't trigger it.
- **A one-off browser/OS hiccup**, not a deterministic code bug at all.

## Status

Per the queued prompt's instruction, Brayden won't provide more repro detail beyond "I just want it removed" — so no further clarifying questions queued. If it recurs, the most useful next input is a fresh screenshot (ideally with browser/OS noted) so an exact pixel-level comparison against a same-viewport Playwright capture can be done, rather than another round of guessing.

## Related
[[North Star]] · [[Memories]] · [[Prompt 292 Mobile Screenshot Audit]]
