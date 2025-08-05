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

const PageBanner = ({ title, backgroundImage, breadcrumbs }: PageBannerProps) => {
  return (
    <section className="relative py-20 sm:py-32 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage}
          alt={`${title} Background`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content - Aligned with header logo */}
      <div className="container mx-auto px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="page-breadcrumb mb-8">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-white/80 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-white/60">{'>'}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Page Title */}
        <h1 className="page-title max-w-[850px]">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageBanner;