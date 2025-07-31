import { useEffect, useRef } from 'react';

interface Project {
  category: string;
  services: string;
  img: string;
}

const ProjectGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isDraggingRef = useRef(false);

  const projects: Project[] = [
    { category: 'Real Estate', services: '3D Walkthroughs, Architectural Renderings, Interactive Tours', img: 'https://www.eastdigital.in/img/ascon_001.jpg' },
    { category: 'Real Estate', services: 'Exterior Visualization, Interactive Tours', img: 'https://www.eastdigital.in/img/anantraj_001.jpg' },
    { category: 'Architecture & Design', services: '3D Architectural Renderings, Virtual Staging', img: 'https://www.eastdigital.in/img/afc_private_001.jpg' },
    { category: 'Real Estate', services: 'Apartment Complex Visualization', img: 'https://www.eastdigital.in/img/apartment_001.jpg' },
    { category: 'Infrastructure', services: 'Conceptual 3D Renderings, Process Animations', img: 'https://www.eastdigital.in/img/ascon_003.jpg' },
    { category: 'Real Estate', services: '3D Walkthroughs, Architectural Renderings', img: 'https://www.eastdigital.in/img/bahuguna_villa_001.jpg' },
    { category: 'Infrastructure', services: 'Power Plant Visualization', img: 'https://www.eastdigital.in/img/Reliance-Sasan_ex_01.jpg' },
    { category: 'Architecture & Design', services: 'Product 3D Renderings, Virtual Staging', img: 'https://www.eastdigital.in/img/afc_private_002.jpg' },
    { category: 'Infrastructure', services: 'Industrial Process Animation', img: 'https://www.eastdigital.in/img/Reliance-Sasan_ex_02.jpg' },
    { category: 'Infrastructure', services: 'Engineering 3D Models', img: 'https://www.eastdigital.in/img/Reliance-Sasan_ex_03.jpg' },
    { category: 'Architecture & Design', services: '3D Architectural Renderings', img: 'https://www.eastdigital.in/img/builders-art_001.jpg' },
    { category: 'Architecture & Design', services: 'Virtual Staging, Product 3D Renderings', img: 'https://www.eastdigital.in/img/afc_private_003.jpg' },
  ];

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

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center lg:text-left max-w-3xl mb-12">
          <h2 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10">
            <span className="font-bold">Industry-Specific Visualizations. </span>
            <span className="font-light">Bespoke Results.</span>
          </h2>
          <p className="text-xl leading-relaxed tracking-wide text-gray-200">
            Our expertise is tailored to the distinct language and objectives of your sector. 
            Select your industry to see how we translate your challenges into visual triumphs.
          </p>
        </div>
      </div>
      
      <div 
        ref={galleryRef}
        className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div 
          ref={wrapperRef}
          className="flex gap-6 px-8"
        >
          {allProjects.map((project, index) => (
            <a
              key={index}
              href="#"
              className="flex-shrink-0 w-[300px] bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 relative group"
            >
              <img
                src={project.img}
                alt="Project Image"
                className="w-full h-[350px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/111/fff?text=Image+Not+Found';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-semibold text-base leading-5 tracking-wide text-foreground mb-2">
                  {project.category}
                </h3>
                <p className="font-normal text-sm leading-tight tracking-wide text-accent">
                  {project.services}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;