import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('Hero video: No video element found');
      setVideoError(true);
      setIsLoading(false);
      return;
    }

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('Hero video: Loading timeout reached');
      setVideoError(true);
      setIsLoading(false);
    }, 10000); // 10 second timeout

    const handleLoadStart = () => {
      console.log('Hero video: Load started');
      setIsLoading(true);
      setVideoError(false);
    };

    const handleLoadedData = () => {
      console.log('Hero video: Data loaded successfully');
      clearTimeout(loadingTimeout);
      setVideoLoaded(true);
      setIsLoading(false);
      setVideoError(false);
    };

    const handleCanPlay = () => {
      console.log('Hero video: Can play');
      clearTimeout(loadingTimeout);
      setVideoLoaded(true);
      setIsLoading(false);
      setVideoError(false);
    };

    const handleError = (e: Event) => {
      console.error('Hero video: Failed to load', e);
      clearTimeout(loadingTimeout);
      setVideoError(true);
      setIsLoading(false);
      setVideoLoaded(false);
    };

    const handleLoadedMetadata = () => {
      console.log('Hero video: Metadata loaded');
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Force load the video
    video.load();

    return () => {
      clearTimeout(loadingTimeout);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-end justify-center text-center lg:justify-start lg:text-left overflow-hidden">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-100 z-[1]' : 'opacity-0 z-[1]'
        }`}
        style={{ zIndex: videoLoaded && !videoError ? 1 : -1 }}
      >
        <source src="https://www.eastdigital.in/img/hero_video_folio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Background Image */}
      <div 
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          videoError || !videoLoaded ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
        }`}
        style={{
          backgroundImage: 'url("https://eastdigital.in/img/bg-video.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: videoError || !videoLoaded ? 2 : 1
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/0 z-[3]" />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[50]">
          <div className="text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading experience...</p>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-8 pb-12 lg:pb-24 relative z-[10]">
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
              className="cta-button px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect-light border-0 hover:bg-white/20 hover:text-white"
            >
              Free Consultation
            </Button>
            <Button 
              variant="outline" 
              className="cta-button px-8 py-3 rounded-full text-foreground font-semibold text-sm glass-effect border-0 hover:bg-white/10 hover:text-white"
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