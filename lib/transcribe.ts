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
 * The transcription interface. Swap implementations (Deepgram / Whisper / …)
 * without touching callers. `transcribe()` picks the configured provider.
 */
export interface Transcriber {
  transcribe(audio: ArrayBuffer, opts?: TranscribeOptions): Promise<TranscribeResult>;
}

/**
 * Deepgram transcriber with keyword boosting for domain jargon.
 * Preferred engine — board numbers, error codes and acronyms transcribe far
 * better with the glossary boosted.
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
    // Boost each glossary term. (keyword=term:intensity)
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

/** Resolve the configured transcriber. */
export function getTranscriber(): Transcriber {
  const key = process.env.DEEPGRAM_API_KEY;
  if (key) return new DeepgramTranscriber(key);
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
