'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CompetencyBand } from '@/data/m347'; 

interface ModuleSidebarProps {
  moduleCode: string; // e.g., "M347"
  tutorId: string;
  data: CompetencyBand[];
}

export function ModuleSidebar({ moduleCode, tutorId, data }: ModuleSidebarProps) {
  const pathname = usePathname();
  // State to manage which sections are open. By default, open them all or logic to open based on current path
  const [openSections, setOpenSections] = useState<string[]>(data.map(d => d.id));

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const moduleRootPath = `/tutors/${tutorId}/modules/${moduleCode}`;

  return (
    <aside className="w-64 shrink-0 border-r border-border h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden md:block bg-background/50 backdrop-blur-sm print:hidden">
      <div className="p-4 space-y-4">
        <div className="font-semibold text-lg px-2 text-primary">{moduleCode} Kompetenzen</div>
        <nav className="space-y-1">
          <Link 
            href={moduleRootPath}
            className={cn(
              "flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
              pathname === moduleRootPath
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Overview (Matrix)
          </Link>

          {data.map((band) => {
             const isOpen = openSections.includes(band.id);
             return (
            <div key={band.id} className="space-y-1">
              <button
                onClick={() => toggleSection(band.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-md transition-colors text-left"
              >
                <span>{band.id} - {band.title.split('-')[1]?.trim() || band.title}</span>
                <ChevronRight 
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                     isOpen && "rotate-90"
                  )} 
                />
              </button>
              
              {isOpen && (
                  <div className="pl-4 space-y-1 relative border-l border-border/50 ml-2">
                    {band.rows.map((row, idx) => (
                        row.competencies.map((comp) => {
                            const compPath = `${moduleRootPath}/competencies/${comp.code}`; // Using code instead of ID
                            const isActive = pathname === compPath;
                            return (
                                <Link
                                    key={comp.code}
                                    href={compPath}
                                    className={cn(
                                    "block px-2 py-1 text-xs transition-colors rounded-md",
                                    isActive 
                                        ? "text-primary font-medium bg-primary/5" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <span className="font-mono">{comp.code}</span>
                                </Link>
                        )})
                    ))}
                  </div>
              )}
            </div>
          )})}
        </nav>
      </div>
    </aside>
  );
}
