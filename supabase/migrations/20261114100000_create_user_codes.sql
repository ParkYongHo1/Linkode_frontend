create table public.user_codes (
  user_id uuid not null references auth.users (id) on delete cascade,
  problem_id uuid not null references public.problems (id) on delete cascade,
  code text not null,
  version int not null default 1,
  updated_at timestamptz not null default now(),
  primary key (user_id, problem_id)
);

alter table public.user_codes enable row level security;

grant select on public.user_codes to authenticated;

create policy "내 코드만 볼 수 있다"
  on public.user_codes
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "내 코드만 추가할 수 있다"
  on public.user_codes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "내 코드만 수정할 수 있다"
  on public.user_codes
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create function public.save_user_code(
  p_problem_id uuid,
  p_code text,
  p_expected_version int
)
returns int
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_version int;
begin
  if p_expected_version = 0 then
    insert into public.user_codes (user_id, problem_id, code, version)
    values (auth.uid(), p_problem_id, p_code, 1)
    on conflict (user_id, problem_id) do nothing
    returning version into new_version;
  else
    update public.user_codes
    set code = p_code,
        version = version + 1,
        updated_at = now()
    where user_id = auth.uid()
      and problem_id = p_problem_id
      and version = p_expected_version
    returning version into new_version;
  end if;

  if new_version is not null then
    insert into public.user_progress (user_id, problem_id, status)
    values (auth.uid(), p_problem_id, 'in_progress')
    on conflict (user_id, problem_id) do update
    set updated_at = now();
  end if;

  return new_version;
end;
$$;

revoke execute on function public.save_user_code(uuid, text, int) from public, anon;
grant execute on function public.save_user_code(uuid, text, int) to authenticated;
