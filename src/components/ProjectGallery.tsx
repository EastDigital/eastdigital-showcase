import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
interface Project {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  category: string;
  subcategory: string;
}
const ProjectGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select('id,title,slug,cover_image,category,subcategory,carousel_order,status,carousel').eq('status', 'Published').eq('carousel', true).order('carousel_order', {
        ascending: true,
        nullsFirst: false
      });
      if (!mounted) return;
      if (error) {
        console.error(error);
        setProjects([]);
      } else {
        setProjects((data as any || []).map((d: any) => ({
          id: d.id,
          title: d.title,
          slug: d.slug,
          cover_image: d.cover_image,
          category: d.category,
          subcategory: d.subcategory
        })));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Duplicate projects for seamless infinite scroll
  const allProjects = [...projects, ...projects];
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const autoScroll = () => {
      if (!isDraggingRef.current) {
        gallery.scrollLeft += 0.5;

        // Infinite loop logic
        const scrollableWidth = gallery.scrollWidth / 2;
        if (gallery.scrollLeft >= scrollableWidth) {
          gallery.scrollLeft -= scrollableWidth;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };
    const startDragging = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    const stopDragging = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        animationRef.current = requestAnimationFrame(autoScroll);
      }
    };

    // Start auto-scroll
    animationRef.current = requestAnimationFrame(autoScroll);

    // Event listeners
    gallery.addEventListener('mousedown', startDragging);
    gallery.addEventListener('touchstart', startDragging);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gallery.removeEventListener('mousedown', startDragging);
      gallery.removeEventListener('touchstart', startDragging);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);
  return <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center lg:text-left max-w-[850px] mb-12">
          <h2 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10 text-left">
            <span className="font-bold">Industry-Specific Visualizations. </span>
            <span className="font-light">Bespoke Results.</span>
          </h2>
          <p className="text-xl leading-relaxed tracking-wide text-gray-200 text-left">
            Our expertise is tailored to the distinct language and objectives of your sector. 
            Select your industry to see how we translate your challenges into visual triumphs.
          </p>
        </div>
      </div>
      
      <div ref={galleryRef} className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing" style={{
      WebkitOverflowScrolling: 'touch'
    }}>
        <div ref={wrapperRef} className="flex gap-6 px-8">
          {allProjects.map((project, index) => <Link key={project.slug + '-' + index} to={`/projects/${project.slug}`} className="flex-shrink-0 w-[300px] bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 relative group">
              <img src={project.cover_image || 'https://placehold.co/400x600/111/fff?text=No+Image'} alt={`${project.title} cover image`} loading="lazy" className="w-full h-[350px] object-cover" onError={e => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/111/fff?text=Image+Not+Found';
          }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-semibold text-base leading-5 tracking-wide text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="font-normal text-sm leading-tight tracking-wide text-accent">
                  {project.category}{project.subcategory ? ` • ${project.subcategory}` : ''}
                </p>
              </div>
            </Link>)}
        </div>
      </div>
    </section>;
};
export default ProjectGallery;