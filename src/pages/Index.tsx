import { lazy, Suspense, useRef, useState, useEffect } from 'react';
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
const ClientCarousel = lazy(() => import('@/components/ClientCarousel'));
const ProjectGallery = lazy(() => import('@/components/ProjectGallery'));
const homeFAQs = [{
  q: "How fast can you deliver a render?",
  a: "Typically 2–5 business days for a still; animation timelines vary by length and complexity. Rush options are available."
}, {
  q: "What files do you need to start?",
  a: "CAD/BIM (DWG/RVT/SKP) or OBJ/FBX, plus floor plans, elevations, material notes, and reference images."
}, {
  q: "How many revisions are included?",
  a: "Two rounds for stills; animation revisions are defined per storyboard and scope."
}, {
  q: "What resolution do you deliver?",
  a: "Stills up to 4K/8K; videos in 1080p/4K. Higher resolutions available on request."
}, {
  q: "Do you sign NDAs?",
  a: "Yes. We frequently work under NDA with developers, architects, and brands."
}];
const Index = () => {
  useSEO('home');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        setIsLoading(false);
      };
      const handleError = () => {
        setVideoError(true);
        setIsLoading(false);
      };
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);
  return <>
      <Helmet>
        <title>3D Rendering & Architectural Visualization Services in Lucknow | East Digital</title>
        <meta name="description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <meta name="keywords" content="3D visualization, architectural rendering, real estate rendering, 3D walkthrough, engineering visualization, product rendering" />
        <meta name="author" content="East Digital" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://eastdigital.in/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3D Rendering & Architectural Visualization Services in Lucknow | East Digital" />
        <meta property="og:description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <meta property="og:image" content="https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://eastdigital.in/" />
        <meta property="og:site_name" content="East Digital" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3D Rendering & Architectural Visualization Services in Lucknow | East Digital" />
        <meta name="twitter:description" content="Bring your projects to life with photorealistic 3D rendering and architectural walkthroughs. East Digital is Lucknow's leading visualization studio for real estate, architecture, and engineering leaders. Get a quote today." />
        <meta name="twitter:image" content="https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg" />
      </Helmet>
      
      <FAQSchema faqs={homeFAQs} pageTitle="3D Rendering & Architectural Visualization Services in Lucknow | East Digital" pageUrl="https://eastdigital.in" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "East Digital",
        "image": "https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg",
        "logo": "https://www.eastdigital.in/img/logo-east-digital-white.png",
        "url": "https://eastdigital.in/",
        "telephone": "+91-9005550773",
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
          "name": "Lucknow, India"
        },
        "openingHours": "Mo-Sa 10:00-18:00",
        "description": "East Digital is a 3D rendering and 3D walkthrough studio in Lucknow, specializing in photorealistic visualizations for real estate, engineering, and design.",
        "sameAs": ["https://www.linkedin.com/company/east-digital-india", "https://www.facebook.com/EastDigitalIndia", "https://www.instagram.com/eastdigitalindia", "https://www.youtube.com/@EastDigitalIndia", "https://www.behance.net/eastdigital"]
      })
    }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "East Digital Agency Showreel",
        "description": "A short showreel showcasing East Digital's 3D rendering, architectural walkthroughs, and visualization work for real estate and design clients.",
        "thumbnailUrl": "https://eastdigital.in/img/projects/3d-river-villas/3d-visualization-river-villas_01.jpg",
        "uploadDate": "2025-09-15",
        "contentUrl": "https://www.eastdigital.in/img/hero_video_folio.mp4",
        "embedUrl": "https://eastdigital.in/",
        "publisher": {
          "@type": "Organization",
          "name": "East Digital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.eastdigital.in/img/logo-east-digital-white.png"
          }
        }
      })
    }} />
      <div id="top" className="min-h-screen bg-background font-nunito">
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<div className="h-32 bg-background animate-pulse" />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<div className="h-24 bg-background animate-pulse" />}>
            <ClientCarousel />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-background animate-pulse" />}>
            <ProjectGallery />
          </Suspense>
          
          {/* Trusted by Many Section */}
          
          
          {/* FAQ Section */}
          <FAQAccordion faqs={homeFAQs} defaultOpen="item-0" className="bg-muted/30" title="Common Questions" subtitle="Quick answers to help you get started with your project" />
          
          {/* View All FAQs Link */}
          <section className="py-8 bg-muted/30 border-t border-border/50">
            <div className="container mx-auto px-4 sm:px-0 md:px-8 text-center">
              <Link to="/faq" className="inline-flex items-center gap-2 text-cta hover:text-cta-hover font-semibold transition-colors group">
                View all FAQs
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </main>
        <FloatingCTA />
        <Footer />
      </div>
    </>;
};
export default Index;