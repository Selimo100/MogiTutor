'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110 duration-500">
             <Image 
               src="/logo.png" 
               alt="MogiTutor" 
               fill
               className="object-contain"
               priority
             />
          </div>
          <div className="font-semibold text-xl tracking-tight text-foreground">
            Mogi<span className="text-secondary">Tutor</span>
          </div>
        </Link>
        
        {/* Right: Nav & Tools */}
        <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1">
                <Link 
                    href="/" 
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                        pathname === '/' 
                            ? "bg-secondary/10 text-secondary" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    Home
                </Link>
                {/* Tutors / Modules as requested */}
                <Link 
                    href="/tutors" 
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                         pathname === '/tutors'
                            ? "bg-secondary/10 text-secondary" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    Tutors
                </Link>
                 <div className="h-4 w-px bg-border/50 mx-2" />
                 <Link 
                    href="/tutors/docktutor/modules/M347" 
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                        pathname?.includes('M347')
                            ? "bg-secondary/10 text-secondary" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    M347
                </Link>
                 <Link 
                    href="/tutors/sqltutor/modules/M165" 
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                        pathname?.includes('M165')
                            ? "bg-secondary/10 text-secondary" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    M165
                </Link>
            </nav>

            <div className="flex items-center gap-3 pl-2">
                <a
                    href="https://github.com/Selimo100/MogiTutor/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    title="GitHub"
                >
                    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <ThemeToggle />
            </div>
        </div>
      </div>
    </motion.header>
  );
}
