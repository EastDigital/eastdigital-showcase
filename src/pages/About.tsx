import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import Footer from '@/components/Footer';
const About = () => {
  return <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: "url('https://eastdigital.in/img/about-east-digital.jpg')"
        }}>
            <div className="absolute inset-0 bg-black/30 py-0" />
          </div>
          
          <div className="relative z-10 container mx-auto px-8">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm">
                  <a href="/" className="text-white/70 hover:text-white transition-colors">Home</a>
                  <span className="text-white/50">›</span>
                  <span className="text-white font-semibold">About</span>
                </div>
              </nav>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12 leading-tight">
                About
              </h1>
            </div>
          </div>
        </section>

        {/* Your Vision Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 leading-tight">
                Your Vision, Brought to Life
              </h2>
              
              <div className="space-y-8 text-lg text-foreground/90 leading-relaxed">
                <p className="text-xl leading-relaxed">
                  Every great project begins with a spark—an idea, a sketch, a dream. But somewhere 
                  between the blueprint and the boardroom, that spark can get lost in translation. How do 
                  you show someone the soul of a building, the feel of a space, or the impact of a design 
                  when all they see are lines on a page?
                </p>
                
                <p className="text-lg font-light leading-relaxed">
                  That's where our story begins.
                </p>
                
                <p className="text-lg leading-relaxed">
                  East Digital wasn't born in a sterile office. It was born from late-night conversations and 
                  shared frustrations among friends—architects who felt unheard, engineers who were 
                  misunderstood, engineers who saw complex solutions simplified, and digital artists who 
                  knew they could bridge that gap. We were all passionate about the same thing: 
                  transforming brilliant, technical plans into breathtaking, tangible realities that anyone 
                  could see, feel, and believe in.
                </p>
                
                <p className="text-lg font-light leading-relaxed italic">
                  We're here to be your partner in that journey, to ensure your vision is not just seen, but felt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Foundation Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-8 leading-tight">
                Our work is built on a foundation of more than just 
                pixels and polygons. It's built on a few core beliefs that 
                guide every single project we touch.
              </h2>
            </div>
          </div>
        </section>

        {/* Trusted by Many Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Trusted by many
              </h2>
              
              <p className="text-lg text-foreground/80 mb-12 max-w-3xl leading-relaxed">
                Our journey is defined by the remarkable designers who choose 
                to collaborate with us. We want to express our deepest gratitude for your 
                continued trust. While we value our professional collaborations 
                immensely, it's the personal connections and friendships forged 
                over time that we consider our greatest success.
              </p>
              
              {/* Client Logos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
                {['Rachna', 'ACBR', 'A&lle', 'Delta Eng', 'ARCOP', 'bharti', 'East Digital', 'JAPARA', 'AIMS', 'RELIANCE Infrastructure', 'MALL', 'OMAXE'].map((client, index) => <div key={index} className="bg-white rounded-lg p-4 h-20 flex items-center justify-center">
                    <span className="text-gray-800 font-semibold text-sm">{client}</span>
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