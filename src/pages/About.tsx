import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import Footer from '@/components/Footer';
const About = () => {
  return <div className="min-h-screen bg-black font-nunito">
      <Header />
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative h-[40vh] flex items-end">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: "url('https://eastdigital.in/img/about-east-digital.jpg')"
        }}>
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 container mx-auto px-8 pb-12">
            <div className="max-w-[1100px]">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <div className="flex items-center space-x-2">
                  <a href="/" className="text-white text-lg leading-6 tracking-[0.54px] hover:text-white/80 transition-colors" style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  letterSpacing: '0.54px'
                }}>
                    Home
                  </a>
                  <span className="text-white/50">›</span>
                  <span className="text-white font-semibold" style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  letterSpacing: '0.54px'
                }}>
                    About
                  </span>
                </div>
              </nav>
              
              <h1 className="font-bold text-white mb-8" style={{
              fontSize: '36px',
              lineHeight: '45px',
              letterSpacing: '1.08px',
              fontWeight: 700
            }}>
                About
              </h1>
            </div>
          </div>
        </section>

        {/* Your Vision Section */}
        <section className="py-[50px] bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px] mx-auto">
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
        <section className="py-[50px] bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px] mx-auto">
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
        <section className="py-[50px] bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px] mx-auto">
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
              <div className="grid grid-cols-3 gap-6">
                {['https://eastdigital.in/img/logo_puchkas.jpg', 'https://eastdigital.in/img/logo_acer.jpg', 'https://eastdigital.in/img/logo_agile.jpg', 'https://eastdigital.in/img/logo_anantraj.jpg', 'https://eastdigital.in/img/logo_arcop.jpg', 'https://eastdigital.in/img/logo_bharti.jpg', 'https://eastdigital.in/img/logo_ddf.jpg', 'https://eastdigital.in/img/logo_japare.jpg', 'https://eastdigital.in/img/logo_jaypee.jpg', 'https://eastdigital.in/img/logo_miraj.jpg', 'https://eastdigital.in/img/logo_omaxe.jpg', 'https://eastdigital.in/img/logo_reliance.jpg'].map((logoUrl, index) => <div key={index} className="bg-white rounded-[20px] p-4 w-[185px] h-[111px] flex items-center justify-center shadow-md">
                    <img src={logoUrl} alt={`Client logo ${index + 1}`} className="max-w-full max-h-full object-contain" onError={e => {
                  e.currentTarget.style.display = 'none';
                }} />
                  </div>)}
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