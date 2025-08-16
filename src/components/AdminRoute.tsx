import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/constants/pms";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email;
      const isAdmin = !!email && email.toLowerCase() === ADMIN_EMAIL;
      setAuthorized(isAdmin);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email;
      const isAdmin = !!email && email.toLowerCase() === ADMIN_EMAIL;
      setAuthorized(isAdmin);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;
  if (!authorized) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <>{children}</>;
}
