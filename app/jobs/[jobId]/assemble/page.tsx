"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sparkles, RefreshCw } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";
import { AssembleForm } from "@/components/AssembleForm";
import { ConfigNotice } from "@/components/ConfigNotice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Report } from "@/lib/types";

export default function AssemblePage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [configError, setConfigError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [fragmentCount, setFragmentCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowser();
      const [{ data: r }, { count }] = await Promise.all([
        supabase.from("reports").select("*").eq("job_id", jobId).maybeSingle(),
        supabase
          .from("fragments")
          .select("id", { count: "exact", head: true })
          .eq("job_id", jobId),
      ]);
      setReport((r as Report) ?? null);
      setFragmentCount(count ?? 0);
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

  async function assemble() {
    setRunning(true);
    setError(null);
    try {
      const res = await fetch("/api/assemble", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Assembly failed");
      setReport(json.report as Report);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRunning(false);
    }
  }

  if (configError) {
    return (
      <>
        <AppHeader back={{ href: `/jobs/${jobId}`, label: "Job" }} />
        <ConfigNotice message={configError} />
      </>
    );
  }

  return (
    <>
      <AppHeader back={{ href: `/jobs/${jobId}`, label: "Job" }} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="mb-1 text-2xl font-bold tracking-tight">Assemble &amp; review</h1>
        <p className="mb-5 text-sm text-ink-soft">
          Claude drafts the report from your timestamped notes. Review, fix any
          mis-heard jargon, and approve.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-flag-soft px-4 py-3 text-sm text-flag">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : !report ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Sparkles className="mx-auto mb-3 h-10 w-10 text-blue" />
              <p className="mb-1 font-medium">
                {fragmentCount} note{fragmentCount === 1 ? "" : "s"} ready to assemble
              </p>
              <p className="mb-5 text-sm text-ink-soft">
                Group by day, draft the Corrective Action narrative, and pull the
                hours table — all in one pass.
              </p>
              <Button
                size="lg"
                onClick={assemble}
                disabled={running || fragmentCount === 0}
              >
                {running ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" /> Assembling…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" /> Assemble report
                  </>
                )}
              </Button>
              {fragmentCount === 0 && (
                <p className="mt-3 text-sm text-ink-soft">
                  No notes captured yet — record some first.
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {!report.verified && (
              <div className="mb-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={assemble} disabled={running}>
                  <RefreshCw
                    className={`h-4 w-4 ${running ? "animate-spin" : ""}`}
                  />
                  Re-assemble from notes
                </Button>
              </div>
            )}
            <AssembleForm report={report} onChange={setReport} />
          </>
        )}
      </main>
    </>
  );
}
