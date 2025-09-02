import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  q: string;
  a: string;
}

interface FAQMiniProps {
  faqs: FAQ[];
  className?: string;
  title?: string;
}

const FAQMini: React.FC<FAQMiniProps> = ({ 
  faqs, 
  className = '',
  title = "Quick Questions"
}) => {
  return (
    <div className={`bg-muted/20 backdrop-blur-sm rounded-lg p-6 border border-border/30 relative overflow-hidden ${className}`}>
      {/* Mini FAQ background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary/8 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-accent/6 rounded-full blur-lg animate-pulse delay-1000"></div>
        
        {/* Subtle geometric shapes */}
        <div className="absolute top-1/2 right-8 w-8 h-8 border border-primary/15 rotate-45 animate-spin" style={{animationDuration: '15s'}}></div>
        
        {/* Glow gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60"></div>
      </div>

      <h3 className="text-xl font-semibold mb-6 text-foreground relative z-10">
        {title}
      </h3>
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-3 relative z-10"
      >
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`mini-item-${index}`}
            className="border border-border/40 rounded-md px-4 py-1 bg-background/30 backdrop-blur-sm hover:bg-background/50 hover:border-border/60 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Item subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-accent py-3 hover:no-underline relative z-10">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-3 pt-1 leading-relaxed relative z-10">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQMini;