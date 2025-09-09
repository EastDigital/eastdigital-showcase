-- Add additional analytics platforms to the analytics_codes table
INSERT INTO public.analytics_codes (platform, code, is_enabled) VALUES
('meta_pixel', '', false),
('linkedin_insight', '', false), 
('hubspot_analytics', '', false),
('custom_script', '', false)
ON CONFLICT (platform) DO NOTHING;