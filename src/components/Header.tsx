import { useState, useEffect } from 'react';
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

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 flex items-center h-[75px] transition-all duration-300 ${
        isSticky ? 'glass-effect' : ''
      }`}>
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="flex-shrink-0">
            <img 
              src="https://www.eastdigital.in/img/logo-east-digital-white.png" 
              alt="East Digital Logo" 
              className="h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/200x50/111/fff?text=East+Digital';
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 h-full">
            <a href="#" className="text-foreground hover:text-accent font-semibold text-base transition-colors duration-300">
              Home
            </a>
            <div className="group h-full flex items-center relative">
              <button className="text-foreground hover:text-accent font-semibold text-base transition-colors duration-300 flex items-center">
                Expertise
                <svg className="ml-2 transition-transform duration-300 group-hover:rotate-180" width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15L6 9H18L12 15Z" fill="currentColor"/>
                </svg>
              </button>
              
              {/* Mega Menu */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[878px] max-w-[95vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 z-50">
                <div className="bg-card border border-border rounded-2xl p-10 shadow-lg">
                  <div className="grid grid-cols-3 gap-10">
                    <div>
                      <div className="min-h-[50px] flex items-center mb-4">
                        <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">
                          REAL ESTATE
                        </a>
                      </div>
                      <p className="font-light text-xs text-muted-foreground mb-4">
                        Launch your project with<br/>3d walkthrough video.
                      </p>
                      <ul className="space-y-2 text-foreground">
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">3D Walkthrough Videos</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Architectural Still Renderings</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Interactive Virtual Tours</a></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground mt-6">Ideal for: Real Estate Marketing</p>
                    </div>
                    
                    <div>
                      <div className="min-h-[50px] flex items-center mb-4">
                        <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">
                          INFRASTRUCTURE
                        </a>
                      </div>
                      <p className="font-light text-xs text-muted-foreground mb-4">
                        Present your project to the<br/>investors/authorities.
                      </p>
                      <ul className="space-y-2 text-foreground">
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Conceptual 3D Renderings</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Process Animations</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Engineering 3D Models</a></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground mt-6">Ideal for: Project Tender & Updates</p>
                    </div>
                    
                    <div>
                      <div className="min-h-[50px] flex items-center mb-4">
                        <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">
                          ARCHITECTURE<br/>& DESIGN
                        </a>
                      </div>
                      <p className="font-light text-xs text-muted-foreground mb-4">
                        For client approvals and<br/>internal assessment.
                      </p>
                      <ul className="space-y-2 text-foreground">
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">3D Architectural Rendering</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Virtual Staging</a></li>
                        <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Product 3D Renderings</a></li>
                      </ul>
                      <p className="font-light text-xs text-muted-foreground mt-6">Ideal for: Ideation & Assessment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="/about" className="text-foreground hover:text-accent font-semibold text-base transition-colors duration-300">About</a>
            <a href="#" className="text-foreground hover:text-accent font-semibold text-base transition-colors duration-300">Connect</a>
            <a href="#" className="text-foreground hover:text-accent font-semibold text-base transition-colors duration-300">Blog</a>
          </nav>

          <div className="hidden lg:block">
            <button className="relative px-6 py-3 rounded-full text-white bg-background/60 backdrop-blur border border-white/20 font-semibold transition-all duration-300 overflow-hidden group">
              <span 
                className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-transparent group-hover:animate-borderGradient z-0"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'destination-out',
                  padding: '2px'
                }}
              ></span>
              <span className="relative z-10">Get Your Blueprint</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className="text-foreground focus:outline-none z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{
        background: 'rgba(17, 17, 17, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}>
        <div className="flex justify-between items-center p-4 h-[75px]">
          <img 
            src="https://www.eastdigital.in/img/logo-east-digital-white.png" 
            alt="East Digital Logo" 
            className="h-12"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/200x50/111/fff?text=East+Digital';
            }}
          />
          <button 
            onClick={toggleMenu}
            className="text-foreground focus:outline-none z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-8 space-y-6 overflow-y-auto h-[calc(100vh-75px)] pb-24">
          <a href="#" className="block text-foreground text-xl font-light hover:text-accent transition-colors duration-300">Home</a>
          
          <div>
            <button 
              onClick={() => setIsMobileExpertiseOpen(!isMobileExpertiseOpen)}
              className="w-full flex justify-between items-center text-foreground text-xl font-light hover:text-accent transition-colors duration-300"
            >
              <span>Expertise</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileExpertiseOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className={`pl-4 mt-4 space-y-8 ${isMobileExpertiseOpen ? 'block' : 'hidden'}`}>
              <div>
                <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">REAL ESTATE</a>
                <p className="font-light text-xs text-muted-foreground mt-2 mb-3">Launch your project with 3d walkthrough video.</p>
                <ul className="space-y-3 text-foreground">
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">3D Walkthrough Videos</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Architectural Still Renderings</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Interactive Virtual Tours</a></li>
                </ul>
              </div>
              
              <div>
                <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">INFRASTRUCTURE</a>
                <p className="font-light text-xs text-muted-foreground mt-2 mb-3">Present your project to the investors/authorities.</p>
                <ul className="space-y-3 text-foreground">
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Conceptual 3D Renderings</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Process Animations</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Engineering 3D Models</a></li>
                </ul>
              </div>
              
              <div>
                <a href="#" className="font-semibold text-base text-foreground hover:text-accent transition-colors duration-300 tracking-wider">ARCHITECTURE & PRODUCT DESIGN</a>
                <p className="font-light text-xs text-muted-foreground mt-2 mb-3">For client approvals and internal assessment.</p>
                <ul className="space-y-3 text-foreground">
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">3D Architectural Rendering</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Virtual Staging</a></li>
                  <li><a href="#" className="font-normal text-[15px] hover:text-accent transition-colors duration-300">Product 3D Renderings</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <a href="/about" className="block text-foreground text-xl font-light hover:text-accent transition-colors duration-300">About</a>
          <a href="#" className="block text-foreground text-xl font-light hover:text-accent transition-colors duration-300">Connect</a>
          <a href="#" className="block text-foreground text-xl font-light hover:text-accent transition-colors duration-300">Blog</a>
          
          <div className="pt-6">
            <button className="relative px-6 py-3 rounded-full text-white bg-background/60 backdrop-blur border border-white/20 font-semibold transition-all duration-300 overflow-hidden group">
              <span 
                className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-transparent group-hover:animate-borderGradient z-0"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'destination-out',
                  padding: '2px'
                }}
              ></span>
              <span className="relative z-10">Get Your Blueprint</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;