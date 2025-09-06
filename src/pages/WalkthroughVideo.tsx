import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ShortcodeRenderer from '@/components/ShortcodeRenderer';
import { Button } from '@/components/ui/button';
const WalkthroughVideo = () => {
  const projectImages = ["https://eastdigital.in/img/afc_private_004.jpg", "https://eastdigital.in/img/anantraj_001.jpg", "https://eastdigital.in/img/apartment_001.jpg", "https://eastdigital.in/img/ascon_001.jpg"];
  const applications = [{
    title: "Real Estate Marketing",
    description: "Pre-launch campaigns, perfect for property portals and social media advertising."
  }, {
    title: "Investor & Stakeholder Presentations",
    description: "Clearly communicate project vision and potential ROI to secure funding."
  }, {
    title: "Architectural Competitions",
    description: "Present your design concept in a dynamic and unforgettable way."
  }, {
    title: "Sales Center Displays",
    description: "Create a show-stopping centerpiece in your sales gallery to engage visitors."
  }];
  return <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner title="3D Walkthrough Video" backgroundImage="https://eastdigital.in/img/bg-video.jpg" breadcrumbs={[{
        label: "Home",
        href: "/"
      }, {
        label: "Expertise",
        href: "/expertise"
      }, {
        label: "Real Estate",
        href: "/expertise/real-estate"
      }, {
        label: "3D Walkthrough Video",
        href: "/expertise/real-estate/3d-walkthrough-video"
      }, {
        label: "Projects",
        href: "/expertise/real-estate/3d-walkthrough-video/projects"
      }]} />

        {/* Description Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cinematic 3D Walkthrough Videos: Bring Your Property to Life
              </h2>
              <p className="text-on-black">
                In today's competitive real estate market, capturing a potential buyer's imagination is paramount. Static renderings are powerful, but a cinematic 3D walkthrough video from East Digital offers an unparalleled emotional connection. We create a dynamic, narrative-driven experience that allows viewers to feel the flow, ambiance, and true potential of a space before a brick is laid.
              </p>
              
              {/* Dynamic Project Gallery */}
        <ShortcodeRenderer content="[gallery-3d-walkthrough-video]" />
              
              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What is a 3D Walkthrough Video?
                </h2>
                <p className="text-on-black">
                  A 3D Walkthrough is a dynamic video presentation that guides the viewer on a pre-determined path through a 3D model of a property. Unlike an interactive tour where the user controls the experience, a walkthrough is a curated, cinematic experience. It leverages professional camera movements, lighting, music, and editing to tell a compelling story that highlights key features and evokes a specific lifestyle or atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Process: From Blueprint to Blockbuster
              </h2>
              <p className="text-on-black">
                Our meticulous process ensures your vision is translated into a powerful marketing asset.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Discovery & Storyboarding</h3>
                  <p className="text-on-black">
                    We begin by understanding your project's unique selling points and target audience. We collaborate with you to create a storyboard and define the camera paths that best showcase the property's layout and features.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">3D Modeling & Environment</h3>
                  <p className="text-on-black">
                    Our artists transform your 2D plans into a detailed, dimensionally accurate 3D model. We build out the surrounding environment, landscaping, and context.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Texturing & Lighting</h3>
                  <p className="text-on-black">
                    This is where the magic happens. We apply photorealistic materials, textures, and sophisticated lighting techniques to create a convincing and evocative mood.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Animation & Rendering</h3>
                  <p className="text-on-black">
                    We animate the camera along the planned path. Each frame is rendered in high definition using significant computational power to achieve flawless quality.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Post-Production & Delivery</h3>
                  <p className="text-on-black">
                    Our editing team adds music, sound design, graphics, and branding. After your approval, we deliver videos in required formats, optimized for web, social media, and sales presentations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Applications Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Applications for 3D Walkthroughs
              </h2>
              <div className="space-y-6">
                {applications.map((app, index) => <p key={index} className="text-on-black">
                    <span className="font-semibold text-foreground">{app.title}:</span> {app.description}
                  </p>)}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        
      </main>
      <Footer />
    </div>;
};
export default WalkthroughVideo;