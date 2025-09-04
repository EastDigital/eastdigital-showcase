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
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gentle floating orbs */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary/6 rounded-full blur-2xl opacity-70"
             style={{animation: 'gentle-float 10s ease-in-out infinite'}}></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-accent/5 rounded-full blur-xl opacity-60"
             style={{animation: 'gentle-float 8s ease-in-out infinite reverse', animationDelay: '3s'}}></div>
        
        {/* Minimal geometric accent */}
        <div className="absolute top-1/2 right-8 w-8 h-8 border border-primary/12 rounded opacity-40"
             style={{animation: 'subtle-rotate 25s linear infinite'}}></div>
        
        {/* Clean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-accent/4 opacity-70"></div>
      </div>

      <h3 className="font-semibold mb-6 text-foreground relative z-10">
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
            className="border border-border/25 rounded-lg px-4 py-1 bg-background/20 backdrop-blur-sm hover:bg-background/30 hover:border-border/40 transition-all duration-400 ease-out group relative overflow-hidden hover:translate-y-[-1px] hover:shadow-md"
          >
            {/* Subtle item glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/2 via-transparent to-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <AccordionTrigger className="text-left font-medium text-foreground hover:text-accent py-3 hover:no-underline relative z-10">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-3 pt-1 leading-relaxed relative z-10">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQMini;