import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectCards from '@/components/ProjectCards';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
const Index = () => {
  useSEO('home');
  
  return <div id="top" className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectGallery />
        
      </main>
      <Footer />
    </div>;
};
export default Index;