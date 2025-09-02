import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  useSEO('sitemap');

  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Expertise', url: '/expertise' },
        { name: 'Contact', url: '/contact' },
        { name: 'Enquiry', url: '/enquiry' },
      ]
    },
    {
      title: 'Real Estate Services',
      links: [
        { name: 'Real Estate Overview', url: '/expertise/real-estate' },
        { name: '3D Walkthrough Video', url: '/expertise/real-estate/3d-walkthrough-video' },
        { name: '3D Still Renderings', url: '/expertise/real-estate/3d-still-renderings' },
      ]
    },
    {
      title: 'Infrastructure Services',
      links: [
        { name: 'Infrastructure Overview', url: '/expertise/infrastructure' },
        { name: 'Conceptual 3D Renderings', url: '/expertise/infrastructure/conceptual-3d-renderings' },
        { name: 'Engineering 3D Models', url: '/expertise/infrastructure/engineering-3d-models' },
      ]
    },
    {
      title: 'Architecture & Design Services',
      links: [
        { name: 'Architecture & Design Overview', url: '/expertise/architecture-design' },
        { name: 'Architectural 3D Rendering', url: '/expertise/architecture-design/architectural-3d-rendering' },
        { name: 'Product 3D Rendering', url: '/expertise/architecture-design/product-3d-rendering' },
      ]
    },
    {
      title: 'Legal & Policies',
      links: [
        { name: 'Terms of Use', url: '/terms-of-use' },
        { name: 'Privacy Policy', url: '/privacy-policy' },
        { name: 'Sitemap', url: '/sitemap' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner 
          title="Sitemap" 
          backgroundImage="/contact-banner.jpg"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Sitemap' }
          ]}
        />
        
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8 md:gap-12">
                {siteStructure.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="h2 text-primary border-b border-border pb-2">
                      {section.title}
                    </h2>
                    <div className="grid gap-2">
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.url}
                          className="block p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                        >
                          <span className="text-foreground group-hover:text-primary transition-colors">
                            {link.name}
                          </span>
                          <span className="block text-sm text-muted-foreground mt-1">
                            {link.url}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <div className="text-center space-y-4">
                  <h3 className="h3">Need Help?</h3>
                  <p className="text-body">
                    If you can't find what you're looking for, feel free to contact us.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;