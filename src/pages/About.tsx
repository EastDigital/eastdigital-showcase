import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useSEO } from '@/hooks/useSEO';

const About = () => {
  useSEO('about');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        setIsLoading(false);
      };
      const handleError = () => {
        setVideoError(true);
        setIsLoading(false);
      };
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-black font-nunito">
      <Helmet>
        <title>About East Digital - Leading 3D Visualization Agency | Our Story & Vision</title>
        <meta name="description" content="Learn about East Digital's journey in 3D visualization. Discover our mission, values, and commitment to delivering exceptional architectural renderings and visualization services." />
        <meta name="keywords" content="East Digital about, 3D visualization company, architectural rendering company, team, mission, vision" />
        <link rel="canonical" href="https://eastdigital.in/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About East Digital - Leading 3D Visualization Agency | Our Story & Vision" />
        <meta property="og:description" content="Learn about East Digital's journey in 3D visualization. Discover our mission, values, and commitment to delivering exceptional architectural renderings and visualization services." />
        <meta property="og:image" content="https://eastdigital.in/contact-banner.jpg" />
        <meta property="og:url" content="https://eastdigital.in/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="About East Digital - Leading 3D Visualization Agency" />
        <meta name="twitter:description" content="Learn about East Digital's journey in 3D visualization and our commitment to delivering exceptional architectural renderings." />
        <meta name="twitter:image" content="https://eastdigital.in/contact-banner.jpg" />
      </Helmet>
      
      <Header />
      <main>
        <PageBanner
          title="About"
          backgroundImage="https://eastdigital.in/img/about-east-digital.jpg"
        />

        {/* Your Vision Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="text-left w-full mb-12">
              <h1 className="font-bold mb-12 text-white">
                Your Vision, Brought to Life
              </h1>
              
              <div className="leading-relaxed tracking-wide text-on-black text-left">
                <p className="text-on-black">
                  Every great project begins with a spark—an idea, a sketch, a dream. But somewhere 
                  between the blueprint and the boardroom, that spark can get lost in translation. How do 
                  you show someone the soul of a building, the feel of a space, or the impact of a design 
                  when all they see are lines on a page?
                </p>
                
                <p className="text-on-black font-light">
                  That's where our story begins.
                </p>
                
                <p className="text-on-black">
                  East Digital wasn't born in a sterile office. It was born from late-night conversations and 
                  shared frustrations among friends—architects who felt unheard, engineers who were 
                  misunderstood, engineers who saw complex solutions simplified, and digital artists who 
                  knew they could bridge that gap. We were all passionate about the same thing: 
                  transforming brilliant, technical plans into breathtaking, tangible realities that anyone 
                  could see, feel, and believe in.
                </p>
                
                <p className="text-on-black font-light">
                  We're here to be your partner in that journey, to ensure your vision is not just seen, but felt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Foundation Section */}
        <section className="bg-black py-[40px] pt-0">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="text-on-black font-light">
                Our work is built on a foundation of more than just 
                pixels and polygons. It's built on a few core beliefs that 
                guide every single project we touch.
              </h2>
            </div>
          </div>
        </section>

        {/* Trusted by Many Section */}
        <section className="relative py-[50px] bg-black">
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
            style={{
              zIndex: videoLoaded && !videoError ? 1 : -1
            }}
          >
            <source src="https://eastdigital.in/img/vid_banner_clients.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback Background Image */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              videoError || !videoLoaded ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
            }`}
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: videoError || !videoLoaded ? 2 : 1
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-[3]" />

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[50]">
              <div className="text-gray-300">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading experience...</p>
              </div>
            </div>
          )}
          
          <div className="container mx-auto px-4 sm:px-0 md:px-8 w-full relative z-10">
            <div className="text-left lg:text-left w-full mb-12">
              <h2 className="font-bold mb-8 text-on-graphics">
                Trusted by many
              </h2>
              
              <p className="font-normal text-on-graphics">
                Our journey is defined by the remarkable designers who choose 
                to collaborate with us. We want to express our deepest gratitude for your 
                continued trust. While we value our professional collaborations 
                immensely, it's the personal connections and friendships forged 
                over time that we consider our greatest success.
              </p>
              
              {/* Client Logos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                {[
                  'https://eastdigital.in/img/logo_puchkas.jpg',
                  'https://eastdigital.in/img/logo_acer.jpg',
                  'https://eastdigital.in/img/logo_agile.jpg',
                  'https://eastdigital.in/img/logo_anantraj.jpg',
                  'https://eastdigital.in/img/logo_arcop.jpg',
                  'https://eastdigital.in/img/logo_bharti.jpg',
                  'https://eastdigital.in/img/logo_ddf.jpg',
                  'https://eastdigital.in/img/logo_japare.jpg',
                  'https://eastdigital.in/img/logo_jaypee.jpg',
                  'https://eastdigital.in/img/logo_miraj.jpg',
                  'https://eastdigital.in/img/logo_omaxe.jpg',
                  'https://eastdigital.in/img/logo_reliance.jpg'
                ].slice().sort((a, b) => a.localeCompare(b)).map((logoUrl, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[20px] p-4 w-full max-w-[185px] aspect-[5/3] flex items-center justify-center shadow-md"
                  >
                    <img
                      src={logoUrl}
                      alt={`Client logo ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <ProjectGallery />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default About;