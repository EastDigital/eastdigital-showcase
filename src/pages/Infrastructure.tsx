import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';

const Infrastructure = () => {
  useSEO("infrastructure");
  const services = [
    {
      title: "Conceptual 3D Renderings",
      category: "Conceptual 3D Renderings",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/infrastructure/conceptual-renderings"
    },
    {
      title: "Engineering 3D Models",
      category: "Engineering 3D Models", 
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/infrastructure/engineering-models"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner
          title="Infrastructure"
          backgroundImage="https://eastdigital.in/img/banner-page-about.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Expertise", href: "/expertise" },
            { label: "Infrastructure" }
          ]}
        />

        {/* Description Section */}
        <section className="mobile-section sm:py-16">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="max-w-none lg:max-w-">
              <h2 className="content-heading mb-4 sm:mb-6">
                <span className="block mobile-paragraph">Visualize Your Vision:</span>
                <span className="text-primary">High-Impact 3D Solutions</span> for Real Estate Marketing & Sales.
              </h2>
              <div className="space-y-4">
                <p className="content-paragraph mobile-paragraph">
                  For real estate marketing leaders seeking to capture buyer imagination and accelerate sales, our cutting-edge 3D visualization services provide the ultimate advantage.
                </p>
                <p className="content-paragraph mobile-paragraph">
                  From pre-selling properties to securing stakeholder buy-in, we create <strong className="text-primary font-semibold">immersive experiences</strong> that bring your developments to life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mobile-section sm:py-20 lg:py-5 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-left sm:text-left mb-8 sm:mb-16">
              <h2 className="mobile-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-4 sm:mb-6">
                Our Services
              </h2>
              <p className="sm:text-left">
                Transform your real estate projects with cutting-edge 3D visualization
              </p>
            </div>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="w-full mx-auto text-center">
            <h2 className="font-bold text-foreground mb-6">
              Ready to discuss your next project?
            </h2>
            <p className="text-muted-foreground mb-4">
              Send us an email to get the conversation started.
            </p>
            <p className="text-muted-foreground mb-8">
              sales@eastdigital.in
            </p>
            <p className="text-muted-foreground mb-8">
              If you need guidance on what information should be provided, simply fill out our request a proposal form below.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Take me to the form →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Infrastructure;