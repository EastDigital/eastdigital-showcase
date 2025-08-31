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
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px]">
              <p className="text-xl leading-relaxed tracking-wide text-muted-foreground">
                At East Digital, we understand that every infrastructure project has unique challenges, audiences, and objectives. Our industry-first model ensures that our 3D visualization solutions are strategically aligned with your specific goals.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="page-gutter content-max">
            <div className="align-left mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-6">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced infrastructure visualization for complex engineering projects
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