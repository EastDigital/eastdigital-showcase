import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours."
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };
  return <>
      <Helmet>
        <title>Contact Us | East Digital</title>
        <meta name="description" content="Get in touch with East Digital for your 3D visualization needs. Contact our team for project inquiries and consultations." />
        <meta name="keywords" content="contact East Digital, 3D visualization inquiry, project consultation" />
      </Helmet>
      
      <Header />
      
      <PageBanner title="Contact Us" backgroundImage="/lovable-uploads/21fb07b7-1763-41d1-a379-4a6141001b94.png" breadcrumbs={[{
      label: 'Home',
      href: '/'
    }, {
      label: 'Contact Us'
    }]} />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground">
                      Ready to bring your project to life? We're here to help you create stunning 3D visualizations 
                      that exceed your expectations.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 mt-1 text-accent">
                          <svg fill="currentColor" viewBox="0 0 20 20">
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
                        <div className="w-6 h-6 mt-1 text-accent">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Response Time</h3>
                          <p className="text-muted-foreground">Within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 mt-1 text-accent">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Business Hours</h3>
                          <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
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

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>;
}