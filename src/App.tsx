import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import RealEstate from "./pages/RealEstate";
import Infrastructure from "./pages/Infrastructure";
import ArchitectureDesign from "./pages/ArchitectureDesign";
import WalkthroughVideo from "./pages/WalkthroughVideo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/expertise/real-estate" element={<RealEstate />} />
          <Route path="/expertise/infrastructure" element={<Infrastructure />} />
          <Route path="/expertise/architecture-design" element={<ArchitectureDesign />} />
          <Route path="/expertise/real-estate/3d-walkthrough-video" element={<WalkthroughVideo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
