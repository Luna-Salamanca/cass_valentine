import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Truck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasAccepted, setHasAccepted] = useState(false);
  
  const ORDER_URL = import.meta.env.VITE_DOORDASH_URL || "";
  const MYSTERY_IMAGE = `${import.meta.env.BASE_URL}valentine_day.jpg`;
  const SOURCE_IMAGE_URL = "https://x.com/usalupa/status/2022594143135109371";

  const hearts = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: 40 + Math.random() * 100,
    initial: { 
      x: Math.random() * (window.innerWidth || 1000), 
      y: Math.random() * (window.innerHeight || 800),
      scale: 0.5 + Math.random() * 0.5,
      rotate: Math.random() * 360
    },
    animate: { 
      y: [null, Math.random() * -100],
      rotate: [null, Math.random() * 360]
    },
    transition: {
      duration: 10 + Math.random() * 20,
      repeat: Infinity,
      ease: "linear",
      repeatType: "reverse" as const
    }
  })), []);

  const handleNoHover = () => {
    // Calculate safe bounds within the viewport, but keep it chaotic
    const x = (Math.random() - 0.5) * 400; // -200 to 200
    const y = (Math.random() - 0.5) * 400; // -200 to 200
    setNoBtnPosition({ x, y });
  };

  const handleYesClick = () => {
    setHasAccepted(true);
    
    // Massive confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#bae6fd', '#2563eb', '#0f172a']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#bae6fd', '#2563eb', '#0f172a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen w-full mesh-gradient flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-primary/10"
            initial={heart.initial}
            animate={heart.animate as any}
            transition={heart.transition}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-[2rem] p-8 md:p-16 max-w-lg w-full text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-gradient-to-tr from-primary/20 to-accent rounded-full mx-auto flex items-center justify-center mb-8 shadow-inner relative z-20"
            >
              <Heart className="text-primary w-12 h-12 fill-primary/20" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
              Cassie, will you be my <span className="text-primary italic">Valentine?</span>
            </h1>
            
            <p className="text-muted-foreground mb-12 text-lg font-light">
              I've been waiting for the right moment to ask...
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 min-h-[140px] md:min-h-[80px]">
              <Button
                size="lg"
                className="w-full md:w-auto px-8 py-6 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:shadow-xl font-medium min-w-[140px]"
                onClick={handleYesClick}
              >
                Yes, absolutely!
              </Button>

              <motion.div
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onHoverStart={handleNoHover}
                className="w-full md:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto px-8 py-6 text-lg rounded-full border-2 border-primary/10 text-primary/60 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-colors font-medium min-w-[140px]"
                >
                  No way
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass-panel rounded-[2rem] p-8 md:p-16 max-w-lg w-full text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 bg-gradient-to-tr from-blue-100 to-pink-50 rounded-full mx-auto flex items-center justify-center mb-8 shadow-inner"
            >
              <span className="text-6xl">💙</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight"
            >
              Yay! Can't wait, Cassie!
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-xl font-light mb-8"
            >
              I love you my love
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-full overflow-hidden rounded-3xl border border-primary/10 bg-white/40 backdrop-blur-md shadow-2xl p-6"
            >
              <div className="flex flex-col gap-6">
                <a 
                  href={SOURCE_IMAGE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner group bg-muted cursor-pointer block"
                >
                  <img 
                    src={MYSTERY_IMAGE} 
                    alt="Valentine Surprise" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                </a>

                <Button 
                  asChild
                  size="lg"
                  className="w-full py-7 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 group transition-all"
                >
                  <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                    Click to open your gift
                    <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-sm text-muted-foreground/50 italic font-light"
            >
              <p>I can't wait to see you...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 text-center text-primary/20 text-xs font-mono uppercase tracking-widest pointer-events-none">
        Luna©2026
      </div>
    </div>
  );
}
