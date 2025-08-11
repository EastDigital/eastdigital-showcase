import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If dev flag set, go straight to admin
    if (localStorage.getItem("ed_pms_dev_login") === "1") {
      window.location.replace("/admin");
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) window.location.replace("/admin");
    });
    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const devLogin = () => {
    localStorage.setItem("ed_pms_dev_login", "1");
    window.location.replace("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">{loading ? "Please wait..." : "Login"}</Button>
        <Button type="button" variant="outline" className="w-full" onClick={devLogin}>Dev Login (Bypass)</Button>
        <p className="text-xs text-muted-foreground">Writes restricted to eastdigitalcompany@gmail.com. Dev Login bypasses auth locally.</p>
      </form>
    </div>
  );
}
