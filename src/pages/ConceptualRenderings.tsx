import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';

export default function ConceptualRenderings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Conceptual 3D Renderings for Infrastructure | East Digital</title>
        <meta name="description" content="Professional conceptual 3D renderings for infrastructure projects. Visualize complex engineering concepts for investors and authorities." />
        <meta name="keywords" content="conceptual 3D renderings, infrastructure visualization, engineering rendering, project presentations" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="Conceptual 3D Renderings"
        backgroundImage="/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Expertise', href: '/expertise' },
          { label: 'Infrastructure', href: '/expertise/infrastructure' },
          { label: 'Conceptual 3D Renderings' }
        ]}
      />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Visualize Your Infrastructure Vision</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Transform complex infrastructure concepts into compelling visual narratives. Our conceptual 3D renderings 
                  help you communicate project vision to stakeholders, secure approvals, and attract investment for 
                  large-scale infrastructure developments.
                </p>

                {/* Dynamic Project Gallery */}
                <ShortcodeRenderer content="[gallery-conceptual-3d-renderings]" />

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Specialized Services</h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Transportation infrastructure visualization</li>
                  <li>• Urban planning and development concepts</li>
                  <li>• Industrial facility renderings</li>
                  <li>• Public works and utilities visualization</li>
                  <li>• Environmental impact illustrations</li>
                  <li>• Phased construction sequences</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-12">Benefits for Your Project:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Stakeholder Communication</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Clear project visualization</li>
                      <li>• Simplified complex concepts</li>
                      <li>• Enhanced public engagement</li>
                      <li>• Improved decision making</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Project Success</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Faster approvals</li>
                      <li>• Increased funding success</li>
                      <li>• Risk mitigation</li>
                      <li>• Timeline optimization</li>
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