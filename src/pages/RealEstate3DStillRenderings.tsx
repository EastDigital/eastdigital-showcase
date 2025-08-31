import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';

export default function RealEstate3DStillRenderings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>3D Still Renderings for Real Estate | East Digital</title>
        <meta name="description" content="Professional 3D still renderings for real estate marketing. High-quality architectural visualizations to showcase properties and attract buyers." />
        <meta name="keywords" content="3D still renderings, real estate rendering, property visualization, architectural rendering" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="3D Still Renderings"
        backgroundImage="/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Expertise', href: '/expertise' },
          { label: 'Real Estate', href: '/expertise/real-estate' },
          { label: '3D Still Renderings' }
        ]}
      />

      <main>
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Transform Your Real Estate Vision</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl leading-relaxed tracking-wide text-muted-foreground mb-10">
                  Create stunning, photorealistic 3D still renderings that bring your real estate projects to life. 
                  Our high-quality architectural visualizations help you market properties effectively, attract potential buyers, 
                  and secure investment funding.
                </p>
 {/* Dynamic Project Gallery */}
        <ShortcodeRenderer content="[gallery-3d-still-renderings]" />
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Why Choose Our 3D Still Renderings?</h3>
                
                <ul className="text-xl leading-relaxed tracking-wide text-muted-foreground mb-10">
                  <li>• Photorealistic quality that showcases every detail</li>
                  <li>• Fast turnaround times for urgent marketing needs</li>
                  <li>• Multiple angle views and perspective options</li>
                  <li>• Day and night lighting scenarios</li>
                  <li>• Seasonal and weather variations</li>
                  <li>• High-resolution outputs for print and digital use</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-12">Perfect for:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Marketing Materials</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Brochures and flyers</li>
                      <li>• Website galleries</li>
                      <li>• Social media content</li>
                      <li>• Print advertisements</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Sales Support</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Pre-construction sales</li>
                      <li>• Investor presentations</li>
                      <li>• Planning approvals</li>
                      <li>• Property showcases</li>
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