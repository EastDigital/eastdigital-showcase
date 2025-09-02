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
        {/* More visible glowing orbs */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/25 rounded-full blur-lg animate-bounce delay-1000" style={{animationDuration: '4s'}}></div>
        
        {/* Dynamic geometric shapes */}
        <div className="absolute top-1/2 right-8 w-12 h-12 border-2 border-primary/35 rotate-45 animate-spin shadow-md shadow-primary/20" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 border-2 border-accent/40 rotate-12 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
        
        {/* Floating triangular shape */}
        <div className="absolute top-8 left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-accent/30 animate-bounce delay-500" style={{animationDuration: '5s'}}></div>
        
        {/* Enhanced glow gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 opacity-80 animate-pulse" style={{animationDuration: '4s'}}></div>
        
        {/* Animated dots */}
        <div className="absolute top-6 left-1/2 w-2 h-2 bg-primary/50 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-6 right-1/2 w-1.5 h-1.5 bg-accent/60 rounded-full animate-ping delay-1500"></div>
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