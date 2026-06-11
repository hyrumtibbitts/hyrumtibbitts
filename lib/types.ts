// Domain types mirroring the Supabase schema (see supabase/migrations).

export type JobStatus = "open" | "assembling" | "submitted";

export interface Contact {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface Site {
  id: string;
  created_at: string;
  customer_name: string;
  city: string | null;
  state: string | null;
  system_description: string | null; // e.g. "GE 660"
  control_number: string | null;
  location: string | null;
  default_contacts: Contact[] | null;
}

export interface Job {
  id: string;
  created_at: string;
  site_id: string;
  call_number: string | null;
  status: JobStatus;
  service_arrival_date: string | null;
  service_complete_date: string | null;
  percent_down: number | null;
  exam_count: number | null;
}

export interface Fragment {
  id: string;
  created_at: string;
  job_id: string;
  audio_path: string | null;
  captured_at: string; // auto-stamped at capture — source of truth for the field
  raw_transcript: string | null;
  confidence: number | null; // 0..1
  duration_seconds: number | null;
}

// ---- Assembled report shapes (also the Claude extraction schema) ----

export interface CorrectiveAction {
  date: string; // calendar day, e.g. "5-9-2025"
  narrative: string; // clean prose, prefixed with the date
  flagged_terms: string[]; // low-confidence jargon to highlight for review
}

export interface HoursRow {
  date: string; // "5-9-2025"
  labor_hours: number | null; // null = stated hours missing
  travel_hours: number | null;
  needs_review: boolean; // true when hours were not explicitly stated
}

/** The structured payload Claude returns and the engineer reviews. */
export interface AssembledReport {
  corrective_actions: CorrectiveAction[];
  hours_table: HoursRow[];
  flags: string[]; // global low-confidence items (board #s, error codes, acronyms)
}

export interface ReportHeader {
  customer_name: string | null;
  city: string | null;
  state: string | null;
  system_description: string | null;
  control_number: string | null;
  location: string | null;
  call_number: string | null;
  service_arrival_date: string | null;
  service_complete_date: string | null;
  percent_down: number | null;
  exam_count: number | null;
}

export interface Report {
  id: string;
  created_at: string;
  updated_at: string;
  job_id: string;
  header: ReportHeader | null;
  corrective_actions: CorrectiveAction[];
  hours_table: HoursRow[];
  flags: string[];
  verified: boolean;
  verified_at: string | null; // immutable submission timestamp (audit trail)
  verified_by: string | null; // who signed off (audit trail)
  raw_model_output: unknown;
}
