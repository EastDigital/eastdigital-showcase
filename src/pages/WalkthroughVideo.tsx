import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const WalkthroughVideo = () => {
  const projectImages = [
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png",
    "/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png"
  ];

  const applications = [
    {
      title: "Real Estate Marketing",
      description: "Pre-launch campaigns, perfect for property portals and social media advertising."
    },
    {
      title: "Investor & Stakeholder Presentations", 
      description: "Clearly communicate project vision and potential ROI to secure funding."
    },
    {
      title: "Architectural Competitions",
      description: "Present your design concept in a dynamic and unforgettable way."
    },
    {
      title: "Sales Center Displays",
      description: "Create a show-stopping centerpiece in your sales gallery to engage visitors."
    }
  ];

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background/95 to-muted/20">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">{'>'}</span>
              <Link to="/expertise" className="text-muted-foreground hover:text-foreground transition-colors">
                Expertise
              </Link>
              <span className="mx-2 text-muted-foreground">{'>'}</span>
              <Link to="/expertise/real-estate" className="text-muted-foreground hover:text-foreground transition-colors">
                Real Estate
              </Link>
              <span className="mx-2 text-muted-foreground">{'>'}</span>
              <span className="text-foreground font-medium">3D Walkthrough Video</span>
            </nav>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Cinematic 3D Walkthrough Videos: Bring Your Property to Life
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                In today's competitive real estate market, capturing a potential buyer's imagination is paramount. But a few seconds is all you have. Behind your lens and tools, our talented East Digital team offers an unparalleled cinematic connection. We create a dynamic narrative that allows viewers to feel how your future unfolds.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                What is a 3D Walkthrough Video?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A 3D Walkthrough is a dynamic video presentation that guides the viewer on a pre-determined path through a 3D model of a property. Unlike an interactive tour where the user controls the experience, a walkthrough is cinematic experience. It leverages professional camera movements, lighting, music, and editing to tell a compelling story that highlights key features, and evokes a specific lifestyle or atmosphere.
              </p>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg bg-card border">
                  <div className="aspect-video relative">
                    <img 
                      src={image}
                      alt={`3D Walkthrough Video ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium">3D Walkthrough Video</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Process: From Blueprint to Blockbuster
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              Our meticulous process ensures your vision is translated into a powerful marketing asset.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">Discovery & Storyboarding</h3>
                <p className="text-muted-foreground">
                  We begin by understanding your project's unique selling points and target audience. We collaborate with you to create a storyboard and script that best showcases your property's layout and features.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">3D Modeling & Environment</h3>
                <p className="text-muted-foreground">
                  Our artists translate your 2D floor plan and vision into a detailed, dimensionally accurate 3D model. We build out the surrounding environment, landscaping, and setting.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">Texturing & Lighting</h3>
                <p className="text-muted-foreground">
                  This is where the magic happens. We apply photorealistic materials, textures, and sophisticated lighting techniques to create a convincing and immersive world.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">Animation & Rendering</h3>
                <p className="text-muted-foreground">
                  We animate the camera along the planned path. Each frame is then rendered in high definition, a process that requires significant computational power to achieve flawless quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Applications for 3D Walkthroughs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {applications.map((app, index) => (
                <div key={index} className="bg-card border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">{app.title}</h3>
                  <p className="text-muted-foreground">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Gallery */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png"
                  alt="3D Walkthrough Example"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png"
                  alt="3D Walkthrough Example"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to discuss your next project?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Send us an email to get the conversation started.
            </p>
            <p className="text-muted-foreground mb-8">
              sales@eastdigital.in
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              If you need guidance on what information should be provided, simply fill out our request a proposal form below.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Take me to the form →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WalkthroughVideo;