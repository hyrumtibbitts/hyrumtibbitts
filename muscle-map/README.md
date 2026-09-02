# Muscle Map — Phase 1

Daily muscle-tracking app. Phase 1 = data + database schema only. No UI yet.

## Files

| Path | What it is |
|------|-----------|
| `data/muscles.json` | 31 muscle zones. Each `id` is one tap zone on the body map. `external_ids.biodigital` is an empty slot for BioDigital object ids. |
| `data/exercises.json` | 96 exercises. Each has `primary_muscles`, `secondary_muscles`, and `aliases` for name matching. |
| `supabase/migrations/0001_init.sql` | Tables, RLS policies, `muscle_status_on()` carry-forward function. |
| `supabase/seed.sql` | Generated from the JSON. Loads muscles, exercises, and links. |
| `scripts/validate-data.mjs` | Checks the JSON for bad ids and duplicates. |
| `scripts/generate-seed.mjs` | Rebuilds `seed.sql` from the JSON. |

## Tables

- `muscles` — reference data, read-only for users.
- `exercises` — seeded rows are global (`is_global = true`). Users can add their own rows.
- `exercise_muscles` — one row per (exercise, muscle, role). Role is `primary` or `secondary`.
- `workout_logs` — one row per workout session per user.
- `workout_sets` — one row per set: exercise, reps, weight, RPE.
- `daily_muscle_status` — one row per (user, muscle, date): trained, soreness, tightness, mind-muscle connection, note.

## Carry-forward rule

Muscles you did not train keep their last known state.
`select * from muscle_status_on('2026-09-02')` returns all 31 muscles. For each muscle it returns the newest status row on or before that date.

## Set up

1. Open the Supabase SQL editor.
2. Run `supabase/migrations/0001_init.sql`.
3. Run `supabase/seed.sql`.

## Edit the data

1. Edit `data/muscles.json` or `data/exercises.json`.
2. Run `node muscle-map/scripts/validate-data.mjs`.
3. Run `node muscle-map/scripts/generate-seed.mjs`.
4. Run the new `seed.sql` again. It is safe to run more than once.

## Next phases

- Phase 2: body map UI (low-poly model, React Three Fiber, one tap zone per muscle id).
- Phase 3: a trigger that writes `daily_muscle_status` rows when a workout is logged, and the detail panel.
