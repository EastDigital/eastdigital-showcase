BEGIN;

-- Safely drop triggers on projects if table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind = 'r' AND c.relname = 'projects' AND n.nspname = 'public'
  ) THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects';
    EXECUTE 'DROP TRIGGER IF EXISTS projects_slug_trigger ON public.projects';
  END IF;
END$$;

-- Drop functions if they exist (safe regardless of table existence)
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP FUNCTION IF EXISTS public.generate_project_slug(text);
DROP FUNCTION IF EXISTS public.update_project_slug();

-- Drop existing tables and related objects
DROP TABLE IF EXISTS public.enquiry_services CASCADE;
DROP TABLE IF EXISTS public.parent_services CASCADE;
DROP TABLE IF EXISTS public.sub_services CASCADE;
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
DROP TABLE IF EXISTS public.enquiries CASCADE;
DROP TABLE IF EXISTS public.industries CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.otp_verifications CASCADE;
DROP TABLE IF EXISTS public.trusted_devices CASCADE;

-- Drop types that may be referenced by dropped tables
DROP TYPE IF EXISTS public.enquiry_status;

-- Create admin_users to control admin write access
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Lock down admin_users (system-managed)
CREATE POLICY "Only system can access admin_users"
ON public.admin_users
AS RESTRICTIVE
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- Seed the single admin
INSERT INTO public.admin_users (email, is_active)
VALUES ('eastdigitalcompany@gmail.com', true)
ON CONFLICT (email) DO UPDATE SET is_active = EXCLUDED.is_active;

-- Main projects table per spec
CREATE TABLE public.projects (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT,
    cover_image TEXT, -- URL stored in Supabase storage
    gallery JSONB DEFAULT '[]'::jsonb, -- array of media URLs
    category TEXT NOT NULL CHECK (category IN ('REAL ESTATE', 'INFRASTRUCTURE', 'ARCHITECTURE & DESIGN')),
    subcategory TEXT NOT NULL CHECK (
        (category = 'REAL ESTATE' AND subcategory IN ('3D Walkthrough Videos', 'Architectural Still Renderings', 'Interactive Virtual Tours')) OR
        (category = 'INFRASTRUCTURE' AND subcategory IN ('Conceptual 3D Renderings', 'Process Animations', 'Engineering 3D Models')) OR
        (category = 'ARCHITECTURE & DESIGN' AND subcategory IN ('3D Architectural Rendering', 'Virtual Staging', 'Product 3D Renderings'))
    ),
    case_study_content JSONB DEFAULT '{}'::jsonb, -- rich text content stored as JSON
    carousel BOOLEAN DEFAULT FALSE,
    carousel_order INTEGER DEFAULT NULL, -- used only when carousel = true
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    schema_json TEXT, -- schema.org markup
    aiseo_keywords TEXT[],
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Slug generation + cleaning
CREATE OR REPLACE FUNCTION public.generate_project_slug(title text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  base_slug TEXT;
  candidate TEXT;
  counter INTEGER := 1;
BEGIN
  base_slug := lower(regexp_replace(regexp_replace(coalesce(title,''), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
  IF base_slug IS NULL OR base_slug = '' THEN
    base_slug := 'project';
  END IF;

  candidate := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.projects WHERE slug = candidate) LOOP
    candidate := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;

  RETURN candidate;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_project_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := public.generate_project_slug(NEW.title);
  ELSE
    NEW.slug := lower(regexp_replace(regexp_replace(NEW.slug, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
    -- ensure unique if edited
    DECLARE
      base_slug TEXT := NEW.slug;
      candidate TEXT := NEW.slug;
      counter INTEGER := 1;
    BEGIN
      WHILE EXISTS (SELECT 1 FROM public.projects WHERE slug = candidate AND id <> NEW.id) LOOP
        candidate := base_slug || '-' || counter;
        counter := counter + 1;
      END LOOP;
      NEW.slug := candidate;
    END;
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER projects_slug_trigger
BEFORE INSERT OR UPDATE OF title, slug ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_project_slug();

-- Enable RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view published projects
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
USING (status = 'Published');

-- Admin can view all projects
CREATE POLICY "Admin can view all projects"
ON public.projects
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
  )
);

-- Admin can insert
CREATE POLICY "Admin can insert projects"
ON public.projects
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
  )
);

-- Admin can update
CREATE POLICY "Admin can update projects"
ON public.projects
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
  )
);

-- Admin can delete
CREATE POLICY "Admin can delete projects"
ON public.projects
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
  )
);

-- Storage: create a public bucket for project media
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies p
    WHERE p.schemaname = 'storage' AND p.tablename = 'objects' AND p.policyname = 'Public read projects bucket'
  ) THEN
    CREATE POLICY "Public read projects bucket"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'projects');
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies p
    WHERE p.schemaname = 'storage' AND p.tablename = 'objects' AND p.policyname = 'Admin write projects bucket'
  ) THEN
    CREATE POLICY "Admin write projects bucket"
    ON storage.objects
    FOR ALL
    TO authenticated
    USING (
      bucket_id = 'projects' AND EXISTS (
        SELECT 1 FROM public.admin_users au
        WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
      )
    )
    WITH CHECK (
      bucket_id = 'projects' AND EXISTS (
        SELECT 1 FROM public.admin_users au
        WHERE au.email = (auth.jwt() ->> 'email') AND au.is_active = true
      )
    );
  END IF;
END$$;

COMMIT;