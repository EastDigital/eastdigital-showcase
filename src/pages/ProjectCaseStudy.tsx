import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Helmet } from "react-helmet-async";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  summary_heading: string | null;
  case_study_heading: string | null;
  cover_image: string | null;
  gallery: string[] | null;
  case_study_content: any;
  category: string;
  subcategory: string;
  // SEO
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  // OG
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  // Schema
  schema_json: string | null;
}

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const editor = useEditor({ extensions: [StarterKit], content: "<p></p>", editable: false });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug || "")
        .maybeSingle();
      if (!mounted) return;
      if (error) {
        console.error(error);
      }
      if (data) {
        setProject(data as any);
        try {
          const content = (data as any).case_study_content;
          if (content && typeof content === "object") editor?.commands.setContent(content as any);
          else editor?.commands.setContent("<p></p>");
        } catch {}
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const titleTag = useMemo(() => project?.seo_title || project?.title || "Project", [project]);
  const metaDescription = useMemo(() => project?.seo_description || project?.summary || "", [project]);
  const keywords = useMemo(() => (project?.seo_keywords || []).join(", "), [project]);
  const ogTitle = useMemo(() => project?.og_title || titleTag, [project, titleTag]);
  const ogDescription = useMemo(() => project?.og_description || metaDescription, [project, metaDescription]);
  const ogImage = useMemo(() => project?.og_image || project?.cover_image || "", [project]);

  const schemaJsonSafe = useMemo(() => {
    try {
      if (project?.schema_json) {
        const parsed = JSON.parse(project.schema_json);
        return JSON.stringify(parsed);
      }
    } catch {}
    return null;
  }, [project?.schema_json]);

  const breadcrumbs = useMemo(() => {
    const items: Array<{ label: string; href?: string }> = [
      { label: "Home", href: "/" },
      { label: "Expertise", href: "/expertise" },
    ];
    if (project?.category) {
      const map: Record<string, string> = {
        "REAL ESTATE": "/expertise/real-estate",
        "INFRASTRUCTURE": "/expertise/infrastructure",
        "ARCHITECTURE & DESIGN": "/expertise/architecture-design",
      };
      const catPath = map[project.category] || "/expertise";
      items.push({ label: project.category, href: catPath });
    }
    if (project?.title) items.push({ label: project.title });
    return items;
  }, [project?.category, project?.title]);

  const galleryData = useMemo(() => {
    const gal = (project?.gallery || []) as string[];
    const isVideo = (u: string) => /\.(mp4|webm|ogg)$/i.test(u);
    const images = gal.filter(url => !isVideo(url));
    const videos = gal.filter(url => isVideo(url));

    return { 
      images,
      videos,
      allImages: images
    };
  }, [project?.gallery]);

  // Auto-slide functionality
  useEffect(() => {
    if (galleryData.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === galleryData.images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // Auto slide every 4 seconds

    return () => clearInterval(interval);
  }, [galleryData.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Helmet>
        <title>{titleTag}</title>
        {metaDescription ? <meta name="description" content={metaDescription} /> : null}
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle} />
        {ogDescription ? <meta property="og:description" content={ogDescription} /> : null}
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta property="og:type" content="article" />
        {/* Schema JSON-LD */}
        {schemaJsonSafe ? (
          <script type="application/ld+json">{schemaJsonSafe}</script>
        ) : null}
      </Helmet>
      <Header />
      <main>
        {loading ? (
          <section className="container mx-auto px-4 py-10">
            <div className="h-64 w-full rounded-md bg-muted animate-pulse" />
          </section>
        ) : !project ? (
          <section className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold">Project not found</h1>
          </section>
        ) : (
          <>
            <PageBanner title={project.title} backgroundImage={project.cover_image || ""} breadcrumbs={breadcrumbs} />
            <article>
              <section className="mobile-section sm:py-16">
                <div className="container mx-auto px-4 sm:px-0 md:px-8">
                  {(project.summary_heading || project.summary) && (
                    <div className="max-w-none">
                      {project.summary_heading && (
                        <h2 className="text-on-black font-bold font-nunito content-heading mb-4">
                          {project.summary_heading}
                        </h2>
                      )}
                      {project.summary && (
                        <p className="text-on-black font-nunito text-[15px] leading-[26px] tracking-[0.03em] md:text-[18px] md:leading-[30px] md:tracking-[0.03em]">
                          {project.summary}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {galleryData.images.length > 0 && (
                <section className="mobile-section sm:py-16">
                  <div className="container mx-auto px-4 sm:px-0 md:px-8">
                    <h2 className="text-xl font-semibold mb-6 text-on-black">Project Gallery</h2>
                    
                    {/* Main slideshow image */}
                    <div className="relative w-full mb-6">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                        <img
                          src={galleryData.images[currentImageIndex]}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation arrows */}
                        {galleryData.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                          </>
                        )}
                        
                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {galleryData.images.length}
                        </div>
                      </div>
                    </div>
                    
                    {/* Thumbnail navigation */}
                    {galleryData.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {galleryData.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex 
                                ? 'border-primary' 
                                : 'border-transparent hover:border-primary/50'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${project.title} thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              <section className="mobile-section sm:py-16">
                <div className="container mx-auto px-4 sm:px-0 md:px-8">
                  <div className="max-w-none">
                    {project.case_study_heading && (
                      <h2 className="text-on-black font-bold font-nunito mb-4 content-heading">
                        {project.case_study_heading}
                      </h2>
                    )}
                    
                    <div className="max-w-none text-on-black font-nunito text-[15px] leading-[26px] tracking-[0.03em] md:text-[18px] md:leading-[30px] md:tracking-[0.03em] [&_p]:text-on-black [&_p]:text-[15px] [&_p]:leading-[26px] [&_p]:tracking-[0.03em] md:[&_p]:text-[18px] md:[&_p]:leading-[30px] md:[&_p]:tracking-[0.03em] [&_h1]:text-on-black [&_h2]:text-on-black [&_h3]:text-on-black [&_h4]:text-on-black [&_h5]:text-on-black [&_h6]:text-on-black [&_a]:text-cta hover:[&_a]:text-cta-hover">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>
              </section>

              {galleryData.videos.length > 0 && (
                <section className="mobile-section sm:py-16">
                  <div className="container mx-auto px-4 sm:px-0 md:px-8">
                    <h2 className="text-xl font-semibold mb-3 text-on-black">Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryData.videos.map((url, i) => (
                        <div key={url + i} className="rounded-md overflow-hidden border border-border bg-card">
                          <video controls className="w-full h-full">
                            <source src={url} />
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </article>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
