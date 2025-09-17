import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
}

const Footer = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('id, title, slug, category, subcategory')
          .eq('status', 'Published')
          .limit(15);
        
        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const generateProjectUrl = (project: Project) => {
    const categorySlug = project.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const subcategorySlug = project.subcategory.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `/expertise/${categorySlug}/${subcategorySlug}/projects/${project.slug}`;
  };

  return (
    <footer className="bg-background">
      {/* Main Contact Section */}
      <div className="relative py-20 sm:py-32">
        <div className="absolute inset-0">
          <img 
            src="https://eastdigital.in/img/contact-us.jpg" 
            alt="Contact background" 
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-start justify-between min-h-[40vh]">
          {/* Top Content */}
          <div className="max-w-[auto]">
            <h2 className="font-bold text-on-graphics mb-8 sm:mb-10">
              Ready to discuss your next project?
            </h2>
            
            <div className="space-y-6 sm:space-y-8 max-w-lg">
              <div>
                <p className="leading-relaxed tracking-wide text-on-graphics mb-2">
                  Send us an email to get the conversation started.
                </p>
                <a 
                  href="mailto:business@eastdigital.in" 
                  className="leading-relaxed tracking-wide text-cta hover:text-cta-hover transition-colors break-words"
                >
                  business@eastdigital.in
                </a>
              </div>
              
              <div>
                <p className="leading-relaxed tracking-wide text-on-graphics mb-6">
                  If you need guidance on what information should be provided, simply fill out our request a proposal form below.
                </p>
                <a 
                  href="/enquiry" 
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-cta bg-background/15 backdrop-blur border border-transparent font-semibold transition-all duration-300 cta-border group hover:text-cta-hover"
                >
                  <svg className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="relative z-10">Request Proposal</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Content */}
          <div className="w-full mt-12 sm:mt-16 max-w-[850px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-foreground flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm sm:text-base leading-relaxed tracking-wide text-foreground">
                  2nd Floor, JSV Hyundai Building, Near Engineering College,<br className="hidden sm:block"/>
                  <span className="sm:hidden"> </span>Lucknow, Uttar Pradesh, INDIA - 226021
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="tel:+919910568689" 
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground bg-background/15 backdrop-blur border border-transparent font-semibold transition-all duration-300 cta-border group"
                >
                  <svg className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="flex flex-col text-left relative z-10">
                    <span className="text-sm font-normal">Call Now</span>
                    <span className="text-base font-bold">+91 99105 68689</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-Footer */}
      <div className="bg-background py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-6 sm:gap-8 mb-6 sm:mb-8">
            <img 
              src="https://www.eastdigital.in/img/logo-east-digital-white.png" 
              alt="East Digital Logo" 
              className="h-10 sm:h-12 self-start"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/200x50/111/fff?text=East+Digital';
              }}
            />
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 text-base sm:text-sm">
                <a href="/" className="text-foreground hover:text-accent transition-colors py-2">Home</a>
                <a href="/expertise" className="text-foreground hover:text-accent transition-colors py-2">Expertise</a>
                <a href="/projects" className="text-foreground hover:text-accent transition-colors py-2">Projects</a>
                <a href="/about" className="text-foreground hover:text-accent transition-colors py-2">About</a>
                <a href="/contact" className="text-foreground hover:text-accent transition-colors py-2">Connect</a>
                <a href="#" className="text-foreground hover:text-accent transition-colors py-2">Career</a>
                <a href="/faq" className="text-foreground hover:text-accent transition-colors py-2">FAQ</a>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-shrink-0">
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@EastDigitalIndia" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="w-7 h-7 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
                >
                  <path d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.123C19.584 3.5 12 3.5 12 3.5s-7.584 0-9.382.563a2.997 2.997 0 0 0-2.116 2.123C0 8.002 0 12 0 12s0 3.998.502 5.814a2.997 2.997 0 0 0 2.116 2.123C4.416 20.5 12 20.5 12 20.5s7.584 0 9.382-.563a2.997 2.997 0 0 0 2.116-2.123C24 15.998 24 12 24 12s0-3.998-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/eastdigitalindia" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="url(#igGradient)"
                  className="w-7 h-7 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
                >
                  <defs>
                    <linearGradient id="igGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="25%" stopColor="#fa7e1e" />
                      <stop offset="50%" stopColor="#d62976" />
                      <stop offset="75%" stopColor="#962fbf" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm6.406-1.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881zM12 7.838a4.162 4.162 0 1 1 0 8.324 4.162 4.162 0 0 1 0-8.324z" />
                </svg>
              </a>
              
              {/* Behance */}
              <a 
                href="https://www.behance.net/eastdigital" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-7 h-7 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform"
                >
                  <path d="M7.066 10.566c.673-.325 1.085-.854 1.085-1.764 0-1.274-.929-2.198-2.843-2.198H0v9.796h5.623c1.979 0 3.011-1.003 3.011-2.456 0-1.108-.618-1.804-1.568-2.135zm-4.219-2.79h1.767c.872 0 1.307.357 1.307 1.022 0 .655-.435 1.029-1.307 1.029H2.847V7.776zm1.91 6.379H2.847v-2.25h1.963c.938 0 1.397.403 1.397 1.123 0 .719-.459 1.127-1.397 1.127zM23.096 9.318H18.13v1.338h4.966v-1.338zm-6.878-2.247c-3.06 0-4.943 2.012-4.943 5.018 0 3.053 1.884 5.019 5.011 5.019 2.385 0 4.061-1.085 4.61-3.089h-2.373c-.261.802-.918 1.338-2.204 1.338-1.442 0-2.322-.811-2.322-2.234h6.999c.031-.231.051-.519.051-.878 0-2.771-1.632-5.174-4.829-5.174zm-2.167 3.923c.051-1.101.827-1.938 2.157-1.938 1.327 0 2.079.807 2.126 1.938h-4.283z" />
                </svg>
              </a>
              
              {/* Back to Top */}
              <a 
                href="#top" 
                className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-foreground transition-colors"
              >
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </a>
              </div>
            </div>
          </div>
          
          {/* Projects Tag Cloud */}
          {projects.length > 0 && (
            <div className="border-t border-border pt-6 pb-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">Featured Projects</h3>
              <div className="flex flex-wrap gap-2">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={generateProjectUrl(project)}
                    className="inline-block px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full border border-border hover:border-accent transition-all duration-200"
                  >
                    {project.title}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t border-border pt-4 sm:pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center text-muted-foreground text-sm sm:text-xs">
              <p>&copy; 2025 East Digital.</p>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                <a href="/terms-of-use" className="hover:text-foreground transition-colors py-1">Terms Of Use</a>
                <a href="/privacy-policy" className="hover:text-foreground transition-colors py-1">Privacy Policy</a>
                <a href="/sitemap" className="hover:text-foreground transition-colors py-1">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;