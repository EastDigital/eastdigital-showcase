import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import AdminRoute from "@/components/AdminRoute";

interface Row { id: number; title: string; cover_image: string | null; carousel_order: number | null; }

function Item({ id, title, cover, order }: { id: number; title: string; cover: string | null; order: number | null; }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center gap-4 p-3 border border-border rounded-md bg-card">
      <div className="w-16 h-12 bg-muted rounded overflow-hidden">
        {cover ? <img src={cover} alt={`${title} cover`} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
      </div>
      <div className="text-sm text-muted-foreground">{order ?? "—"}</div>
    </div>
  );
}

export default function CarouselManager() {
  const [items, setItems] = useState<Row[]>([]);
  const [saving, setSaving] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const load = async () => {
    const { data } = await supabase.from("projects").select("id,title,cover_image,carousel_order").eq("carousel", true).order("carousel_order", { ascending: true, nullsFirst: false });
    setItems((data as any) ?? []);
  };

  useEffect(() => { load(); }, []);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex).map((it, idx) => ({ ...it, carousel_order: idx + 1 }));
    setItems(newItems);
  };

  const save = async () => {
    setSaving(true);
    try {
      for (const it of items) {
        await supabase.from("projects").update({ carousel_order: it.carousel_order }).eq("id", it.id);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminRoute>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Carousel Ordering</h1>
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save order"}</Button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            <div className="grid gap-3">
              {items.map(i => (
                <Item key={i.id} id={i.id} title={i.title} cover={i.cover_image} order={i.carousel_order ?? null} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </AdminRoute>
  );
}
