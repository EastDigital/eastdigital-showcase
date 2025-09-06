import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { CATEGORIES, SUBCATEGORIES } from '@/constants/pms';
import { triggerHapticFeedback, HapticPatterns } from '@/lib/haptics';
interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  cover_image: string | null;
  category: string;
  subcategory: string;
  created_at: string;
  carousel_order: number | null;
}
type SortOption = 'default' | 'latest' | 'oldest';
const Projects = () => {
  useSEO('projects');
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [projectsToShow, setProjectsToShow] = useState(6);
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    return SUBCATEGORIES[selectedCategory as keyof typeof SUBCATEGORIES] || [];
  }, [selectedCategory]);
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...allProjects];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Apply subcategory filter
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(project => project.subcategory === selectedSubcategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'default') {
        // Sort by carousel_order first (ascending), then by created_at (descending)
        const orderA = a.carousel_order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.carousel_order ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        // If carousel_order is the same, sort by created_at (latest first)
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      } else {
        // Date-based sorting
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
      }
    });
    return filtered;
  }, [allProjects, selectedCategory, selectedSubcategory, sortBy]);
  const currentProjects = filteredAndSortedProjects.slice(0, projectsToShow);
  const hasMoreProjects = filteredAndSortedProjects.length > projectsToShow;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const {
          data,
          error
        } = await supabase.from('projects').select('id, title, slug, summary, cover_image, category, subcategory, created_at, carousel_order').eq('status', 'Published').order('carousel_order', {
          ascending: true,
          nullsFirst: false
        }).order('created_at', {
          ascending: false
        });
        if (error) throw error;
        setAllProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    // Reset pagination when filters change
    setProjectsToShow(6);
  }, [selectedCategory, selectedSubcategory, sortBy]);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    triggerHapticFeedback(HapticPatterns.TAP);
  };
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    triggerHapticFeedback(HapticPatterns.TAP);
  };
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    triggerHapticFeedback(HapticPatterns.TAP);
  };
  const handleLoadMore = async () => {
    setLoadingMore(true);
    triggerHapticFeedback(HapticPatterns.SELECT);

    // Simulate loading for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setProjectsToShow(prev => prev + 6);
    setLoadingMore(false);
  };
  const generateProjectUrl = (project: Project) => {
    const categorySlug = project.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const subcategorySlug = project.subcategory.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `/expertise/${categorySlug}/${subcategorySlug}/${project.slug}`;
  };
  const isVideo = (url: string | null) => {
    if (!url) return false;
    return /\.(mp4|webm|mov|avi)$/i.test(url);
  };
  const ProjectThumbnail = ({
    project
  }: {
    project: Project;
  }) => {
    const [videoError, setVideoError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    return <Link to={generateProjectUrl(project)} className="group block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Card className="overflow-hidden border-border bg-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
          <div className="aspect-[16/10] w-full bg-muted overflow-hidden relative">
            {project.cover_image && !videoError ? isVideo(project.cover_image) ? <video src={project.cover_image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" muted loop playsInline autoPlay={isHovered} onError={() => setVideoError(true)} /> : <img src={project.cover_image} alt={`${project.title} cover`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" onError={() => setVideoError(true)} /> : <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          <CardContent className="p-6">
            <h3 className="mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-3">
              {project.category}{project.subcategory ? ` • ${project.subcategory}` : ''}
            </p>
            {project.summary && <p className="text-muted-foreground line-clamp-2">
                {project.summary}
              </p>}
          </CardContent>
        </Card>
      </Link>;
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-2 lg:py-2 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="mb-4">
                Our Projects
              </h1>
              <p className="text-muted-foreground">
                Explore our comprehensive portfolio of 3D rendering and visualization projects across real estate, infrastructure, and architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-2 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="min-w-48">
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map(category => <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {availableSubcategories.length > 0 && <div className="min-w-48">
                    <Select value={selectedSubcategory} onValueChange={handleSubcategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subcategories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subcategories</SelectItem>
                        {availableSubcategories.map(subcategory => <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>}
              </div>

              <div className="min-w-40">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4">
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `${filteredAndSortedProjects.length} project${filteredAndSortedProjects.length !== 1 ? 's' : ''} found`}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({
              length: 6
            }).map((_, i) => <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[16/10] w-full rounded-lg" />
                    <div className="p-6 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>)}
              </div> : filteredAndSortedProjects.length === 0 ? <div className="text-center py-16">
                <h3 className="mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <Button onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }} variant="outline">
                  Clear Filters
                </Button>
              </div> : <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentProjects.map((project, index) => <div key={project.id} className="animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}>
                      <ProjectThumbnail project={project} />
                    </div>)}
                </div>

                {/* Load More Button */}
                {hasMoreProjects && <div className="text-center mt-12">
                    <Button onClick={handleLoadMore} disabled={loadingMore} size="lg" variant="outline" className="min-w-48">
                      {loadingMore ? <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                          Loading...
                        </> : 'Load More Projects'}
                    </Button>
                  </div>}
              </>}
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Projects;