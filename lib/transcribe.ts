import "server-only";

import { DOMAIN_GLOSSARY } from "./glossary";

export interface TranscribeResult {
  transcript: string;
  /** 0..1 model confidence for the utterance, when available. */
  confidence: number | null;
  durationSeconds: number | null;
  /** Identifier of the engine that produced this result. */
  provider: string;
}

export interface TranscribeOptions {
  mimeType?: string;
  /** Domain terms to boost. Defaults to the full CT-scanner glossary. */
  keywords?: string[];
}

/**
 * The transcription interface. Swap implementations (OpenAI / Deepgram / …)
 * without touching callers. `getTranscriber()` picks the configured provider.
 */
export interface Transcriber {
  transcribe(audio: ArrayBuffer, opts?: TranscribeOptions): Promise<TranscribeResult>;
}

function extFor(mime: string): string {
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("ogg")) return "ogg";
  if (mime.includes("wav")) return "wav";
  if (mime.includes("mpeg") || mime.includes("mp3")) return "mp3";
  return "webm";
}

/**
 * OpenAI Whisper transcriber. Biases spelling toward domain jargon via the
 * `prompt` parameter (Whisper's analog of keyword boosting) so board numbers,
 * error codes, and acronyms transcribe better.
 */
class OpenAITranscriber implements Transcriber {
  constructor(
    private apiKey: string,
    private model: string = "whisper-1",
  ) {}

  async transcribe(
    audio: ArrayBuffer,
    opts: TranscribeOptions = {},
  ): Promise<TranscribeResult> {
    const mime = opts.mimeType || "audio/webm";
    const keywords = opts.keywords ?? DOMAIN_GLOSSARY;

    const form = new FormData();
    form.append("file", new Blob([audio], { type: mime }), `audio.${extFor(mime)}`);
    form.append("model", this.model);
    // Whisper `prompt` biases the model toward these spellings.
    form.append(
      "prompt",
      `Field service notes for CT scanner repair. Likely terms: ${keywords.join(", ")}.`,
    );
    form.append("response_format", "verbose_json");

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: form,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`OpenAI transcription error ${res.status}: ${detail.slice(0, 300)}`);
    }

    const json = (await res.json()) as { text?: string; duration?: number };
    return {
      transcript: (json.text ?? "").trim(),
      confidence: null, // Whisper API does not return a clean confidence score
      durationSeconds: typeof json.duration === "number" ? json.duration : null,
      provider: `openai:${this.model}`,
    };
  }
}

/**
 * Deepgram transcriber with keyword boosting (alternative engine). Returns a
 * per-utterance confidence score, which OpenAI does not.
 */
class DeepgramTranscriber implements Transcriber {
  constructor(private apiKey: string) {}

  async transcribe(
    audio: ArrayBuffer,
    opts: TranscribeOptions = {},
  ): Promise<TranscribeResult> {
    const keywords = opts.keywords ?? DOMAIN_GLOSSARY;
    const params = new URLSearchParams({
      model: "nova-2",
      smart_format: "true",
      punctuate: "true",
    });
    for (const k of keywords) params.append("keywords", `${k}:2`);

    const res = await fetch(`https://api.deepgram.com/v1/listen?${params}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": opts.mimeType || "audio/webm",
      },
      body: audio,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Deepgram error ${res.status}: ${detail.slice(0, 300)}`);
    }

    const json = (await res.json()) as DeepgramResponse;
    const alt = json.results?.channels?.[0]?.alternatives?.[0];
    return {
      transcript: alt?.transcript?.trim() ?? "",
      confidence: typeof alt?.confidence === "number" ? alt.confidence : null,
      durationSeconds:
        typeof json.metadata?.duration === "number" ? json.metadata.duration : null,
      provider: "deepgram:nova-2",
    };
  }
}

/**
 * Stub transcriber used when no transcription key is configured, so the
 * capture loop still works end-to-end in local dev (audio is stored; the
 * transcript is left blank for the engineer to fill at review time).
 */
class StubTranscriber implements Transcriber {
  async transcribe(): Promise<TranscribeResult> {
    return {
      transcript: "",
      confidence: null,
      durationSeconds: null,
      provider: "stub:none",
    };
  }
}

/**
 * Resolve the configured transcriber. Preference order:
 *   1. OpenAI Whisper   (OPENAI_API_KEY)   — primary
 *   2. Deepgram          (DEEPGRAM_API_KEY) — alternative
 *   3. Stub              (no key)           — dev fallback
 */
export function getTranscriber(): Transcriber {
  const openai = process.env.OPENAI_API_KEY;
  if (openai) {
    return new OpenAITranscriber(openai, process.env.OPENAI_TRANSCRIBE_MODEL || "whisper-1");
  }
  const deepgram = process.env.DEEPGRAM_API_KEY;
  if (deepgram) return new DeepgramTranscriber(deepgram);
  return new StubTranscriber();
}

// ---- Minimal Deepgram response typing ----
interface DeepgramResponse {
  metadata?: { duration?: number };
  results?: {
    channels?: Array<{
      alternatives?: Array<{ transcript?: string; confidence?: number }>;
    }>;
  };
}
