import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';

const ArchitectureDesign = () => {
  const services = [
    {
      title: "Architectural Renderings",
      category: "Architectural Renderings",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/architecture-design/renderings"
    },
    {
      title: "Interior Design Visualization",
      category: "Interior Design Visualization", 
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/architecture-design/interior-viz"
    },
    {
      title: "Design Concept Presentations",
      category: "Design Concept Presentations",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/architecture-design/concept-presentations"
    },
    {
      title: "Virtual Design Reviews", 
      category: "Virtual Design Reviews",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/architecture-design/design-reviews"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner
          title="Bringing Architectural Visions to Life with Stunning Detail."
          backgroundImage="https://eastdigital.in/img/about-east-digital.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Expertise", href: "/expertise" },
            { label: "Architecture & Design" }
          ]}
        />

        {/* Description Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl leading-relaxed tracking-wide text-muted-foreground">
              Transform your architectural concepts into compelling visual narratives. Our specialized visualization services help architects and designers communicate their vision with unprecedented clarity and impact.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <h3 className="text-lg font-bold text-white">{service.category}</h3>
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

export default ArchitectureDesign;