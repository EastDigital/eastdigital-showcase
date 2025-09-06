import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  cover_image: string;
}

interface DynamicProjectGalleryProps {
  subcategory: string;
  category?: string;
}

const DynamicProjectGallery: React.FC<DynamicProjectGalleryProps> = ({ 
  subcategory, 
  category 
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [subcategory, category]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg bg-card border">
                <div className="aspect-video relative animate-pulse bg-muted"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="text-center text-muted-foreground">
            No projects available for this category yet.
          </div>
        </div>
      </section>
    );
  }

  const generateProjectUrl = (project: Project) => {
    const categorySlug = project.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const subcategorySlug = project.subcategory.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `/expertise/${categorySlug}/${subcategorySlug}/projects/${project.slug}`;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id}
              to={generateProjectUrl(project)}
              className="relative group overflow-hidden rounded-lg bg-card border block"
            >
              <div className="aspect-video relative">
                <img 
                  src={project.cover_image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/640x360/f0f0f0/666666?text=Image+Not+Available';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gray-300 font-medium">{project.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicProjectGallery;