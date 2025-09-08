import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingCTA from '@/components/FloatingCTA';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, Image, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    // Timeline
    timeline: '',
    // Additional Details
    projectDescription: '',
    specificRequirements: '',
    previousExperience: ''
  });
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState<'default' | 'success' | 'loading'>('default');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    if (!formData.serviceRequired) newErrors.serviceRequired = 'Service selection is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg', 'application/octet-stream'];
      return validTypes.includes(file.type) || file.name.toLowerCase().endsWith('.dwg');
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload only PDF, DOC, DWG, or image files.",
        variant: "destructive"
      });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };
  const uploadFilesToStorage = async (files: File[]) => {
    const uploadedUrls = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('proposal-files')
        .upload(fileName, file);
      
      if (error) {
        console.error('Error uploading file:', error);
      } else {
        uploadedUrls.push(fileName);
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setButtonState('loading');
    
    try {
      // Upload files if any
      let fileUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        fileUrls = await uploadFilesToStorage(uploadedFiles);
      }

      // Send email
      const { error } = await supabase.functions.invoke('send-proposal-email', {
        body: {
          ...formData,
          files: fileUrls,
          fileNames: uploadedFiles.map(f => f.name)
        }
      });

      if (error) throw error;

      setButtonState('success');
      
      // Reset form after success
      setTimeout(() => {
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
          timeline: '',
          projectDescription: '',
          specificRequirements: '',
          previousExperience: ''
        });
        setUploadedFiles([]);
        setButtonState('default');
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your proposal. Please try again.",
        variant: "destructive"
      });
      setButtonState('default');
    }
  };
  return <>
      <Helmet>
        <title>Request a Proposal | East Digital</title>
        <meta name="description" content="Request a detailed proposal for your 3D visualization project. Get a comprehensive quote and timeline for your specific needs." />
        <meta name="keywords" content="request proposal, 3D visualization quote, project consultation, East Digital proposal" />
      </Helmet>
      
      <Header />
      
      <PageBanner title="Request a Proposal" backgroundImage="/lovable-uploads/51f0e553-c519-4d08-9cd8-88353f9acfdd.png" />

      <main>
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-0 md:px-8">
            <div className="w-full mx-auto">
              <div className="text-left mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Get Your Custom Proposal</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Tell us about your project and we'll create a detailed proposal with timeline, deliverables, and pricing 
                  tailored to your specific requirements.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Quick 5-minute form</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No obligation</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        required 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className={cn("mt-1 transition-colors", errors.firstName ? "border-red-500 focus:ring-red-500" : "")} 
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        required 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className={cn("mt-1 transition-colors", errors.lastName ? "border-red-500 focus:ring-red-500" : "")} 
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={cn("mt-1 transition-colors", errors.email ? "border-red-500 focus:ring-red-500" : "")} 
                        placeholder="your.email@company.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-1" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium">Company *</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        type="text" 
                        required 
                        value={formData.company} 
                        onChange={handleChange} 
                        className={cn("mt-1 transition-colors", errors.company ? "border-red-500 focus:ring-red-500" : "")} 
                        placeholder="Your company name"
                      />
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                    </div>
                    <div>
                      <Label htmlFor="position" className="text-sm font-medium">Position/Role</Label>
                      <Input id="position" name="position" type="text" value={formData.position} onChange={handleChange} className="mt-1" placeholder="Project Manager, Architect, etc." />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Project Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectName" className="text-sm font-medium">Project Name *</Label>
                        <Input 
                          id="projectName" 
                          name="projectName" 
                          type="text" 
                          required 
                          value={formData.projectName} 
                          onChange={handleChange} 
                          className={cn("mt-1 transition-colors", errors.projectName ? "border-red-500 focus:ring-red-500" : "")} 
                          placeholder="What's your project called?"
                        />
                        {errors.projectName && <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="projectType" className="text-sm font-medium">Project Type *</Label>
                        <select 
                          id="projectType" 
                          name="projectType" 
                          required 
                          value={formData.projectType} 
                          onChange={handleChange} 
                          className={cn("mt-1 w-full bg-background border border-border rounded-md h-10 px-3 transition-colors", errors.projectType ? "border-red-500" : "")}
                        >
                          <option value="">Select project type</option>
                          <option value="residential">🏠 Residential</option>
                          <option value="commercial">🏢 Commercial</option>
                          <option value="industrial">🏭 Industrial</option>
                          <option value="infrastructure">🌉 Infrastructure</option>
                          <option value="mixed-use">🏘️ Mixed Use</option>
                          <option value="other">📋 Other</option>
                        </select>
                        {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="serviceRequired" className="text-sm font-medium">Service Required *</Label>
                        <select 
                          id="serviceRequired" 
                          name="serviceRequired" 
                          required 
                          value={formData.serviceRequired} 
                          onChange={handleChange} 
                          className={cn("mt-1 w-full bg-background border border-border rounded-md h-10 px-3 transition-colors", errors.serviceRequired ? "border-red-500" : "")}
                        >
                          <option value="">Select service</option>
                          <option value="3d-walkthrough-video">🎬 3D Walkthrough Video</option>
                          <option value="3d-still-renderings">📸 3D Still Renderings</option>
                          <option value="conceptual-3d-renderings">💡 Conceptual 3D Renderings</option>
                          <option value="engineering-3d-models">⚙️ Engineering 3D Models</option>
                          <option value="architectural-3d-rendering">🏗️ Architectural 3D Rendering</option>
                          <option value="product-3d-rendering">📦 Product 3D Rendering</option>
                          <option value="multiple-services">🎯 Multiple Services</option>
                        </select>
                        {errors.serviceRequired && <p className="text-red-500 text-xs mt-1">{errors.serviceRequired}</p>}
                      </div>
                      <div>
                        <Label htmlFor="projectLocation" className="text-sm font-medium">Project Location</Label>
                        <Input id="projectLocation" name="projectLocation" type="text" value={formData.projectLocation} onChange={handleChange} className="mt-1" placeholder="City, State/Country" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectSize" className="text-sm font-medium">Project Size/Scale</Label>
                      <Input id="projectSize" name="projectSize" type="text" value={formData.projectSize} onChange={handleChange} className="mt-1" placeholder="e.g., 50,000 sq ft, 20-story building, etc." />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Project Timeline</h3>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-sm font-medium">Preferred Timeline</Label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3">
                      <option value="">Select timeline</option>
                      <option value="rush-1-week">⚡ Rush (1 week)</option>
                      <option value="standard-2-4-weeks">📅 Standard (2-4 weeks)</option>
                      <option value="flexible-1-2-months">🕐 Flexible (1-2 months)</option>
                      <option value="long-term-3-months">📆 Long-term (3+ months)</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">We'll provide accurate pricing and timeline in your custom proposal</p>
                  </div>
                </div>

                {/* Project Details & Files */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Project Details & Files</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectDescription" className="text-sm font-medium">Project Description *</Label>
                      <Textarea 
                        id="projectDescription" 
                        name="projectDescription" 
                        required 
                        rows={4} 
                        value={formData.projectDescription} 
                        onChange={handleChange} 
                        placeholder="Tell us about your project vision, goals, and key requirements..." 
                        className={cn("mt-1 transition-colors", errors.projectDescription ? "border-red-500 focus:ring-red-500" : "")} 
                      />
                      {errors.projectDescription && <p className="text-red-500 text-xs mt-1">{errors.projectDescription}</p>}
                    </div>

                    <div>
                      <Label htmlFor="specificRequirements" className="text-sm font-medium">Specific Requirements</Label>
                      <Textarea id="specificRequirements" name="specificRequirements" rows={3} value={formData.specificRequirements} onChange={handleChange} placeholder="Any specific technical requirements, style preferences, or special considerations..." className="mt-1" />
                    </div>

                    {/* File Upload Section */}
                    <div>
                      <Label className="text-sm font-medium">Reference Files</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            id="file-upload"
                            multiple
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.dwg,.jpg,.jpeg,.png"
                            className="hidden"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-sm font-medium text-foreground">Click to upload files</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, DOC, DWG, or images (JPG, PNG) • Max 10MB each
                            </p>
                          </label>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium">Uploaded Files:</p>
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  {getFileIcon(file.name)}
                                  <span className="text-sm text-foreground">{file.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="previousExperience" className="text-sm font-medium">Previous 3D Visualization Experience</Label>
                      <select id="previousExperience" name="previousExperience" value={formData.previousExperience} onChange={handleChange} className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3">
                        <option value="">Select experience level</option>
                        <option value="first-time">🆕 This is my first 3D visualization project</option>
                        <option value="some-experience">📚 I have some experience with 3D visualization</option>
                        <option value="experienced">👨‍💼 I regularly work with 3D visualization</option>
                        <option value="expert">🎓 I'm an expert in 3D visualization</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={buttonState === 'loading'} 
                    size="lg" 
                    className={cn(
                      "px-8 py-3 min-w-[200px] transition-all duration-300 font-semibold",
                      buttonState === 'success' 
                        ? "bg-green-500 hover:bg-green-600 animate-pulse" 
                        : ""
                    )}
                  >
                    {buttonState === 'loading' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    )}
                    {buttonState === 'success' && <CheckCircle className="w-4 h-4 mr-2" />}
                    {buttonState === 'loading' && 'Submitting...'}
                    {buttonState === 'success' && 'Request Received!'}
                    {buttonState === 'default' && 'Get My Custom Proposal'}
                  </Button>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      We'll review your requirements and respond with a comprehensive proposal within 24 hours.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      🔒 Your information is secure and will never be shared with third parties.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingCTA />
      <Footer />
    </>;
}