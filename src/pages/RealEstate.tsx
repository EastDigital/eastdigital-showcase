import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
const RealEstate = () => {
  useSEO("real-estate");
  const services = [
    {
      title: "3D Walkthrough Video",
      category: "3D Walkthrough Video",
      image: "https://eastdigital.in/img/afc_private_004.jpg",
      link: "/expertise/real-estate/3d-walkthrough-video"
    },
    {
      title: "3D Still Renderings",
      category: "3D Still Renderings",
      image: "https://eastdigital.in/img/apartment_001.jpg",
      link: "/expertise/real-estate/architectural-renderings"
    }
  ];
  return <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner title="Real Estate" backgroundImage="https://eastdigital.in/img/about-east-digital.jpg" breadcrumbs={[{
        label: "Home",
        href: "/"
      }, {
        label: "Expertise",
        href: "/expertise"
      }, {
        label: "Real Estate"
      }]} />

        {/* Description Section */}
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px]">
              <h2 className="content-heading mb-4">
                Visualize Your Vision: High-Impact 3D Solutions for Real Estate Marketing & Sales.
              </h2>
              <p className="content-paragraph">
                For real estate marketing leaders seeking to capture buyer imagination and accelerate sales, our cutting-edge 3D visualization services provide the ultimate advantage. From pre-selling properties to securing stakeholder buy-in, we create immersive experiences that bring your developments to life.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-6">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your real estate projects with cutting-edge 3D visualization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Link 
                  key={index}
                  to={service.link}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border-2 border-border/20 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors duration-300">
                      {service.category}
                    </h3>
                    <div className="w-20 h-1 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        
      </main>
      <Footer />
    </div>;
};
export default RealEstate;