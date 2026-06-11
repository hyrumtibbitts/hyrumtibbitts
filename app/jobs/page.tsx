"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";
import { ConfigNotice } from "@/components/ConfigNotice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Job, JobStatus, Site } from "@/lib/types";

type JobWithSite = Job & { sites: Pick<Site, "customer_name" | "system_description"> | null };

const STATUS_TONE: Record<JobStatus, "peach" | "blue" | "good"> = {
  open: "peach",
  assembling: "blue",
  submitted: "good",
};

export default function JobsPage() {
  const [configError, setConfigError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobWithSite[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // New-job form state
  const [siteId, setSiteId] = useState("");
  const [callNumber, setCallNumber] = useState("");
  const [arrival, setArrival] = useState("");

  const load = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowser();
      const [jobsRes, sitesRes] = await Promise.all([
        supabase
          .from("jobs")
          .select("*, sites(customer_name, system_description)")
          .order("created_at", { ascending: false }),
        supabase.from("sites").select("*").order("customer_name"),
      ]);
      if (jobsRes.error) throw jobsRes.error;
      if (sitesRes.error) throw sitesRes.error;
      setJobs((jobsRes.data as JobWithSite[]) ?? []);
      setSites((sitesRes.data as Site[]) ?? []);
      if (!siteId && sitesRes.data?.[0]) setSiteId(sitesRes.data[0].id);
    } catch (e) {
      setConfigError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch; setState runs after await
    load();
  }, [load]);

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    if (!siteId) return;
    setCreating(true);
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.from("jobs").insert({
        site_id: siteId,
        call_number: callNumber || null,
        service_arrival_date: arrival || null,
        status: "open",
      });
      if (error) throw error;
      setCallNumber("");
      setArrival("");
      setShowNew(false);
      await load();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setCreating(false);
    }
  }

  if (configError) {
    return (
      <>
        <AppHeader />
        <ConfigNotice message={configError} />
      </>
    );
  }

  return (
    <>
      <AppHeader
        right={
          <Button size="sm" onClick={() => setShowNew((s) => !s)}>
            <Plus className="h-4 w-4" /> New job
          </Button>
        }
      />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="mb-1 text-2xl font-bold tracking-tight">Jobs</h1>
        <p className="mb-5 text-sm text-ink-soft">
          Pick a job, then capture in the field — one tap, talk, pocket the phone.
        </p>

        {showNew && (
          <Card className="mb-6">
            <CardContent>
              <form onSubmit={createJob} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="site">Site</Label>
                  {sites.length === 0 ? (
                    <p className="text-sm text-ink-soft">
                      No sites yet — seed one (see <code>supabase/seed.sql</code>).
                    </p>
                  ) : (
                    <select
                      id="site"
                      value={siteId}
                      onChange={(e) => setSiteId(e.target.value)}
                      className="h-11 w-full rounded-xl border border-line bg-card px-3 text-base"
                    >
                      {sites.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.customer_name}
                          {s.system_description ? ` — ${s.system_description}` : ""}
                          {s.city ? ` (${s.city}${s.state ? ", " + s.state : ""})` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <Label htmlFor="call">Call number</Label>
                  <Input
                    id="call"
                    value={callNumber}
                    onChange={(e) => setCallNumber(e.target.value)}
                    placeholder="e.g. SR-44821"
                  />
                </div>
                <div>
                  <Label htmlFor="arrival">Service arrival</Label>
                  <Input
                    id="arrival"
                    type="date"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowNew(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={creating || !siteId}>
                    {creating ? "Creating…" : "Create job"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent>
              <p className="text-ink-soft">
                No jobs yet. Create one to start capturing.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link href={`/jobs/${job.id}`}>
                  <Card className="transition-colors hover:bg-cream-deep">
                    <CardContent className="flex items-center gap-3 py-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-semibold">
                            {job.sites?.customer_name ?? "Unknown site"}
                          </span>
                          <Badge tone={STATUS_TONE[job.status]}>{job.status}</Badge>
                        </div>
                        <div className="truncate text-sm text-ink-soft">
                          {job.sites?.system_description ?? "—"}
                          {job.call_number ? ` · ${job.call_number}` : ""}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-ink-soft" />
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
