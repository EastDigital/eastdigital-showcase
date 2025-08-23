-- Drop ALL existing constraints on projects table that might conflict
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_check;
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_subcategory_check;

-- First update existing data to match new subcategory names
UPDATE projects SET subcategory = '3D Walkthrough Video' WHERE subcategory = '3D Walkthrough Videos';
UPDATE projects SET subcategory = '3D Still Renderings' WHERE subcategory = 'Architectural Still Renderings';  
UPDATE projects SET subcategory = 'Architectural 3D Rendering' WHERE subcategory = '3D Architectural Rendering';
UPDATE projects SET subcategory = 'Engineering 3D Models' WHERE subcategory = 'Process Animations';

-- Create new constraint with updated subcategory names that match frontend constants
ALTER TABLE public.projects ADD CONSTRAINT projects_subcategory_check 
CHECK (
  ((category = 'REAL ESTATE' AND subcategory = ANY (ARRAY['3D Walkthrough Video', '3D Still Renderings']))) OR
  ((category = 'INFRASTRUCTURE' AND subcategory = ANY (ARRAY['Conceptual 3D Renderings', 'Engineering 3D Models']))) OR
  ((category = 'ARCHITECTURE & DESIGN' AND subcategory = ANY (ARRAY['Architectural 3D Rendering', 'Product 3D Rendering'])))
);