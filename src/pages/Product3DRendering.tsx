import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';

export default function Product3DRendering() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Product 3D Rendering Services | East Digital</title>
        <meta name="description" content="Professional product 3D rendering for design visualization and marketing. High-quality product visualizations for various industries." />
        <meta name="keywords" content="product 3D rendering, product visualization, industrial design, product marketing" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="Product 3D Rendering"
        backgroundImage="https://eastdigital.in/img/banner-page-3d-product-rendering.jpg"
      />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Product Design Excellence</h2>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Showcase your products with stunning 3D renderings that capture every detail. Our product visualization 
                  services help you create compelling marketing materials, demonstrate functionality, and accelerate 
                  the design development process across various industries.
                </p>

                {/* Dynamic Project Gallery */}
                <ShortcodeRenderer content="[gallery-product-3d-rendering]" />

                <h3 className="text-2xl font-semibold mb-4 text-foreground">Product Categories</h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Consumer electronics and technology</li>
                  <li>• Furniture and home decor</li>
                  <li>• Automotive components and accessories</li>
                  <li>• Industrial equipment and machinery</li>
                  <li>• Medical devices and equipment</li>
                  <li>• Packaging and container design</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-12">Visualization Features:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Technical Detail</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Accurate material representation</li>
                      <li>• Precise dimensional accuracy</li>
                      <li>• Functional component visualization</li>
                      <li>• Assembly and exploded views</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium text-foreground">Marketing Ready</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Studio lighting and environments</li>
                      <li>• Multiple angle presentations</li>
                      <li>• Lifestyle and context scenes</li>
                      <li>• High-resolution output formats</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingCTA />
      <Footer />
    </>
  );
}