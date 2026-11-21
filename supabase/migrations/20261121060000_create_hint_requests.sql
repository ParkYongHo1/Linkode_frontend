create table public.hint_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  problem_id uuid not null references public.problems (id) on delete cascade,
  stage int not null check (stage between 1 and 3),
  status text not null default 'pending'
    check (status in ('pending', 'streaming', 'completed', 'failed', 'aborted')),
  charged boolean not null default false,
  code_version int not null check (code_version >= 0),
  content text,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create index hint_requests_user_created_idx
  on public.hint_requests (user_id, created_at desc);

create index hint_requests_user_problem_idx
  on public.hint_requests (user_id, problem_id, stage);

create unique index hint_requests_one_active_per_user_idx
  on public.hint_requests (user_id)
  where status in ('pending', 'streaming');

alter table public.hint_requests enable row level security;

grant select on public.hint_requests to authenticated;
grant select, insert, update on public.hint_requests to service_role;

create policy "내 힌트 기록만 볼 수 있다"
  on public.hint_requests
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create function public.start_hint_request(
  p_user_id uuid,
  p_problem_id uuid,
  p_stage int,
  p_code_version int,
  p_daily_limit int
)
returns table (request_id uuid, reason text)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  day_start timestamptz :=
    date_trunc('day', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul';
  used_count int;
  new_id uuid;
begin
  update public.hint_requests
  set status = 'failed',
      charged = false,
      finished_at = now()
  where user_id = p_user_id
    and status in ('pending', 'streaming')
    and created_at < now() - interval '2 minutes';

  if exists (
    select 1
    from public.hint_requests h
    where h.user_id = p_user_id
      and h.status in ('pending', 'streaming')
  ) then
    return query select null::uuid, 'in_progress'::text;
    return;
  end if;

  if p_stage > 1 and not exists (
    select 1
    from public.hint_requests h
    where h.user_id = p_user_id
      and h.problem_id = p_problem_id
      and h.stage = p_stage - 1
      and h.status = 'completed'
  ) then
    return query select null::uuid, 'stage_locked'::text;
    return;
  end if;

  select count(*)
  into used_count
  from public.hint_requests h
  where h.user_id = p_user_id
    and h.charged
    and h.created_at >= day_start;

  if used_count >= p_daily_limit then
    return query select null::uuid, 'quota_exceeded'::text;
    return;
  end if;

  begin
    insert into public.hint_requests (user_id, problem_id, stage, code_version)
    values (p_user_id, p_problem_id, p_stage, p_code_version)
    returning id into new_id;
  exception
    when unique_violation then
      return query select null::uuid, 'in_progress'::text;
      return;
  end;

  return query select new_id, null::text;
end;
$$;

create function public.mark_hint_streaming(p_request_id uuid)
returns void
language sql
security invoker
set search_path = ''
as $$
  update public.hint_requests
  set status = 'streaming',
      charged = true
  where id = p_request_id
    and status = 'pending';
$$;

create function public.finish_hint_request(
  p_request_id uuid,
  p_status text,
  p_content text
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if p_status not in ('completed', 'failed', 'aborted') then
    raise exception 'invalid status: %', p_status;
  end if;

  update public.hint_requests
  set status = p_status,
      charged = case when p_status = 'failed' then false else charged end,
      content = p_content,
      finished_at = now()
  where id = p_request_id
    and status in ('pending', 'streaming');
end;
$$;

revoke execute on function public.start_hint_request(uuid, uuid, int, int, int) from public, anon, authenticated;
revoke execute on function public.mark_hint_streaming(uuid) from public, anon, authenticated;
revoke execute on function public.finish_hint_request(uuid, text, text) from public, anon, authenticated;

grant execute on function public.start_hint_request(uuid, uuid, int, int, int) to service_role;
grant execute on function public.mark_hint_streaming(uuid) to service_role;
grant execute on function public.finish_hint_request(uuid, text, text) to service_role;
