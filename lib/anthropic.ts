import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

import { glossaryPromptBlock } from "./glossary";
import type { AssembledReport, Fragment, ReportHeader } from "./types";

// The model is the user-specified extraction model for this product.
const MODEL = "claude-sonnet-4-6";

// Structured-output schema — mirrors AssembledReport in lib/types.ts.
const ReportSchema = z.object({
  corrective_actions: z
    .array(
      z.object({
        date: z.string().describe('Calendar day, formatted M-D-YYYY, e.g. "5-9-2025"'),
        narrative: z
          .string()
          .describe(
            "A clean Corrective Action narrative for this day, prefixed with the date.",
          ),
        flagged_terms: z
          .array(z.string())
          .describe(
            "Low-confidence jargon in this entry to highlight for review (board/part numbers, error codes, acronyms).",
          ),
      }),
    )
    .describe("One entry per calendar day that had work, in chronological order."),
  hours_table: z
    .array(
      z.object({
        date: z.string().describe('Calendar day, M-D-YYYY'),
        labor_hours: z
          .number()
          .nullable()
          .describe("Stated labor hours for the day, or null if not explicitly stated."),
        travel_hours: z
          .number()
          .nullable()
          .describe("Stated travel hours for the day, or null if not explicitly stated."),
        needs_review: z
          .boolean()
          .describe("True when hours were not explicitly stated (do not guess)."),
      }),
    )
    .describe("One row per calendar day that had work."),
  flags: z
    .array(z.string())
    .describe(
      "Global list of low-confidence items across the whole report (board numbers, error codes, acronyms) for the reviewer to verify.",
    ),
});

const SYSTEM_PROMPT = `You assemble medical-imaging (CT scanner) field-service reports from a pile of timestamped voice-note transcripts.

You will receive, for one service job, a list of voice fragments. Each fragment has:
- captured_at: an ISO 8601 timestamp (when the engineer spoke it, in the field)
- transcript: the raw, possibly mis-heard transcription
- confidence: optional 0..1 transcription confidence

Produce a structured report. Rules:
1. Group fragments by CALENDAR DAY using captured_at. Treat each captured_at as the engineer's local time.
2. For each day with work, write ONE clean Corrective Action narrative entry. Begin the narrative with the date in M-D-YYYY form (e.g. "5-9-2025 Replaced the axial encoder assembly ..."). Write in clear past-tense service prose. Merge the day's fragments into a coherent account; fix obvious transcription noise using the glossary, but NEVER invent technical details.
3. Build the hours table: for each day, pull labor and travel hours ONLY from explicit mentions (e.g. "14 hours labor today", "two hours travel"). If a day had work fragments but no stated hours, leave that field null and set needs_review = true. Do NOT guess or estimate hours.
4. Flag low-confidence items — especially board/part numbers, error codes, and acronyms — in each entry's flagged_terms and in the global flags list, so the UI can highlight them for the engineer to verify. If you transcribe a number/code you are not confident about, surface it as a flag rather than silently trusting it. Never silently invent a number.

Domain glossary (in-domain terms; correct obvious mis-hearings toward these, and treat numeric codes near them as high-stakes to flag):
${glossaryPromptBlock()}

Return only the structured object. No prose outside it.`;

export interface FragmentInput {
  captured_at: string;
  transcript: string | null;
  confidence: number | null;
}

/**
 * Run the Claude extraction over a job's fragments and return the structured,
 * reviewable report payload.
 */
export async function assembleReport(
  fragments: Pick<Fragment, "captured_at" | "raw_transcript" | "confidence">[],
  header: ReportHeader,
): Promise<{ report: AssembledReport; raw: unknown }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set (see .env.example).");
  }
  const client = new Anthropic({ apiKey });

  const fragmentLines = fragments
    .filter((f) => (f.raw_transcript ?? "").trim().length > 0)
    .map((f) => ({
      captured_at: f.captured_at,
      transcript: f.raw_transcript,
      confidence: f.confidence,
    }));

  if (fragmentLines.length === 0) {
    throw new Error(
      "No transcribed fragments to assemble. Record and transcribe fragments first.",
    );
  }

  const userContent = [
    "Header context (stable site/job fields — do not re-derive these):",
    JSON.stringify(header, null, 2),
    "",
    "Voice fragments for this job:",
    JSON.stringify(fragmentLines, null, 2),
  ].join("\n");

  const message = await client.messages.parse({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
    output_config: { format: zodOutputFormat(ReportSchema) },
  });

  const parsed = message.parsed_output;
  if (!parsed) {
    throw new Error("Model did not return a parseable report.");
  }

  return { report: parsed as AssembledReport, raw: message };
}
