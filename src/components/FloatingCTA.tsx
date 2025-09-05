import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, FileText, X, Plus } from 'lucide-react';

const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropletVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0, 
      y: 40,
      filter: "blur(4px)"
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        type: "spring" as const,
        stiffness: 250,
        damping: 18,
      },
    }),
    exit: { 
      scale: 0.5, 
      opacity: 0, 
      y: 40,
      filter: "blur(4px)",
      transition: { duration: 0.2 }
    },
  };

  const mainButtonVariants = {
    rest: { scale: 1 },
    open: { 
      scale: 1.1,
      transition: { 
        type: "spring" as const, 
        stiffness: 200, 
        damping: 12 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Gooey SVG Filter */}
      <svg className="absolute -z-10 pointer-events-none">
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        style={{ filter: "url(#goo-filter)" }} 
        className="flex flex-col items-end space-y-3"
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Get Quote Button */}
              <motion.a
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropletVariants}
                href="/enquiry"
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-glass backdrop-blur-glass border border-glass-border shadow-elevated hover:shadow-glow transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground pr-2">Get Quote</span>
                </div>
              </motion.a>

              {/* WhatsApp Button */}
              <motion.a
                custom={1}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropletVariants}
                href="https://wa.me/919910568689"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-glass backdrop-blur-glass border border-glass-border shadow-elevated hover:shadow-glow transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground pr-2">WhatsApp</span>
                </div>
              </motion.a>

              {/* Call Button */}
              <motion.a
                custom={2}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropletVariants}
                href="tel:+919910568689"
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-glass backdrop-blur-glass border border-glass-border shadow-elevated hover:shadow-glow transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground pr-2">Call Now</span>
                </div>
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={toggleOpen}
          className="relative overflow-hidden w-14 h-14 rounded-2xl bg-primary/90 backdrop-blur-glass border border-primary/20 shadow-cta hover:shadow-glow transition-all duration-300"
          variants={mainButtonVariants}
          initial="rest"
          animate={isOpen ? "open" : "rest"}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-90 rounded-2xl" />
          
          {/* Icon container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pulse ring animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/50"
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: isOpen ? 1 : [1, 1.2, 1],
              opacity: isOpen ? 1 : [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: isOpen ? 0 : Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingCTA;