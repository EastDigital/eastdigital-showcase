const AboutSection = () => {
  return <section className="relative py-20 sm:py-32 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="https://eastdigital.in/img/home-bg-banner-about-us-east-digital-3d.jpg" alt="About East Digital Team" className="w-full h-full object-cover" loading="lazy" onError={e => {
        (e.target as HTMLImageElement).style.display = 'none';
      }} />
        <div className="container mx-auto px-8 w-full" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 w-full relative z-10 px-4">
        <div className="text-left w-full mb-12">
          <h2 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10">
            <span className="font-bold">About </span>
            <span className="font-light">East Digital™</span>
          </h2>
          
          <div className="mb-10">
            <p className="content-paragraph mobile-paragraph text-lg text-yellow-50">
              East Digital™ is more than a 3D visualization studio; we are a dedicated B2B visualization 
              partner for industry leaders who require world class visual assets to drive decisive action.
            </p>
          </div>
          
          <div>
            <a href="/about" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors group">
              Read more 
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;