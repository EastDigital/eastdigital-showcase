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
      {/* Subtle 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gentle floating orbs with soft glow */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl opacity-60" style={{
        animation: 'gentle-float 8s ease-in-out infinite'
      }}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/6 rounded-full blur-2xl opacity-50" style={{
        animation: 'gentle-float 12s ease-in-out infinite reverse',
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-primary/4 rounded-full blur-3xl opacity-40" style={{
        animation: 'gentle-float 15s ease-in-out infinite',
        animationDelay: '4s'
      }}></div>
        
        {/* Minimal geometric accents */}
        <div className="absolute top-20 right-20 w-16 h-16 border border-primary/10 rounded-lg opacity-30" style={{
        animation: 'subtle-rotate 20s linear infinite'
      }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-accent/8 rounded-full opacity-25" style={{
        animation: 'gentle-pulse 6s ease-in-out infinite'
      }}></div>
        
        {/* Clean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2 opacity-80"></div>
        
        {/* Subtle accent lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/8 to-transparent opacity-60"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/6 to-transparent opacity-50"></div>
      </div>

      <div className="text-left lg:text-left w-full mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-bold mb-3 text-foreground">
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground">
                {subtitle}
              </p>}
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-2" defaultValue={defaultOpen}>
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border/20 rounded-xl px-4 py-1 bg-card/10 backdrop-blur-sm hover:bg-card/15 hover:border-border/30 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden group hover:translate-y-[-2px]">
                {/* Subtle item glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4 hover:no-underline relative z-10 transition-colors duration-300">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 relative z-10">
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>;
};
export default FAQAccordion;