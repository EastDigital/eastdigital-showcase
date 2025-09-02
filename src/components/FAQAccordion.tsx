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
  return <section className={`py-10 ${className} relative overflow-hidden`}>
      {/* Abstract 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-primary/3 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-accent/4 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Floating wireframe shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border border-primary/10 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-accent/15 rotate-12 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-foreground via-transparent to-foreground mix-blend-multiply"></div>
        
        {/* Animated glow lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse delay-300"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/15 to-transparent animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 w-full relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">
              {title}
            </h2>
            {subtitle && <p className="text-base text-muted-foreground">
                {subtitle}
              </p>}
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-2" defaultValue={defaultOpen}>
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border/30 rounded-lg px-4 py-1 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden group">
                {/* Item glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent py-3 hover:no-underline relative z-10">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3 pt-1 leading-relaxed relative z-10">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>;
};
export default FAQAccordion;