import { useState } from 'react';
import { Phone, MessageCircle, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StickyCtaButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Expanded options */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-in">
          <Button
            size="touch"
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full h-12 px-4"
            asChild
          >
            <a href="https://wa.me/919910568689" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </Button>
          
          <Button
            size="touch"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-full h-12 px-4"
            asChild
          >
            <a href="/enquiry">
              <FileText className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Get Quote</span>
            </a>
          </Button>
          
          <Button
            size="touch"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full h-12 px-4"
            asChild
          >
            <a href="tel:+919910568689">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Call Now</span>
            </a>
          </Button>
        </div>
      )}
      
      {/* Main toggle button */}
      <Button
        size="icon"
        className="sticky-cta bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
        onClick={toggleExpanded}
        aria-label={isExpanded ? "Close options" : "Open contact options"}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default StickyCtaButton;