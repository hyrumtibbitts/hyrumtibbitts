-- Field Service Voice Capture — initial schema
-- Run against your Supabase project (SQL editor or `supabase db push`).
--
-- Design note (medical-device service records): the schema carries audit-ready
-- columns (verified_at / verified_by, created_at) so an immutable submission
-- timestamp + who-signed-off trail can be enforced later WITHOUT a migration.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- sites: stable per-customer/location info that should NEVER be re-dictated.
-- ---------------------------------------------------------------------------
create table if not exists public.sites (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  customer_name      text not null,
  city               text,
  state              text,
  system_description text,          -- e.g. "GE 660"
  control_number     text,
  location           text,          -- room / dept within the site
  default_contacts   jsonb          -- [{ name, role, phone, email }]
);

-- ---------------------------------------------------------------------------
-- jobs: a service visit tied to a site.
-- ---------------------------------------------------------------------------
create table if not exists public.jobs (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  site_id               uuid not null references public.sites(id) on delete restrict,
  call_number           text,
  status                text not null default 'open'
                          check (status in ('open', 'assembling', 'submitted')),
  service_arrival_date  date,
  service_complete_date date,
  percent_down          int,        -- % down status
  exam_count            int
);
create index if not exists jobs_site_id_idx on public.jobs (site_id);

-- ---------------------------------------------------------------------------
-- fragments: individual voice captures (source of truth for the field).
-- ---------------------------------------------------------------------------
create table if not exists public.fragments (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  job_id           uuid not null references public.jobs(id) on delete cascade,
  audio_path       text,            -- path in the `fragments` storage bucket
  captured_at      timestamptz not null default now(), -- auto-stamped at capture
  raw_transcript   text,
  confidence       numeric,         -- 0..1 transcription confidence
  duration_seconds numeric
);
create index if not exists fragments_job_id_idx on public.fragments (job_id);
create index if not exists fragments_captured_at_idx on public.fragments (captured_at);

-- ---------------------------------------------------------------------------
-- reports: the assembled, structured output for a job (one per job).
-- ---------------------------------------------------------------------------
create table if not exists public.reports (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  job_id             uuid not null unique references public.jobs(id) on delete cascade,
  header             jsonb,         -- snapshot of stable site/job fields at assembly
  corrective_actions jsonb not null default '[]'::jsonb, -- [{date, narrative, flagged_terms[]}]
  hours_table        jsonb not null default '[]'::jsonb, -- [{date, labor_hours, travel_hours, needs_review}]
  flags              jsonb not null default '[]'::jsonb, -- global low-confidence items
  verified           boolean not null default false,
  verified_at        timestamptz,   -- immutable submission timestamp (audit)
  verified_by        text,          -- who signed off (audit)
  raw_model_output   jsonb          -- raw extraction output for audit/debug
);

-- ---------------------------------------------------------------------------
-- Storage bucket for raw audio fragments.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('fragments', 'fragments', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security.
--
-- MVP: single-engineer use. Reads + low-risk writes go through the anon key;
-- audio + assembly writes go through the service role (which bypasses RLS).
-- The policies below permit the anon/authenticated roles broadly.
--
-- TODO (before multi-user / production): wire Supabase Auth and scope these
-- policies to the signed-in engineer; make verified reports append-only.
-- ---------------------------------------------------------------------------
alter table public.sites      enable row level security;
alter table public.jobs       enable row level security;
alter table public.fragments  enable row level security;
alter table public.reports    enable row level security;

do $$
declare t text;
begin
  foreach t in array array['sites','jobs','fragments','reports'] loop
    execute format(
      'create policy %I on public.%I for all to anon, authenticated using (true) with check (true)',
      t || '_all_mvp', t
    );
  end loop;
end $$;
