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
  return <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4 w-full relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">
              {title}
            </h2>
            {subtitle && <p className="text-base text-muted-foreground">
                {subtitle}
              </p>}
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-3" defaultValue={defaultOpen}>
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-5 py-1 bg-card/50 hover:bg-card/70 transition-colors">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 pt-1 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>;
};
export default FAQAccordion;