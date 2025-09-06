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

export default function Enquiry() {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    
    // Project Details
    projectName: '',
    projectType: '',
    serviceRequired: '',
    projectLocation: '',
    projectSize: '',
    
    // Timeline & Budget
    deadline: '',
    timeline: '',
    budget: '',
    
    // Additional Details
    projectDescription: '',
    specificRequirements: '',
    referenceFiles: '',
    previousExperience: ''
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
        title: "Proposal Request Submitted!",
        description: "Thank you for your detailed inquiry. Our team will review your requirements and respond with a comprehensive proposal within 2-3 business days."
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        projectName: '',
        projectType: '',
        serviceRequired: '',
        projectLocation: '',
        projectSize: '',
        deadline: '',
        timeline: '',
        budget: '',
        projectDescription: '',
        specificRequirements: '',
        referenceFiles: '',
        previousExperience: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Request a Proposal | East Digital</title>
        <meta name="description" content="Request a detailed proposal for your 3D visualization project. Get a comprehensive quote and timeline for your specific needs." />
        <meta name="keywords" content="request proposal, 3D visualization quote, project consultation, East Digital proposal" />
      </Helmet>
      
      <Header />
      
      <PageBanner
        title="Request a Proposal"
        backgroundImage="/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png"
      />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Get Your Custom Proposal</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tell us about your project and we'll create a detailed proposal with timeline, deliverables, and pricing 
                  tailored to your specific requirements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Role</Label>
                      <Input
                        id="position"
                        name="position"
                        type="text"
                        value={formData.position}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Project Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectName">Project Name *</Label>
                        <Input
                          id="projectName"
                          name="projectName"
                          type="text"
                          required
                          value={formData.projectName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3"
                        >
                          <option value="">Select project type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="infrastructure">Infrastructure</option>
                          <option value="mixed-use">Mixed Use</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="serviceRequired">Service Required *</Label>
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          required
                          value={formData.serviceRequired}
                          onChange={handleChange}
                          className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3"
                        >
                          <option value="">Select service</option>
                          <option value="3d-walkthrough-video">3D Walkthrough Video</option>
                          <option value="3d-still-renderings">3D Still Renderings</option>
                          <option value="conceptual-3d-renderings">Conceptual 3D Renderings</option>
                          <option value="engineering-3d-models">Engineering 3D Models</option>
                          <option value="architectural-3d-rendering">Architectural 3D Rendering</option>
                          <option value="product-3d-rendering">Product 3D Rendering</option>
                          <option value="multiple-services">Multiple Services</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="projectLocation">Project Location</Label>
                        <Input
                          id="projectLocation"
                          name="projectLocation"
                          type="text"
                          value={formData.projectLocation}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="City, State/Country"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectSize">Project Size/Scale</Label>
                      <Input
                        id="projectSize"
                        name="projectSize"
                        type="text"
                        value={formData.projectSize}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="e.g., 50,000 sq ft, 20-story building, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline & Budget */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Timeline & Budget</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="deadline">Required Deadline</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3"
                      >
                        <option value="">Select timeline</option>
                        <option value="rush-1-week">Rush (1 week)</option>
                        <option value="standard-2-4-weeks">Standard (2-4 weeks)</option>
                        <option value="flexible-1-2-months">Flexible (1-2 months)</option>
                        <option value="long-term-3-months">Long-term (3+ months)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="over-50k">Over $50,000</option>
                        <option value="discuss">To be discussed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        name="projectDescription"
                        required
                        rows={4}
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Please provide a detailed description of your project, including goals, target audience, and key requirements..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specificRequirements">Specific Requirements</Label>
                      <Textarea
                        id="specificRequirements"
                        name="specificRequirements"
                        rows={3}
                        value={formData.specificRequirements}
                        onChange={handleChange}
                        placeholder="Any specific technical requirements, style preferences, or special considerations..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="referenceFiles">Reference Materials</Label>
                      <Textarea
                        id="referenceFiles"
                        name="referenceFiles"
                        rows={2}
                        value={formData.referenceFiles}
                        onChange={handleChange}
                        placeholder="Please describe any reference materials you can provide (CAD files, architectural plans, sketches, inspiration images, etc.)"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousExperience">Previous 3D Visualization Experience</Label>
                      <select
                        id="previousExperience"
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3"
                      >
                        <option value="">Select experience level</option>
                        <option value="first-time">This is my first 3D visualization project</option>
                        <option value="some-experience">I have some experience with 3D visualization</option>
                        <option value="experienced">I regularly work with 3D visualization</option>
                        <option value="expert">I'm an expert in 3D visualization</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    size="lg"
                    className="px-8"
                  >
                    {loading ? 'Submitting Proposal Request...' : 'Request Detailed Proposal'}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    We'll review your requirements and respond with a comprehensive proposal within 2-3 business days.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}