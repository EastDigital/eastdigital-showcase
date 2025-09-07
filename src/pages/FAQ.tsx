import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import { useSEO } from '@/hooks/useSEO';

const allFAQs = [
  // General FAQs
  { q: "How fast can you deliver a render?", a: "Typically 2–5 business days for a still; animation timelines vary by length and complexity. Rush options are available." },
  { q: "What files do you need to start?", a: "CAD/BIM (DWG/RVT/SKP) or OBJ/FBX, plus floor plans, elevations, material notes, and reference images." },
  { q: "How many revisions are included?", a: "Two rounds for stills; animation revisions are defined per storyboard and scope." },
  { q: "What resolution do you deliver?", a: "Stills up to 4K/8K; videos in 1080p/4K. Higher resolutions available on request." },
  { q: "Do you sign NDAs?", a: "Yes. We frequently work under NDA with developers, architects, and brands." },
  
  // Technical FAQs
  { q: "Which software do you use?", a: "3ds Max/Blender, V-Ray/Corona/Cycles, and Adobe suite for post." },
  { q: "Can you work with BIM (Revit) directly?", a: "Yes—via RVT/FBX workflows; we clean geometry for optimal render times." },
  { q: "Do you provide source files?", a: "Final deliverables are rendered outputs; source files can be licensed separately." },
  { q: "What's your quality control process?", a: "Checklist-based: geometry → materials → lighting → denoise → color → final pass." },
  { q: "How do you ensure consistency across multiple images?", a: "We lock camera, lighting rigs, and calibrated color profiles across the set." },
  
  // Service-specific FAQs
  { q: "What drives photorealism in your renders?", a: "Accurate materials, calibrated lighting (HDRIs), real-world camera settings, and color-managed post." },
  { q: "Can you match a reference mood/brand style?", a: "Yes. Share mood boards or sample shots; we will align lighting and styling to your brand." },
  { q: "How long is a standard walkthrough?", a: "Usually 30–90 seconds, defined in a storyboard/animatic before production." },
  { q: "What's the animation workflow?", a: "Script/storyboard → animatic → look-dev → lighting → render → edit/sound." },
  { q: "How do you handle music/VO/licensing?", a: "We provide licensed music and can add professional or neural VO as required." },
  { q: "What platforms do you support?", a: "Web 360, Meta Quest, and site-embedded viewers. Offline demos available." },
  { q: "Can you work from just photos or sketches?", a: "Yes. Photos, dimensioned drawings, or CAD will do; we model to spec." },
  { q: "Can you generate multiple finishes quickly?", a: "Yes. Once materials are set, finishes/variants can be produced efficiently." },
  
  // Business FAQs  
  { q: "How do quotes work?", a: "Share drawings/references; we send a fixed quote and timeline in 24–48 hours." },
  { q: "Do you take partial upfront payments?", a: "Yes—standard 50% to start, 50% on final delivery." },
  { q: "What if my inputs change mid-project?", a: "Minor tweaks are fine; major changes get a revised quote and timeline." },
  { q: "What time zones do you support?", a: "We operate IST and schedule regular global check-ins." },
  { q: "What's the typical cost range?", a: "We provide a fixed quote after reviewing drawings and scope complexity." }
];

export default function FAQ() {
  useSEO('faq');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | East Digital</title>
        <meta name="description" content="Find answers to common questions about our 3D visualization services, project timelines, file requirements, and workflow processes." />
        <meta name="keywords" content="FAQ, 3D rendering questions, project timeline, file requirements, rendering process" />
      </Helmet>
      
      <FAQSchema 
        faqs={allFAQs} 
        pageTitle="East Digital - Frequently Asked Questions"
        pageUrl="https://eastdigital.in/faq"
      />
      
      <Header />
      
      <PageBanner
        title="Frequently Asked Questions"
        backgroundImage="/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png"
      />

      <main>
        <FAQAccordion 
          faqs={allFAQs}
          title="Complete FAQ Guide"
          subtitle="Everything you need to know about our 3D visualization services"
          className="bg-background"
        />
        
        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-0 md:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              Still have questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is ready to discuss your specific project requirements and answer any additional questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/enquiry"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-border text-foreground rounded-lg font-semibold hover:bg-muted/50 transition-colors"
              >
                Request Proposal
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingCTA />
      <Footer />
    </>
  );
}