'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TutorModule {
    code: string;
    title: string;
}

interface Tutor {
    slug: string;
    name: string;
    description?: string; // API might not return this yet, we can infer
    modules: TutorModule[];
}

interface TutorCardProps {
    tutor: Tutor;
    index: number;
}

export function TutorCard({ tutor, index }: TutorCardProps) {
  const isDocker = tutor.slug.includes('docktutor');
  const isSql = tutor.slug.includes('sqltutor');
  
  const description = tutor.description || (
      isDocker 
        ? "Master containerization, Dockerfiles, and orchestration with hands-on labs." 
        : "Understand relational databases, SQL queries, and schema design."
  );

  const imageSrc = isSql 
    ? "/SqlTutor.png" 
    : isDocker 
        ? "/DockerTutor.png" 
        : "/logo.png";

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="h-full"
    >
        <Link 
            href={`/tutors/${tutor.slug}`}
            className="group block h-full bg-card hover:bg-card/80 border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 relative bg-background rounded-xl p-2 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300">
                        <Image src={imageSrc} alt={tutor.name} fill className="object-contain p-1" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="text-secondary w-6 h-6" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-secondary transition-colors">
                    {tutor.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tutor.modules.map(mod => (
                        <span 
                            key={mod.code} 
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-semibold font-mono border border-secondary/20"
                        >
                            {mod.code}
                        </span>
                    ))}
                    {tutor.modules.length === 0 && (
                        <span className="text-xs text-muted-foreground italic">Coming soon</span>
                    )}
                </div>
            </div>
        </Link>
    </motion.div>
  );
}
