---
date: 2026-06-11
description: "Dynamic stack pricing — same four price points, tier contents built per-lead by recommend-stack from the lead signal; park until 5+ recurring clients"
tags:
  - brain
  - strategy
status: proposed
quarter: Q2-2026
---

# Dynamic Stack Pricing — Strategy Idea (2026-06-11)

## The Idea
Same four price points ($497 / $797 / $1,297 / $1,797/mo + $497 setup), but the CONTENTS of each tier are dynamic — determined by what the specific business actually needs, not a hardcoded list.

The AI (recommend-stack) looks at the lead signal and builds the right product combination for that business, then prices it to the nearest tier.

## Examples
- No-website Maps lead → $497 = Website + Missed Call Text Back
- Indeed receptionist lead → $497 = AI Receptionist + Missed Call Text Back
- Low-review Maps lead → $497 = Review Generation + Missed Call Text Back
- Same price, different contents, both solving the actual pain

## Why It's Better
- Stronger sales conversation: "Here's exactly what I'd put together for you" instead of "Here's our Basic plan"
- Every lead gets a tailored stack — nothing irrelevant pitched, nothing useful left out
- Natural upsell path: as more problems surface, more products get added, price moves up organically
- Three distinct entry points: (1) no website, (2) low reviews, (3) hiring for a human AI can replace

## Current State
- recommend-stack edge function currently has hardcoded tier contents
- Next step (Phase 1 complete first): update recommend-stack to output dynamic product combinations based on lead signal, priced to nearest tier
- The four price points stay locked — only the contents flex

## When to Build
After the sales machine is running and we have real call data showing which entry points convert best. Build the dynamic stack around what actually closes, not assumptions.

## Status
Proposed. Park until 5+ recurring clients.

## Related

- [[North Star]] — the four locked price points this flexes within
- [[review-agent-leads]] — sibling strategy; low-review entry point feeds this
- [[ohvara-dashboard]] — recommend-stack current hardcoded state
- [[Memories]] — session log for this capture
