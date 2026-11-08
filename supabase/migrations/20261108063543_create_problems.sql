create table public.problems (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  topic text not null,
  level text not null check (level in ('easy', 'normal', 'hard')),  
  estimated_minutes int not null,
  description text not null,
  starter_code text not null default '',
  test_cases jsonb not null default '[]'::jsonb,
  sort_order int not null,
  created_at timestamptz not null default now()
);

alter table public.problems enable row level security;

grant select on public.problems to anon, authenticated;

create policy "누구나 문제를 볼 수 있다"
  on public.problems
  for select
  to anon, authenticated
  using (true);