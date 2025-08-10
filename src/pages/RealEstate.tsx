import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
const RealEstate = () => {
  const services = [{
    title: "3d Walkthrough Video",
    category: "3d Walkthrough Video",
    image: "https://eastdigital.in/img/afc_private_004.jpg",
    link: "/expertise/real-estate/3d-walkthrough-video"
  }, {
    title: "3d Walkthrough Video",
    category: "3d Walkthrough Video",
    image: "https://eastdigital.in/img/anantraj_001.jpg",
    link: "/expertise/real-estate/3d-walkthrough-video"
  }, {
    title: "Architectural Still Renderings",
    category: "Architectural Still Renderings",
    image: "https://eastdigital.in/img/apartment_001.jpg",
    link: "/expertise/real-estate/architectural-renderings"
  }, {
    title: "Architectural Still Renderings",
    category: "Architectural Still Renderings",
    image: "https://eastdigital.in/img/ascon_001.jpg",
    link: "/expertise/real-estate/architectural-renderings"
  }, {
    title: "3d Walkthrough Video",
    category: "3d Walkthrough Video",
    image: "https://eastdigital.in/img/ascon_003.jpg",
    link: "/expertise/real-estate/3d-walkthrough-video"
  }, {
    title: "3d Walkthrough Video",
    category: "3d Walkthrough Video",
    image: "https://eastdigital.in/img/bahuguna_villa_001.jpg",
    link: "/expertise/real-estate/3d-walkthrough-video"
  }];
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
        <section className="py-20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => <Link key={index} to={service.link} className="group relative overflow-hidden rounded-lg bg-card border hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="aspect-[16/10] relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-sm font-semibold tracking-[0.03em] text-white">{service.category}</h3>
                    </div>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        
      </main>
      <Footer />
    </div>;
};
export default RealEstate;