-- Create storage bucket for proposal files
INSERT INTO storage.buckets (id, name, public) VALUES ('proposal-files', 'proposal-files', false);

-- Create storage policies for proposal files
CREATE POLICY "Users can upload proposal files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'proposal-files');

CREATE POLICY "Users can view their own proposal files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'proposal-files');

CREATE POLICY "Users can delete their own proposal files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'proposal-files');