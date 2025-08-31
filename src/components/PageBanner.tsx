import { Link } from 'react-router-dom';
interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface PageBannerProps {
  title: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
}
const PageBanner = ({
  title,
  backgroundImage,
  breadcrumbs
}: PageBannerProps) => {
  return <section className="relative py-16 sm:py-20 lg:py-32 flex items-end min-h-[60vh] sm:min-h-[70vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={backgroundImage} alt={`${title} Background`} className="w-full h-full object-cover" loading="lazy" onError={e => {
        (e.target as HTMLImageElement).style.display = 'none';
      }} />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content - Aligned with header logo */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        {/* Page Title above breadcrumb, aligned with header/logo */}
        <h1 className="page-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="page-breadcrumb mt-4 text-sm sm:text-base text-white/80" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => <span key={index}>
              {crumb.href ? <Link to={crumb.href} className="hover:text-white/80 transition-colors">
                  {crumb.label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </Link> : <span className="font-medium">{crumb.label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</span>}
              {index < breadcrumbs.length - 1 && <span className="mx-2 text-white/70" aria-hidden="true">›</span>}
            </span>)}
        </nav>
      </div>
    </section>;
};
export default PageBanner;