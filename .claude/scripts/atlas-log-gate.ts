#!/usr/bin/env node
/**
 * Stop hook — Atlas logging GATE (hard block).
 *
 * Purpose: a substantive Ohvara work session must not END without a fresh
 * entry in brain/Memories.md. The old Stop "checklist" only *reminded*; this
 * one *blocks* the stop until a Memories.md entry has actually been written
 * during the current session.
 *
 * Installed GLOBALLY (~/.claude/settings.json) so it fires for sessions in any
 * Ohvara repo — Scraper, ai-receptionist-leads, ohvara-dashboard,
 * ohvara-client-portal, freight_bot, hotshot-lead-scraper, the vault, and any
 * FUTURE project — not just whichever folder we happen to be sitting in. To
 * avoid the exact hardcoded-list blind spot that let this very gap happen,
 * "is this an Ohvara session" is detected by SIGNAL, not a fixed repo list:
 *   - cwd is inside the vault (~/obsidian-mind), OR
 *   - cwd is inside a git repo that lives directly under the Desktop projects
 *     folder (where all of Brayden's project repos live).
 *   - plus any dirs in ATLAS_GATE_EXTRA_DIRS (for repos outside that folder).
 *
 * Three deliberate non-traps:
 *   1. Empty / pure-Q&A sessions are NOT gated. A session is only "substantive"
 *      if it changed files or ran commands (Write/Edit/NotebookEdit/Bash) or did
 *      a lot of investigation (>= TOOL_BUSY_THRESHOLD tool calls = "produced
 *      findings"). Answering a question with no/few read-only tools never blocks.
 *   2. Loop safety: when stop_hook_active is true (we already blocked once this
 *      chain), we never block again — we re-check and either pass (logged) or
 *      release with a loud warning (never trap the user in a loop).
 *   3. Fail-open: any uncertainty (can't find/parse the transcript, can't
 *      determine session start, can't stat Memories.md) → allow. A hook bug must
 *      never strand a session.
 *
 * Kill switch: ATLAS_GATE_DISABLE=1 disables enforcement entirely.
 *
 * Pure logic is exported and unit-testable; main() is gated by isMainModule.
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve as resolvePath, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { debug, readStdinJson } from "./lib/hook-io.ts";
import { isMainModule } from "./lib/main-guard.ts";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
// Vault root = two levels up from .claude/scripts/. Robust to the vault moving.
const VAULT_ROOT = resolvePath(SCRIPT_DIR, "..", "..");
const MEMORIES_PATH = resolvePath(VAULT_ROOT, "brain", "Memories.md");

// Where Brayden's project repos live. Overridable for portability.
const OHVARA_BASE =
	process.env["ATLAS_GATE_BASE"] ??
	"C:\\Users\\freem\\OneDrive\\Desktop";

// A session counts as "produced findings" (worth logging) if it made at least
// this many tool calls even with no file edits / commands — e.g. a deep
// read-only research or recon session.
const TOOL_BUSY_THRESHOLD = 8;

// File edits / command execution — any one of these makes a session substantive.
const MUTATION_TOOLS = new Set([
	"Write",
	"Edit",
	"MultiEdit",
	"NotebookEdit",
	"Bash",
]);

// Clock-skew tolerance: Memories.md mtime must be at least this recent relative
// to session start to count as "written this session".
const FRESH_SKEW_MS = 5_000;

type HookInput = {
	readonly transcript_path?: unknown;
	readonly cwd?: unknown;
	readonly stop_hook_active?: unknown;
};

// ── Ohvara-session detection (signal-based, no hardcoded repo list) ──────────

function norm(p: string): string {
	// Windows FS is case-insensitive; normalize for comparison.
	return resolvePath(p).toLowerCase();
}

function isUnder(child: string, parent: string): boolean {
	const c = norm(child);
	const p = norm(parent);
	return c === p || c.startsWith(p + sep.toLowerCase());
}

export function detectOhvara(
	cwd: string,
	opts: { vaultRoot: string; ohvaraBase: string; extraDirs?: string[] } = {
		vaultRoot: VAULT_ROOT,
		ohvaraBase: OHVARA_BASE,
	},
): boolean {
	if (!cwd) return false;
	const c = norm(cwd);

	// 1. Inside the vault itself.
	if (isUnder(c, opts.vaultRoot)) return true;

	// 2. Inside a git repo that sits directly under the Desktop projects folder.
	const base = norm(opts.ohvaraBase);
	if (c.startsWith(base + sep.toLowerCase())) {
		const rest = c.slice(base.length + 1);
		const childSeg = rest.split(sep.toLowerCase())[0];
		if (childSeg) {
			const repoRoot = resolvePath(opts.ohvaraBase, childSeg);
			if (existsSync(resolvePath(repoRoot, ".git"))) return true;
		}
	}

	// 3. Explicit extra dirs (repos outside the Desktop folder).
	for (const d of opts.extraDirs ?? []) {
		if (d && isUnder(c, d)) return true;
	}

	return false;
}

// ── Transcript analysis ──────────────────────────────────────────────────────
// We emit an ordered list of tool events with three flags each so the decision
// can re-arm: "was there substantive work AFTER the last Memories.md write?"
//   - isMutation:      a file edit or command (Write/Edit/MultiEdit/NotebookEdit/Bash)
//   - isMemoriesWrite: this event actually wrote brain/Memories.md (a log point)
//   - isLogRelated:    this event just reads/writes the log files (Memories.md /
//                      LIVE_STATE.md) — excluded from "new work" so logging and
//                      verifying the log can't re-arm the gate against itself.

const MEM_RE = /memories\.md/i;
const LOG_FILE_RE = /(memories\.md|live_state\.md)/i;
const WRITE_REDIRECT_RE = /(>>|>|\btee\b)/;

export type ToolEvent = {
	tsMs: number | null;
	name: string;
	isMutation: boolean;
	isMemoriesWrite: boolean;
	isLogRelated: boolean;
};

export type TranscriptAnalysis = {
	sessionStartMs: number | null;
	events: ToolEvent[];
};

function classifyTool(name: string, input: Record<string, unknown>): {
	isMutation: boolean;
	isMemoriesWrite: boolean;
	isLogRelated: boolean;
} {
	const isMutation = MUTATION_TOOLS.has(name);
	let isMemoriesWrite = false;
	let isLogRelated = false;

	if (name === "Bash") {
		const cmd = typeof input["command"] === "string" ? input["command"] : "";
		if (LOG_FILE_RE.test(cmd)) isLogRelated = true;
		// A Bash log point = references Memories.md AND looks like a write/append
		// (>>, >, tee) — not a bare read like `wc -l < Memories.md` or `grep`.
		if (MEM_RE.test(cmd) && WRITE_REDIRECT_RE.test(cmd)) isMemoriesWrite = true;
	} else {
		const fp =
			(typeof input["file_path"] === "string" && input["file_path"]) ||
			(typeof input["notebook_path"] === "string" && input["notebook_path"]) ||
			"";
		if (LOG_FILE_RE.test(fp)) isLogRelated = true;
		if (MEM_RE.test(fp)) isMemoriesWrite = true;
	}

	return { isMutation, isMemoriesWrite, isLogRelated };
}

export function analyzeTranscript(text: string): TranscriptAnalysis {
	let sessionStartMs: number | null = null;
	const events: ToolEvent[] = [];

	for (const line of text.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		let entry: Record<string, unknown>;
		try {
			entry = JSON.parse(trimmed) as Record<string, unknown>;
		} catch {
			continue;
		}

		let tsMs: number | null = null;
		const ts = entry["timestamp"];
		if (typeof ts === "string") {
			const parsed = Date.parse(ts);
			if (!Number.isNaN(parsed)) tsMs = parsed;
		}
		if (sessionStartMs === null && tsMs !== null) sessionStartMs = tsMs;

		const msg = entry["message"] as { content?: unknown } | undefined;
		const content = msg?.content;
		if (!Array.isArray(content)) continue;

		for (const item of content) {
			if (
				!item ||
				typeof item !== "object" ||
				(item as { type?: unknown }).type !== "tool_use"
			) {
				continue;
			}
			const name = (item as { name?: unknown }).name;
			if (typeof name !== "string") continue;
			const rawInput = (item as { input?: unknown }).input;
			const input =
				rawInput && typeof rawInput === "object"
					? (rawInput as Record<string, unknown>)
					: {};
			const flags = classifyTool(name, input);
			events.push({ tsMs, name, ...flags });
		}
	}

	return { sessionStartMs, events };
}

export type GateDecision = {
	block: boolean;
	reason: string;
};

/**
 * Core re-arm logic. Block iff there is substantive, non-log work AFTER the
 * last Memories.md write (or, if never logged, anywhere in the session) that a
 * fresher Memories.md mtime doesn't already account for.
 *
 *   memoriesMtimeMs — current mtime of Memories.md, or null if unreadable.
 */
