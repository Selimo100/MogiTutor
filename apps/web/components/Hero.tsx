'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Box } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function Hero({ 
    badge = "Interactive Docker Guide", 
    title = <>Master <span className="docker-gradient-text">Containers</span> <br className="hidden md:block" /> Without The Confusion.</>,
    subtitle = "A copy-paste friendly guide to learning Docker. From basic commands to production-ready multi-stage builds.",
    imageSrc,
    primaryAction = { label: "Start Learning", href: "#intro" },
    secondaryAction = { label: "Cheat Sheet", href: "#cheat-sheet" }
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-8"
        >
          {imageSrc ? (
              <Image src={imageSrc} alt="Logo" width={24} height={24} className="w-6 h-6 object-contain" />
          ) : (
             <Box className="w-4 h-4" />
          )}
          <span>{badge}</span>
        </motion.div>
        
        {imageSrc && (
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="mx-auto mb-8 relative w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl"
           >
               <Image src={imageSrc} fill alt="Tutor Logo" className="object-contain" priority />
           </motion.div>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.5 }}
           className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={primaryAction.href}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {primaryAction.label}
          </Link>
          <Link
            href={secondaryAction.href}
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {secondaryAction.label}
          </Link>
        </motion.div>
      </div>

      {/* Simplified background animation elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
