---
date: 2026-06-07
description: "Auto-capture significant decisions, lessons, and context at session end — never wait to be asked"
tags:
  - skill
  - memory
  - brain
status: active
---

# Skill: Auto Knowledge Capture

**Category:** Memory / Brain
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Monitors every session for significant new information and automatically logs it to the brain. Claude never waits to be asked — if something important was decided, learned, or discovered, it captures it before the session ends.

## When to Trigger This Skill

Automatically run at the **END of every session, no exceptions**. Also trigger mid-session if ANY of these conditions are met:

### Trigger Conditions

- 3+ business decisions made in one conversation
- A price, package, or product detail was finalized
- A team structure or role changed
- A new niche, market, or strategy was defined
- A technical pattern was discovered that took more than one attempt
- A bug was fixed that could recur
- A new tool, API, or integration was discussed
- A process or workflow was defined or changed
- Brayden expressed a strong preference about how something should work
- Something was explicitly ruled OUT (e.g. "we're not doing X")

---

## The Capture Process

### Step 1 — Scan the conversation

Before closing any session, mentally scan what happened:

```
- What decisions were made?
- What was finalized that wasn't before?
- What changed from what the brain previously knew?
- What was ruled out or eliminated?
- What new context exists about the business, team, or product?
- What technical lessons were learned?
```

### Step 2 — Classify each piece

```
BUSINESS CONTEXT    → brain/North Star.md
TECHNICAL LESSON    → brain/Memories.md + relevant skill file
NEW SKILL PATTERN   → skills/[skill-name].md
TEAM/PROCESS CHANGE → brain/North Star.md
PRODUCT/PRICING     → brain/North Star.md + stripe-payment-links skill
RULED OUT           → brain/Memories.md (prevents re-suggesting bad ideas)
```

### Step 3 — Write the capture entry

Append to `brain/Memories.md`:

```markdown
## [DATE] | Auto-Captured — [Session Topic]
**Trigger:** [What triggered — e.g. "5 business decisions made"]
**New context:**
- [Decision 1]
- [Decision 2]
- [Decision 3]
**Ruled out:**
- [Thing explicitly decided against + why]
**Files updated:** [list]
```

### Step 4 — Update relevant source files

Don't just log to Memories — update the actual source-of-truth files:

- Pricing changed → update North Star AND stripe-payment-links skill
- Process changed → update North Star
- Technical pattern → update or create skill file
- Ruled out → add to Memories AND add "never do this" to CLAUDE.md if technical

---

## Self-Check Checklist (run before closing EVERY session)

```
□ Were any prices, packages, or products discussed?          → capture
□ Were any team roles or structures discussed?               → capture
□ Was anything ruled out or decided against?                 → capture
□ Was a new technical pattern used or discovered?            → capture + skill file
□ Were 3+ decisions made?                                    → capture all
□ Did Brayden express a strong preference?                   → capture
□ Did anything change from what North Star currently says?   → update North Star
```

**If ANY box is checked → run capture before closing.**
**If NO boxes checked → safe to close without capture.**

---

## Sensitivity Thresholds

### Always capture

- Any finalized price, package, or product decision
- Any team structure change
- Any explicit "we're not doing X" decision
- Any technical bug fix that could recur
- Any new niche, market, or strategy focus

### Capture if significant

- UI, tone, or style preferences expressed
- Workflows discussed but not yet built
- Ideas explored but not committed to

### Never capture

- Casual conversation with no decisions
- Questions asked but not answered
- Hypotheticals not committed to

---

## Example Entry

```markdown
## 2026-06-07 | Auto-Captured — Packages + Team Structure
**Trigger:** 8+ business decisions made
**New context:**
- Basic $497/mo, Pro $797/mo, Premium $1,297/mo, Elite $1,797/mo
- $497 one-time setup fee on every package
- One confirmed closer: Nate. Jordan on standby.
- All reps work Profile A (trades) only
- Rep commission: $150–$250 per close
- Niche strategy: language profiles, not specific niches
**Ruled out:**
- Elite at $1,997 — crosses $2K psychological barrier
- Elite at $1,597 — too close to Premium, weakens upsell
- Locking to specific niches — language profiles are the right frame
**Files updated:** North Star.md, Memories.md, rep-call-script.md, stripe-payment-links.md
```

---

## Gotchas

- Don't wait to be asked — capture proactively
- Update actual source files, not just Memories
- "Ruled out" decisions are as important as "decided" ones
- If unsure whether something is significant → **capture it anyway**. Storage is cheap. Re-explaining is expensive.

## Related

- [[North Star]] — primary source-of-truth for business context
- [[Memories]] — session log and hard-won lessons
- [[stripe-payment-links]] — pricing source file
- [[rep-call-script]] — sales process source file

## Verified Working

2026-06-07 — Initialized for Ohvara brain
