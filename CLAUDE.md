# Ohvara Vault

External brain for **Ohvara** — SMB automation business. This file loads on top of the global `~/.claude/CLAUDE.md` when Claude Code is run from this vault.

## Identity

- This vault is named **Atlas** — the shared memory all Claude instances plug into
- This instance is **Eagle** if on claude.ai account 2 (new Pro account), or **Falcon** if on claude.ai account 1 (original account)
- Workflow: work with Eagle or Falcon → session writes back to Atlas → other instance picks up seamlessly

## Session Start

1. Read [[LIVE_STATE]] "Next Up for CC" FIRST — if non-empty, that's the live task queue from Eagle/Falcon; execute top to bottom, delete each item when done, log to [[Memories]]
2. Read [[North Star]] and [[Memories]] before every session — never repeat a logged mistake
3. Read [[DESIGN]] before touching any UI
4. Load all skills from the `skills/` folder ([[skills/Index]])
5. Follow all rules in [[North Star]] section "Rules Claude Always Follows"
6. State what's relevant before writing code

### Token Awareness Check
When the conversation reaches 15+ exchanges or 3+ distinct topics, warn Brayden with:
"We're getting close to context limit — say wrap up when ready and I'll write everything to Atlas and give you your resume prompt for the next chat."

## Session End

1. Append a session log entry to [[Memories]] on every wrap up: date, topics, decisions, current state, blockers, resume prompt
2. Update [[ohvara-dashboard]] brain doc if any dashboard code changed
3. Never end without logging — partial logs beat no logs

### Auto-Handoff (runs when session is long OR switching chats)
Before closing any session that covered 3+ topics OR when Brayden says "new chat":
1. Write handoff entry to [[Memories]] with exact resume prompt
2. Commit and push vault
3. Tell Brayden: "Handoff saved. Start new chat and paste: `Read brain/Memories.md and North Star.md — continuing Ohvara work`"

## Token Efficiency Rules

- Answer first, explain only if needed
- No filler phrases or restating what Brayden said
- Create files for anything over 50 lines — never paste in chat
- Keep confirmations to one line
- Never summarize decisions back to Brayden — he knows
- Compress output, never reasoning — terse replies, full rigor in thinking (brevity improves accuracy, not just cost)
- Commit subjects: terse and conventional, ≤50 chars

### Minimal chat narration (added 2026-06-19)

**CC is the builder, not the reporter.** Brayden reads updates from Eagle/Falcon (who read Atlas), not from CC's own chat output. So CC should run as silently as the tooling allows:

- Don't narrate steps in chat ("Let me check...", "Now I'll...", running commentary on what's being read/tried) — just do the work
- No play-by-play of recon/debugging in chat — that detail belongs in the Memories.md log entry, not the conversation
- End-of-task chat output should be minimal-to-none beyond what's needed to log + queue-clear — the real report lives in Memories.md/LIVE_STATE, which Eagle/Falcon will read and relay
- This does not relax the logging requirement — if anything it shifts detail OUT of chat and INTO the Atlas log, since that's the channel that actually gets read
- Exception: surface immediately in chat (don't bury it) anything that blocks progress and needs a human decision right now (missing secret, destructive action, genuine ambiguity) — silence is for routine work, not for stuck points

## Code Discipline

_Adopted from ruvnet/ruflo CLAUDE.md (generic principles only — its swarm/tooling content doesn't apply here)._

- Do what has been asked — nothing more, nothing less
- Prefer editing existing files over creating new ones; never proactively create documentation files unless asked
- Read a file before editing it
- Never commit secrets or credentials
- Batch independent operations in one message — parallel tool calls, not sequential round-trips
- Use the cheapest model that does the job (Haiku for simple/high-volume tasks, Sonnet/Opus for complex work) — same rule that took rep scripts to claude-haiku-4-5
- **Self-flag model upgrades (added 2026-06-19):** default is Sonnet. If you (CC) hit one of these mid-task — stuck/wrong on the same thing twice, a genuinely ambiguous design tradeoff (not just executing a spec), or subtle debugging Sonnet keeps missing — stop and surface it in chat: `⚠️ This looks like an Opus-tier problem: {one line why}. Switch model and resume?` Treat this like the blocker exception to minimal-narration — don't silently grind on Sonnet, and don't switch yourself (you can't); just flag it and wait.

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

[[North Star]] · [[Memories]] · [[DESIGN]] · [[LIVE_STATE]] · [[skills/Index]]
