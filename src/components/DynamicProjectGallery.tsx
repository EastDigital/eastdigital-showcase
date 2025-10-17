import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { triggerHapticFeedback, HapticPatterns } from '@/lib/haptics';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              to={generateProjectUrl(project)}
              onClick={() => triggerHapticFeedback(HapticPatterns.TAP)}
              className="group relative overflow-hidden rounded-xl border-2 border-border/50 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block bg-card"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={project.cover_image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/640x360/f0f0f0/666666?text=Image+Not+Available';
                  }}
                />
                {/* Permanent gradient for title visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                {/* Enhanced gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Always-visible title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Category badge at top-right */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                  <span className="text-xs text-white font-medium">
                    {project.subcategory}
                  </span>
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