export function decideBlock(
	analysis: TranscriptAnalysis,
	memoriesMtimeMs: number | null,
): GateDecision {
	const { events } = analysis;

	// Index of the last event that wrote Memories.md (our most recent log point).
	let lastLogIdx = -1;
	for (let i = 0; i < events.length; i++) {
		if (events[i]!.isMemoriesWrite) lastLogIdx = i;
	}

	// Work AFTER that log point, ignoring log-keeping/verification itself.
	const after = events.slice(lastLogIdx + 1).filter((e) => !e.isLogRelated);
	const substantiveAfter =
		after.some((e) => e.isMutation) || after.length >= TOOL_BUSY_THRESHOLD;

	if (!substantiveAfter) {
		return { block: false, reason: "no substantive work since last log" };
	}

	// mtime cross-check: if Memories.md was written at/after the most recent
	// activity, a log already landed after the work (even if our transcript
	// detection of the write missed it) → satisfied.
	const tsList = after
		.map((e) => e.tsMs)
		.filter((t): t is number => typeof t === "number");
	const lastActivityMs = tsList.length ? Math.max(...tsList) : null;
	if (
		memoriesMtimeMs !== null &&
		lastActivityMs !== null &&
		memoriesMtimeMs >= lastActivityMs - FRESH_SKEW_MS
	) {
		return { block: false, reason: "Memories.md mtime newer than last work" };
	}

	return { block: true, reason: "unlogged substantive work since last log" };
}

