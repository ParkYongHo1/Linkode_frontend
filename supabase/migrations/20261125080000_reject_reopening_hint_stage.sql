create or replace function public.start_hint_request(
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

  if exists (
    select 1
    from public.hint_requests h
    where h.user_id = p_user_id
      and h.problem_id = p_problem_id
      and h.stage = p_stage
      and h.status = 'completed'
  ) then
    return query select null::uuid, 'already_opened'::text;
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
