import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProjectRow {
  slug: string;
  category: string;
  subcategory: string;
  updated_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url)
    const format = url.searchParams.get('format') || 'xml'

    // Fetch published projects
    const { data: projects, error } = await supabaseClient
      .from('projects')
      .select('slug, category, subcategory, updated_at')
      .eq('status', 'Published')

    if (error) {
      console.error('Error fetching projects:', error)
      return new Response('Error fetching projects', { status: 500 })
    }

    // Define static pages
    const staticPages = [
      { url: '/', lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'daily' },
      { url: '/about', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
      { url: '/expertise', lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'weekly' },
      { url: '/expertise/real-estate', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'weekly' },
      { url: '/expertise/infrastructure', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'weekly' },
      { url: '/expertise/architecture-design', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'weekly' },
      { url: '/expertise/real-estate/3d-walkthrough-video', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/expertise/real-estate/3d-still-renderings', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/expertise/infrastructure/conceptual-3d-renderings', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/expertise/infrastructure/engineering-3d-models', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/expertise/architecture-design/architectural-3d-rendering', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/expertise/architecture-design/product-3d-rendering', lastmod: new Date().toISOString(), priority: '0.7', changefreq: 'weekly' },
      { url: '/contact', lastmod: new Date().toISOString(), priority: '0.6', changefreq: 'yearly' },
      { url: '/enquiry', lastmod: new Date().toISOString(), priority: '0.6', changefreq: 'yearly' },
    ]

    // Generate project URLs
    const projectPages = projects?.map((project: ProjectRow) => {
      const categoryPath = getCategoryPath(project.category, project.subcategory)
      return {
        url: `/expertise/${categoryPath}/${project.slug}`,
        lastmod: project.updated_at,
        priority: '0.6',
        changefreq: 'monthly'
      }
    }) || []

    const allPages = [...staticPages, ...projectPages]

    if (format === 'json') {
      return new Response(JSON.stringify(allPages, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      })
    }

    // Generate XML sitemap
    const baseUrl = 'https://eastdigital.com' // Replace with your actual domain
    
    const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xmlSitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Internal server error', { status: 500 })
  }
})

function getCategoryPath(category: string, subcategory: string): string {
  const categoryMap: Record<string, string> = {
    'Real Estate': 'real-estate',
    'Infrastructure': 'infrastructure',
    'Architecture & Design': 'architecture-design'
  }

  const subcategoryMap: Record<string, string> = {
    '3D Walkthrough Video': '3d-walkthrough-video',
    '3D Still Renderings': '3d-still-renderings',
    'Conceptual 3D Renderings': 'conceptual-3d-renderings',
    'Engineering 3D Models': 'engineering-3d-models',
    'Architectural 3D Rendering': 'architectural-3d-rendering',
    'Product 3D Rendering': 'product-3d-rendering'
  }

  const categoryPath = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-')
  const subcategoryPath = subcategoryMap[subcategory] || subcategory.toLowerCase().replace(/\s+/g, '-')
  
  return `${categoryPath}/${subcategoryPath}`
}