import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { lazy, Suspense } from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import { Link } from 'react-router-dom';

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
  
  return <>
    <FAQSchema 
      faqs={homeFAQs} 
      pageTitle="East Digital - 3D Visualization Services"
      pageUrl="https://eastdigital.in"
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
          <div className="container mx-auto px-8 text-center">
            <Link 
              to="/faq"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors group"
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
      <Footer />
    </div>
  </>;
};
export default Index;