import { useState, useRef, useEffect } from 'react';

const AboutSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      setVideoError(true);
      return;
    }

    const loadingTimeout = setTimeout(() => {
      console.log('About video: Loading timeout reached');
      setVideoError(true);
    }, 8000);

    const handleLoadedData = () => {
      console.log('About video: Data loaded successfully');
      clearTimeout(loadingTimeout);
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = (e: Event) => {
      console.error('About video: Failed to load', e);
      clearTimeout(loadingTimeout);
      setVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      clearTimeout(loadingTimeout);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className="relative py-20 sm:py-32 flex items-center overflow-hidden">
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
        <source src="https://eastdigital.in/img/vid_banner_clients.mp4" type="video/mp4" />
      </video>

      {/* Fallback Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          videoError || !videoLoaded ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
        }`}
        style={{ zIndex: videoError || !videoLoaded ? 2 : 1 }}
      >
        <img 
          src="https://eastdigital.in/img/about-east-digital.jpg" 
          alt="About East Digital Team" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-[3]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-8 relative z-[10]">
        <div className="max-w-[850px]">
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
            <a 
              href="#" 
              className="inline-flex items-center text-accent font-light text-sm hover:translate-x-1 transition-transform duration-300"
            >
              Read more 
              <span className="ml-2 transition-transform duration-300">&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;