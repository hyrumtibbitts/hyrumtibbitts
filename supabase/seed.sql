-- Seed a couple of test sites so you can create a job immediately.
insert into public.sites
  (customer_name, city, state, system_description, control_number, location, default_contacts)
values
  (
    'Mercy Regional Medical Center', 'Springfield', 'IL',
    'GE 660', 'CT-0420', 'Radiology — Basement, Room B12',
    '[{"name":"Dana Ruiz","role":"Imaging Supervisor","phone":"217-555-0142"}]'::jsonb
  ),
  (
    'Lakeside Imaging', 'Madison', 'WI',
    'Siemens SOMATOM', 'CT-1187', 'Outpatient — Suite 3',
    '[{"name":"Marcus Hale","role":"Lead Tech","phone":"608-555-0199"}]'::jsonb
  )
on conflict do nothing;
