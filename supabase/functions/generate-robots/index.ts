const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const baseUrl = 'https://eastdigital.in'
    
    const robotsContent = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap.json

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow all other crawlers to access the site
Crawl-delay: 1`

    return new Response(robotsContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    })

  } catch (error) {
    console.error('Error generating robots.txt:', error)
    return new Response('Internal server error', { status: 500 })
  }
})