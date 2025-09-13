import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SEOData {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  canonical_url?: string;
  is_indexed?: boolean;
  is_followed?: boolean;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  schema_json?: string;
}

interface AnalyticsScript {
  platform: string;
  code: string;
  is_enabled: boolean;
}

export const useSEO = (pageSlug: string) => {
  useEffect(() => {
    const applySEO = async () => {
      try {
        // Add timeout for database queries
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 5000)
        );

        // Fetch page SEO data with timeout
        const seoQuery = supabase
          .from("page_seo")
          .select("*")
          .eq("page_slug", pageSlug)
          .single();

        // Fetch analytics codes with timeout
        const analyticsQuery = supabase
          .from("analytics_codes")
          .select("*")
          .eq("is_enabled", true);

        const [seoResult, analyticsResult] = await Promise.allSettled([
          Promise.race([seoQuery, timeout]),
          Promise.race([analyticsQuery, timeout])
        ]);

        // Apply SEO data if available
        if (seoResult.status === 'fulfilled' && seoResult.value && typeof seoResult.value === 'object' && 'data' in seoResult.value && seoResult.value.data) {
          applySEOTags(seoResult.value.data as SEOData);
        } else {
          console.info(`No database SEO data found for page: ${pageSlug}, using static meta tags`);
        }

        // Apply analytics codes if available
        if (analyticsResult.status === 'fulfilled' && analyticsResult.value && typeof analyticsResult.value === 'object' && 'data' in analyticsResult.value && analyticsResult.value.data) {
          applyAnalyticsScripts(analyticsResult.value.data as AnalyticsScript[]);
        } else {
          console.info('No analytics codes found or database unavailable');
        }
      } catch (error) {
        console.error("Error applying SEO:", error);
        console.info("Falling back to static meta tags defined in component");
      }
    };

    applySEO();
  }, [pageSlug]);
};

const applySEOTags = (seo: SEOData) => {
  // Update page title
  if (seo.meta_title) {
    document.title = seo.meta_title;
  }

  // Remove existing meta tags
  removeExistingMetaTags();

  // Add meta description
  if (seo.meta_description) {
    addMetaTag("description", seo.meta_description);
  }

  // Add meta keywords
  if (seo.meta_keywords && seo.meta_keywords.length > 0) {
    addMetaTag("keywords", seo.meta_keywords.join(", "));
  }

  // Add canonical URL
  if (seo.canonical_url) {
    addLinkTag("canonical", seo.canonical_url);
  }

  // Add robots meta tag
  const robotsContent = `${seo.is_indexed ? "index" : "noindex"}, ${seo.is_followed ? "follow" : "nofollow"}`;
  addMetaTag("robots", robotsContent);

  // Add Open Graph tags
  if (seo.og_title) {
    addMetaTag("og:title", seo.og_title, "property");
  } else if (seo.meta_title) {
    addMetaTag("og:title", seo.meta_title, "property");
  }
  
  if (seo.og_description) {
    addMetaTag("og:description", seo.og_description, "property");
  } else if (seo.meta_description) {
    addMetaTag("og:description", seo.meta_description, "property");
  }
  
  if (seo.og_image) {
    const fullImageUrl = seo.og_image.startsWith('http') ? seo.og_image : `${window.location.origin}${seo.og_image}`;
    addMetaTag("og:image", fullImageUrl, "property");
    addMetaTag("og:image:width", "1200", "property");
    addMetaTag("og:image:height", "630", "property");
  }
  
  // Add required OG tags
  addMetaTag("og:type", "website", "property");
  addMetaTag("og:url", window.location.href, "property");

  // Add Twitter Card tags
  addMetaTag("twitter:card", "summary_large_image");
  const twitterTitle = seo.og_title || seo.meta_title;
  const twitterDescription = seo.og_description || seo.meta_description;
  const twitterImage = seo.og_image;
  
  if (twitterTitle) {
    addMetaTag("twitter:title", twitterTitle);
  }
  if (twitterDescription) {
    addMetaTag("twitter:description", twitterDescription);
  }
  if (twitterImage) {
    const fullImageUrl = twitterImage.startsWith('http') ? twitterImage : `${window.location.origin}${twitterImage}`;
    addMetaTag("twitter:image", fullImageUrl);
  }

  // Add structured data
  if (seo.schema_json) {
    try {
      const schema = JSON.parse(seo.schema_json);
      addStructuredData(schema);
    } catch (error) {
      console.error("Invalid JSON-LD schema:", error);
    }
  }
};

const applyAnalyticsScripts = (analytics: AnalyticsScript[]) => {
  analytics.forEach((script) => {
    if (script.code && script.is_enabled) {
      // Remove existing scripts for this platform
      removeExistingScript(script.platform);
      
      try {
        // Clean the script code - remove HTML tags and extract JavaScript
        let cleanCode = script.code.trim();
        
        // If the code contains HTML script tags, extract the content
        if (cleanCode.includes('<script')) {
          const scriptMatch = cleanCode.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
          if (scriptMatch) {
            cleanCode = scriptMatch.map(match => {
              // Extract content between script tags
              const content = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
              return content;
            }).join('\n');
          }
        }
        
        // Skip if no valid JavaScript code found
        if (!cleanCode || cleanCode.includes('<') || cleanCode.includes('>')) {
          console.warn(`Invalid analytics code for ${script.platform}: Contains HTML or is empty`);
          return;
        }
        
        // Create script element
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.innerHTML = cleanCode;
        scriptElement.setAttribute("data-platform", script.platform);
        
        // Add to document head
        document.head.appendChild(scriptElement);
        
        console.log(`Successfully loaded analytics script for ${script.platform}`);
      } catch (error) {
        console.error(`Error loading analytics script for ${script.platform}:`, error);
      }
    }
  });
};

const addMetaTag = (name: string, content: string, attribute: string = "name") => {
  const meta = document.createElement("meta");
  meta.setAttribute(attribute, name);
  meta.setAttribute("content", content);
  meta.setAttribute("data-seo", "true");
  document.head.appendChild(meta);
};

const addLinkTag = (rel: string, href: string) => {
  const link = document.createElement("link");
  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  link.setAttribute("data-seo", "true");
  document.head.appendChild(link);
};

const addStructuredData = (schema: any) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  script.setAttribute("data-seo", "true");
  document.head.appendChild(script);
};

const removeExistingMetaTags = () => {
  const existingTags = document.querySelectorAll('[data-seo="true"]');
  existingTags.forEach(tag => tag.remove());
};

const removeExistingScript = (platform: string) => {
  const existingScript = document.querySelector(`script[data-platform="${platform}"]`);
  if (existingScript) {
    existingScript.remove();
  }
};