import { NextResponse } from "next/server";

import { assembleReport } from "@/lib/anthropic";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Job, ReportHeader, Site } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Home-assembly step: run the Claude extraction over a job's fragments and
 * upsert the structured, reviewable report. Does NOT verify — the engineer
 * reviews and approves on the assemble screen.
 */
export async function POST(req: Request) {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const jobId = body?.jobId;
  if (typeof jobId !== "string") {
    return NextResponse.json({ error: "Missing jobId." }, { status: 400 });
  }

  const { data: job, error: jobErr } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single<Job>();
  if (jobErr || !job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", job.site_id)
    .single<Site>();

  const { data: fragments, error: fragErr } = await supabase
    .from("fragments")
    .select("captured_at, raw_transcript, confidence")
    .eq("job_id", jobId)
    .order("captured_at", { ascending: true });
  if (fragErr) {
    return NextResponse.json({ error: fragErr.message }, { status: 500 });
  }

  // Header is composed from STABLE site/job fields — never re-dictated.
  const header: ReportHeader = {
    customer_name: site?.customer_name ?? null,
    city: site?.city ?? null,
    state: site?.state ?? null,
    system_description: site?.system_description ?? null,
    control_number: site?.control_number ?? null,
    location: site?.location ?? null,
    call_number: job.call_number,
    service_arrival_date: job.service_arrival_date,
    service_complete_date: job.service_complete_date,
    percent_down: job.percent_down,
    exam_count: job.exam_count,
  };

  let assembled;
  try {
    assembled = await assembleReport(fragments ?? [], header);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }

  // Upsert the report (one per job). Re-assembling overwrites the draft but the
  // verified flag/audit fields are reset to false until the engineer approves.
  const { data: report, error: upsertErr } = await supabase
    .from("reports")
    .upsert(
      {
        job_id: jobId,
        header,
        corrective_actions: assembled.report.corrective_actions,
        hours_table: assembled.report.hours_table,
        flags: assembled.report.flags,
        verified: false,
        verified_at: null,
        verified_by: null,
        raw_model_output: assembled.raw,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "job_id" },
    )
    .select()
    .single();

  if (upsertErr) {
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });
  }

  await supabase.from("jobs").update({ status: "assembling" }).eq("id", jobId);

  return NextResponse.json({ report });
}
