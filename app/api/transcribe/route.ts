import { NextResponse } from "next/server";

import { AUDIO_BUCKET, getSupabaseAdmin } from "@/lib/supabase/admin";
import { getTranscriber } from "@/lib/transcribe";

export const runtime = "nodejs";

/**
 * Field capture sink: receives one recorded audio fragment, stores the audio,
 * transcribes it (Deepgram with glossary boosting), and persists the fragment
 * row with its capture timestamp + confidence.
 */
export async function POST(req: Request) {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  const form = await req.formData();
  const audio = form.get("audio");
  const jobId = form.get("jobId");
  const capturedAt = (form.get("capturedAt") as string) || new Date().toISOString();
  const durationRaw = form.get("durationSeconds") as string | null;

  if (!(audio instanceof File) || typeof jobId !== "string") {
    return NextResponse.json(
      { error: "Expected multipart form with `audio` file and `jobId`." },
      { status: 400 },
    );
  }

  const mimeType = audio.type || "audio/webm";
  const ext = mimeType.includes("mp4") ? "mp4" : mimeType.includes("ogg") ? "ogg" : "webm";
  const buffer = await audio.arrayBuffer();
  const audioPath = `${jobId}/${capturedAt.replace(/[:.]/g, "-")}.${ext}`;

  // 1. Store the raw audio (source of truth survives even if transcription fails).
  const upload = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(audioPath, buffer, { contentType: mimeType, upsert: true });
  if (upload.error) {
    return NextResponse.json(
      { error: `Audio upload failed: ${upload.error.message}` },
      { status: 500 },
    );
  }

  // 2. Transcribe. If it fails, still keep the fragment (blank transcript) so the
  //    capture is never lost — the engineer can fill it in at review time.
  let transcript = "";
  let confidence: number | null = null;
  let duration: number | null = durationRaw ? Number(durationRaw) : null;
  let transcribeError: string | null = null;
  try {
    const result = await getTranscriber().transcribe(buffer, { mimeType });
    transcript = result.transcript;
    confidence = result.confidence;
    duration = result.durationSeconds ?? duration;
  } catch (e) {
    transcribeError = (e as Error).message;
  }

  // 3. Persist the fragment.
  const { data, error } = await supabase
    .from("fragments")
    .insert({
      job_id: jobId,
      audio_path: audioPath,
      captured_at: capturedAt,
      raw_transcript: transcript,
      confidence,
      duration_seconds: Number.isFinite(duration as number) ? duration : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: `Could not save fragment: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ fragment: data, transcribeError });
}
