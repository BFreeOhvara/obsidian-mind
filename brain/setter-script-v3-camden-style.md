---
date: 2026-07-03
description: "Setter script v3 — SHIPPED live 2026-07-03 (Prompt 205, `b4d9cf3`). v3.1 warm-lead opener patch SHIPPED 2026-07-03 (Prompt 209, `8df9bfa`). v3.2 pain-math/job-title/hedge patch SHIPPED 2026-07-04 (Prompt 210, `a21cd6b`). v3.3 intro-recovery/indeed-hook/qualifier patch + calls_missed_per_week x5 SHIPPED 2026-07-04 (Prompt 211, `7190ac2` + `fce1857`). v3.4 transferring option/qualifier trim/handoff+pitch rewrite SHIPPED 2026-07-04 (Prompt 212, `55f0564`)."
tags:
  - brain
  - setter
  - sales-script
  - shipped
---

# Setter Script v3 — Camden Cash, Near-Verbatim

> **Status: SHIPPED live in `discoveryScript.js` (Prompt 205, `b4d9cf3`).** Source: [[setter-transcripts-camden-cash]] (full transcript — no second Camden video available). Every SAY line has a `[from: "..."]` tag showing its exact source quote. Fork options are tagged `[GOOD]` / `[HESITANT]` / `[BAD]` matching `CATEGORY_COLORS` in `discoveryScript.js`.
>
> **✅ v3.1 PATCH SHIPPED 2026-07-03 (Prompt 209, `8df9bfa`).** Brayden's 07-03 follow-up: the opener still read like a blind cold call ("just happened to notice, nothing to sell you"), but Ohvara's setters aren't cold-calling — the business already told the world it has a coverage gap by posting the job. Camden has no equivalent video (no cold-caller targets businesses actively hiring for the exact role being pitched), so this section departs from pure verbatim on purpose. Confirmed specifically via the qualifier line — Brayden wanted the binary yes/no kept but felt "Do you want to stop missing calls — yes or no?" was pushy; this patch's qualifier ("Are missed calls part of why you're posting for this role? Yes or no?") resolves that too. See "v3.1 — Warm-Lead Opener" below; Sections 2-5 are unchanged. **One shipped deviation from this doc:** the hook's self-introduction uses the existing `[Rep Name]` token, not this doc's `[First Name]` — `[First Name]` was never wired into `discoveryScript.js`'s `fillTokens()`, so using it verbatim would have shipped a literal unfilled placeholder into a live script.

**Tagging rule applied below:** sentiment forks (how the prospect responded to a question) get `[GOOD]`/`[HESITANT]`/`[BAD]` tags. Pure routing forks (who picked up the phone, was it transferred) are left untagged — they're not a sentiment signal, just a path split.

---

## ✅ v3.2 PATCH SHIPPED 2026-07-04 (Prompt 210, `a21cd6b`) — pain-math formula change, job-title token, trimmed vitals hedge

Three changes from Brayden's live-review-with-a-real-lead session, all shipped.

**1. Pain-math formula changed.** `[monthly]`/`[annual]` in `ScriptWalk.jsx`'s `renderText()` now compute as `monthly = daily_missed × 5 × 4 × ticket`, `annual = monthly × 12` — replacing the old `weekly_missed(×7) × 4.33 × ticket`. Verified: 3 missed/day × $250 ticket → $15,000/mo, $180,000/yr exactly.

**RESOLVED 2026-07-04 (Prompt 211, `fce1857`):** `calls_missed_per_week` now computes as `daily_missed × 5`, matching the pain-math's workweek basis — Brayden's explicit call, made when asked directly. See "v3.3" below.

**2. `[job title]` token shipped**, replacing the `[receptionist / dispatcher / front desk]` placeholder-list. Confirmed field: `leads.posting_title` (migration 027, populated by the `indeed-scraper` edge function from the real Indeed posting headline) — not `job_title` (migration 003, a separate field used for `stackRecommendation.js` labor-cost math). Falls back to "front desk role" for leads with no posting (Maps-sourced). **Still open, not resolved:** Maps-sourced leads have no real hiring signal at all — the whole warm-lead opener premise (v3.1) doesn't strictly apply to them. Worth a future pass to check current lead-source mix and possibly branch the opener by source.

**3. Vitals opener hedge trimmed** to: *"Out of curiosity — how many calls do you think you get in a month?"*

---

## ✅ v3.3 PATCH SHIPPED 2026-07-04 (Prompt 211, `7190ac2` + `fce1857`) — recovery branch on "no", indeed-hook reverted to neutral, qualifier smoothed, calls_missed_per_week × 5

