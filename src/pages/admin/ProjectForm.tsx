import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES, SUBCATEGORIES, ProjectStatus } from "@/constants/pms";
import AdminRoute from "@/components/AdminRoute";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "@/components/ui/use-toast";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProjectForm() {
  const navigate = useNavigate();
  const params = useParams();
  const editing = !!params.id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Draft");
  const [carousel, setCarousel] = useState(false);
  const [carouselOrder, setCarouselOrder] = useState<number | "">("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [summaryHeading, setSummaryHeading] = useState("");
  const [caseStudyHeading, setCaseStudyHeading] = useState("");

  // SEO / OG / AISEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState<string | null>(null);
  const [schemaJson, setSchemaJson] = useState("");
  const [aiseoKeywords, setAiseoKeywords] = useState("");

  const [saving, setSaving] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");


  const editor = useEditor({ extensions: [StarterKit], content: "<p></p>" });

  useEffect(() => {
    if (editing) {
      supabase
        .from("projects")
        .select("*", { count: "exact", head: false })
        .eq("id", Number(params.id))
        .maybeSingle()
        .then(({ data }) => {
          if (!data) return;
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setSummary(data.summary || "");
          setCategory(data.category || "");
          setSubcategory(data.subcategory || "");
          setStatus((data.status as ProjectStatus) || "Draft");
          setCarousel(!!data.carousel);
          setCarouselOrder(data.carousel_order ?? "");
          setCoverImage(data.cover_image || null);
          setGallery(Array.isArray(data.gallery) ? (data.gallery as any[]).map(String) : []);
          setSummaryHeading(data.summary_heading || "");
          setCaseStudyHeading(data.case_study_heading || "");

          // SEO / OG / AISEO / Schema
          setSeoTitle(data.seo_title || "");
          setSeoDescription(data.seo_description || "");
          setSeoKeywords(Array.isArray(data.seo_keywords) ? data.seo_keywords.join(", ") : (data.seo_keywords ?? ""));
          setOgTitle(data.og_title || "");
          setOgDescription(data.og_description || "");
          setOgImage(data.og_image || null);
          setSchemaJson(data.schema_json || "");
          setAiseoKeywords(Array.isArray(data.aiseo_keywords) ? data.aiseo_keywords.join(", ") : (data.aiseo_keywords ?? ""));

          try {
            const content = data.case_study_content;
            if (content && typeof content === "object") editor?.commands.setContent(content as any);
            else editor?.commands.setContent("<p></p>");
          } catch {}
        });
    }
  }, [editing, params.id, editor]);

  useEffect(() => {
    if (!editing) setSlug(slugify(title));
  }, [title, editing]);

  const subcats = useMemo(() => (category ? SUBCATEGORIES[category as keyof typeof SUBCATEGORIES] : []), [category]);

  const addCoverImageFromUrl = () => {
    if (coverImageUrl.trim()) {
      setCoverImage(coverImageUrl.trim());
      setCoverImageUrl("");
    }
  };

  const addGalleryImageFromUrl = () => {
    if (galleryUrl.trim()) {
      setGallery(prev => [...prev, galleryUrl.trim()]);
      setGalleryUrl("");
    }
  };

  const addOgImageFromUrl = () => {
    if (ogImageUrl.trim()) {
      setOgImage(ogImageUrl.trim());
      setOgImageUrl("");
    }
  };

  const isVideoUrl = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      // Check authentication state
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({ title: "Authentication required", description: "Please log in to continue." });
        return;
      }
      
      if (!title || !slug || !category || !subcategory) {
        toast({ title: "Missing required fields", description: "Please fill title, slug, category and subcategory." });
        return;
      }
      
      const payload: any = {
        title, slug, summary, category, subcategory, status,
        carousel, carousel_order: carousel ? (carouselOrder || 0) : null,
        cover_image: coverImage,
        gallery,
        case_study_content: editor?.getJSON() ?? {},
        summary_heading: summaryHeading || null,
        case_study_heading: caseStudyHeading || null,
        // SEO
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        seo_keywords: seoKeywords ? seoKeywords.split(",").map(s => s.trim()).filter(Boolean) : null,
        // Open Graph
        og_title: ogTitle || null,
        og_description: ogDescription || null,
        og_image: ogImage,
        // Schema JSON
        schema_json: schemaJson || null,
        // AISEO
        aiseo_keywords: aiseoKeywords ? aiseoKeywords.split(",").map(s => s.trim()).filter(Boolean) : null,
      };
      let error;
      if (editing) {
        const res = await supabase.from("projects").update(payload).eq("id", Number(params.id));
        error = res.error;
      } else {
        const res = await supabase.from("projects").insert(payload);
        error = res.error;
      }
      if (error) {
        toast({ title: "Save failed", description: error.message });
        return;
      }
      toast({ title: "Project saved" });
      navigate("/admin/projects");
    } catch (e: any) {
      console.error(e);
      toast({ title: "Unexpected error", description: String(e?.message || e) });
    } finally {
      setSaving(false);
    }
  };


  return (
    <AdminRoute>
      <div className="max-w-3xl">
        <h1 className="font-semibold mb-6">{editing ? "Edit" : "Add"} Project</h1>

        <div className="grid gap-5">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Auto-generated from title; you can edit.</p>
          </div>
          <div>
            <h2 className="font-bold text-on-black mb-4">Summary</h2>
            <div className="grid gap-3">
              <div>
                <Label className="text-on-black">Summary Heading</Label>
                <Input value={summaryHeading} onChange={(e) => setSummaryHeading(e.target.value)} placeholder="Enter heading for summary section" />
              </div>
              <div>
                <Label className="text-on-black">Summary Content</Label>
                <Input value={summary} onChange={(e) => setSummary(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={category} onChange={(e) => { setCategory(e.target.value); setSubcategory(""); }}>
                <option value="">Select</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label>Subcategory</Label>
              <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={!category}>
                <option value="">Select</option>
                {subcats.map(sc => <option key={sc} value={sc}>{sc}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input id="carousel" type="checkbox" checked={carousel} onChange={(e) => setCarousel(e.target.checked)} />
              <Label htmlFor="carousel">Show in home carousel</Label>
              {carousel && (
                <>
                  <span className="text-sm text-muted-foreground">Order</span>
                  <Input className="w-24" type="number" value={carouselOrder} onChange={(e) => setCarouselOrder(e.target.value ? Number(e.target.value) : "")} />
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Cover image</Label>
              <div className="flex items-center gap-3">
                <Input 
                  value={coverImageUrl} 
                  onChange={(e) => setCoverImageUrl(e.target.value)} 
                  placeholder="Paste URL" 
                />
                <Button type="button" variant="outline" onClick={addCoverImageFromUrl}>Add</Button>
              </div>
              {coverImage && <img src={coverImage} alt="Cover" className="mt-3 h-32 rounded object-cover" />}
            </div>
            <div>
              <Label>Gallery</Label>
              <div className="flex items-center gap-3">
                <Input 
                  value={galleryUrl} 
                  onChange={(e) => setGalleryUrl(e.target.value)} 
                  placeholder="Paste URL" 
                />
                <Button type="button" variant="outline" onClick={addGalleryImageFromUrl}>+ Add more</Button>
              </div>
              {gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {gallery.map((url, i) => (
                    <div key={url + i} className="relative">
                      {isVideoUrl(url) ? (
                        <video 
                          src={url} 
                          className="h-24 w-full object-cover rounded" 
                          muted 
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                        />
                      ) : (
                        <img src={url} alt={`Gallery ${i+1}`} className="h-24 w-full object-cover rounded" />
                      )}
                      <button 
                        className="absolute top-1 right-1 text-xs bg-background/70 border border-border rounded px-1" 
                        onClick={() => setGallery(prev => prev.filter((_, idx) => idx !== i))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-on-black mb-4">Case Study Content</h2>
            <div className="grid gap-3">
              <div>
                <Label className="text-on-black">Case Study Heading</Label>
                <Input value={caseStudyHeading} onChange={(e) => setCaseStudyHeading(e.target.value)} placeholder="Enter heading for case study section" />
              </div>
              <div>
                <Label className="text-on-black">Case Study Content</Label>
                <div className="prose prose-invert max-w-none border border-border rounded-md p-3">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Fields */}
          <div className="grid gap-4">
            <h3 className="font-semibold">SEO</h3>
            <div>
              <Label>SEO Title</Label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            </div>
            <div>
              <Label>Meta Description</Label>
              <Input value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
            </div>
            <div>
              <Label>Meta Keywords (comma-separated)</Label>
              <Input value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
            </div>
          </div>

          {/* AISEO Fields */}
          <div className="grid gap-2">
            <h3 className="font-semibold">AISEO</h3>
            <div>
              <Label>AISEO Keywords / Tags (comma-separated)</Label>
              <Input value={aiseoKeywords} onChange={(e) => setAiseoKeywords(e.target.value)} />
            </div>
          </div>

          {/* Open Graph Fields */}
          <div className="grid gap-4">
            <h3 className="font-semibold">Open Graph</h3>
            <div>
              <Label>OG Title</Label>
              <Input value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
            </div>
            <div>
              <Label>OG Description</Label>
              <Input value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} />
            </div>
            <div>
              <Label>OG Image</Label>
              <div className="flex items-center gap-3">
                <Input 
                  value={ogImageUrl} 
                  onChange={(e) => setOgImageUrl(e.target.value)} 
                  placeholder="Paste URL" 
                />
                <Button type="button" variant="outline" onClick={addOgImageFromUrl}>Add</Button>
              </div>
              {ogImage && <img src={ogImage} alt="Open Graph" className="mt-3 h-32 rounded object-cover" />}
            </div>
          </div>

          {/* Schema JSON */}
          <div>
            <h3 className="font-semibold">Schema JSON</h3>
            <Label>Paste JSON-LD</Label>
            <textarea className="w-full bg-background border border-border rounded-md p-3 h-40" value={schemaJson} onChange={(e) => setSchemaJson(e.target.value)} placeholder='{"@context":"https://schema.org","@type":"Article"}' />
          </div>

          <div className="flex gap-3">
            <Button onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
