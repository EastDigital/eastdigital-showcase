import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Helmet } from "react-helmet-async";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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

  const feature = useMemo(() => {
    const gal = (project?.gallery || []) as string[];
    const isVideo = (u: string) => /\.(mp4|webm|ogg)$/i.test(u);
    let featured = "";
    for (const u of gal) {
      if (!isVideo(u)) { featured = u; break; }
    }
    const remaining = gal.filter((u) => u !== featured);
    return { featuredImage: featured || (project?.cover_image || ""), remainingGallery: remaining };
  }, [project?.gallery, project?.cover_image]);

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
              <section className="container mx-auto px-4 py-8">
                {(project.summary_heading || project.summary) && (
                  <div className="w-full">
                    {project.summary_heading && (
                      <h2 className="text-gray-300 font-bold font-nunito content-heading mb-4">
                        {project.summary_heading}
                      </h2>
                    )}
                    {project.summary && (
                      <p className="text-gray-300 font-nunito content-paragraph mobile-paragraph">
                        {project.summary}
                      </p>
                    )}
                  </div>
                )}
              </section>

              {feature.featuredImage && (
                <section className="w-full">
                  <img
                    src={feature.featuredImage}
                    alt={`${project.title} featured image`}
                    className="w-full h-auto object-cover"
                  />
                </section>
              )}

              <section className="container mx-auto px-4 py-8">
                <div className="w-full">
                  {project.case_study_heading && (
                    <h2 className="text-gray-300 font-bold font-nunito mb-4 content-heading">
                      {project.case_study_heading}
                    </h2>
                  )}
                  <div className="max-w-none text-gray-300 font-nunito content-paragraph mobile-paragraph">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              </section>

              {feature.remainingGallery && feature.remainingGallery.length > 0 && (
                <section className="container mx-auto px-4 py-6">
                  <h2 className="text-xl font-semibold mb-3">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feature.remainingGallery.map((u, i) => {
                      const isVideo = /\.(mp4|webm|ogg)$/i.test(u);
                      return (
                        <div key={u + i} className="rounded-md overflow-hidden border border-border bg-card cursor-pointer" onClick={() => !isVideo && window.open(u, '_blank')}>
                          {isVideo ? (
                            <video controls className="w-full h-full">
                              <source src={u} />
                            </video>
                          ) : (
                            <img src={u} alt={`${project.title} gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          )}
                        </div>
                      );
                    })}
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
