import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProjectCards from '@/components/ProjectCards';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectCarousel />
        <section className="py-10">
          <ProjectCards />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
