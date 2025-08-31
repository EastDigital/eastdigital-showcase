import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
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
  return <div className="min-h-screen bg-black font-nunito">
      <Header />
      <main>
        <PageBanner title="About" backgroundImage="https://eastdigital.in/img/about-east-digital.jpg" breadcrumbs={[{
        label: "Home",
        href: "/"
      }, {
        label: "About"
      }]} />

        {/* Your Vision Section */}
        <section className="py-[50px] bg-black">
          <div className="page-gutter content-max">
            <div className="max-w-[850px]">
              <h2 className="font-bold text-white mb-12" style={{
              fontSize: '26px',
              lineHeight: '34px',
              letterSpacing: '0.78px',
              fontWeight: 700
            }}>
                Your Vision, Brought to Life
              </h2>
              
              <div className="space-y-8 px-[5px] py-0 my-0 mx-[4px]">
                <p style={{
                fontSize: '20px',
                lineHeight: '30px',
                letterSpacing: '0.6px',
                color: '#DADADA'
              }}>
                  Every great project begins with a spark—an idea, a sketch, a dream. But somewhere 
                  between the blueprint and the boardroom, that spark can get lost in translation. How do 
                  you show someone the soul of a building, the feel of a space, or the impact of a design 
                  when all they see are lines on a page?
                </p>
                
                <p className="font-light" style={{
                fontSize: '20px',
                lineHeight: '30px',
                letterSpacing: '0.6px',
                color: '#DADADA',
                fontWeight: 300
              }}>
                  That's where our story begins.
                </p>
                
                <p style={{
                fontSize: '20px',
                lineHeight: '30px',
                letterSpacing: '0.6px',
                color: '#DADADA'
              }}>
                  East Digital wasn't born in a sterile office. It was born from late-night conversations and 
                  shared frustrations among friends—architects who felt unheard, engineers who were 
                  misunderstood, engineers who saw complex solutions simplified, and digital artists who 
                  knew they could bridge that gap. We were all passionate about the same thing: 
                  transforming brilliant, technical plans into breathtaking, tangible realities that anyone 
                  could see, feel, and believe in.
                </p>
                
                <p className="font-light italic" style={{
                fontSize: '20px',
                lineHeight: '30px',
                letterSpacing: '0.6px',
                color: '#DADADA',
                fontWeight: 300
              }}>
                  We're here to be your partner in that journey, to ensure your vision is not just seen, but felt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Foundation Section */}
        <section className="py-[20px] bg-black">
          <div className="page-gutter content-max">
            <div className="max-w-[850px]">
              <h2 className="font-light" style={{
              fontSize: '32px',
              lineHeight: '40px',
              letterSpacing: '0.96px',
              color: '#DADADA',
              fontWeight: 300
            }}>
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
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100 z-[1]' : 'opacity-0 z-[1]'}`} style={{
          zIndex: videoLoaded && !videoError ? 1 : -1
        }}>
        <source src="https://eastdigital.in/img/vid_banner_clients.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Background Image */}
      <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${videoError || !videoLoaded ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'}`} style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: videoError || !videoLoaded ? 2 : 1
        }} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[3]" />

      {/* Loading State */}
      {isLoading && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[50]">
          <div className="text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading experience...</p>
          </div>
        </div>}
          
      <div className="page-gutter content-max relative z-10">
            <div className="max-w-[850px]">
              <h2 className="font-bold mb-8" style={{
              fontSize: '26px',
              lineHeight: '34px',
              letterSpacing: '0.78px',
              color: '#FFFFFF',
              fontWeight: 700
            }}>
                Trusted by many
              </h2>
              
              <p className="mb-12" style={{
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.54px',
              color: '#FFE0CA'
            }}>
                Our journey is defined by the remarkable designers who choose 
                to collaborate with us. We want to express our deepest gratitude for your 
                continued trust. While we value our professional collaborations 
                immensely, it's the personal connections and friendships forged 
                over time that we consider our greatest success.
              </p>
              
              {/* Client Logos Grid */}
              <div className="grid grid-cols-4 gap-[10px]">
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
                  'https://eastdigital.in/img/logo_reliance.jpg',
                ]
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((logoUrl, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[20px] p-4 w-[185px] h-[111px] flex items-center justify-center shadow-md"
                    >
                      <img
                        src={logoUrl}
                        alt={`Client logo ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        onError={e => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}

              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Section */}
        

        {/* Project Gallery */}
        <ProjectGallery />
      </main>
      <Footer />
    </div>;
};
export default About;