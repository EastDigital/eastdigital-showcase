import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  pageTitle?: string;
  pageUrl?: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs, pageTitle, pageUrl }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  if (pageTitle) {
    schema["name"] = pageTitle;
  }

  if (pageUrl) {
    schema["url"] = pageUrl;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;