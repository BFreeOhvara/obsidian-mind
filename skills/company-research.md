---
name: company-research
description: Company research using Exa search. Finds company info, competitors, news, financials, LinkedIn profiles, builds company lists. Use when researching companies or prospects, doing competitor analysis, market research, or building company lists.
context: fork
---

# Company Research

## Tool Restriction (Critical)
ONLY use `web_search_advanced_exa`. Do NOT use `web_search_exa` or any other Exa tools.

## Token Isolation (Critical)
Never run Exa searches in main context. Always spawn Task agents:
- Agent runs Exa search internally
- Agent processes results using LLM intelligence
- Agent returns only distilled output (compact JSON or brief markdown)
- Main context stays clean regardless of search volume

## Dynamic Tuning
No hardcoded numResults. Tune to user intent:
- "a few" → 10-20 · "comprehensive" → 50-100 · specified number → match it · ambiguous → ask

## Query Variation
Generate 2-3 query variations, run in parallel, merge and deduplicate.

## Categories
- `company` → homepages, rich metadata (headcount, location, funding, revenue)
- `news` → press coverage, announcements
- `people` → LinkedIn profiles (public data)
- No category (`type: "auto"`) → general web results, deep dives

Start with `category: "company"` for discovery, then other categories for deeper research.

### Category-Specific Filter Restrictions
With `category: "company"`, these cause 400 errors: includeDomains/excludeDomains, startPublishedDate/endPublishedDate, startCrawlDate/endCrawlDate.
Without a category (or with `news`), domain and date filters work fine.
Universal: `includeText` and `excludeText` only support single-item arrays.

## LinkedIn
Public LinkedIn via Exa: `category: "people"`, no other filters. Auth-required LinkedIn → Claude in Chrome browser fallback.

## Browser Fallback
Fall back to Claude in Chrome when Exa returns insufficient results, content is auth-gated, or pages need JavaScript.

## Output Format
1) Results (structured list; one company per row)
2) Sources (URLs; 1-line relevance each)
3) Notes (uncertainty/conflicts)
