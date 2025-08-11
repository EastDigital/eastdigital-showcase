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
  const [saving, setSaving] = useState(false);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const galleryRef = useRef<HTMLInputElement | null>(null);

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

  const uploadFile = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(path, file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("projects").getPublicUrl(path);
    return data.publicUrl;
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const payload: any = {
        title, slug, summary, category, subcategory, status,
        carousel, carousel_order: carousel ? (carouselOrder || 0) : null,
        cover_image: coverImage,
        gallery,
        case_study_content: editor?.getJSON() ?? {},
      };
      if (editing) {
        await supabase.from("projects").update(payload).eq("id", Number(params.id));
      } else {
        await supabase.from("projects").insert(payload);
      }
      navigate("/admin/projects");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const onUploadCover = async () => {
    const f = coverRef.current?.files?.[0];
    if (!f) return;
    const url = await uploadFile(f);
    setCoverImage(url);
  };

  const onUploadGallery = async () => {
    const files = Array.from(galleryRef.current?.files || []);
    if (files.length === 0) return;
    const urls: string[] = [];
    for (const f of files) {
      const url = await uploadFile(f);
      urls.push(url);
    }
    setGallery(prev => [...prev, ...urls]);
    if (galleryRef.current) galleryRef.current.value = "";
  };

  return (
    <AdminRoute>
      <div className="max-w-3xl">
        <h1 className="text-xl font-semibold mb-6">{editing ? "Edit" : "Add"} Project</h1>

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
            <Label>Summary</Label>
            <Input value={summary} onChange={(e) => setSummary(e.target.value)} />
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
                <Input ref={coverRef} type="file" accept="image/*" />
                <Button type="button" variant="outline" onClick={onUploadCover}>Upload</Button>
              </div>
              {coverImage && <img src={coverImage} alt="Cover" className="mt-3 h-32 rounded object-cover" />}
            </div>
            <div>
              <Label>Gallery</Label>
              <div className="flex items-center gap-3">
                <Input ref={galleryRef} type="file" accept="image/*,video/*" multiple />
                <Button type="button" variant="outline" onClick={onUploadGallery}>Upload</Button>
              </div>
              {gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {gallery.map((u, i) => (
                    <div key={u + i} className="relative">
                      <img src={u} alt={`Gallery ${i+1}`} className="h-24 w-full object-cover rounded" />
                      <button className="absolute top-1 right-1 text-xs bg-background/70 border border-border rounded px-1" onClick={() => setGallery(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Case Study Content</Label>
            <div className="prose prose-invert max-w-none border border-border rounded-md p-3">
              <EditorContent editor={editor} />
            </div>
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
