import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';

const Expertise = () => {
  useSEO('expertise');
  
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
      <Helmet>
        <title>3D Visualization Expertise | Industry-Focused Services | East Digital</title>
        <meta name="description" content="Discover East Digital's specialized 3D visualization expertise across Real Estate, Infrastructure, and Architecture & Design. Industry-focused solutions for your sector." />
        <meta name="keywords" content="3D visualization expertise, industry-focused rendering, real estate visualization, infrastructure 3D modeling, architectural design services" />
        <link rel="canonical" href="https://eastdigital.in/expertise" />
        
        {/* Open Graph */}
        <meta property="og:title" content="3D Visualization Expertise | Industry-Focused Services | East Digital" />
        <meta property="og:description" content="Discover East Digital's specialized 3D visualization expertise across Real Estate, Infrastructure, and Architecture & Design." />
        <meta property="og:image" content="https://eastdigital.in/contact-banner.jpg" />
        <meta property="og:url" content="https://eastdigital.in/expertise" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="3D Visualization Expertise | East Digital" />
        <meta name="twitter:description" content="Specialized 3D visualization expertise across Real Estate, Infrastructure, and Architecture & Design." />
        <meta name="twitter:image" content="https://eastdigital.in/contact-banner.jpg" />
      </Helmet>
      
      <Header />
      <main>
        <PageBanner
          title="Expertise"
          backgroundImage="https://eastdigital.in/img/banner-page-about.jpg"
        />

        {/* Description Section */}
        <section className="mobile-section sm:py-16">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h1 className="mb-4 sm:mb-6">
                <span className="block">Industry-Focused Visualization Expertise</span>
                <span className="text-primary">Precision, Clarity, and Impact</span> for Your Sector.
              </h1>
              <div className="space-y-4">
                <p>
                  At East Digital, we understand that every industry has unique challenges, audiences, and objectives. A real estate development requires a different emotional narrative than an infrastructure project, and a product launch demands a different focus than an architectural review.
                </p>
                <p>
                  Explore our specialized services below to see how we empower leaders in your field. 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
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
                      <h3 className="font-bold text-on-black mb-2">{category.title}</h3>
                      <p className="text-on-black">{category.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default Expertise;