# FieldCapture — Service Report Voice Capture

A PWA for a field service engineer who repairs CT scanners. It splits the job
into two surfaces so report details stop decaying between the work and the
write-up:

1. **Field capture (in the moment)** — one giant tap target. Tap, talk for a few
   seconds, pocket the phone. Each fragment is auto-timestamped on capture. No
   forms in the field.
2. **Home assembly (review & approve)** — the pile of timestamped fragments is
   transcribed and fed to Claude, which assembles a structured report grouped by
   day, with a Corrective Action narrative and a per-day hours table. The
   engineer reviews a pre-filled, fully editable form, fixes mis-heard jargon,
   and submits.

The core insight: **capture happens when the numbers are in front of him;
assembly happens at home.** The home job flips from *remember everything* to
*review and approve*.

## Stack

- **Next.js (App Router)** + TypeScript, **Tailwind v4**
- **Supabase** — Postgres + Storage (audio) + Auth-ready schema
- **Anthropic** (`claude-sonnet-4-6`) for the extraction/structuring step
  (structured outputs → guaranteed-valid JSON)
- **Deepgram** (`nova-2`) for transcription, with domain **keyword boosting**,
  behind a `transcribe()` interface so Whisper can be swapped in
- **PWA** — installable, home-screen capable

## MVP slice (built)

- **Field capture** (`/jobs/[id]/capture`) — record a fragment, store audio in
  Supabase Storage, transcribe it, save the fragment with timestamp +
  transcript + confidence. Shows a running list of today's notes.
- **Job list / new job** (`/jobs`) — pick a seeded site, create a job, see its
  fragments grouped by day (`/jobs/[id]`).
- **Assemble + review** (`/jobs/[id]/assemble`) — one button runs the Claude
  extraction over the job's fragments, renders the structured report into an
  editable form (header from the site, Corrective Action entries, hours table),
  visually flags low-confidence items, and "Verify & submit" stamps the audit
  trail (`verified_at` / `verified_by`).

## Architecture notes

- **Stable site fields are never re-dictated.** Customer, city/state, system
  (e.g. "GE 660"), control #, location live on the `sites` record and flow into
  the report header at assembly time.
- **Every fragment is auto-timestamped at capture** — this is what makes the
  per-day hours and dated narrative assemble themselves.
- **Secrets stay server-side.** Audio upload + transcription (`/api/transcribe`)
  and assembly (`/api/assemble`) run as API routes using the Supabase service
  role + the Anthropic/Deepgram keys. The browser only uses the anon key for
  reads and low-risk writes (create job, verify report).
- **Domain glossary** (`lib/glossary.ts`) feeds both the Deepgram keyword boost
  and the Claude system prompt. The extraction prompt is told to flag — never
  invent — board/part numbers, error codes, and acronyms, and to leave hours
  blank (flagged) when not explicitly stated.
- **Audit-ready schema.** Reports carry `verified_at` / `verified_by`; the
  schema is shaped so immutable submission history can be added without a
  migration headache.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase / Anthropic / Deepgram

# Apply the schema to your Supabase project, then seed test sites:
#   supabase/migrations/0001_init.sql   (creates tables, storage bucket, RLS)
#   supabase/seed.sql                   (two test sites)
# (paste into the Supabase SQL editor, or use the Supabase CLI)

npm run dev      # http://localhost:3000  → redirects to /jobs
npm run build    # production build (type-checked)
npm run lint
```

Microphone capture requires a secure context (`localhost` or HTTPS).

Without `DEEPGRAM_API_KEY` the capture loop still works end-to-end — audio is
stored and the fragment is saved with a blank transcript for review-time entry.

## Data model

| Table | Purpose |
| --- | --- |
| `sites` | Stable per-customer/location info that should never be re-dictated. |
| `jobs` | A service visit tied to a site (call #, status, arrival/complete dates, % down, exam count). |
| `fragments` | Individual voice captures: audio ref, `captured_at`, raw transcript, confidence. Source of truth for the field. |
| `reports` | The assembled structured output: dated Corrective Action entries, hours table, header snapshot, flags, `verified` + audit fields. |

## Deferred (TODO — not built yet)

- **Offline-first recording queue** with sync-on-reconnect (the current service
  worker only enables install + an app-shell cache; it does **not** queue
  captures while offline).
- **PDF export** matching the company report template.
- **Email / export** of the finished report.
- **Auth + audit trail**: wire Supabase Auth, scope RLS to the signed-in
  engineer, and make verified reports append-only (immutable submission
  history). Current RLS is permissive for single-engineer MVP use.
