import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
const Infrastructure = () => {
  useSEO("infrastructure");
  const services = [{
    title: "Conceptual 3D Renderings",
    category: "Conceptual 3D Renderings",
    image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
    link: "/expertise/infrastructure/conceptual-3d-renderings"
  }, {
    title: "Engineering 3D Models",
    category: "Engineering 3D Models",
    image: "/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png",
    link: "/expertise/infrastructure/engineering-3d-models"
  }];
  return <div className="min-h-screen bg-background font-nunito">
      
      <Header />
      <main>
        <PageBanner title="Infrastructure" backgroundImage="https://eastdigital.in/img/banner-page-about.jpg" />

        {/* Description Section */}
        <section className="mobile-section sm:py-8">
          <div className="container mx-auto px-1 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="content-heading mb-4 sm:mb-6">
                <span className="block mobile-paragraph">Build the Future:</span>
                <span className="text-primary">Advanced 3D Infrastructure Solutions</span> for Complex Engineering Projects.
              </h2>
              <div className="space-y-4">
                <p className="text-on-black">
                  For infrastructure leaders and engineering professionals seeking to visualize complex projects and secure stakeholder approval, our cutting-edge 3D visualization services provide unmatched clarity.
                </p>
                <p className="text-on-black">
                  From conceptual designs to detailed engineering models, we create <strong className="text-primary font-semibold">precise visualizations</strong> that bring your infrastructure projects to life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mobile-section sm:py-20 lg:py-5 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-1 sm:px-0 md:px-8">
            <div className="text-left sm:text-left mb-8 sm:mb-16">
              <h2 className="mobile-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-4 sm:mb-6 text-4xl">
                Our Services
              </h2>
              <p className="text-on-black">
                Advanced infrastructure visualization for complex engineering projects
              </p>
            </div>
            
            {/* Single column layout for mobile, grid for larger screens */}
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0 max-w-6xl mx-auto">
              {services.map((service, index) => <Link key={index} to={service.link} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border-2 border-border/20 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm touch-manipulation block min-h-[200px] sm:min-h-[280px]">
                  <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden">
                    {service.image.endsWith('.mp4') || service.image.endsWith('.webm') || service.image.endsWith('.mov') ? <video src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" autoPlay muted loop playsInline /> : <img src={service.image} alt={`${service.title} - Infrastructure 3D Visualization`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <h3 className="mobile-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors duration-300 leading-tight">
                      {service.category}
                    </h3>
                    <div className="w-12 sm:w-20 h-1 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>
      </main>
      <FloatingCTA />
      <Footer />
    </div>;
};
export default Infrastructure;