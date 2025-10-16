import { useEffect, useRef } from 'react';

const logos = [
  'https://eastdigital.in/img/clients/acer.png',
  'https://eastdigital.in/img/clients/anantraj.png',
  'https://eastdigital.in/img/clients/arcop.png',
  'https://eastdigital.in/img/clients/bharti.png',
  'https://eastdigital.in/img/clients/ddf.png',
  'https://eastdigital.in/img/clients/miraj.png',
  'https://eastdigital.in/img/clients/omaxe.png',
  'https://eastdigital.in/img/clients/puchkas.png',
  'https://eastdigital.in/img/clients/reliance-infra.png',
];

const ClientCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust for faster/slower scroll

    const animate = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll position when we've scrolled through one set of logos
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Duplicate logos array for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full overflow-hidden bg-background py-12">
      <div
        ref={scrollRef}
        className="flex gap-[40px] overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-[80px] w-auto flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={logo}
              alt={`Client logo ${(index % logos.length) + 1}`}
              className="h-full w-auto object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientCarousel;
