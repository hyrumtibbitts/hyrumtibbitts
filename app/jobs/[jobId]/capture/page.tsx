"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { ConfigNotice } from "@/components/ConfigNotice";
import { RecordButton } from "@/components/RecordButton";
import { Badge } from "@/components/ui/badge";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Fragment, Job, Site } from "@/lib/types";
import { dayKey, formatTime } from "@/lib/utils";

type JobWithSite = Job & { sites: Pick<Site, "customer_name" | "system_description"> | null };

export default function CapturePage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [configError, setConfigError] = useState<string | null>(null);
  const [job, setJob] = useState<JobWithSite | null>(null);
  const [fragments, setFragments] = useState<Fragment[]>([]);

  const load = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowser();
      const [{ data: j }, { data: f }] = await Promise.all([
        supabase
          .from("jobs")
          .select("*, sites(customer_name, system_description)")
          .eq("id", jobId)
          .single(),
        supabase
          .from("fragments")
          .select("*")
          .eq("job_id", jobId)
          .order("captured_at", { ascending: false }),
      ]);
      setJob(j as JobWithSite);
      setFragments((f as Fragment[]) ?? []);
    } catch (e) {
      setConfigError((e as Error).message);
    }
  }, [jobId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch; setState runs after await
    load();
  }, [load]);

  const onCaptured = useCallback((fragment: Fragment) => {
    setFragments((prev) => [fragment, ...prev]);
  }, []);

  if (configError) {
    return (
      <>
        <AppHeader back={{ href: `/jobs/${jobId}`, label: "Job" }} />
        <ConfigNotice message={configError} />
      </>
    );
  }

  const today = dayKey(new Date().toISOString());
  const todays = fragments.filter((f) => dayKey(f.captured_at) === today);

  return (
    <>
      <AppHeader back={{ href: `/jobs/${jobId}`, label: "Job" }} />
      <main className="field-surface mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 py-6">
        {job && (
          <div className="mb-6 text-center">
            <div className="text-lg font-semibold">
              {job.sites?.customer_name ?? "Job"}
            </div>
            <div className="text-sm text-ink-soft">
              {job.sites?.system_description ?? ""}
              {job.call_number ? ` · ${job.call_number}` : ""}
            </div>
          </div>
        )}

        <div className="my-4">
          <RecordButton jobId={jobId} onCaptured={onCaptured} />
        </div>

        <section className="mt-8 w-full">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Today&apos;s notes
            </h2>
            <Badge tone="peach">{todays.length}</Badge>
          </div>
          {todays.length === 0 ? (
            <p className="text-sm text-ink-soft">
              No notes yet today. Tap the button above to drop your first one.
            </p>
          ) : (
            <ul className="space-y-2">
              {todays.map((f) => (
                <li
                  key={f.id}
                  className="rounded-xl border border-line bg-card p-3"
                >
                  <div className="mb-1 flex items-center gap-2 text-xs text-ink-soft">
                    <span className="font-medium text-blue-dark">
                      {formatTime(f.captured_at)}
                    </span>
                    {f.duration_seconds ? (
                      <span>· {Math.round(f.duration_seconds)}s</span>
                    ) : null}
                  </div>
                  <p className="text-sm text-ink">
                    {f.raw_transcript?.trim()
                      ? f.raw_transcript
                      : "(audio saved — transcript pending)"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
