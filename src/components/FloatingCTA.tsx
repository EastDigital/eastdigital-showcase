import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, FileText, X, Plus } from 'lucide-react';
import { triggerHapticFeedback, HapticPatterns } from '@/lib/haptics';

const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Don't show FloatingCTA on certain pages
  const currentPath = window.location.pathname;
  const excludedPaths = ['/terms-of-use', '/privacy-policy', '/sitemap'];
  
  if (excludedPaths.includes(currentPath)) {
    return null;
  }

  const genieVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0, 
      y: 60,
      x: 20,
      rotate: -15,
      transformOrigin: "bottom right"
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transformOrigin: "bottom right",
      transition: {
        delay: i * 0.08,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        scale: {
          type: "spring" as const,
          stiffness: 300,
          damping: 25,
        },
        rotate: {
          type: "spring" as const,
          stiffness: 180,
          damping: 22,
        }
      },
    }),
    exit: { 
      scale: 0, 
      opacity: 0, 
      y: 60,
      x: 20,
      rotate: 15,
      transformOrigin: "bottom right",
      transition: { 
        duration: 0.25
      }
    }
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

  const handleTouch = () => {
    triggerHapticFeedback(HapticPatterns.TAP);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Get Quote Button */}
              <motion.a
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={genieVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={handleTouch}
                href="/enquiry"
                className="group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black border border-[#FF6900] shadow-lg hover:shadow-xl hover:bg-[#FF6900]/5 active:bg-[#FF6900]/10 transition-all duration-200 min-w-[150px] backdrop-blur-sm">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6900]/20 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-[#FF6900]" />
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Get Quote</span>
                </div>
              </motion.a>

              {/* WhatsApp Button */}
              <motion.a
                custom={1}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={genieVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={handleTouch}
                href="https://wa.me/919005550773"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black border border-[#FF6900] shadow-lg hover:shadow-xl hover:bg-[#FF6900]/5 active:bg-[#FF6900]/10 transition-all duration-200 min-w-[150px] backdrop-blur-sm">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6900]/20 flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-[#FF6900]" />
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">WhatsApp</span>
                </div>
              </motion.a>

              {/* Call Button */}
              <motion.a
                custom={2}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={genieVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={handleTouch}
                href="tel:+919005550773"
                className="group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black border border-[#FF6900] shadow-lg hover:shadow-xl hover:bg-[#FF6900]/5 active:bg-[#FF6900]/10 transition-all duration-200 min-w-[150px] backdrop-blur-sm">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6900]/20 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-[#FF6900]" />
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Call Now</span>
                </div>
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={toggleOpen}
          onTouchStart={handleTouch}
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
