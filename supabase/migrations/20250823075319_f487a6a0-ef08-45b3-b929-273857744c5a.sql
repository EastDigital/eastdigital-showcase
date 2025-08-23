-- Fix the security issue with the function search path
DROP FUNCTION IF EXISTS public.is_admin();

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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = public, auth;