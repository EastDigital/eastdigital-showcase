import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PageSEO {
  id: string;
  page_slug: string;
  page_title: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  canonical_url: string | null;
  is_indexed: boolean;
  is_followed: boolean;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  schema_json: string | null;
}

interface AnalyticsCode {
  id: string;
  platform: string;
  code: string;
  is_enabled: boolean;
}

export default function SEOManager() {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsCode[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageSEO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSEOData();
    fetchAnalyticsData();
  }, []);

  const fetchSEOData = async () => {
    const { data, error } = await supabase
      .from("page_seo")
      .select("*")
      .order("page_title");

    if (error) {
      toast.error("Failed to fetch SEO data");
      return;
    }

    setPages(data || []);
    if (data && data.length > 0) {
      setSelectedPage(data[0]);
    }
    setLoading(false);
  };

  const fetchAnalyticsData = async () => {
    const { data, error } = await supabase
      .from("analytics_codes")
      .select("*")
      .order("platform");

    if (error) {
      toast.error("Failed to fetch analytics data");
      return;
    }

    setAnalytics(data || []);
  };

  const updatePageSEO = async (pageData: Partial<PageSEO>) => {
    if (!selectedPage) return;

    const { error } = await supabase
      .from("page_seo")
      .update(pageData)
      .eq("id", selectedPage.id);

    if (error) {
      toast.error("Failed to update SEO data");
      return;
    }

    toast.success("SEO data updated successfully");
    fetchSEOData();
  };

  const updateAnalyticsCode = async (platform: string, code: string, enabled: boolean) => {
    const { error } = await supabase
      .from("analytics_codes")
      .update({ code, is_enabled: enabled })
      .eq("platform", platform);

    if (error) {
      toast.error("Failed to update analytics code");
      return;
    }

    toast.success("Analytics code updated successfully");
    fetchAnalyticsData();
  };

  const handleInputChange = (field: keyof PageSEO, value: any) => {
    if (!selectedPage) return;
    
    setSelectedPage({
      ...selectedPage,
      [field]: value
    });
  };

  const handleSave = () => {
    if (!selectedPage) return;

    const { id, ...updateData } = selectedPage;
    updatePageSEO(updateData);
  };

  const platformLabels: Record<string, string> = {
    google_analytics: "Google Analytics (GA4)",
    google_tag_manager: "Google Tag Manager",
    meta_pixel: "Meta Pixel (Facebook)",
    twitter_pixel: "Twitter/X Pixel",
    linkedin_insight: "LinkedIn Insight Tag",
    custom_script: "Custom Script"
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SEO & Analytics Manager</h1>
      </div>

      <Tabs defaultValue="seo" className="space-y-6">
        <TabsList>
          <TabsTrigger value="seo">Page SEO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Tracking</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Page List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Website Pages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    variant={selectedPage?.id === page.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedPage(page)}
                  >
                    {page.page_title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* SEO Form */}
            <div className="md:col-span-3 space-y-6">
              {selectedPage && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic SEO - {selectedPage.page_title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Meta Title</Label>
                          <Input
                            value={selectedPage.meta_title || ""}
                            onChange={(e) => handleInputChange("meta_title", e.target.value)}
                            placeholder="Page meta title"
                          />
                        </div>
                        <div>
                          <Label>Canonical URL</Label>
                          <Input
                            value={selectedPage.canonical_url || ""}
                            onChange={(e) => handleInputChange("canonical_url", e.target.value)}
                            placeholder="https://example.com/page"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Meta Description</Label>
                        <Textarea
                          value={selectedPage.meta_description || ""}
                          onChange={(e) => handleInputChange("meta_description", e.target.value)}
                          placeholder="Page meta description (160 characters max)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Meta Keywords (comma-separated)</Label>
                        <Input
                          value={selectedPage.meta_keywords?.join(", ") || ""}
                          onChange={(e) => handleInputChange("meta_keywords", e.target.value.split(",").map(k => k.trim()).filter(k => k))}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <Label>Index Page</Label>
                          <Switch
                            checked={selectedPage.is_indexed}
                            onCheckedChange={(checked) => handleInputChange("is_indexed", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Follow Links</Label>
                          <Switch
                            checked={selectedPage.is_followed}
                            onCheckedChange={(checked) => handleInputChange("is_followed", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Open Graph & Social Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>OG Title</Label>
                          <Input
                            value={selectedPage.og_title || ""}
                            onChange={(e) => handleInputChange("og_title", e.target.value)}
                            placeholder="Open Graph title"
                          />
                        </div>
                        <div>
                          <Label>OG Image URL</Label>
                          <Input
                            value={selectedPage.og_image || ""}
                            onChange={(e) => handleInputChange("og_image", e.target.value)}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>OG Description</Label>
                        <Textarea
                          value={selectedPage.og_description || ""}
                          onChange={(e) => handleInputChange("og_description", e.target.value)}
                          placeholder="Open Graph description"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Structured Data (JSON-LD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label>Schema JSON</Label>
                      <Textarea
                        value={selectedPage.schema_json || ""}
                        onChange={(e) => handleInputChange("schema_json", e.target.value)}
                        placeholder='{"@context": "https://schema.org", "@type": "WebPage", "name": "Page Name"}'
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </CardContent>
                  </Card>

                  <Button onClick={handleSave} className="w-full">
                    Save SEO Settings
                  </Button>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analytics.map((item) => (
              <Card key={item.platform}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">{platformLabels[item.platform]}</CardTitle>
                  <Badge variant={item.is_enabled ? "default" : "secondary"}>
                    {item.is_enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tracking Code</Label>
                    <Textarea
                      value={item.code}
                      onChange={(e) => {
                        const updated = analytics.map(a => 
                          a.platform === item.platform 
                            ? { ...a, code: e.target.value }
                            : a
                        );
                        setAnalytics(updated);
                      }}
                      placeholder={`Enter ${platformLabels[item.platform]} code here`}
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Enable Tracking</Label>
                    <Switch
                      checked={item.is_enabled}
                      onCheckedChange={(checked) => {
                        const updated = analytics.map(a => 
                          a.platform === item.platform 
                            ? { ...a, is_enabled: checked }
                            : a
                        );
                        setAnalytics(updated);
                      }}
                    />
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            onClick={() => {
              analytics.forEach(item => {
                updateAnalyticsCode(item.platform, item.code, item.is_enabled);
              });
            }}
            className="w-full"
            size="lg"
          >
            Save All Analytics Settings
          </Button>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Robots.txt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The robots.txt file is automatically generated and updated based on your SEO settings.
                </p>
                <Button variant="outline" asChild>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                    View Current Robots.txt
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>XML Sitemap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  XML and JSON sitemaps are automatically generated from your published content.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                      View XML Sitemap
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href="/sitemap.json" target="_blank" rel="noopener noreferrer">
                      View JSON Sitemap
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}