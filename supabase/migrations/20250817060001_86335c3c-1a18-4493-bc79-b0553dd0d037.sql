-- Add heading fields for summary and case study content
ALTER TABLE public.projects 
ADD COLUMN summary_heading TEXT,
ADD COLUMN case_study_heading TEXT;