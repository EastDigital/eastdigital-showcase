import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/constants/pms";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setEmail(session?.user?.email ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    localStorage.removeItem("ed_pms_dev_login");
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin" className="font-bold">East Digital PMS</Link>
          <nav className="flex items-center gap-6">
            <Link to="/admin" className="hover:text-accent">Dashboard</Link>
            <Link to="/admin/projects" className="hover:text-accent">Projects</Link>
            <Link to="/admin/carousel" className="hover:text-accent">Carousel</Link>
            <span className="text-sm text-muted-foreground">{email?.toLowerCase() === ADMIN_EMAIL ? email : ""}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
