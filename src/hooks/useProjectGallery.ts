import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  cover_image: string;
}

export const useProjectGallery = (subcategory: string, category?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let query = supabase
          .from('projects')
          .select('id, title, slug, category, subcategory, cover_image')
          .eq('status', 'Published')
          .eq('subcategory', subcategory);

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [subcategory, category]);

  const generateProjectUrl = (project: Project) => {
    return `/projects/${project.slug}`;
  };

  return { projects, loading, error, generateProjectUrl };
};