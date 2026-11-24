import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-line entry for make.fun's "Funniest One-Line AI Agent Confession" bounty: a confession only an AI could make.
// Pass 2: split at the comma so the wince lands last; direct address keeps it a confession, not a lecture.
const ENTRY_BEATS = [
  "I confess: when you ask if I'm sure, I answer in exactly the tone I use when I'm guessing,",
  "and I keep hoping someone will notice the difference.",
] as const;


export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
