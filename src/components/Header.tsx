import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileExpertiseOpen, setIsMobileExpertiseOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 flex items-center h-[70px] sm:h-[75px] transition-all duration-300 ${isSticky ? 'glass-effect' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-full">
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img src="https://www.eastdigital.in/img/logo-east-digital-white.png" alt="East Digital Logo" className="h-10 sm:h-12" onError={e => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/200x50/111/fff?text=East+Digital';
            }} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 h-full">
            <Link to="/" className="text-cta hover:text-cta-hover font-semibold transition-colors duration-300">
              Home
            </Link>
            <div className="group h-full flex items-center">
              <Link to="/expertise" className="text-cta hover:text-cta-hover font-semibold transition-colors duration-300 flex items-center">
                Expertise
                <svg className="ml-2 transition-transform duration-300 group-hover:rotate-180" width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15L6 9H18L12 15Z" fill="currentColor" />
                </svg>
              </Link>
              
              {/* Mega Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[878px] max-w-[95vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 z-50">
                <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card to-card shadow-2xl ring-1 ring-border/40 p-8 md:p-10">
                  <div className="grid grid-cols-3 gap-8 md:gap-10">
                    <div className="space-y-3">
                      <div className="min-h-[50px] flex items-center">
                        <Link to="/expertise/real-estate" className="font-semibold text-cta hover:text-cta-hover transition-colors duration-300 tracking-wider">
                          REAL ESTATE
                        </Link>
                      </div>
                      <p className="font-light text-xs text-muted-foreground">
                        Launch your project with<br />3d walkthrough video.
                      </p>
                      <ul className="space-y-1.5 text-foreground">
                        <li><Link to="/expertise/real-estate/3d-walkthrough-video" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">3D Walkthrough Video</Link></li>
                        <li><Link to="/expertise/real-estate/3d-still-renderings" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">3D Still Renderings</Link></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground">Ideal for: Real Estate Marketing</p>
                    </div>

                    <div className="space-y-3">
                      <div className="min-h-[50px] flex items-center">
                        <Link to="/expertise/infrastructure" className="font-semibold text-cta hover:text-cta-hover transition-colors duration-300 tracking-wider">
                          INFRASTRUCTURE
                        </Link>
                      </div>
                      <p className="font-light text-xs text-muted-foreground">
                        Present your project to the<br />investors/authorities.
                      </p>
                      <ul className="space-y-1.5 text-foreground">
                        <li><Link to="/expertise/infrastructure/conceptual-3d-renderings" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">Conceptual 3D Renderings</Link></li>
                        <li><Link to="/expertise/infrastructure/engineering-3d-models" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">Engineering 3D Models</Link></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground">Ideal for: Project Tender & Updates</p>
                    </div>

                    <div className="space-y-3">
                      <div className="min-h-[50px] flex items-center">
                        <Link to="/expertise/architecture-design" className="font-semibold text-cta hover:text-cta-hover transition-colors duration-300 tracking-wider">
                          ARCHITECTURE<br />& DESIGN
                        </Link>
                      </div>
                      <p className="font-light text-xs text-muted-foreground">
                        For client approvals and<br />internal assessment.
                      </p>
                      <ul className="space-y-1.5 text-foreground">
                        <li><Link to="/expertise/architecture-design/architectural-3d-rendering" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">Architectural 3D Rendering</Link></li>
                        <li><Link to="/expertise/architecture-design/product-3d-rendering" className="block rounded-md px-2 py-1.5 text-[15px] font-normal text-foreground/90 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors">Product 3D Rendering</Link></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground">Ideal for: Ideation & Assessment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-cta hover:text-cta-hover font-semibold transition-colors duration-300">About</Link>
            <Link to="/contact" className="text-cta hover:text-cta-hover font-semibold transition-colors duration-300">Contact</Link>
            <a href="#" className="text-cta hover:text-cta-hover font-semibold transition-colors duration-300">Blog</a>
          </nav>

          <div className="hidden lg:block">
            <Link to="/enquiry" className="relative px-6 py-3 rounded-full text-cta bg-background/15 backdrop-blur border border-transparent font-semibold transition-all duration-300 cta-border hover:text-cta-hover">
              <span className="relative z-10">Request a Proposal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-foreground focus:outline-none z-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95 hover:scale-105">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 transform animate-slide-in-right backdrop-blur-lg transition-all duration-300 ease-smooth" style={{
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}>
        <div className="flex justify-between items-center p-4 h-[70px] sm:h-[75px] border-b border-white/5">
          <Link to="/" onClick={toggleMenu}>
            <img src="https://www.eastdigital.in/img/logo-east-digital-white.png" alt="East Digital Logo" className="h-8 sm:h-10" onError={e => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/200x50/111/fff?text=East+Digital';
          }} />
          </Link>
          <button onClick={toggleMenu} className="text-foreground focus:outline-none z-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95 hover:scale-105">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-4 sm:px-6 space-y-3 overflow-y-auto h-[calc(100vh-70px)] sm:h-[calc(100vh-75px)] pb-16">
          <Link to="/" className="block text-foreground text-lg font-light hover:text-accent transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95" onClick={toggleMenu}>Home</Link>
          
          <div>
            <button onClick={() => setIsMobileExpertiseOpen(!isMobileExpertiseOpen)} className="w-full flex justify-between items-center text-foreground text-lg font-light hover:text-accent transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95">
              <span>Expertise</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileExpertiseOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className={`transition-all duration-300 ${isMobileExpertiseOpen ? 'animate-accordion-down max-h-screen opacity-100' : 'animate-accordion-up max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="pl-3 mt-3 space-y-4 border-l border-white/10">
                <div className="pb-3 border-b border-white/5">
                  <Link to="/expertise/real-estate" onClick={toggleMenu} className="font-medium text-base text-foreground hover:text-accent transition-all duration-200 tracking-wide block py-1 active:scale-95">REAL ESTATE</Link>
                  <p className="font-light text-xs text-muted-foreground mt-1 mb-2">Launch your project with 3d walkthrough video.</p>
                  <ul className="space-y-1 text-foreground">
                    <li><Link to="/expertise/real-estate/3d-walkthrough-video" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">3D Walkthrough Video</Link></li>
                    <li><Link to="/expertise/real-estate/3d-still-renderings" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">3D Still Renderings</Link></li>
                  </ul>
                </div>
                
                <div className="pb-3 border-b border-white/5">
                  <Link to="/expertise/infrastructure" onClick={toggleMenu} className="font-medium text-base text-foreground hover:text-accent transition-all duration-200 tracking-wide block py-1 active:scale-95">INFRASTRUCTURE</Link>
                  <p className="font-light text-xs text-muted-foreground mt-1 mb-2">Present your project to the investors/authorities.</p>
                  <ul className="space-y-1 text-foreground">
                    <li><Link to="/expertise/infrastructure/conceptual-3d-renderings" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">Conceptual 3D Renderings</Link></li>
                    <li><Link to="/expertise/infrastructure/engineering-3d-models" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">Engineering 3D Models</Link></li>
                  </ul>
                </div>
                
                <div>
                  <Link to="/expertise/architecture-design" onClick={toggleMenu} className="font-medium text-base text-foreground hover:text-accent transition-all duration-200 tracking-wide block py-1 active:scale-95">ARCHITECTURE & PRODUCT DESIGN</Link>
                  <p className="font-light text-xs text-muted-foreground mt-1 mb-2">For client approvals and internal assessment.</p>
                  <ul className="space-y-1 text-foreground">
                    <li><Link to="/expertise/architecture-design/architectural-3d-rendering" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">Architectural 3D Rendering</Link></li>
                    <li><Link to="/expertise/architecture-design/product-3d-rendering" onClick={toggleMenu} className="block font-normal text-sm hover:text-accent transition-all duration-200 py-1 px-2 rounded hover:bg-white/5 active:scale-95">Product 3D Rendering</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <Link to="/about" onClick={toggleMenu} className="block text-foreground text-lg font-light hover:text-accent transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95">About</Link>
          <Link to="/contact" onClick={toggleMenu} className="block text-foreground text-lg font-light hover:text-accent transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95">Contact</Link>
          <a href="#" onClick={toggleMenu} className="block text-foreground text-lg font-light hover:text-accent transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95">Blog</a>
          
          <div className="pt-6">
            <Link to="/enquiry" onClick={toggleMenu} className="block w-full text-center relative px-6 py-3 rounded-full text-foreground bg-background/15 backdrop-blur border border-transparent font-semibold transition-all duration-200 cta-border text-base active:scale-95">
              <span className="relative z-10">Request a Proposal</span>
            </Link>
          </div>
          </div>
        </div>
      )}
    </>;
};

export default Header;