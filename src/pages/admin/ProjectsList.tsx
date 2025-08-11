import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CATEGORIES, SUBCATEGORIES, ProjectStatus } from "@/constants/pms";
import AdminRoute from "@/components/AdminRoute";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  status: ProjectStatus;
  carousel: boolean | null;
  updated_at: string;
  cover_image: string | null;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const status = (searchParams.get("status") as ProjectStatus | null) || "";

  const load = async () => {
    setLoading(true);
    let query = supabase.from("projects").select("id,title,slug,category,subcategory,status,carousel,updated_at,cover_image").order("updated_at", { ascending: false });
    if (q) query = query.ilike("title", `%${q}%`);
    if (category) query = query.eq("category", category);
    if (subcategory) query = query.eq("subcategory", subcategory);
    if (status) query = query.eq("status", status);
    const { data } = await query;
    setProjects((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [q, category, subcategory, status]);

  const onDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  const subcats = useMemo(() => (category ? SUBCATEGORIES[category as keyof typeof SUBCATEGORIES] : []), [category]);

  return (
    <AdminRoute>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Button asChild><Link to="/admin/projects/new">Add Project</Link></Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <Label>Search</Label>
          <Input placeholder="Search by title" value={q} onChange={(e) => setParam("q", e.target.value)} />
        </div>
        <div>
          <Label>Category</Label>
          <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={category} onChange={(e) => setParam("category", e.target.value)}>
            <option value="">All</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Label>Subcategory</Label>
          <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={subcategory} onChange={(e) => setParam("subcategory", e.target.value)} disabled={!category}>
            <option value="">All</option>
            {subcats.map(sc => <option key={sc} value={sc}>{sc}</option>)}
          </select>
        </div>
        <div>
          <Label>Status</Label>
          <select className="w-full bg-background border border-border rounded-md h-10 px-3" value={status} onChange={(e) => setParam("status", e.target.value)}>
            <option value="">All</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Carousel</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.cover_image ? <img src={p.cover_image} alt={`${p.title} cover`} className="h-12 w-20 object-cover rounded" /> : "—"}</TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.subcategory}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.carousel ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(p.updated_at).toLocaleString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" asChild><Link to={`/admin/projects/${p.id}/edit`}>Edit</Link></Button>
                  <Button variant="destructive" onClick={() => onDelete(p.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && !loading && (
              <TableRow><TableCell colSpan={8} className="text-center py-10 text-muted-foreground">No projects found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminRoute>
  );
}
