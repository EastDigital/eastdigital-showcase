import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';

export default function Architectural3DRendering() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Architectural 3D Rendering Services | East Digital</title>
        <meta name="description" content="Professional architectural 3D rendering services for design visualization. Bring your architectural concepts to life with photorealistic quality." />
        <meta name="keywords" content="architectural 3D rendering, design visualization, architectural visualization, building rendering" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="Architectural 3D Rendering"
        backgroundImage="/lovable-uploads/cb3cc839-b816-44d3-85eb-a514f96af439.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Expertise', href: '/expertise' },
          { label: 'Architecture & Design', href: '/expertise/architecture-design' },
          { label: 'Architectural 3D Rendering' }
        ]}
      />

      <main>
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Architectural Vision Realized</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl leading-relaxed tracking-wide text-muted-foreground mb-10">
                  Transform architectural concepts into stunning photorealistic visualizations. Our architectural 3D rendering 
                  services help architects, designers, and developers communicate design intent, secure approvals, and create 
                  compelling presentations for clients and stakeholders.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Rendering Services</h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Exterior architectural visualization</li>
                  <li>• Interior design and space planning</li>
                  <li>• Landscape and site context rendering</li>
                  <li>• Material and lighting studies</li>
                  <li>• Aerial and drone perspective views</li>
                  <li>• 360-degree panoramic renderings</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-12">Design Applications:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Commercial Projects</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Office buildings and complexes</li>
                      <li>• Retail and hospitality spaces</li>
                      <li>• Educational facilities</li>
                      <li>• Healthcare buildings</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Residential Projects</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Custom homes and villas</li>
                      <li>• Multi-family developments</li>
                      <li>• Interior renovations</li>
                      <li>• Landscape design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}