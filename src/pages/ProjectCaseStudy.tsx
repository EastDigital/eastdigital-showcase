import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
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
            <article>
              <header className="bg-card border-b border-border">
                <div className="container mx-auto px-4 py-8">
                  <h1 className="text-3xl font-semibold">{project.title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.category}{project.subcategory ? ` • ${project.subcategory}` : ""}
                  </p>
                  {project.summary && (
                    <p className="mt-3 max-w-3xl text-base text-muted-foreground">{project.summary}</p>
                  )}
                </div>
              </header>

              {project.cover_image && (
                <section className="bg-background">
                  <div className="container mx-auto px-4 py-6">
                    <img
                      src={project.cover_image}
                      alt={`${project.title} cover image`}
                      className="w-full rounded-md object-cover"
                    />
                  </div>
                </section>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <section className="container mx-auto px-4 py-6">
                  <h2 className="text-xl font-semibold mb-3">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery.map((u, i) => {
                      const isVideo = /\.(mp4|webm|ogg)$/i.test(u);
                      return (
                        <div key={u + i} className="rounded-md overflow-hidden border border-border bg-card">
                          {isVideo ? (
                            <video controls className="w-full h-full">
                              <source src={u} />
                            </video>
                          ) : (
                            <img src={u} alt={`${project.title} gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="container mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold mb-3">Case Study</h2>
                <div className="prose max-w-none prose-invert border border-border rounded-md p-4">
                  <EditorContent editor={editor} />
                </div>
              </section>
            </article>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
