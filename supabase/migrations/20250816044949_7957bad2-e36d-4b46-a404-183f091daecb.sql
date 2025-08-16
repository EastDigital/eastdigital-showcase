-- Remove dangerous development policies that allow anonymous users to modify data
DROP POLICY IF EXISTS "Dev: anon can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Dev: anon can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Dev: anon can update projects" ON public.projects;