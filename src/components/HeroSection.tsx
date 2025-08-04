import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      console.log('Hero video: Load started');
      setIsLoading(true);
    };

    const handleLoadedData = () => {
      console.log('Hero video: Data loaded successfully');
      setVideoLoaded(true);
      setIsLoading(false);
      setVideoError(false);
    };

    const handleCanPlay = () => {
      console.log('Hero video: Can play');
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.error('Hero video: Failed to load', e);
      setVideoError(true);
      setIsLoading(false);
      setVideoLoaded(false);
    };

    const handleLoadedMetadata = () => {
      console.log('Hero video: Metadata loaded');
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-end justify-center text-center lg:justify-start lg:text-left">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="metadata"
        crossOrigin="anonymous"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded && !videoError ? 'opacity-100 z-0' : 'opacity-0 z-[-2]'
        }`}
      >
        <source src="https://eastdigital.in/img/hero_video_folio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Background Image */}
      <div 
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
          videoError || !videoLoaded ? 'opacity-100 z-[-1]' : 'opacity-0 z-[-2]'
        }`}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading experience...</p>
          </div>
        </div>
      )}
      
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
              className="px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect-light gradient-border-hover border-0 hover:bg-white/20"
            >
              Free Consultation
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect gradient-border-hover border-0 hover:bg-white/10"
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