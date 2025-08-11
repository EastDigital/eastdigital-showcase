-- Ensure public.projects has an automatic updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
begin
  if not exists (
    select 1 from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    where t.tgname = 'trg_projects_updated_at' and c.relname = 'projects'
  ) then
    create trigger trg_projects_updated_at
    before update on public.projects
    for each row execute function public.update_updated_at_column();
  end if;
end$$;

-- Create a public storage bucket for project media
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- Storage policies for the 'projects' bucket
-- Public read access for project media
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public read projects'
  ) then
    create policy "Public read projects"
    on storage.objects
    for select
    using (bucket_id = 'projects');
  end if;
end$$;

-- Allow anonymous uploads (DEV) to the projects bucket
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Dev: anon can insert projects'
  ) then
    create policy "Dev: anon can insert projects"
    on storage.objects
    for insert
    with check (bucket_id = 'projects');
  end if;
end$$;

-- Allow anonymous updates (DEV) for the projects bucket
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Dev: anon can update projects'
  ) then
    create policy "Dev: anon can update projects"
    on storage.objects
    for update
    using (bucket_id = 'projects');
  end if;
end$$;

-- Allow anonymous deletes (DEV) for the projects bucket (optional but useful during development)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Dev: anon can delete projects'
  ) then
    create policy "Dev: anon can delete projects"
    on storage.objects
    for delete
    using (bucket_id = 'projects');
  end if;
end$$;

-- Ensure DEV RLS policies exist for public.projects (idempotent guards)
-- View all projects
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Dev: anon can view all projects'
  ) then
    create policy "Dev: anon can view all projects"
    on public.projects
    for select
    using (true);
  end if;
end$$;

-- Insert projects
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Dev: anon can insert projects'
  ) then
    create policy "Dev: anon can insert projects"
    on public.projects
    for insert
    with check (true);
  end if;
end$$;

-- Update projects
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Dev: anon can update projects'
  ) then
    create policy "Dev: anon can update projects"
    on public.projects
    for update
    using (true);
  end if;
end$$;