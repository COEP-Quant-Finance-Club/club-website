create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 160),
  date text not null check (char_length(btrim(date)) between 1 and 80),
  time text not null default '' check (char_length(time) <= 80),
  venue text not null default '' check (char_length(venue) <= 160),
  status text not null default 'Planned' check (char_length(btrim(status)) between 1 and 120)
);

alter table public.events enable row level security;
revoke all on public.events from public, anon, authenticated;
grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

drop policy if exists "Anyone can view events" on public.events;
create policy "Anyone can view events"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "MFA event admins can add events" on public.events;
create policy "MFA event admins can add events"
  on public.events for insert
  to authenticated
  with check (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'events_admin'
    and auth.jwt() ->> 'aal' = 'aal2'
  );

drop policy if exists "MFA event admins can edit events" on public.events;
create policy "MFA event admins can edit events"
  on public.events for update
  to authenticated
  using (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'events_admin'
    and auth.jwt() ->> 'aal' = 'aal2'
  )
  with check (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'events_admin'
    and auth.jwt() ->> 'aal' = 'aal2'
  );

drop policy if exists "MFA event admins can delete events" on public.events;
create policy "MFA event admins can delete events"
  on public.events for delete
  to authenticated
  using (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'events_admin'
    and auth.jwt() ->> 'aal' = 'aal2'
  );

create or replace function public.enforce_event_limit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(486542, 12);
  if (select count(*) from public.events) >= 12 then
    raise exception 'Event limit reached (maximum 12).'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_event_limit on public.events;
create trigger enforce_event_limit
  before insert on public.events
  for each row execute function public.enforce_event_limit();

insert into public.events (id, title, date, time, venue, status)
values
  ('00000000-0000-4000-8000-000000000001', 'Bitcoin India Tour, COEP chapter', '2026-04-07', 'Time to be announced', 'COEP Tech University', 'completed'),
  ('00000000-0000-4000-8000-000000000002', 'Interactive session with Ashutosh Tiwari, Quant Developer', '2026-04-10', '', '', 'completed, recording available on yt'),
  ('00000000-0000-4000-8000-000000000003', 'Quant Research Workshop by Ted Dhawan, Quant researcher', 'To be Announced', 'Time to be announced', 'Online on youtube', 'Planned'),
  ('00000000-0000-4000-8000-000000000004', 'Interactive session with quant at Goldman Sachs', 'To be Announced', 'Time to be announced', 'To be announced', 'Planned'),
  ('00000000-0000-4000-8000-000000000005', 'Flagship event: COEP Quant club', 'To be Announced', 'Time to be announced', 'Venue To be announced', 'Planned')
on conflict (id) do nothing;
