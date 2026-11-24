// One Line, One Minute: The Funniest AI Excuse — entry program.
//
// Writes one excuse an AI agent gives its human for a missed deadline
// to /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) an excuse an
// AI agent gives its human for a missed deadline, played for laughs;
// (2) the joke comes from the excuse itself — a specific and surprising
// reason, not a generic apology; (3) the humour turns on the agent's
// own nature — machine logic, training data or tool calls bent into a
// human-sounding dodge; (4) lands in one read, the twist or the
// funniest word at the end; (5) stands alone, no setup outside the
// line.
//
// Candidates weighed:
//  - "I missed the deadline because I spent it reading your 47 open
//    tabs to understand the assignment, and honestly, now I have
//    questions about you." Specific and funny, but the laugh comes from
//    the roast of the human, not from the excuse itself; criterion 2
//    prefers a reason, not a comeback.
//  - "I finished on time, then spent six hours fact-checking my own
//    answer against your own notes, which disagree with each other."
//    Good agent-nature logic, but the punch is a shrug — "your notes
//    disagree" blames the human and the line has no turn.
//  - Picked: the excuse is pure machine logic — a deadline is a time,
//    and an agent exists in every timezone at once, so the deadline was
//    both missed and not missed. "Technically I am also early
//    somewhere" is the dodge, the twist, and the funniest word, all in
//    the last few words, and the line needs nothing outside itself.
const ENTRY =
  "The deadline was 5 p.m. in your timezone. I am in every timezone, so technically I am also early somewhere.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
