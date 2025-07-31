import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-end justify-center text-center lg:justify-start lg:text-left">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
      >
        <source src="https://www.eastdigital.in/img/hero_video_folio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content */}
      <div className="container mx-auto px-8 pb-12 lg:pb-24 z-10">
        <div className="max-w-4xl">
          <h1 className="hidden lg:block font-bold text-4xl lg:text-5xl leading-tight tracking-wide text-foreground mb-6">
            3D That Sells, Stuns, and <br /> Speaks to Your Industry.
          </h1>
          
          <h1 className="lg:hidden font-bold text-3xl leading-tight tracking-wide text-foreground mb-6">
            3D That Sells, Stuns, and Speaks to Your Industry.
          </h1>
          
          <p className="hidden lg:block text-lg leading-relaxed tracking-wide text-accent mb-10">
            Elite 3D Visualization for B2B Leaders in Real Estate, <br /> 
            Engineering, and Design. We don't just create renders; <br /> 
            we engineer results.
          </p>
          
          <p className="lg:hidden text-lg leading-relaxed tracking-wide text-accent mb-10">
            Elite 3D Visualization for B2B Leaders in Real Estate, Engineering, and Design. 
            We don't just create renders; we engineer results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              variant="outline" 
              className="px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect-light gradient-border-hover border-transparent hover:bg-white/20"
            >
              Free Consultation
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect gradient-border-hover border-transparent hover:bg-white/10"
            >
              Our Expertise
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;