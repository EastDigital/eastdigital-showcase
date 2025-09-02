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
        {/* Large floating orbs with stronger glow */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-accent/25 rounded-full blur-xl animate-bounce delay-1000" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-pulse delay-500" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-accent/18 rounded-full blur-3xl animate-pulse delay-700" style={{animationDuration: '5s'}}></div>
        
        {/* More visible floating wireframe shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-primary/30 rotate-45 animate-spin shadow-lg shadow-primary/20" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-accent/35 rotate-12 animate-spin shadow-lg shadow-accent/20" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
        
        {/* Floating triangular shapes */}
        <div className="absolute top-1/3 right-1/3 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-primary/25 animate-bounce delay-300" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-accent/30 animate-bounce delay-1200" style={{animationDuration: '7s'}}></div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-transparent to-accent animate-pulse" style={{animationDuration: '4s'}}></div>
        
        {/* Animated glow lines with movement */}
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-pulse delay-300" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-accent/35 to-transparent animate-pulse delay-1500" style={{animationDuration: '4s'}}></div>
        
        {/* Floating dots */}
        <div className="absolute top-16 left-1/2 w-3 h-3 bg-primary/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-16 right-1/2 w-2 h-2 bg-accent/45 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/2 left-16 w-4 h-4 bg-primary/30 rounded-full animate-ping delay-2000"></div>
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