import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const breadcrumbNameMap: { [key: string]: string } = {
  'expertise': 'Expertise',
  'real-estate': 'Real Estate',
  'infrastructure': 'Infrastructure',
  'architecture-design': 'Architecture & Design',
  '3d-walkthrough-video': '3D Walkthrough Video',
  '3d-still-renderings': '3D Still Renderings',
  'conceptual-3d-renderings': 'Conceptual 3D Renderings',
  'engineering-3d-models': 'Engineering 3D Models',
  'architectural-3d-rendering': 'Architectural 3D Rendering',
  'product-3d-rendering': 'Product 3D Rendering',
  'projects': 'Projects',
  'about': 'About',
  'contact': 'Contact Us',
  'enquiry': 'Enquiry',
  'faq': 'FAQ',
  'terms-of-use': 'Terms of Use',
  'privacy-policy': 'Privacy Policy',
  'sitemap': 'Sitemap',
};

// Helper function to get page title from document
const getPageTitle = (): string => {
  if (typeof document !== 'undefined') {
    const titleElement = document.querySelector('h1.page-title');
    if (titleElement) {
      return titleElement.textContent || '';
    }
    // Fallback to document title without site name
    const title = document.title.replace(' | East Digital', '');
    return title;
  }
  return '';
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    
    let name = breadcrumbNameMap[value];
    
    if (!name) {
      // If this is the last item and we're on a project page, try to get the actual page title
      if (isLast && location.pathname.includes('/projects/')) {
        const pageTitle = getPageTitle();
        if (pageTitle && pageTitle !== 'East Digital') {
          name = pageTitle;
        } else {
          // Fallback to formatted slug
          name = value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
      } else {
        // Standard formatting for non-project pages
        name = value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
    }

    return {
      name,
      to,
      isLast,
    };
  });

  return (
    <nav className="page-breadcrumb mt-2 text-xs sm:text-sm text-gray-300/80 text-left" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-gray-300/80 transition-colors">Home</Link>
      {breadcrumbs.length > 0 && <span className="mx-2 text-gray-300/70" aria-hidden="true">›</span>}
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.to}>
          {!crumb.isLast ? (
            <Link to={crumb.to} className="hover:text-gray-300/80 transition-colors">
              {crumb.name}
            </Link>
          ) : (
            <span className="font-medium">{crumb.name}</span>
          )}
          {!crumb.isLast && <span className="mx-2 text-gray-300/70" aria-hidden="true">›</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;