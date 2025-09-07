import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { triggerHapticFeedback, HapticPatterns } from '@/lib/haptics';
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
    // Use setTimeout to defer the API call and let the page render first
    const timeoutId = setTimeout(async () => {
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
    }, 100);
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Duplicate projects for seamless infinite scroll
  const allProjects = [...projects, ...projects];
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let isUserInteracting = false;
    let wheelTimeoutId: NodeJS.Timeout;
    const autoScroll = () => {
      if (!isDraggingRef.current && !isUserInteracting) {
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
      isUserInteracting = true;

      // Add haptic feedback for touch events
      if (e.type === 'touchstart') {
        triggerHapticFeedback(HapticPatterns.TAP);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    const stopDragging = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        // Resume auto-scroll after a short delay
        setTimeout(() => {
          isUserInteracting = false;
          animationRef.current = requestAnimationFrame(autoScroll);
        }, 1000);
      }
    };
    const handleWheel = (e: WheelEvent) => {
      // Pause auto-scroll during wheel events
      isUserInteracting = true;
      clearTimeout(wheelTimeoutId);

      // Resume auto-scroll after wheel interaction stops
      wheelTimeoutId = setTimeout(() => {
        isUserInteracting = false;
      }, 1500);
    };

    // Start auto-scroll
    animationRef.current = requestAnimationFrame(autoScroll);

    // Event listeners
    gallery.addEventListener('mousedown', startDragging);
    gallery.addEventListener('touchstart', startDragging);
    gallery.addEventListener('wheel', handleWheel, {
      passive: true
    });
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(wheelTimeoutId);
      gallery.removeEventListener('mousedown', startDragging);
      gallery.removeEventListener('touchstart', startDragging);
      gallery.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);
  return <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 w-full ">
        <div className="text-left lg:text-left w-full mb-12">
          <h2 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10 text-left">
            <span className="font-bold">Industry-Specific Visualizations. </span>
            <span className="font-light">Bespoke Results.</span>
          </h2>
          <p className="text-on-black text-xl w-[60%] md:w-[70%] lg:w-[90%]">
            Our expertise is tailored to the distinct language and objectives of your sector. 
            Select your industry to see how we translate your challenges into visual triumphs.
          </p>
        </div>
      </div>
      
      <div ref={galleryRef} className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing" style={{
      WebkitOverflowScrolling: 'touch'
    }}>
        <div ref={wrapperRef} className="flex gap-6 px-8">
          {allProjects.map((project, index) => {
          const categorySlug = project.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          const subcategorySlug = project.subcategory.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          const projectUrl = `/expertise/${categorySlug}/${subcategorySlug}/projects/${project.slug}`;
          return <Link key={project.slug + '-' + index} to={projectUrl} className="flex-shrink-0 w-[300px] bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 relative group">
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
            </Link>;
        })}
        </div>
      </div>
    </section>;
};
export default ProjectGallery;