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
    <div className={`bg-muted/30 rounded-lg p-6 border ${className}`}>
      <h3 className="text-xl font-semibold mb-6 text-foreground">
        {title}
      </h3>
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-3"
      >
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`mini-item-${index}`}
            className="border border-border/50 rounded-md px-4 py-1 bg-background/50"
          >
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-accent py-3 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-3 pt-1 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQMini;