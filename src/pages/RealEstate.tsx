import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';

const RealEstate = () => {
  const services = [
    {
      title: "3d Walkthrough Video",
      category: "3d Walkthrough Video",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/3d-walkthrough-video",
    },
    {
      title: "3d Walkthrough Video",
      category: "3d Walkthrough Video",
      image: "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
      link: "/expertise/real-estate/3d-walkthrough-video",
    },
    {
      title: "Architectural Still Renderings",
      category: "Architectural Still Renderings",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/real-estate/architectural-renderings",
    },
    {
      title: "Architectural Still Renderings",
      category: "Architectural Still Renderings",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/architectural-renderings",
    },
    {
      title: "3d Walkthrough Video",
      category: "3d Walkthrough Video",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/real-estate/3d-walkthrough-video",
    },
    {
      title: "3d Walkthrough Video",
      category: "3d Walkthrough Video",
      image: "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
      link: "/expertise/real-estate/3d-walkthrough-video",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner
          title="Real Estate"
          backgroundImage="https://eastdigital.in/img/about-east-digital.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Expertise", href: "/expertise" },
            { label: "Real Estate" }
          ]}
        />

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="content-heading mb-4">
              Visualize Your Vision: High-Impact 3D Solutions for Real Estate Marketing & Sales.
            </h2>
            <p className="content-paragraph">
              For real estate marketing leaders seeking to capture buyer imagination and accelerate sales, our cutting-edge 3D visualization services provide the ultimate advantage. From pre-selling properties to securing stakeholder buy-in, we create immersive experiences that bring your developments to life.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <Link 
                  key={index}
                  to={service.link}
                  className="group relative overflow-hidden rounded-lg bg-card border hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-[16/10] relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-sm font-semibold tracking-[0.03em] text-white">{service.category}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to discuss your next project?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Send us an email to get the conversation started.
            </p>
            <p className="text-muted-foreground mb-8">
              sales@eastdigital.in
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              If you need guidance on what information should be provided, simply fill out our request a proposal form below.
            </p>
            <Button asChild variant="cta">
              <Link to="/contact">Take me to the form →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RealEstate;