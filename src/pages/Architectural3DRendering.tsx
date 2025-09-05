import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';

const architecturalFAQs = [
  { q: "What drives photorealism in your renders?", a: "Accurate materials, calibrated lighting (HDRIs), real-world camera settings, and color-managed post." },
  { q: "Can you match a reference mood/brand style?", a: "Yes. Share mood boards or sample shots; we will align lighting and styling to your brand." },
  { q: "What's the typical cost range?", a: "We provide a fixed quote after reviewing drawings and scope complexity." }
];

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
      
      <FAQSchema 
        faqs={architecturalFAQs} 
        pageTitle="East Digital - Architectural 3D Rendering Services"
        pageUrl="https://eastdigital.in/expertise/architectural-3d-rendering"
      />
      
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
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Architectural Vision Realized</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl leading-relaxed tracking-wide text-muted-foreground mb-10">
                  Transform architectural concepts into stunning photorealistic visualizations. Our architectural 3D rendering 
                  services help architects, designers, and developers communicate design intent, secure approvals, and create 
                  compelling presentations for clients and stakeholders.
                </p>

                {/* Dynamic Project Gallery */}
                <ShortcodeRenderer content="[gallery-architectural-3d-rendering]" />

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Rendering Services</h3>
                
                <ul className="text-xl leading-relaxed tracking-wide text-muted-foreground mb-10">
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
        
        {/* FAQ Section */}
        <FAQAccordion 
          faqs={architecturalFAQs}
          title="Architectural Rendering FAQ"
          subtitle="Common questions about our rendering process and services"
          className="bg-muted/30"
        />
        
        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-0 md:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              Ready to Visualize Your Architecture?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your architectural vision to life with stunning photorealistic renderings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Your Project
              </a>
              <a 
                href="/enquiry"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-border text-foreground rounded-lg font-semibold hover:bg-muted/50 transition-colors"
              >
                Request Quote
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}