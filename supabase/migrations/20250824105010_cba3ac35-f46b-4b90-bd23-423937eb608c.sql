-- Create table for website page SEO data
CREATE TABLE public.page_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL UNIQUE,
  page_title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  canonical_url TEXT,
  is_indexed BOOLEAN NOT NULL DEFAULT true,
  is_followed BOOLEAN NOT NULL DEFAULT true,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  schema_json TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for analytics tracking codes
CREATE TABLE public.analytics_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for page_seo
CREATE POLICY "Public can view page SEO data" 
ON public.page_seo 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage page SEO data" 
ON public.page_seo 
FOR ALL 
USING (is_admin());

-- Create policies for analytics_codes
CREATE POLICY "Public can view enabled analytics codes" 
ON public.analytics_codes 
FOR SELECT 
USING (is_enabled = true);

CREATE POLICY "Admin can manage analytics codes" 
ON public.analytics_codes 
FOR ALL 
USING (is_admin());

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_page_seo_updated_at
BEFORE UPDATE ON public.page_seo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analytics_codes_updated_at
BEFORE UPDATE ON public.analytics_codes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default page SEO entries
INSERT INTO public.page_seo (page_slug, page_title, meta_title, meta_description) VALUES
('home', 'Home', 'East Digital - 3D Visualization & Architectural Services', 'Professional 3D visualization, architectural rendering, and engineering services for real estate and construction projects.'),
('about', 'About', 'About East Digital - Expert 3D Visualization Team', 'Learn about our experienced team specializing in 3D architectural visualization, walkthrough videos, and engineering models.'),
('expertise', 'Expertise', 'Our Expertise - 3D Visualization Services', 'Explore our comprehensive 3D visualization services including architectural rendering, walkthrough videos, and product visualization.'),
('contact', 'Contact', 'Contact East Digital - Get Your Quote Today', 'Contact our team for professional 3D visualization services. Get a custom quote for your architectural or engineering project.'),
('enquiry', 'Enquiry', 'Project Enquiry - East Digital 3D Services', 'Submit your project requirements and get a detailed proposal for 3D visualization and architectural rendering services.');

-- Insert default analytics platforms
INSERT INTO public.analytics_codes (platform, code, is_enabled) VALUES
('google_analytics', '', false),
('google_tag_manager', '', false),
('meta_pixel', '', false),
('twitter_pixel', '', false),
('linkedin_insight', '', false),
('custom_script', '', false);