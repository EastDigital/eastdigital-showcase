-- Drop the old constraint with mismatched subcategory names
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_check;

-- Create new constraint with updated subcategory names that match frontend constants
ALTER TABLE public.projects ADD CONSTRAINT projects_subcategory_check 
CHECK (
  ((category = 'REAL ESTATE' AND subcategory = ANY (ARRAY['3D Walkthrough Video', '3D Still Renderings']))) OR
  ((category = 'INFRASTRUCTURE' AND subcategory = ANY (ARRAY['Conceptual 3D Renderings', 'Engineering 3D Models']))) OR
  ((category = 'ARCHITECTURE & DESIGN' AND subcategory = ANY (ARRAY['Architectural 3D Rendering', 'Product 3D Rendering'])))
);