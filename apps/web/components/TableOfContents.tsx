'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { guideContent, Section } from '@/data/content';

interface TableOfContentsProps {
  content?: Section[];
}

export function TableOfContents({ content = guideContent }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    content.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  return (
    <nav className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pl-4 border-l border-border/40">
      <h5 className="font-semibold mb-4 text-sm text-foreground/80">On this page</h5>
      <ul className="space-y-1">
        {content.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block text-sm py-1 pl-2 border-l-2 transition-all duration-200",
                activeId === section.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {section.title.replace(/^\d+\.\s/, '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
