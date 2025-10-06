import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import FAQAccordion from '@/components/FAQAccordion';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import FAQSchema from '@/components/FAQSchema';

// Lazy load components that are below the fold
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectGallery = lazy(() => import('@/components/ProjectGallery'));

const homeFAQs = [
  { q: "How fast can you deliver a render?", a: "Typically 2–5 business days for a still; animation timelines vary by length and complexity. Rush options are available." },
  { q: "What files do you need to start?", a: "CAD/BIM (DWG/RVT/SKP) or OBJ/FBX, plus floor plans, elevations, material notes, and reference images." },
  { q: "How many revisions are included?", a: "Two rounds for stills; animation revisions are defined per storyboard and scope." },
  { q: "What resolution do you deliver?", a: "Stills up to 4K/8K; videos in 1080p/4K. Higher resolutions available on request." },
  { q: "Do you sign NDAs?", a: "Yes. We frequently work under NDA with developers, architects, and brands." }
];

const Index = () => {
  useSEO('home');
  
  return (
    <>
      <Helmet>
        <title>3D Rendering & Architectural Visualization Services in Lucknow | East Digital</title>
        <meta name="description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <link rel="canonical" href="https://eastdigital.in/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="3D Rendering & Architectural Visualization Services in Lucknow | East Digital" />
        <meta property="og:description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <meta property="og:image" content="https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg" />
        <meta property="og:url" content="https://eastdigital.in/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="3D Rendering & Architectural Visualization Services in Lucknow | East Digital" />
        <meta name="twitter:description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <meta name="twitter:image" content="https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg" />
      </Helmet>
      
      <FAQSchema 
        faqs={homeFAQs} 
        pageTitle="3D Rendering & Architectural Visualization Services in Lucknow | East Digital"
        pageUrl="https://eastdigital.in"
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "East Digital",
            "image": "https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg",
            "logo": "https://www.eastdigital.in/img/logo-east-digital-white.png",
            "url": "https://eastdigital.in/",
            "telephone": "+91-9005 550773",
            "email": "business@eastdigital.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2nd Floor, JSV Hyundai Building, Near Engineering College",
              "addressLocality": "Lucknow",
              "postalCode": "226021",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Lucknow"
            },
            "openingHours": "Mo-Sa 10:00-18:00",
            "description": "Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today.",
            "sameAs": [
              "https://www.linkedin.com/company/east-digital-india",
              "https://www.facebook.com/EastDigitalIndia",
              "https://www.instagram.com/eastdigitalindia",
              "https://www.youtube.com/@EastDigitalIndia"
            ]
          })
        }}
      />
      <div id="top" className="min-h-screen bg-background font-nunito">
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<div className="h-32 bg-background animate-pulse" />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-background animate-pulse" />}>
            <ProjectGallery />
          </Suspense>
          
          {/* FAQ Section */}
          <FAQAccordion 
            faqs={homeFAQs}
            defaultOpen="item-0"
            className="bg-muted/30"
            title="Common Questions"
            subtitle="Quick answers to help you get started with your project"
          />
          
          {/* View All FAQs Link */}
          <section className="py-8 bg-muted/30 border-t border-border/50">
            <div className="container mx-auto px-4 sm:px-0 md:px-8 text-center">
              <Link 
                to="/faq"
                className="inline-flex items-center gap-2 text-cta hover:text-cta-hover font-semibold transition-colors group"
              >
                View all FAQs
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </main>
        <FloatingCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
