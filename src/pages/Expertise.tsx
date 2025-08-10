import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';

const Expertise = () => {
  const categories = [
    {
      title: "Real Estate",
      description: "3D visualization solutions for property marketing and sales",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate"
    },
    {
      title: "Infrastructure", 
      description: "Comprehensive 3D modeling for large-scale infrastructure projects",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
      link: "/expertise/infrastructure"
    },
    {
      title: "Architecture & Design",
      description: "Detailed architectural visualizations and design presentations",
      image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png", 
      link: "/expertise/architecture-design"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner
          title="Expertise"
          backgroundImage="https://eastdigital.in/img/banner-page-about.jpg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Expertise" }
          ]}
        />

        {/* Description Section */}
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-[850px]">
              <p className="text-xl leading-relaxed tracking-wide text-muted-foreground">
                For real estate marketing leaders seeking to capture buyer imagination and accelerate sales, our cutting-edge 3D visualization services provide the ultimate advantage. From pre-selling properties to securing stakeholder buy-in, we create immersive experiences that bring your developments to life.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link 
                  key={index}
                  to={category.link}
                  className="group relative overflow-hidden rounded-lg bg-card border hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-sm text-white/90">{category.description}</p>
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

export default Expertise;