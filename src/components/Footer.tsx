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
          <div className="max-w-[850px]">
            <h2 className="text-xl sm:text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-8 sm:mb-10">
              <span className="font-bold">Ready to discuss your next project?</span>
            </h2>
            
            <div className="space-y-6 sm:space-y-8 max-w-lg">
              <div>
                <p className="text-base sm:text-lg leading-relaxed tracking-wide text-accent mb-2">
                  Send us an email to get the conversation started.
                </p>
                <a 
                  href="mailto:sales@eastdigital.in" 
                  className="text-base leading-relaxed tracking-wide text-foreground hover:text-primary transition-colors break-words"
                >
                  sales@eastdigital.in
                </a>
              </div>
              
              <div>
                <p className="text-base sm:text-lg leading-relaxed tracking-wide text-accent mb-6">
                  If you need guidance on what information should be provided, simply fill out our request a proposal form below.
                </p>
                <a 
                  href="/enquiry" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary/40 transition-all duration-500 font-medium text-lg shadow-lg hover:shadow-primary/20 hover:shadow-xl group"
                >
                  <svg className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Request Proposal
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
                  className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-400/30 text-emerald-100 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-blue-500/20 hover:border-emerald-400/50 transition-all duration-500 font-semibold text-lg shadow-xl hover:shadow-emerald-400/20 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-colors">
                    <svg className="w-6 h-6 text-emerald-300 group-hover:text-emerald-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-emerald-200/80 font-normal">Call Us Now</div>
                    <div className="text-lg font-bold">+91-99105 68689</div>
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
                <a href="#" className="text-foreground hover:text-accent transition-colors py-2">Blog</a>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-shrink-0">
              {/* YouTube */}
              <a href="#" className="text-foreground hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-lg">
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 01-1.768 1.768C18.219 19 12 19 12 19s-6.219 0-7.812-.42a2.506 2.506 0 01-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 011.768-1.768C5.781 5 12 5 12 5s6.219 0 7.812.418zM9.94 15.58V8.42L15.58 12l-5.64 3.58z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="#" className="text-foreground hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-lg">
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              
              {/* Twitter/X */}
              <a href="#" className="text-foreground hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-lg">
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="#" className="text-foreground hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-lg">
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" clipRule="evenodd" />
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