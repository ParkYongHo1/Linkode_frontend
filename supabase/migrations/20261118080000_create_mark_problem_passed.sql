create function public.mark_problem_passed(p_problem_id uuid)
returns void
language sql
security invoker
set search_path = ''
as $$
  insert into public.user_progress as up
    (user_id, problem_id, status, passed_at, updated_at)
  values
    (auth.uid(), p_problem_id, 'passed', now(), now())
  on conflict (user_id, problem_id) do update
  set status = 'passed',
      passed_at = coalesce(up.passed_at, now()),
      updated_at = now();
$$;

revoke execute on function public.mark_problem_passed(uuid) from public, anon;
grant execute on function public.mark_problem_passed(uuid) to authenticated;
