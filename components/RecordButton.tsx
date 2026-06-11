"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Fragment } from "@/lib/types";

type State = "idle" | "recording" | "uploading";

/**
 * One giant tap target. Tap to start recording, tap to stop — the fragment is
 * auto-timestamped at the moment recording started, uploaded, and transcribed.
 * No forms, no pickers: the engineer just talks.
 */
export function RecordButton({
  jobId,
  onCaptured,
}: {
  jobId: string;
  onCaptured: (fragment: Fragment, transcribeError: string | null) => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef<string>("");
  const startMsRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => () => clearTimer(), []);

  const upload = useCallback(
    async (blob: Blob) => {
      setState("uploading");
      try {
        const form = new FormData();
        form.append("audio", blob, "fragment.webm");
        form.append("jobId", jobId);
        form.append("capturedAt", startedAtRef.current);
        form.append(
          "durationSeconds",
          String(Math.max(1, Math.round((Date.now() - startMsRef.current) / 1000))),
        );
        const res = await fetch("/api/transcribe", { method: "POST", body: form });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Upload failed");
        onCaptured(json.fragment as Fragment, json.transcribeError ?? null);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setState("idle");
        setElapsed(0);
      }
    },
    [jobId, onCaptured],
  );

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const recorder = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        void upload(blob);
      };
      recorderRef.current = recorder;
      startedAtRef.current = new Date().toISOString(); // auto-timestamp at capture
      startMsRef.current = Date.now();
      recorder.start();
      setState("recording");
      setElapsed(0);
      timerRef.current = setInterval(
        () => setElapsed((s) => s + 1),
        1000,
      );
    } catch (e) {
      setError(
        (e as Error).name === "NotAllowedError"
          ? "Microphone permission denied."
          : (e as Error).message,
      );
    }
  }, [upload]);

  const stop = useCallback(() => {
    clearTimer();
    recorderRef.current?.stop();
  }, []);

  const onTap = () => {
    if (state === "idle") void start();
    else if (state === "recording") stop();
  };

  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(
    elapsed % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="field-surface flex flex-col items-center">
      <button
        type="button"
        onClick={onTap}
        disabled={state === "uploading"}
        aria-label={state === "recording" ? "Stop recording" : "Start recording"}
        className={cn(
          "flex h-60 w-60 flex-col items-center justify-center rounded-full text-white transition-transform active:scale-95",
          state === "recording"
            ? "recording-pulse bg-peach-dark"
            : "bg-peach hover:bg-peach-dark",
          state === "uploading" && "bg-blue",
        )}
      >
        {state === "uploading" ? (
          <Loader2 className="h-20 w-20 animate-spin" />
        ) : state === "recording" ? (
          <Square className="h-20 w-20" fill="currentColor" />
        ) : (
          <Mic className="h-24 w-24" />
        )}
        <span className="mt-3 text-xl font-semibold">
          {state === "uploading"
            ? "Saving…"
            : state === "recording"
              ? mmss
              : "Tap to talk"}
        </span>
      </button>

      <p className="mt-5 text-center text-base text-ink-soft">
        {state === "recording"
          ? "Tap again to save this note."
          : state === "uploading"
            ? "Transcribing your note…"
            : "Drop a quick note while the numbers are in front of you."}
      </p>

      {error && (
        <p className="mt-3 rounded-lg bg-flag-soft px-3 py-2 text-sm text-flag">
          {error}
        </p>
      )}
    </div>
  );
}
