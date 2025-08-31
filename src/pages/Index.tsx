import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { lazy, Suspense } from 'react';

// Lazy load components that are below the fold
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectGallery = lazy(() => import('@/components/ProjectGallery'));
const Index = () => {
  useSEO('home');
  
  return <div id="top" className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="h-32 bg-background animate-pulse" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-background animate-pulse" />}>
          <ProjectGallery />
        </Suspense>
      </main>
      <Footer />
    </div>;
};
export default Index;