Brayden reviewed three Practice screens live (Opener's `intro`, `indeed-hook`, `qualifier`) and wanted all three adjusted, plus a 4th item (the `calls_missed_per_week` pricing-formula question Prompt 210 had left open) resolved mid-session. All four shipped in `ohvara-dashboard`.

**1. `intro` needs a real "No" branch — currently only "Yeah/speaking" and "Transferred" exist.** Prompt 204 dropped a "wrong number" option as a non-branch, but Brayden now wants a recovery sequence instead of just assuming it's self-evident:

**Node: intro** *(add third option)*
SAY: "Hey, is this [Business Name]?"
→ "Yeah / speaking" → **node: indeed-hook**
→ "Transferred" → **node: transferred**
→ "No" *(NEW)* → **node: intro-recovery**

**Node: intro-recovery** *(NEW)*
SAY: "Okay — were you hiring for a [job title]?"
→ confirms / engages → **node: intro-recovery-check**
→ genuinely wrong number/business → END

**Node: intro-recovery-check** *(NEW)*
SAY: "Are you actively looking to hire for that?"
→ "Yes" → **node: indeed-hook**
→ "No, not interested" → END (Set status Not Interested)

**2. `indeed-hook` reverts to a neutral "who should I speak to" ask — drop the diagnostic framing.** Brayden's reasoning: we shouldn't imply anything about their situation ("that usually means calls are slipping somewhere...") until we actually know we're talking to the decision-maker — that diagnostic belongs after confirmation, not before.

**Node: indeed-hook** *(REVERT toward original wording, now using the real `[job title]` token from Prompt 210 instead of a bracketed list)*
SAY: "Hey — I saw you were hiring for a [job title]. I was wondering who I should speak to about that."
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

*(Not changed, flagging as an open question rather than deciding: `transferred`'s SAY line still has the "that's usually a sign calls are slipping" diagnostic clause — arguably fine there since by definition we've been routed to the actual decision-maker at that point, but worth Brayden's explicit call on whether it should match `indeed-hook`'s new neutral tone for consistency.)*

**3. `qualifier` wording smoothed — drop the "yes or no?" tag, make it read as a natural either/or.** This is a deliberate refinement OVER the earlier explicit "keep it binary yes/no" instruction from the v3.1 patch — noting the change of direction rather than silently treating it as the same ask.

**Node: qualifier** *(reworded, same 3 fork options/targets unchanged)*
SAY: "Quick question — are missed calls part of the reason you're posting for this role, or are you just growing or something like that?"
→ `[GOOD]` "Yeah" → SECTION 2
→ `[HESITANT]` "Kind of / it's part of it" → SECTION 2
→ `[BAD]` "No, we've got it covered, just growing" → **node: on-top-of-it-check**

**4. `calls_missed_per_week` capture multiplier changed `× 7` → `× 5`.** Added mid-session as a resolved (not proposed) item, once Brayden asked Falcon directly for a recommendation on the question Prompt 210 had left pending. Falcon's call: ×5, for consistency (the script now speaks a pain number on a 5-day basis) and defensibility (most Ohvara niches don't run a full 7-day call week). Implemented in `discoveryScript.js`'s Vitals `captures` config — same `capture.multiplier` mechanism Prompt 204 built, just the constant changed. `recommend-stack` needed no code change — it only consumes the value.

---

## ✅ v3.4 PATCH SHIPPED 2026-07-04 (Prompt 212, `55f0564`) — transferring option on indeed-hook, trim qualifier tail, cut "based on your pain" line, tailor the pitch

Brayden walked four more Practice screens live, all shipped. Item 4 (the pitch rewrite) was confirmed with Brayden directly before building, per its own flag below.

**1. Add a "Transferring" option to `indeed-hook`'s fork.** Currently only two options exist ("That's me" / "What's this about?"). Add a third — functionally identical to "That's me," same target, since being told "let me transfer you" at this point in the call doesn't change the next line once actually connected:

**Node: indeed-hook** *(add third option, same target as "That's me")*
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[GOOD]` "Transferring" *(NEW)* → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**2. Trim `qualifier`'s SAY line — the doc's "or something like that" tail was Brayden talking to Falcon, not intended script text.**
SAY: "Quick question — are missed calls part of the reason you're posting for this role, or are you just growing?" *(ends at "growing" — no tail)*

**3. Cut "and I do this based on you and your pain" from `handoff-bridge`, smooth "service businesses" → "businesses just like yours."**
SAY: "I don't want to waste your time here. I have a team that works with businesses just like yours. If you're missing [their number] calls a day and your average client's worth [$ticket], that's $[annual] you're leaving on the table every year from calls that just don't get picked up."

**4. Add a tailored/personal framing to `pitch-receptionist`** — Brayden's ask: keep what's already there (he likes it), just make it feel built specifically around the fact they're hiring for this exact role, not a generic pitch. Explicitly rejected the obvious lazy version ("yeah, we fix your issue" — too open-ended/boring). Proposed opening reframe, rest unchanged:
SAY: "Basically, instead of filling this role with a person, we'd build you an AI receptionist made for exactly this — not some robot press-one thing, a real human feel, we can even make it your voice — it catches the calls you'd otherwise miss, does missed-call text-back, answers questions, and books appointments straight to your calendar. All you'd have to do is show up to the meeting — and it means you might not even need to finish out this hire the way you'd planned."
*(This is a creative-judgment rewrite, not a mechanical edit — Brayden should react to the exact wording before CC builds it, same as any content proposal in this doc.)*

---

## v3.5 SHIPPED 2026-07-05 (`a5941da`) — smooth the bridge→pitch transition, cut the robot/voice aside

Brayden reviewed the shipped bridge+pitch merged screen live and dictated a rewrite: drop "Basically," as the opener (doesn't flow off `handoff-bridge`'s "Here's what I'd do for you:"), cut "not some robot press-one thing, a real human feel, we can even make it your voice" entirely, and swap "an AI receptionist" for plainer "a system" language — his words: "we build a tailored system, a call answering system, whatever, made exactly for this... we don't really have to explain the product that much if it solves their problem." Feature list (missed-call text-back / answers questions / books appointments) and the closing "might not even need to finish out this hire" line are untouched — he didn't flag those.

**Node: pitch-receptionist** *(reworded opening only; feature list and closer unchanged)*
SAY: "instead of filling this role with a person, we'd build you a system made exactly for this — it catches the calls you'd otherwise miss, does missed-call text-back, answers questions, and books appointments straight to your calendar. All you'd have to do is show up to the meeting — and it means you might not even need to finish out this hire the way you'd planned."

---

## v3.6 SHIPPED 2026-07-05 (`0063f68`) — trim `time-ask`'s worst-case/best-case line

Brayden reviewed the live `time-ask` screen and wants it tightened: keep "worst-case/best-case" framing, add "actually" to the worst-case clause, and replace "shows you exactly how you're leaving money on the table and how to fix it" with punchier "plug this money hole" language (his "and something like that, you know what I mean" read as him handing off the exact phrasing, not dictating it verbatim).

**Node: time-ask** *(SAY line only — fork options below it unchanged)*
SAY: "Take 15 minutes. Worst-case scenario, you get to see what it actually looks like and stop wasting your time. Best-case scenario, our team shows you exactly how to plug this money hole. How's that sound? [Tuesday morning] or [Wednesday afternoon]?"

*(Cut "and how to fix it" — redundant once "plug this money hole" carries the fix implication. Fork options and routing untouched.)*

---

## v3.7 — architecture note: when a plain "Next" is legitimate vs. not (2026-07-05, Falcon, undoes part of v3-era Prompt 215)

Brayden articulated a general rule that overrides Prompt 215's earlier length-based screen split for Handoff: a plain "Next" (no fork) only belongs at a genuine capture/pause point — where the setter is actually waiting on and recording a real prospect answer (Vitals' 3 numeric captures, the phone-number ask). It does NOT belong as a pacing break between two lines of pure monologue where no prospect response is expected at all. If nothing the prospect could say would change anything at that junction, don't stop — keep it one continuous flow until the point where a response is genuinely expected.

Applied: Handoff's `bridge` → `pitch-receptionist` → `time-ask` is pure monologue until `time-ask`'s real fork. Prompt 215's 2-screen split (bridge+pitch ending in a plain Next, then time-ask+fork) was a pacing choice, not a correctness one — per this rule it's wrong, and Prompt 220 undoes it: the whole chain merges into one screen ending directly in the real fork. Pain's 2-line chain is unaffected (already correctly one screen ending in its own fork).

**Use this rule going forward for any new script content:** a plain Next is a smell unless it's sitting on a real capture point. If a merged chain ends in a plain Next, ask whether the prospect was actually expected to say something there — if not, keep extending the block until it hits the real decision point.

---

## v3.8 PATCH SHIPPED 2026-07-05 (Prompt 221, `a3d2ced`) — tighten the whole Handoff monologue; split the day-offer back into its own beat after a real response

Brayden reviewed the now-merged Handoff screen live: likes the feel, but wants the monologue itself shortened without losing energy, plus stronger word choices, and — despite the "no Next without an expected response" rule just established — wants a real pause inserted after "How's that sound?" before naming specific days. That's not a contradiction of v3.7: it's a genuine fork (the prospect actually responds — "Good," or an objection), not a bare pacing Next. Naming "[Tuesday morning] or [Wednesday afternoon]" only after they've shown interest is more natural than rattling off two specific times before they've said anything.

**Changes, in order:**
1. **Opening tightened, stronger lingo.** Cut "Like I said —" filler; swapped "you're leaving on the table" → "slipping through the cracks" per Brayden's explicit ask for punchier language over Camden's original "leaving on the table" phrasing. Dropped the restated "just from calls that don't get picked up" — already established earlier in Pain, redundant here (Brayden: "you maybe don't even need to say that").
2. **Cut "does missed-call text-back."** Brayden flagged the internal contradiction: the line already claims the system "catches the calls you'd otherwise miss," so following it with "does missed-call text-back" implies calls still get missed. Dropped rather than reworded — the capability still exists and setters can mention it live if asked, it just doesn't need to be in the base pitch.
3. **Cut the closing "...and it means you might not even need to finish out this hire the way you'd planned."** Brayden voiced explicit doubt about this line ("I don't know if I like that line as much") — combined with the shortening goal, cutting it. *(Flagging this specific cut for confirmation — it's the one change here that isn't a direct instruction, just a read on his hesitation. Easy to restore if he wants it back.)*
4. **Time-ask trimmed further**, same worst-case/best-case shape, shorter phrasing.
5. **Day-offer split out of the monologue into its own follow-up node**, gated behind a real fork on "How's that sound?" — mirrors the exact pattern already used for the "Who is this?" objection fix (Prompt 218): a `[GOOD]` response leads to a short "does [day] or [day] work best" ask with its own Picks-a-time/Still-hesitant fork, rather than naming both days cold.

**Node: handoff-bridge + pitch-receptionist + time-ask** *(merged block, replacing the current Prompt 220 merge)*
SAY: "Look, I don't want to waste your time — that's $[annual] a year slipping through the cracks. So instead of filling this role, we'll build you a system made exactly for this — it catches the calls you'd otherwise miss, answers questions, and books appointments straight to your calendar. All you have to do is show up. Take 15 minutes — worst case, you see exactly what it looks like. Best case, we plug that money hole for you. How's that sound?"
→ `[GOOD]` "Good" / shows interest → **node: confirm-time** *(NEW)*
→ "Just send me some info" → existing `obj-send-info` path *(unchanged)*
→ "I don't have time this week" → existing path *(unchanged)*
→ "Who is this / what company?" → existing path *(unchanged)*
→ "How much does this cost?" → existing path *(unchanged)*

**Node: confirm-time** *(NEW — mirrors the "Who is this?" fix's sub-fork pattern from Prompt 218)*
SAY: "Good — so does [Tuesday morning] or [Wednesday afternoon] work best for you?"
→ `[GOOD]` picks a time → **node: confirm-number** *(same target `time-ask` already routed to)*
→ `[HESITANT]` still hesitant → Follow-Up status *(same fallback the other objection sub-forks use)*

**Confirmed by Brayden 2026-07-05, all four as drafted** — cut the "finish out this hire" closer, cut "does missed-call text-back," ship the day-offer split-fork structure, ship the monologue text as written. Queued to CC as Prompt 221.

Once merged with the unchanged `handoff-bridge` line (and once Prompt 216 lands, rendering as one continuous paragraph), the full screen reads:
"I don't want to waste your time here. Like I said — that's $[annual] a year you're leaving on the table just from calls that don't get picked up. Here's what I'd do for you: instead of filling this role with a person, we'd build you a system made exactly for this — it catches the calls you'd otherwise miss, does missed-call text-back, answers questions, and books appointments straight to your calendar. All you'd have to do is show up to the meeting — and it means you might not even need to finish out this hire the way you'd planned."

*(Creative-judgment call, flagging explicitly: swapped "an AI receptionist" for "a system" per Brayden's own wording. Tradeoff — "system" is vaguer than "AI receptionist," which is the actual product term used elsewhere in Training Center materials. If that ambiguity is a problem on live calls, easy to swap back to "an AI receptionist made exactly for this" while keeping everything else cut. Flagging for Brayden's sign-off before CC builds it, same as every prior pitch rewrite in this doc.)*

---

## v3.9 PATCH SHIPPED 2026-07-05 (Prompt 222, `8b5a9bb`) — remove "Transferred" from `intro`, fix the transfer buffer on `indeed-hook`, add a not-available option

Brayden reviewed `intro` and `indeed-hook` live and flagged three things:

**1. `intro`'s "Transferred" option doesn't make sense at this stage.** At "Hey, is this the business?" nobody has said why they're calling yet, so there's nothing to transfer *about* — that only makes sense one beat later, once the caller has stated their reason (`indeed-hook`). Remove it entirely; color-tag the remaining two.

**Node: intro** *(remove "Transferred," color-tag the rest)*
SAY: "Hey, is this [Business Name]?"
→ `[GOOD]` "Yeah / speaking" → **node: indeed-hook**
→ `[BAD]` "No" → **node: intro-recovery** *(unchanged, from v3.1)*

**2. `indeed-hook`'s "Transferring" option should be `[HESITANT]` (yellow), not `[GOOD]` (green).** Getting transferred isn't a clean "yes, that's me" — it's an in-between outcome, closer visually to a soft-maybe than a confirmed hit.

**3. `indeed-hook`'s "Transferring" shouldn't route straight to `qualifier` like Prompt 212 shipped it.** Brayden's catch: whoever picks up after a transfer wasn't on the line for the original hook — routing them straight into `qualifier` skips re-establishing why you're calling, which reads as jarring/repeats-itself to them even though the setter hasn't repeated anything (they just haven't heard it yet). Needs a buffer re-intro. Brayden dictated a version that folds the re-intro AND the qualifying question into one line (no separate "who should I speak to" needed, since a transferred contact already implicitly is the person to talk to) — Falcon's take: this is a good design, not just an acceptable one — it saves a full beat versus a generic buffer, keeps the disarming tone ("I don't know if you can help me"), and the folded qualifying question does double duty. Only edits made to Brayden's dictated wording: swapped in the real `[job title]` token (matches the rest of the script instead of hardcoding "receptionist") and cut the "or something like that" tail per the same cleanup precedent applied to `qualifier` in Prompt 212.

**4. Add a new `indeed-hook` option for "they're not here / I'll leave a message"** — a realistic outcome Brayden flagged as common, not currently handled at all. Kept minimal per this doc's standing pattern (no new pitch invented) — just enough to log a real follow-up rather than dead-ending.

**Node: indeed-hook** *(fork rebuilt: Transferring recolored + retargeted, new not-available option added)*
SAY: "Hey — I saw you were hiring for a [job title]. I was wondering who I should speak to about that."
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[HESITANT]` "Transferring" *(recolored from GOOD; retargeted)* → **node: transfer-reintro** *(NEW)*
→ `[HESITANT]` "They're not here right now / I'll leave a message" *(NEW)* → **node: not-available** *(NEW)*
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transfer-reintro** *(NEW — replaces Prompt 212's direct Transferring→qualifier shortcut)*
SAY: "Hey — I saw y'all were hiring for a [job title]. I don't know if you can help me, but are you guys missing calls? Is that part of why you're posting for the role?"
→ `[GOOD]` "Yeah" → SECTION 2 *(same target as `qualifier`'s GOOD option)*
→ `[HESITANT]` "Kind of / it's part of it" → SECTION 2
→ `[BAD]` "No, we've got it covered, just growing" → **node: on-top-of-it-check**

**Node: not-available** *(NEW)*
SAY: "No worries — is there a better time to try them, or should I just leave a quick message?"
→ gets a callback time / leaves message → log Follow-Up status, END *(no further pitch — nobody qualified to hear it is on the line)*

**Cleanup flag for CC:** the old standalone `transferred` node (SECTION 1, base v3 script — "Hey [Name] — yeah, I saw your Indeed listing...") was `intro`'s original "Transferred" target. Once "Transferred" is removed from `intro`, check whether anything else still routes to that node — if it's now unreachable, delete it rather than leave dead code, matching this project's standing cleanup discipline (same call made for the old standalone Objections section in Prompt 213).

*(Falcon's direct answer to Brayden's question: yes, I like the `transfer-reintro` line — ship it as dictated with just the `[job title]` token swap and tail trim above.)*

[[setter-transcripts-camden-cash]] · [[setter-script-v2-flow]] · [[ohvara-setter-discovery-script]] · [[LIVE_STATE]]

---

## Where this HAD to diverge from pure verbatim, and why

Four unavoidable adaptations — everything else is his actual wording:

1. **"Ring a bell?"** (Camden's name-drop swagger) only works because he's a known personal brand people can look up. An Ohvara setter has no public reputation to lean on, so this becomes a plain, confident name-state with no "ring a bell" bit.
2. **No client-count/CEO framing.** Camden says "I have over 37 clients," "I'm CEO," and personally closes his own calls — he IS the business owner. An Ohvara setter is not the closer and can't credibly claim those things. Replaced with "our team" framing, matching the standing no-closer-name rule.
3. **Indeed listing instead of "I saw your website/reviews."** Camden's hook is generic (blind Google Maps dial, no real reason to call). Ohvara setters have a genuinely better hook — the business is actively hiring for the exact role this fixes — so the Indeed listing replaces his generic opener. Everything downstream is otherwise his.
4. **No on-the-spot close/payment.** Camden sometimes negotiates price and collects money himself. Ohvara setters always book the 15-minute call — same close mechanic Camden uses for his second-tier prospects, just always the endpoint here.

---

## SECTION 1 — Opener (v3 as originally shipped Prompt 205 — SUPERSEDED live by the v3.1 patch below, Prompt 209)
*id: opener | color: var(--accent) | kind: opener*

**Node: intro** *(routing, no color tags)*
SAY: "Hey, is this [Business Name]?"
`[from: "Hey, is this [Business Name]?"]`
→ "Yeah / speaking" → **node: indeed-hook**
→ transferred → **node: transferred**

**Node: indeed-hook**
SAY: "Hey — I saw y'all had an Indeed listing up for a [receptionist / dispatcher / front desk]. I was wondering who I should speak to about that."
`[from: "Hey, no boss, I was just looking, like, do you guys have a Facebook or a Yelp or maybe a website, I could see your guys' stuff" — swapped his generic hook for Ohvara's real one, same "just looking/wondering" framing]`
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transferred** *(routing, no color tags)*
SAY: "Hey [Name] — yeah, I saw your Indeed listing for a [receptionist]. I don't want to waste your time, seriously — got a sec?"
`[from: "I don't want to waste your time, seriously" + "bro like how many calls do you think you get a month"]`
→ engages → **node: qualifier**
→ pushback → **node: disarm-early**

**Node: disarm-early**
SAY: "Nah, there's nothing to sell you, man — genuinely just a real quick question."
`[from: "Yeah, no, there's nothing to buy, man, I just happen to see you guys."]`
→ `[GOOD]` engages → **node: qualifier**
→ `[BAD]` still shuts it down → END (clean exit)

**Node: qualifier** — Camden's binary yes/no move
SAY: "Do you want to stop missing calls — yes or no?"
`[from: "Do you want to add three to five more clients a week? Yes or no?"]`
→ `[GOOD]` "Yeah" → SECTION 2
→ `[HESITANT]` "Depends" → SECTION 2
→ `[BAD]` "No, we've got it covered / pretty on top of it" → **node: on-top-of-it-check**

---

## v3.1 — Warm-Lead Opener (SHIPPED PATCH, Section 1 only — Prompt 209, `8df9bfa`)

**Why this changes:** the shipped opener above still plays it coy — "just happened to notice," disarm the sales-pushback like the prospect might reasonably wonder why a stranger is asking about their call volume. But an Indeed-sourced lead already told us they're understaffed by posting the job. Pretending not to know why we're calling wastes the one advantage Ohvara has that Camden's blind cold-calls don't: **we already know they're hiring for the exact problem we solve.** No source video exists for this angle — Camden never targets businesses mid-hire for the role his pitch replaces — so this section is written fresh rather than adapted from a transcript line.

**What changes:** the hook states the real reason for the call up front instead of a vague "wondering who to talk to," the disarm reframes around "before you spend time/money hiring" instead of "I just happened to notice," and the qualifier's yes/no question is repointed at the actual premise (missed calls being *why* they're hiring) instead of a generic aspirational hook. Sections 2-5 (Vitals/Pain/Handoff/Objections) are unaffected — the math chain, reflection line, and pitch already work regardless of how the call opened. One line is added to Handoff's `pitch-receptionist` node tying the pitch back to the hire itself.

**Node: intro** *(unchanged)*
SAY: "Hey, is this [Business Name]?"
→ "Yeah / speaking" → **node: indeed-hook**
→ transferred → **node: transferred**

**Node: indeed-hook** *(REVISED)*
SAY: "This is [First Name] — I saw you're hiring for a [receptionist / dispatcher / front desk]. That usually means calls are slipping somewhere, or your team's stretched thin. Got a quick minute before you go through the whole hiring process?"
→ `[GOOD]` "Sure / yeah" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transferred** *(REVISED, matches new hook's diagnostic framing)*
SAY: "Hey [Name] — I saw your Indeed listing for a [receptionist]. That's usually a sign calls are slipping somewhere — got a quick sec?"
→ engages → **node: qualifier**
→ pushback → **node: disarm-early**

**Node: disarm-early** *(REVISED — disarms around the hiring spend, not a coy "just noticed")*
SAY: "Nothing to sell you here yet — genuinely just want to see if it's actually calls slipping, or something else, before you spend time and money hiring for it."
→ `[GOOD]` engages → **node: qualifier**
→ `[BAD]` still shuts it down → END (clean exit)

**Node: qualifier** *(REVISED — same binary yes/no mechanic, now honest about the premise)*
SAY: "Quick question — are missed calls part of why you're posting for this role? Yes or no?"
→ `[GOOD]` "Yeah" → SECTION 2
→ `[HESITANT]` "Kind of / it's part of it" → SECTION 2
→ `[BAD]` "No, we've got it covered, just growing" → **node: on-top-of-it-check**

**Handoff patch:** append one line to the end of the existing `pitch-receptionist` node (Section 4, unchanged otherwise): *"...and it means you might not even need to finish out this hire the way you'd planned."* — turns the job posting itself into the closing hook instead of just the opening one.

**Node: on-top-of-it-check**
SAY: "You're pretty on top of it, I got you — is it more that calls just aren't the bottleneck right now, or you've got someone dedicated catching every one?"
`[from: "You're pretty on top of it, I got you, so it's more of like a—"]`
→ `[HESITANT]` answers, any gap surfaces → SECTION 2
→ `[BAD]` genuinely solid, no gap → **node: clean-exit-no-pain**

**Node: clean-exit-no-pain**
SAY: "Okay, well, that's a different story then. Okay man, well have a good day, good luck to you."
`[from: "You're allergic. Okay well that that's a different story then. Okay man well have a good day, good luck to you man."]`
→ END

---

## SECTION 2 — Vitals
*id: vitals | color: var(--accent) | kind: branch — capture nodes, no forks/no color tags*

**Node: volume**
SAY: "Out of curiosity — don't mind the question, it'll make sense in a second, and you can hang up if this sounds irrelevant — how many calls do you think you get in a month?"
`[from: "Out of curiosity, don't mind the question, it'll make sense in a second and you can hang up if this sounds like relevant, I guess. How many calls do you think you get in a month?"]`
→ answer → **node: missed**

**Node: missed** *(direct daily-miss capture — feeds `capture.multiplier` ×7, per Prompt 204's shipped mechanism, so the setter never converts units)*
SAY: "Ballpark, how many do you think you're missing a day?"
`[from: "Ballpark, how many do you think you miss?" — asked per-day instead of per-week/month]`
→ answer → **node: ticket**

**Node: ticket**
SAY: "And what do you charge a client typically — like [$250] bucks?"
`[from: "And what like, okay, what do you charge a client typically? Like 250 bucks?"]`
→ answer → SECTION 3

---

## SECTION 3 — Pain
*id: pain | color: var(--accent) | kind: branch*

**Node: do-the-math** *(auto-advance, no fork)*
SAY: "So check me out — you're potentially leaving what, like $[monthly] on the table every month. That's, I mean, $[annual] on the table every year from something like [their number] missed calls a day."
`[from: "So check me out — you're potentially leaving what, like 3K on the table every month. That's I mean, 32,000 on the table every year from something like nine missed phone calls a month."]`
→ [auto-advance] → **node: reflection**

**Node: reflection** — the exact line, unchanged
SAY: "Is that something you're doing anything about, or not really important to you?"
`[from: "Is that like something you're doing anything about or or not really important to you?"]`
→ `[GOOD]` engaged / "yeah we should" → SECTION 4
→ `[HESITANT]` minimizes / "we're fine" → **node: name-pain**
→ `[BAD]` pushback, "you're trying to sell me a service" → **node: disarm-2**

**Node: disarm-2**
SAY: "Yeah, no, there's nothing to buy, man — I just happen to see you guys. I mean, $[annual] every year — is that like anything you're doing anything about, or not important?"
`[from: "Yeah. No, there's nothing to buy, man, I'm I just happen to see you guys. I mean, $32,000 every year — is that like anything you're doing anything about or not not important?"]`
→ `[GOOD]` re-engages → SECTION 4
→ `[BAD]` still cold → **node: compete-check**

**Node: compete-check** — labeling move
SAY: "My question for you is — if you're leaving that much money on the table and not doing anything about it, how's that going to affect your ability to compete with everybody else in your area?"
`[from: "My question for you is like if you are leaving that much money on the table and not doing anything about it, I mean, how is that going to affect your ability to compete with the... 300 competitors in your area?"]`
→ `[GOOD]` engages → SECTION 4
→ `[BAD]` still no → **node: clean-exit-no-pain**

**Node: name-pain**
SAY: "So if I called you — what time do you close at? [time]. If I called you at [time+1hr] and you're not able to get to the phone, why would I go to you versus somebody that can answer the phone?"
`[from: "So if I called you — at what time do you close at? 8 p.m. If I called you at 9:00 and you're not able to get to the phone, why would I go to you versus somebody that can answer the phone?"]`
→ `[GOOD]` engages → SECTION 4
→ `[BAD]` still no → **node: clean-exit-no-pain**

---

## SECTION 4 — Handoff
*id: handoff | color: var(--accent) | kind: branch*

**Node: handoff-bridge** *(auto-advance)*
SAY: "I don't want to waste your time here. I have a team that works with [niche] businesses, and I do this based on you and your pain — if you're missing [their number] calls a day and your average client's worth [$ticket], that's $[annual] you're leaving on the table every year from calls that just don't get picked up."
`[from: "I I kind of do it based on you and your pain, so like if if you were to miss 10 calls a month and your average client value was 500, that's $60,000 you're leaving on the table every year from 10 missed phone calls a month."]`
→ [auto-advance] → **node: pitch-receptionist**

**Node: pitch-receptionist** *(auto-advance, the actual product description, near-verbatim)*
SAY: "It'd be like an AI receptionist. Not some robot press-one thing — a real human, we can even make it your voice — and it funnels the calls you'd otherwise miss straight through. It can also do missed-call text-back. It answers questions and books appointments straight to your calendar, so all you have to do is show up to the meeting."
`[from: "It would have like an AI reception. It's not some robot [ __ ] like press one. It be like a real human. You could... even make it be your voice... It could also do like miss call text back as well but the AI receptionist would answer any questions. It could book appointments straight to your calendar. That way all you have to do is get meetings booked on your calendar."]`
→ [auto-advance] → **node: time-ask**

**Node: time-ask** *(routing into a specific objection, not a sentiment fork — options are literal responses, not GOOD/HESITANT/BAD)*
SAY: "Take 15 minutes. Worst case scenario, you get to see what it looks like and stop wasting your time. Best case scenario, our team shows you exactly how you're leaving money on the table and how to fix it. How's that sound? [Tuesday morning] or [Wednesday afternoon]?"
`[from: "Take 15 minutes. Worst case scenario, you get to kind of see what it looks like... And best case scenario, you pay me a little bit of money, you make more money in return, save more time. How's that sound?" — dropped the "you pay me" clause since the setter isn't closing]`
→ `[GOOD]` picks a time → **node: confirm-number**
→ "Just send me some info" → SECTION 5 (obj-send-info)
→ "I don't have time this week" → SECTION 5 (obj-no-time)
→ "Who is this / what company?" → SECTION 5 (obj-who-is-this)
→ "How much does this cost?" → SECTION 5 (obj-how-much)

**Node: confirm-number** *(auto-advance)*
SAY: "5:00 p.m. tomorrow — I'm going to see what I can do for you. There's nothing, you don't got to buy anything. What's the best number so I can send you a quick text right now to confirm?"
`[from: "5:00 p.m. tomorrow. I'm going to see what I can do for you. There's nothing. You don't got to buy anything, but let's hop on like a quick 10-minute meeting." + "I'll send you a quick text right now to confirm. What's the best number for that?"]`
→ gives number → **node: close-confirm**

**Node: close-confirm** *(auto-advance, terminal)*
SAY: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."
`[from: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."]`
→ END ✅

*(Process note, not a script line: Camden texts a confirmation immediately, schedules a same-morning reminder text, and calls ~2 hours before to re-confirm. Ohvara's SMS reminder pipeline is currently stubbed/deprioritized per [[LIVE_STATE]] — flagging the cadence for whenever that gets built, not requesting it now.)*

---

## SECTION 5 — Booking Objections
*id: objections | color: var(--accent) | kind: branch*

**Node: obj-too-busy** — the "why are you on the phone" callout
SAY: "Okay, well, if you're that busy, why are you on the phone with me and not on the job or taking care of something more important?"
`[from: "My question is why are you on the phone with me and not on a job or taking care of something more important?"]`
→ `[GOOD]` re-engages → **node: time-ask**
→ `[BAD]` genuinely a real "we don't want more clients right now" → END, no push
`[from Camden's clean exit with the booked-out roofer: "I don't want no more overhead, no more people... I'm not looking to make more money." → "All right man, well you have a good one and take care."]`

**Node: obj-send-info**
SAY: "I could send that over, but honestly — when was the last time an email did more for you than an actual conversation? Let's hop on a quick call instead, [time] tomorrow — I'll show you, there's nothing to buy."
`[from: "I can send you an email, but when was the last time you had an email that was better than a conversation? Let's do this — tomorrow, what time do you get off?"]`
→ `[GOOD]` "Okay, fair" → **node: time-ask**
→ `[HESITANT]` still wants info first → **node: obj-send-info-2**

**Node: obj-send-info-2** *(single acceptance path, no fork)*
SAY: "Fair enough — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline, no hard feelings. If it's interesting, we're already set."
`[from: "Okay — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline — no hard feelings. If it's interesting, we're already set."]`
→ "Okay" → END (send info + placeholder)

**Node: obj-who-is-this** *(routing, no color tags)*
SAY: "Who would be responsible for looking at any possible hidden gaps in your call flow system that could be causing you guys to miss out on thousands of dollars every month? Is that you?"
`[from the McKenna/gatekeeper call: "Who who would be responsible for looking at... any possible hidden gaps in your guys' like call flow system that could be causing you guys to miss out on like thousands of dollars every single month. Who would that normally fall under? Is that you?"]`
→ "That's me" → **node: qualifier**
→ "That's [owner]" → **node: gatekeeper-timing**

**Node: gatekeeper-timing** *(under 2 minutes, per Camden's own rule — routing, no color tags)*
SAY: "No worries — do you know a good time [owner] is usually in later this week?"
`[from: "Do you know like a good time she may be in later this week?"]`
→ gives a window → END (log callback, thank + exit)
→ "only reachable by email" → **node: gatekeeper-email**

**Node: gatekeeper-email** *(single path)*
SAY: "No worries — what's the best email?"
`[from: "What's going to be the best email?"]`
→ gives email → END (log + exit — thank them, don't oversell to someone who can't say yes)

**Node: obj-no-time**
SAY: "No problem — what works better, [Tuesday next week] or [Wednesday next week]?"
`[from: "No problem — what works better, [Tuesday of next week] or [Wednesday of next week]?"]`
→ `[GOOD]` picks a day → **node: confirm-number**
→ `[BAD]` "Those don't work either" → **node: obj-no-time-2**

**Node: obj-no-time-2** *(single path)*
SAY: "Got it — what's a better week for you?"
`[from: "Got it — what's a better week for you?"]`
→ gives a week → END (log callback)

**Node: obj-how-much**
SAY: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. Didn't want to guess at a number before they've seen your actual situation."
`[from: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. That's why I didn't want to guess at a number before they've seen your actual situation."]`
→ `[GOOD]` "Okay" → **node: time-ask**
→ `[HESITANT]` "Just need a ballpark" → **node: obj-how-much-2**

**Node: obj-how-much-2** *(single path)*
SAY: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."
`[from: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."]`
→ "Fine" → **node: time-ask**

---

## Review checklist for Brayden

- Every SAY line has its source quote right above it — flag any that drifted too far from the original wording.
- Section 4's `pitch-receptionist` node is the most direct lift (Camden's actual AI-receptionist description) — worth double-checking against Ohvara's real product claims (both true today per the shipped app, so no overclaim).
- `obj-too-busy`'s clean exit on a real "we don't want more clients" objection is new behavior vs. today's script (which pushes through most objections) — confirm you want setters to actually drop a lead on this specific objection rather than logging it as a callback.
- No second Camden video exists (he doesn't have another live-cold-call-for-AI-receptionist video) — this is built entirely from the one call plus his supporting commentary. If a different creator's example ever gets found, treat it as a v4 pass rather than trying to force it into this one.

**Status: both the base v3 script (Prompt 205, `b4d9cf3`) and the v3.1 warm-lead opener patch (Prompt 209, `8df9bfa`) are shipped live.** The Script tab's canvas view (the reason Prompt 206/208 existed) has since been replaced twice over — first with a text outline (Prompt 208), then with a direct Practice-mode landing (Prompt 209) — see [[LIVE_STATE]].

[[setter-transcripts-camden-cash]] · [[setter-script-v2-flow]] · [[ohvara-setter-discovery-script]] · [[LIVE_STATE]]
