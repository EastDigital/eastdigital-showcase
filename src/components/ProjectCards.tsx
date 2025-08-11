import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  cover_image: string | null;
  category: string;
  subcategory: string;
}

export default function ProjectCards() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,slug,summary,cover_image,category,subcategory")
        .eq("status", "Published")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (error) {
        console.error(error);
        setItems([]);
      } else {
        setItems((data as any) || []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading && items.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground">No projects published yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <Link key={p.id} to={`/projects/${p.slug}`}>
            <Card className="group overflow-hidden border-border bg-card">
              <CardHeader className="p-0">
                <div className="aspect-[16/10] w-full bg-muted overflow-hidden">
                  {p.cover_image && (
                    <img
                      src={p.cover_image}
                      alt={`${p.title} cover image`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-base font-semibold">{p.title}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.category}{p.subcategory ? ` • ${p.subcategory}` : ""}
                </p>
                {p.summary && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.summary}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
