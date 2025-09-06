import Breadcrumbs from './Breadcrumbs';

interface PageBannerProps {
  title: string;
  backgroundImage: string;
}

const PageBanner = ({ title, backgroundImage }: PageBannerProps) => {
  return <section className="relative py-12 sm:py-16 lg:py-20 flex items-end min-h-[40vh] sm:min-h-[45vh]">
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
        <h1 className="page-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 mb-3 sm:mb-4 text-left leading-tight">
          {title}
        </h1>

        {/* Breadcrumb */}
        <Breadcrumbs />
      </div>
    </section>;
};
export default PageBanner;