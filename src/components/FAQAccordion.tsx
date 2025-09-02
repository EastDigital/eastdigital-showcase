import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpen?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs, 
  defaultOpen,
  className = '',
  title = "Frequently Asked Questions",
  subtitle
}) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4"
            defaultValue={defaultOpen}
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 py-2 bg-card/50 hover:bg-card/70 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-accent py-6 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pt-2 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;