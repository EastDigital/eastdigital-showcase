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
  return <section className="relative h-screen flex items-end justify-start text-left lg:justify-start lg:text-left overflow-hidden">
      {/* Background Video */}
      <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100 z-[1]' : 'opacity-0 z-[1]'}`} style={{
      zIndex: videoLoaded && !videoError ? 1 : -1
    }}>
        <source src="https://www.eastdigital.in/img/hero_video_folio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Background Image */}
      <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${videoError || !videoLoaded ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'}`} style={{
      backgroundImage: 'url("https://eastdigital.in/img/bg-video.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: videoError || !videoLoaded ? 2 : 1
    }} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/0 z-[3]" />

      {/* Loading State */}
      {isLoading && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[50]">
          <div className="text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading experience...</p>
          </div>
        </div>}
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 lg:pb-24 relative z-[10]">
        <div className="w-full">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-wide text-foreground mb-6">
            <span className="block lg:hidden">3D That Sells, Stuns, and Speaks to Your Industry.</span>
            <span className="hidden lg:block">3D That Sells, Stuns, and <br /> Speaks to Your Industry.</span>
          </h1>
          
          <p className="text-lg sm:text-xl leading-relaxed tracking-wide text-accent mb-8 sm:mb-10">
            <span className="hidden lg:block">
              Elite 3D Visualization for B2B Leaders in Real Estate, <br /> 
              Engineering, and Design. We don't just create renders; <br /> 
              we engineer results.
            </span>
            <span className="lg:hidden">
              Elite 3D Visualization for B2B Leaders in Real Estate, Engineering, and Design. 
              We don't just create renders; we engineer results.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6">
            <a href="/enquiry" className="w-full sm:w-auto relative px-8 py-4 rounded-full text-foreground bg-background/15 backdrop-blur border border-transparent font-semibold transition-all duration-300 cta-border text-center text-lg sm:text-base">
              <span className="relative z-10">Free Consultation</span>
            </a>
            <a href="/expertise" className="w-full sm:w-auto relative px-8 py-4 rounded-full text-foreground bg-background/60 backdrop-blur border border-transparent font-semibold transition-all duration-300 cta-border text-center text-lg sm:text-base">
              <span className="relative z-10">Our Expertise</span>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;