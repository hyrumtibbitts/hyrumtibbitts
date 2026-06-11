"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mic, FileText, MapPin } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";
import { ConfigNotice } from "@/components/ConfigNotice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Fragment, Job, JobStatus, Report, Site } from "@/lib/types";
import { dayKey, formatDayHeading, formatTime } from "@/lib/utils";

type JobWithSite = Job & { sites: Site | null };

const STATUS_TONE: Record<JobStatus, "peach" | "blue" | "good"> = {
  open: "peach",
  assembling: "blue",
  submitted: "good",
};

export default function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [configError, setConfigError] = useState<string | null>(null);
  const [job, setJob] = useState<JobWithSite | null>(null);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowser();
      const [{ data: j }, { data: f }, { data: r }] = await Promise.all([
        supabase.from("jobs").select("*, sites(*)").eq("id", jobId).single(),
        supabase
          .from("fragments")
          .select("*")
          .eq("job_id", jobId)
          .order("captured_at", { ascending: true }),
        supabase.from("reports").select("*").eq("job_id", jobId).maybeSingle(),
      ]);
      setJob(j as JobWithSite);
      setFragments((f as Fragment[]) ?? []);
      setReport((r as Report) ?? null);
    } catch (e) {
      setConfigError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch; setState runs after await
    load();
  }, [load]);

  const grouped = useMemo(() => {
    const map = new Map<string, Fragment[]>();
    for (const f of fragments) {
      const k = dayKey(f.captured_at);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(f);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [fragments]);

  if (configError) {
    return (
      <>
        <AppHeader back={{ href: "/jobs", label: "Jobs" }} />
        <ConfigNotice message={configError} />
      </>
    );
  }

  const site = job?.sites;

  return (
    <>
      <AppHeader back={{ href: "/jobs", label: "Jobs" }} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : !job ? (
          <p className="text-ink-soft">Job not found.</p>
        ) : (
          <>
            {/* Stable site/job header — never re-dictated in the field */}
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {site?.customer_name ?? "Job"}
                </h1>
                <Badge tone={STATUS_TONE[job.status]}>{job.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                {site?.system_description && <span>{site.system_description}</span>}
                {(site?.city || site?.state) && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {[site?.city, site?.state].filter(Boolean).join(", ")}
                  </span>
                )}
                {site?.control_number && <span>Control #{site.control_number}</span>}
                {job.call_number && <span>Call {job.call_number}</span>}
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <Link href={`/jobs/${jobId}/capture`}>
                <Button size="lg" className="w-full">
                  <Mic className="h-5 w-5" /> Capture in field
                </Button>
              </Link>
              <Link href={`/jobs/${jobId}/assemble`}>
                <Button size="lg" variant="secondary" className="w-full">
                  <FileText className="h-5 w-5" />
                  {report ? "Review report" : "Assemble report"}
                </Button>
              </Link>
            </div>

            {report?.verified && (
              <Card className="mb-6 border-good/30 bg-[#eef6ef]">
                <CardContent className="py-3 text-sm text-good">
                  Verified &amp; submitted
                  {report.verified_at
                    ? ` on ${new Date(report.verified_at).toLocaleString()}`
                    : ""}
                  {report.verified_by ? ` by ${report.verified_by}` : ""}.
                </CardContent>
              </Card>
            )}

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Captured notes ({fragments.length})
            </h2>

            {grouped.length === 0 ? (
              <Card>
                <CardContent>
                  <p className="text-ink-soft">
                    No notes yet.{" "}
                    <Link
                      href={`/jobs/${jobId}/capture`}
                      className="font-medium text-blue-dark underline"
                    >
                      Start capturing
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-5">
                {grouped.map(([k, items]) => (
                  <div key={k}>
                    <h3 className="mb-2 font-semibold text-ink">
                      {formatDayHeading(items[0].captured_at)}
                      <span className="ml-2 text-sm font-normal text-ink-soft">
                        {items.length} note{items.length === 1 ? "" : "s"}
                      </span>
                    </h3>
                    <ul className="space-y-2">
                      {items.map((f) => (
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
                            {typeof f.confidence === "number" && (
                              <span>· {Math.round(f.confidence * 100)}% conf</span>
                            )}
                          </div>
                          <p className="text-sm text-ink">
                            {f.raw_transcript?.trim()
                              ? f.raw_transcript
                              : "(audio saved — transcript pending)"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
