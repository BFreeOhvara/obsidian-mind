# Atlas Vault — Two Verticals

This vault hosts **two independent businesses**: **Ohvara** (below, rooted at `brain/`) and **Restorix** (`restorix/`, AI infrastructure for behavioral health treatment centers). Same operator (Brayden), same vault for shared tooling/conventions, otherwise unconnected — Restorix has its own current-state doc, memory log, and goals file, and never needs Ohvara's.

## Manager Chat Identity & Logging (shared — applies to every session, both verticals)

- This vault is named **Atlas** — the shared memory every Claude instance plugs into, regardless of vertical or account.
- A conversational/manager session (as opposed to CC, the builder that executes queued work against the real codebase) is **Eagle** if on claude.ai account 2 (the newer Pro account), or **Falcon** if on claude.ai account 1 (the original account).
- Workflow: Brayden works with Eagle or Falcon → the session writes back to Atlas as it goes → the other instance (or CC) picks up seamlessly, with **zero manual "save this chat" step from Brayden.**
- **Log continuously, not just at session end.** The moment something important is decided, queued, built, fixed, or learned during a manager chat, write it into the relevant vertical's files right then — don't batch it for a "wrap up" moment, and don't wait for Brayden to ask. If he switches instances (Eagle ↔ Falcon) or opens a fresh chat mid-conversation, everything material that's happened so far should already be sitting in Atlas.
  - Restorix: queue items → [[Restorix CC Queue]], current state → [[Restorix LIVE_STATE]], decisions/context/history → [[Restorix Memories]]
  - Ohvara: queue items → [[LIVE_STATE]], decisions/context/history → [[Memories]]
- **"Important" enough to log right away** = anything a fresh instance picking this up cold would need to not have to ask Brayden to repeat: a new standing rule, a scoping decision, a bug's confirmed root cause, a queued build spec, a clarified requirement, a piece of state that changed. Routine back-and-forth (clarifying questions, "yes that's right," small talk) doesn't need its own entry.
- End-of-session logging (in the vertical-specific sections below) is a backstop/final summary on top of this, not a substitute for it — most of what belongs in Atlas should already be there well before a session ends.

### Reaching Atlas safely (manager/Cowork chats — added 2026-09-01 after a stale-clone incident)

- **Reach Atlas through the connected local folder, never a clone.** A Cowork session normally has the live vault folder `C:\Users\freem\obsidian-mind` attached directly — the same path CC uses — so reads and writes hit the real files immediately, no `git` involved. Confirm it's attached at the start of every session. Do **not** `git clone` the vault into a sandbox and work from that copy: a clone is a frozen snapshot that goes stale the moment it's made, and its writes never reach the real files (the `git push` back is deliberately not authorized from sandboxes). If the local folder is not attached to a given session, **stop and tell Brayden** — do not fall back to a clone.
- **Verify every Atlas write actually landed.** After writing a queue item or a Memories/LIVE_STATE entry, re-read that file from disk and confirm the exact text is present before reporting it done. An unverified write may not have happened, or may have gone to the wrong copy of the file.
- **Prompt numbers have one source of truth: the real files on disk.** The next number is one past the highest referenced in `Restorix LIVE_STATE.md` + `Restorix Memories.md` (or Ohvara's `LIVE_STATE.md` + `Memories.md`). Never privately reserve a number in a working copy or in a chat — a number is not taken until it is written into the real queue file.
- **Ownership split, to avoid clobbering shared files:** manager/Cowork chats write **queue items** (Restorix → [[Restorix CC Queue]]; Ohvara → the "Next Up for CC" section of [[LIVE_STATE]]); CC writes the **"shipped" logs and current-state**. Don't both edit the same file in the same window.

**Before doing anything else, determine which vertical the session's request is about.** If it's Restorix (or genuinely ambiguous), stop reading here and read `restorix/CLAUDE.md` instead — everything below this point (Session Start/End, Pricing, Infrastructure, Rules) is Ohvara-specific and does not apply to Restorix work; the Manager Chat Identity & Logging rule above still applies regardless. If it's Ohvara, continue below as normal.

# Ohvara Vault

External brain for **Ohvara** — SMB automation business turned inbound insurance operation (see [[North Star]] for the pivot). This file loads on top of the global `~/.claude/CLAUDE.md` when Claude Code is run from this vault.

## Identity

See "Manager Chat Identity & Logging" at the top of this file (shared across both verticals) — Atlas/Eagle/Falcon naming and the continuous-logging rule both apply here unchanged.

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

## Session End (backstop — most of this should already be in [[Memories]] per the continuous-logging rule above)

1. Append a final session summary entry to [[Memories]] on every wrap up: date, topics, decisions, current state, blockers, resume prompt
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
- Setup fee ($297) always presented as one-time, separate from monthly
- Log every mistake — mistakes written down don't repeat
- All monetary values in JetBrains Mono

## Pricing (custom stack, no fixed packages — 2026-06-20)

Setup fee: $297 flat. Monthly: formula-priced (value-based) — `callsMissedPerWeek × 4.33 × avgTicket × 0.15`, floor $399, ceiling $1,999, rounded to nearest value ending in 99. Target average: ~$1,200/mo. Automations are AI-generated per lead, structured as 1-2 front-runner agents (solve core problem) + 1-5 sub-agents (complement front-runners), no fixed catalog. Full detail + commission math: [[North Star]] "Custom Stack Pricing" + "Commission Structure".

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
