import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  cover_image: string | null;
}

export default function ProjectCarousel() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,slug,summary,cover_image")
        .eq("status", "Published")
        .eq("carousel", true)
        .order("carousel_order", { ascending: true, nullsFirst: false });
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
      <section className="py-10">
        <div className="container mx-auto page-gutter content-max">
          <div className="h-48 rounded-md bg-muted animate-pulse" />
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto page-gutter content-max">
        <header className="mb-4 text-left">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
        </header>
        <div className="relative">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {items.map((p) => (
                <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                  <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <Link to={`/projects/${p.slug}`} className="block">
                      <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
                        {p.cover_image && (
                          <img
                            src={p.cover_image}
                            alt={`${p.title} cover image`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium">{p.title}</h3>
                        {p.summary && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {p.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 md:-left-6" />
            <CarouselNext className="-right-3 md:-right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
