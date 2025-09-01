const AboutSection = () => {
  return <section className="relative py-20 sm:py-32 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="https://eastdigital.in/img/about-east-digital.jpg" alt="About East Digital Team" className="w-full h-full object-cover" loading="lazy" onError={e => {
        (e.target as HTMLImageElement).style.display = 'none';
      }} />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-left lg:text-left w-full mb-12">
          <h2 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10">
            <span className="font-bold">About </span>
            <span className="font-light">East Digital™</span>
          </h2>
          
          <div className="mb-10">
            <p className="text-xl leading-relaxed tracking-wide text-gray-200">
              East Digital™ is more than a 3D visualization studio; we are a dedicated B2B visualization 
              partner for industry leaders who require world class visual assets to drive decisive action.
            </p>
          </div>
          
          <div>
            <a href="/about" className="inline-flex items-center text-accent font-light text-sm hover:translate-x-1 transition-transform duration-300">
              Read more 
              <span className="ml-2 transition-transform duration-300">&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;