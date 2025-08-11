import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminRoute from "@/components/AdminRoute";

interface ProjectRow { id: number; status: string | null; carousel: boolean | null; updated_at: string; }

export default function AdminDashboard() {
  const [rows, setRows] = useState<ProjectRow[]>([]);

  useEffect(() => {
    supabase.from("projects").select("id,status,carousel,updated_at").then(({ data }) => setRows((data as any) ?? []));
  }, []);

  const { total, published, draft, carouselCount, lastUpdated } = useMemo(() => {
    const total = rows.length;
    const published = rows.filter(r => r.status === "Published").length;
    const draft = rows.filter(r => r.status !== "Published").length;
    const carouselCount = rows.filter(r => !!r.carousel).length;
    const lastUpdated = rows.slice().sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]?.updated_at;
    return { total, published, draft, carouselCount, lastUpdated };
  }, [rows]);

  return (
    <AdminRoute>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardTitle>Total Projects</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{total}</CardContent></Card>
        <Card><CardHeader><CardTitle>Published</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{published}</CardContent></Card>
        <Card><CardHeader><CardTitle>Draft</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{draft}</CardContent></Card>
        <Card><CardHeader><CardTitle>In Carousel</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{carouselCount}</CardContent></Card>
      </div>
      <div className="mt-6 text-sm text-muted-foreground">Last updated project: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "—"}</div>
    </AdminRoute>
  );
}
