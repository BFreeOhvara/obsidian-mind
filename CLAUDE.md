# Ohvara Vault

External brain for **Ohvara** — SMB automation business. This file loads on top of the global `~/.claude/CLAUDE.md` when Claude Code is run from this vault.

## Session Start

1. Read [[North Star]] — current phase, packages, team, commission, rules
2. Read [[Memories]] — hard-won lessons, never repeat a logged mistake
3. Read [[DESIGN]] if touching any UI
4. State what's relevant before writing code

## Session End

1. Append entry to [[Memories]] Session Log: date, task, what broke, root cause, fix, lesson, status
2. Update [[work/Ohvara]] index if new notes were created
3. Never end without logging — partial logs beat no logs

## Rules

- Never ask Brayden to run commands manually
- Never hardcode colors — use design tokens from [[DESIGN]]
- Never duplicate leads in the database
- Never hardcode any dialer assumption
- Generate TWO Stripe links on close: setup fee link + monthly subscription link
- AI scripts are question-based and pain-surfacing — never a pitch on the rep call
- All reps and Nate on Profile A only until second closer confirmed
- Setup fee ($497) always presented as one-time, separate from monthly
- Log every mistake — mistakes written down don't repeat
- All monetary values in JetBrains Mono

## Packages

| Package | Setup Fee | Monthly |
|---------|-----------|---------|
| Basic | $497 | $497/mo |
| Pro | $497 | $797/mo |
| Premium | $497 | $1,297/mo |
| Elite | $497 | $1,797/mo |

ROI anchor: always compare to cost of a human hire, not to competitors.

## Infrastructure

| Item | Value |
|------|-------|
| Supabase | `jjextitmbptoaolacocs.supabase.co` |
| Dashboard | `ohvara-dashboard.vercel.app` |
| GitHub | `BFreeOhvara` |
| Repos | `ohvara-dashboard`, `Scraper`, `obsidian-mind` |

Credentials and API keys live in `.env.local` per repo — **never hardcode**.

## Skills

All project skills in `skills/`. Browse [[skills/Index]] before building. Keep under 30 total.

## Memory

All memories in `brain/`. Never create memory files in `~/.claude/projects/.../memory/` beyond the auto-generated MEMORY.md index.

---

[[North Star]] · [[Memories]] · [[DESIGN]] · [[work/Ohvara]] · [[skills/Index]]
