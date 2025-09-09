import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import FAQMini from '@/components/FAQMini';
import FAQSchema from '@/components/FAQSchema';

const contactFAQs = [
  { q: "How do quotes work?", a: "Share drawings/references; we send a fixed quote and timeline in 24–48 hours." },
  { q: "Do you take partial upfront payments?", a: "Yes—standard 50% to start, 50% on final delivery." },
  { q: "What if my inputs change mid-project?", a: "Minor tweaks are fine; major changes get a revised quote and timeline." },
  { q: "What time zones do you support?", a: "We operate IST and schedule regular global check-ins." }
];

export default function Contact() {
  useSEO('contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState<'default' | 'success' | 'loading'>('default');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonState('loading');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message
        }
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours."
      });
      
      setButtonState('success');
      
      // Reset form and button state after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: ''
        });
        setButtonState('default');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again.",
        variant: "destructive"
      });
      setButtonState('default');
    }
  };

  return <>
      <Helmet>
        <title>Contact Us | East Digital</title>
        <meta name="description" content="Get in touch with East Digital for your 3D visualization needs. Contact our team for project inquiries and consultations." />
        <meta name="keywords" content="contact East Digital, 3D visualization inquiry, project consultation" />
      </Helmet>
      
      <FAQSchema 
        faqs={contactFAQs} 
        pageTitle="East Digital - Contact Information"
        pageUrl="https://eastdigital.in/contact"
      />
      
      <Header />
      
      <PageBanner title="Contact Us" backgroundImage="/contact-banner.jpg" />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h1 className="font-bold mb-8 text-foreground">Get In Touch</h1>
                  
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      Ready to bring your project to life? We're here to help you create stunning 3D visualizations 
                      that exceed your expectations.
                    </p>
                    
                    <div className="space-y-4">
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 mt-1 text-accent flex-shrink-0">
                           <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                             <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                             <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                           </svg>
                         </div>
                        <div>
                           <h3 className="font-semibold text-foreground">Email</h3>
                           <p className="text-muted-foreground">eastdigitalcompany@gmail.com</p>
                        </div>
                      </div>
                      
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 mt-1 text-accent flex-shrink-0">
                           <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                           </svg>
                         </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Address</h3>
                          <p className="text-muted-foreground">2nd Floor, JSV Hyundai Building, Near Engineering College, Lucknow, Uttar Pradesh, INDIA - 226021</p>
                        </div>
                      </div>
                      
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 mt-1 text-accent flex-shrink-0">
                           <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                             <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                           </svg>
                         </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Phone</h3>
                          <p className="text-muted-foreground">+91-99105 68689</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Guidance Note and CTA */}
                    <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
                      <p className="text-muted-foreground mb-4">
                        If you need guidance on what information should be provided, simply fill out our request a proposal form below.
                      </p>
                      <Link 
                        to="/enquiry" 
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-all duration-300 group"
                      >
                        Take me to form
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
                  </div>
                </div>

                <div className="space-y-8">
                  {/* FAQ Section */}
                  <div className="mb-12">
                    <FAQMini 
                      faqs={contactFAQs}
                      title="Before You Contact Us"
                      className="bg-muted/30 rounded-xl p-6 border"
                    />
                  </div>

                  {/* Contact Form */}
                  <div className="bg-card rounded-xl p-8 border shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                      <p className="text-muted-foreground">
                        Fill out the form below and we'll get back to you within 24 hours with a detailed response.
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3">
                          <option value="">Select a service</option>
                          <option value="3d-walkthrough-video">3D Walkthrough Video</option>
                          <option value="3d-still-renderings">3D Still Renderings</option>
                          <option value="conceptual-3d-renderings">Conceptual 3D Renderings</option>
                          <option value="engineering-3d-models">Engineering 3D Models</option>
                          <option value="architectural-3d-rendering">Architectural 3D Rendering</option>
                          <option value="product-3d-rendering">Product 3D Rendering</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." className="mt-1" />
                      </div>

                        <Button 
                          type="submit" 
                          disabled={buttonState === 'loading'} 
                          className={cn(
                            "w-full transition-all duration-300 font-semibold",
                            buttonState === 'success' 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : ''
                          )}
                        >
                          {buttonState === 'loading' && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          )}
                          {buttonState === 'loading' && 'Sending...'}
                          {buttonState === 'success' && 'Submitted Successfully'}
                          {buttonState === 'default' && 'Send Message'}
                        </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingCTA />
      <Footer />
    </>
}