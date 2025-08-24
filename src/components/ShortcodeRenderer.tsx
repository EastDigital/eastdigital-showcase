import React from 'react';
import DynamicProjectGallery from './DynamicProjectGallery';

interface ShortcodeRendererProps {
  content: string;
}

const ShortcodeRenderer: React.FC<ShortcodeRendererProps> = ({ content }) => {
  const renderShortcodes = (text: string) => {
    // Define shortcode patterns and their corresponding components
    const shortcodeMap: Record<string, { component: React.ComponentType<any>; props: any }> = {
      'gallery-3d-walkthrough-video': {
        component: DynamicProjectGallery,
        props: { subcategory: '3D Walkthrough Video', category: 'REAL ESTATE' }
      },
      'gallery-3d-still-renderings': {
        component: DynamicProjectGallery,
        props: { subcategory: '3D Still Renderings', category: 'REAL ESTATE' }
      },
      'gallery-conceptual-3d-renderings': {
        component: DynamicProjectGallery,
        props: { subcategory: 'Conceptual 3D Renderings', category: 'INFRASTRUCTURE' }
      },
      'gallery-engineering-3d-models': {
        component: DynamicProjectGallery,
        props: { subcategory: 'Engineering 3D Models', category: 'INFRASTRUCTURE' }
      },
      'gallery-architectural-3d-rendering': {
        component: DynamicProjectGallery,
        props: { subcategory: 'Architectural 3D Rendering', category: 'ARCHITECTURE & DESIGN' }
      },
      'gallery-product-3d-rendering': {
        component: DynamicProjectGallery,
        props: { subcategory: 'Product 3D Rendering', category: 'ARCHITECTURE & DESIGN' }
      }
    };

    // Split content by shortcodes and render accordingly
    const shortcodeRegex = /\[([^\]]+)\]/g;
    const parts = text.split(shortcodeRegex);
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (i % 2 === 0) {
        // Regular text content
        if (part.trim()) {
          elements.push(<span key={i} dangerouslySetInnerHTML={{ __html: part }} />);
        }
      } else {
        // Shortcode content
        const shortcodeConfig = shortcodeMap[part];
        if (shortcodeConfig) {
          const Component = shortcodeConfig.component;
          elements.push(<Component key={i} {...shortcodeConfig.props} />);
        } else {
          // Unknown shortcode - render as text
          elements.push(<span key={i}>[{part}]</span>);
        }
      }
    }

    return elements;
  };

  return <>{renderShortcodes(content)}</>;
};

export default ShortcodeRenderer;