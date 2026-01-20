'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { TutorConfig } from '@/lib/tutors/registry'; // Use registry type
import { paths } from '@/lib/paths';

interface TutorCardProps {
    tutor: TutorConfig; // Updated to use Registry config
    index: number;
}

export function TutorCard({ tutor, index }: TutorCardProps) {
  const isComingSoon = tutor.status === 'coming_soon';
  
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.5 }}
        whileHover={!isComingSoon ? { y: -5 } : {}}
        className="h-full"
    >
        <Link 
            href={!isComingSoon ? paths.tutors.overview(tutor.slug) : '#'}
            className={cn(
                "group block h-full bg-card border border-border/50 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden",
                !isComingSoon ? "hover:bg-card/80 hover:shadow-xl" : "opacity-70 cursor-not-allowed grayscale-[0.5]"
            )}
        >
            {/* Hover Glow - Only for active */}
            {!isComingSoon && (
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 relative bg-background rounded-xl p-2 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300">
                        <Image src={tutor.icon} alt={tutor.name} fill className="object-contain p-1" />
                    </div>
                    
                    {isComingSoon ? (
                        <div className="bg-muted px-2 py-1 rounded text-xs font-mono text-muted-foreground flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Coming Soon
                        </div>
                    ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="text-secondary w-6 h-6" />
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-secondary transition-colors">
                    {tutor.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {tutor.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tutor.defaultModules.map(code => (
                        <span 
                            key={code} 
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-semibold font-mono border border-secondary/20"
                        >
                            {code}
                        </span>
                    ))}
                    {tutor.defaultModules.length === 0 && !isComingSoon && (
                        <span className="text-xs text-muted-foreground italic">No modules listed</span>
                    )}
                </div>
            </div>
        </Link>
    </motion.div>
  );
}
