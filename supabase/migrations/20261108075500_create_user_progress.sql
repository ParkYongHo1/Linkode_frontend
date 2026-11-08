create table public.user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  problem_id uuid not null references public.problems (id) on delete cascade,
  status text not null check (status in ('in_progress', 'passed')),
  passed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, problem_id)
);

create index user_progress_user_updated_idx
  on public.user_progress (user_id, updated_at desc);

alter table public.user_progress enable row level security;

grant select, insert, update on public.user_progress to authenticated;

create policy "내 진행 기록만 볼 수 있다"
  on public.user_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "내 진행 기록만 추가할 수 있다"
  on public.user_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "내 진행 기록만 수정할 수 있다"
  on public.user_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
