const Footer = () => {
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
                  href="mailto:sales@eastdigital.in" 
                  className="leading-relaxed tracking-wide text-cta hover:text-cta-hover transition-colors break-words"
                >
                  sales@eastdigital.in
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
                <a href="/about" className="text-foreground hover:text-accent transition-colors py-2">About</a>
                <a href="/contact" className="text-foreground hover:text-accent transition-colors py-2">Connect</a>
                <a href="/faq" className="text-foreground hover:text-accent transition-colors py-2">FAQ</a>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-shrink-0">
              {/* YouTube */}
              <a href="#" className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group">
                <svg className="w-7 h-7 sm:w-6 sm:h-6 text-[#FF0000] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 01-1.768 1.768C18.219 19 12 19 12 19s-6.219 0-7.812-.42a2.506 2.506 0 01-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 011.768-1.768C5.781 5 12 5 12 5s6.219 0 7.812.418zM9.94 15.58V8.42L15.58 12l-5.64 3.58z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="#" className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group">
                <svg className="w-7 h-7 sm:w-6 sm:h-6 text-[#E4405F] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Behance */}
              <a href="#" className="transition-all duration-300 p-2 hover:bg-white/5 rounded-lg group">
                <svg className="w-7 h-7 sm:w-6 sm:h-6 text-[#1769FF] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.504 1.22.906.26 1.576.72 2.022 1.37.448.66.67 1.42.67 2.29 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.767-.64.16-1.31.25-2.02.25H0V4.51h6.938v-.007zM3.495 7.05v2.8h2.762c.344 0 .656-.05.93-.15.273-.1.5-.24.677-.42.18-.18.31-.4.38-.66.07-.26.12-.55.12-.87 0-.68-.17-1.18-.52-1.51-.35-.33-.84-.5-1.48-.5H3.495v.31zm0 5.82v3.24h3.458c.35 0 .67-.03.94-.1.29-.06.53-.17.74-.31.21-.14.38-.33.49-.56.12-.23.17-.5.17-.82 0-.37-.06-.68-.19-.94-.13-.26-.32-.46-.56-.61-.24-.15-.54-.25-.88-.31-.34-.06-.72-.09-1.14-.09H3.495v.46zm8.44 2.97c0 1.24.4 2.05 1.18 2.43.48.24 1.04.36 1.68.36.7 0 1.27-.17 1.7-.5.44-.33.68-.70.73-1.12h.96c-.15 1.15-.61 1.99-1.4 2.53-.78.54-1.73.81-2.84.81-.56 0-1.07-.08-1.54-.25-.47-.17-.87-.42-1.21-.75-.34-.33-.6-.74-.79-1.22-.19-.48-.29-1.01-.29-1.59 0-.57.1-1.1.29-1.58.19-.48.45-.89.79-1.23.34-.34.74-.6 1.2-.78.47-.18.98-.27 1.53-.27.64 0 1.2.12 1.69.35.49.23.9.55 1.23.96.33.41.58.9.74 1.46.16.56.23 1.17.2 1.83h-4.9zm3.85-1.54c-.04-.45-.2-.82-.49-1.1-.29-.28-.68-.42-1.17-.42-.33 0-.61.06-.85.18-.24.12-.44.27-.59.46-.15.19-.26.39-.32.61-.06.22-.09.43-.09.63h3.51zm5.43-4.95h2.05v1.2h-2.05v-1.2zm.1 2.38h1.85v6.87h-1.85v-6.87z"/>
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
          
          <div className="border-t border-border pt-4 sm:pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center text-muted-foreground text-sm sm:text-xs">
              <p>&copy; 2025 East Digital.</p>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                <a href="/terms" className="hover:text-foreground transition-colors py-1">Terms Of Use</a>
                <a href="/privacy" className="hover:text-foreground transition-colors py-1">Privacy Policy</a>
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