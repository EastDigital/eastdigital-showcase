import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';

export default function Engineering3DModels() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Engineering 3D Models for Infrastructure | East Digital</title>
        <meta name="description" content="Precise engineering 3D models for infrastructure projects. Technical accuracy meets visual clarity for professional presentations." />
        <meta name="keywords" content="engineering 3D models, technical visualization, infrastructure modeling, BIM services" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="Engineering 3D Models"
        backgroundImage="/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Expertise', href: '/expertise' },
          { label: 'Infrastructure', href: '/expertise/infrastructure' },
          { label: 'Engineering 3D Models' }
        ]}
      />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Precision Engineering Visualization</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Create detailed, technically accurate 3D models that bridge the gap between engineering design and 
                  visual communication. Our engineering 3D models provide the precision needed for technical documentation 
                  while maintaining the clarity required for stakeholder presentations.
                </p>

                {/* Dynamic Project Gallery */}
                <ShortcodeRenderer content="[gallery-engineering-3d-models]" />

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Technical Capabilities</h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li>• CAD-based modeling with engineering accuracy</li>
                  <li>• Detailed component and assembly visualization</li>
                  <li>• Material and structural specifications</li>
                  <li>• Cross-sectional and cutaway views</li>
                  <li>• Dimensional annotations and labeling</li>
                  <li>• Integration with existing CAD workflows</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-12">Industry Applications:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Infrastructure</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Bridge and tunnel systems</li>
                      <li>• Road and highway networks</li>
                      <li>• Water treatment facilities</li>
                      <li>• Power generation plants</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Industrial</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Manufacturing equipment</li>
                      <li>• Process plant layouts</li>
                      <li>• Mechanical assemblies</li>
                      <li>• System integration</li>
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