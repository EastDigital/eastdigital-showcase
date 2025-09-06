import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import RealEstate from "./pages/RealEstate";
import Infrastructure from "./pages/Infrastructure";
import ArchitectureDesign from "./pages/ArchitectureDesign";
import WalkthroughVideo from "./pages/WalkthroughVideo";
import RealEstate3DStillRenderings from "./pages/RealEstate3DStillRenderings";
import ConceptualRenderings from "./pages/ConceptualRenderings";
import Engineering3DModels from "./pages/Engineering3DModels";
import Architectural3DRendering from "./pages/Architectural3DRendering";
import Product3DRendering from "./pages/Product3DRendering";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectsList from "./pages/admin/ProjectsList";
import ProjectForm from "./pages/admin/ProjectForm";
import CarouselManager from "./pages/admin/CarouselManager";
import SEOManager from "./pages/admin/SEOManager";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/expertise/real-estate" element={<RealEstate />} />
          <Route path="/expertise/infrastructure" element={<Infrastructure />} />
          <Route path="/expertise/architecture-design" element={<ArchitectureDesign />} />
          
          {/* Real Estate Services */}
          <Route path="/expertise/real-estate/3d-walkthrough-video" element={<WalkthroughVideo />} />
          <Route path="/expertise/real-estate/3d-still-renderings" element={<RealEstate3DStillRenderings />} />
          
          {/* Infrastructure Services */}
          <Route path="/expertise/infrastructure/conceptual-3d-renderings" element={<ConceptualRenderings />} />
          <Route path="/expertise/infrastructure/engineering-3d-models" element={<Engineering3DModels />} />
          
          {/* Architecture & Design Services */}
          <Route path="/expertise/architecture-design/architectural-3d-rendering" element={<Architectural3DRendering />} />
          <Route path="/expertise/architecture-design/product-3d-rendering" element={<Product3DRendering />} />

          {/* Projects listing routes */}
          <Route path="/expertise/real-estate/3d-walkthrough-video/projects" element={<Projects />} />
          <Route path="/expertise/real-estate/3d-still-renderings/projects" element={<Projects />} />
          <Route path="/expertise/infrastructure/conceptual-3d-renderings/projects" element={<Projects />} />
          <Route path="/expertise/infrastructure/engineering-3d-models/projects" element={<Projects />} />
          <Route path="/expertise/architecture-design/architectural-3d-rendering/projects" element={<Projects />} />
          <Route path="/expertise/architecture-design/product-3d-rendering/projects" element={<Projects />} />
          
          {/* Contact & Enquiry */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="carousel" element={<CarouselManager />} />
            <Route path="seo" element={<SEOManager />} />
          </Route>

          {/* Hierarchical Project Case Study Route */}
          <Route path="/expertise/:category/:subcategory/projects/:slug" element={<ProjectCaseStudy />} />
          
          {/* Legal & Policy Pages */}
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
