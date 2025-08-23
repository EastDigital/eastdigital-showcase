-- Fix the RLS policies to properly check JWT email claim
-- The issue is that auth.jwt() ->> 'email' might not work reliably in all cases
-- Let's use a more robust approach

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can view all projects" ON projects;
DROP POLICY IF EXISTS "Admin can insert projects" ON projects;
DROP POLICY IF EXISTS "Admin can update projects" ON projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON projects;

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_email TEXT;
BEGIN
  -- Get email from auth.users table using auth.uid()
  SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
  
  -- Check if this email exists in admin_users and is active
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recreate policies using the security definer function
CREATE POLICY "Admin can view all projects" 
ON public.projects 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admin can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update projects" 
ON public.projects 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admin can delete projects" 
ON public.projects 
FOR DELETE 
USING (public.is_admin());