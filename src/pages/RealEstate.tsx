import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const RealEstate = () => {
  const services = [
    {
      title: "3D Walkthrough Video",
      category: "3D Walkthrough Video",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/3d-walkthrough-video"
    },
    {
      title: "3D Walkthrough Video",
      category: "3D Walkthrough Video", 
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/3d-walkthrough-video"
    },
    {
      title: "Architectural Still Renderings",
      category: "Architectural Still Renderings",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/architectural-renderings"
    },
    {
      title: "Architectural Still Renderings", 
      category: "Architectural Still Renderings",
      image: "/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png",
      link: "/expertise/real-estate/architectural-renderings"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png" 
              alt="Real Estate Background" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-300">{'>'}</span>
              <Link to="/expertise" className="text-gray-300 hover:text-white transition-colors">
                Expertise
              </Link>
              <span className="mx-2 text-gray-300">{'>'}</span>
              <span className="text-white font-medium">Real Estate</span>
            </nav>

            <div className="max-w-[850px]">
              <h1 className="text-2xl lg:text-3xl leading-tight tracking-wide text-foreground mb-10">
                <span className="font-bold">Transform Property Marketing </span>
                <span className="font-light">with Stunning 3D Visualizations.</span>
              </h1>
              
              <div className="mb-10">
                <p className="text-xl leading-relaxed tracking-wide text-gray-200">
                  Elevate your real estate marketing with our cutting-edge 3D visualization solutions. From pre-construction sales to virtual property tours, we create immersive experiences that captivate buyers and accelerate decision-making.
                </p>
              </div>
            </div>
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

export default RealEstate;