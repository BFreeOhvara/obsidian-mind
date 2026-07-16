---
date: 2026-07-16
description: "Mobile-responsiveness audit of every closer- and admin-facing page in ohvara-dashboard — parity check against the rep side's Prompts 287-297 fixes"
tags:
  - work-note
  - mobile
quarter: Q3-2026
status: active
---

# Prompt 298 — Closer & Admin Mobile Audit

Investigate phase of Prompt 298. Rep-facing pages got a thorough mobile pass across Prompts 287-297; closer and admin pages had never been audited. Confirmed via grep that **zero** of the 18 routed closer/admin pages use any Tailwind `md:`/`sm:`/`lg:` breakpoint class or `hidden md:flex`/`flex md:hidden` pattern — the only mobile handling present anywhere is ad-hoc inline `flexWrap`/`overflowX` on a handful of pages, and it's inconsistent.

Audited via 3 parallel read-only investigation passes (all 18 routed files + `MessageCenter.jsx`, a component shared across rep/closer/admin Messages pages). `src/pages/closer/CloserLeads.jsx` (151 lines) is dead code — not imported or routed anywhere in `App.jsx` — flagged, not touched.

## Findings — Closer pages

| File | Rating | Issue |
|---|---|---|
| [[#CallLeads|CallLeads.jsx]] | **BROKEN** | Table header + rows use fixed `flex:'0 0 Npx'` columns totaling 620px+ inside `overflow:'hidden'` (not scrollable) — Niche/Phone/City/Status/Action columns and the Call button are clipped off-screen, unreachable on mobile |
| CloserPipeline.jsx | CRAMPED | `QueueTable` forces `minWidth:600` inside `overflowX:'auto'` — functions (scrolls), but every tab requires horizontal scroll to read past Business |
| [[#RevenueTracker|RevenueTracker.jsx]] | **BROKEN** | `DealsSection`'s table uses `gridTemplateColumns:'1fr 140px 160px 130px'` (430px of fixed columns) inside a `Card` with no overflow handling — will overflow/clip. `RecurringSection`'s `1fr auto auto auto` grid is CRAMPED but not broken |
| CloserMyStats.jsx | FINE | Already uses `grid-cols-2 md:grid-cols-4` + wrapping header — the model pattern |
| MyAppointments.jsx | CRAMPED | 3 `KPICard`s in a row with no `flexWrap` (sibling pages have it) — squeezes to ~80px each instead of wrapping |
| MyCalls.jsx | FINE | Simple shrinking/truncating row layout, no fixed multi-column widths |
| RepAnalytics.jsx | CRAMPED | Fixed `grid-cols-3` `StatCard` row, no `md:` variant — repeats per rep down the page |
| [[#CloserScript|CloserScript.jsx]] | **BROKEN** | Two-tab sub-nav has `whiteSpace:'nowrap'` labels/sub-labels (one sub-label ~300px+ alone) with no wrap and no `overflowX` — needs 600px+, has none, will overflow |
| Messages.jsx | **BROKEN** | Thin wrapper around shared `MessageCenter.jsx` (see below) |

## Findings — Admin pages

| File | Rating | Issue |
|---|---|---|
| [[#Overview|Overview.jsx]] | **BROKEN** | Fixed `width:300` right sidebar + non-wrapping 2-col shell forces horizontal overflow; fixed `flex:'0 0 240px'` chart squeezes its sibling; rep table has fixed-flex columns (400px+) inside `overflow:'hidden'`, no scroll fallback |
| RepPerformance.jsx | CRAMPED | Fixed `grid-cols-4` metrics grid, no `md:` variant, no `KPICard` reuse (custom `Metric` component) |
| LeadPipeline.jsx | CRAMPED | Otherwise the *best*-handled admin page (KPI rows wrap, tab bars scroll, tables intentionally `overflowX` with `minWidth:720` + a code comment acknowledging the tradeoff) — but the rep-name search input is `width:240` fixed, dominates the filter row at mobile width |
| [[#LeadScraper|LeadScraper.jsx]] (shared `/closer/scraper`) | **BROKEN** | 3-col config grid (`1fr 1fr auto`) has no wrap fallback; results table has fixed-flex columns (576px+) inside `overflow:'hidden'` with **no** scroll wrapper (unlike LeadPipeline's equivalent table) — real clipping, affects both admin and closer roles |
| LeadSources.jsx | CRAMPED | Fixed `grid-cols-3` `StatCard` row, no `md:` variant |
| [[#Users|Users.jsx]] | **BROKEN** | User table wrapper is `overflow-hidden` (not scrollable) on a 6-column table; invite-generation row and pending-invites row both lack `flex-wrap` on multi-element rows |
| [[#Commissions|Commissions.jsx]] (shared `/closer/commissions`) | **BROKEN** | Two data tables live inside `overflow:'hidden'` wrappers with no scroll fallback; per-person breakdown row (3 stat columns + pending pill + chevron) has no wrap and no name truncation |
| [[#Payouts|Payouts.jsx]] | **BROKEN** | Filters row: `flex:'0 0 240px'` search input + 5 status buttons, no wrap — same "search box squeezes filters" bug already fixed on the rep side. Results grid (`1.2fr 1.4fr 0.8fr 0.8fr 1fr`) gives the Action column ~68px for an "Approve & Pay" button with no truncation |
| Messages.jsx | **BROKEN** | Same shared `MessageCenter.jsx` as closer |

## Shared component — `MessageCenter.jsx`

Used by **all three** roles' `/messages` routes (rep, closer, admin) — a single fix here has 3x leverage. **BROKEN**: conversation list is a fixed `width:280` column with no mobile collapse; combined with a phone's ~375-390px full-bleed width (Messages routes skip the usual `p-6` container), the thread pane is squeezed into a ~95-110px sliver. The right-hand `ContactPanel` is already correctly handled (`hidden lg:flex`) — only the list/thread split needs work.

## Priority for the build phase

**Fix now (real bugs — clipped or unreachable content):**
1. `MessageCenter.jsx` — highest leverage, fixes rep+closer+admin at once
2. `CallLeads.jsx`, `CloserScript.jsx`, `RevenueTracker.jsx` (DealsSection) — closer
3. `Overview.jsx`, `Users.jsx`, `Commissions.jsx`, `Payouts.jsx`, `LeadScraper.jsx` — admin

**Fix if time allows (cramped, not broken — cheap wins):**
- `MyAppointments.jsx`, `RepAnalytics.jsx`, `RepPerformance.jsx`, `LeadSources.jsx` KPI/stat grids — mostly a one-line `flexWrap`/`md:grid-cols-N` addition matching the already-correct sibling pages
- `LeadPipeline.jsx` search input width
- `CloserPipeline.jsx` `QueueTable` — already functions via horizontal scroll, lowest priority

## Related
[[North Star]] · [[Memories]] · [[Prompt 292 Mobile Screenshot Audit]]
