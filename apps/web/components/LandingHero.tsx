'use client';

import { motion } from 'framer-motion';

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Background Gradient Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 space-y-6 max-w-4xl"
      >
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-foreground drop-shadow-sm">
          Mogi<span className="text-secondary/90">Tutor</span>
        </h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
        >
          A self-organized learning platform for technical competencies.
        </motion.p>
      </motion.div>
    </section>
  );
}