// ── Block output ──────────────────────────────────────────────────────────────

function blockReason(): string {
	const today = new Date().toISOString().slice(0, 10);
	return [
		"⛔ Atlas logging gate — do not stop yet.",
		"",
		"This Ohvara session has substantive work (file edits / commands) that is",
		"NOT yet captured in brain/Memories.md since the last log entry. (An earlier",
		"entry does not cover work done after it.) Before you stop:",
		"",
		`  1. Append a dated entry to ${MEMORIES_PATH}`,
		`     Format: [CC | ${today} — <short title>] — <what was built / found /`,
		"     decided, key commits, blockers>.",
		"  2. If current-state changed, update brain/LIVE_STATE.md too.",
		"",
		"Then finish. (If the work since the last log genuinely isn't worth an entry,",
		"you may stop — this gate releases after one block per chain to avoid loops.)",
	].join("\n");
}

function emitBlock(): void {
	process.stdout.write(
		JSON.stringify({ decision: "block", reason: blockReason() }),
	);
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function main(): Promise<void> {
	if (
		process.env["ATLAS_GATE_DISABLE"] === "1" ||
		process.env["ATLAS_GATE_DISABLE"] === "true"
	) {
		debug("atlas-log-gate: disabled via ATLAS_GATE_DISABLE");
		return;
	}

	const input = await readStdinJson<HookInput>();
	if (!input) return;

	const cwd = typeof input.cwd === "string" ? input.cwd : process.cwd();
	const reEntry = input.stop_hook_active === true;

	const extraDirs = (process.env["ATLAS_GATE_EXTRA_DIRS"] ?? "")
		.split(/[;,]/)
		.map((s) => s.trim())
		.filter(Boolean);

	// Only Ohvara sessions are gated; everything else stops silently.
	if (
		!detectOhvara(cwd, {
			vaultRoot: VAULT_ROOT,
			ohvaraBase: OHVARA_BASE,
			extraDirs,
		})
	) {
		debug(`atlas-log-gate: non-Ohvara cwd (${cwd}) — allow`);
		return;
	}

	// Need the transcript to judge substance + freshness. Fail-open if absent.
	const transcriptPath =
		typeof input.transcript_path === "string" ? input.transcript_path : "";
	if (!transcriptPath || !existsSync(transcriptPath)) {
		debug("atlas-log-gate: no transcript — fail-open allow");
		return;
	}

	let analysis: TranscriptAnalysis;
	try {
		analysis = analyzeTranscript(readFileSync(transcriptPath, "utf-8"));
	} catch {
		debug("atlas-log-gate: transcript read/parse failed — fail-open allow");
		return;
	}

	// Memories.md mtime feeds the cross-check inside decideBlock. Missing/
	// unreadable → null (decideBlock just skips the cross-check); never hard-fail.
	let memoriesMtimeMs: number | null = null;
	try {
		memoriesMtimeMs = statSync(MEMORIES_PATH).mtimeMs;
	} catch {
		debug("atlas-log-gate: cannot stat Memories.md — cross-check skipped");
	}

	// Re-arm decision: block iff substantive, non-log work happened AFTER the
	// last Memories.md write (so an early log no longer covers a later round).
	const decision = decideBlock(analysis, memoriesMtimeMs);
	if (!decision.block) {
		debug(`atlas-log-gate: allow — ${decision.reason}`);
		return;
	}

	if (reEntry) {
		// Already blocked once this chain; do not loop. Release with a warning.
		process.stderr.write(
			"  ⚠ Atlas logging gate: session still has unlogged substantive work " +
				"(brain/Memories.md not updated since). Releasing to avoid a stop " +
				"loop — please log it.\n",
		);
		return;
	}

	debug(`atlas-log-gate: BLOCK — ${decision.reason}`);
	emitBlock();
	return;
}

if (isMainModule(import.meta.url)) {
	void main();
}
