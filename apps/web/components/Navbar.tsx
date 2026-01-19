import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 transition-all duration-300 print:hidden">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 transition-transform group-hover:scale-105 duration-300 drop-shadow-sm">
             <Image 
               src="/logo.png" 
               alt="Logo" 
               fill
               sizes="56px"
               className="object-contain"
               priority
             />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tight leading-none">Mogi<span className="text-primary">Tutor</span></span>
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Learning Platform</span>
          </div>
        </Link>
        
        {/* Right side alignment for module name and tools */}
        <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8 items-center">
                <Link href="/tutors/docktutor/modules/M347" className="text-lg font-bold text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                    M347
                </Link>
                <Link href="/tutors/sqltutor/modules/M165" className="text-lg font-bold text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                    M165
                </Link>
            </nav>

            <div className="flex items-center gap-4 pl-8 border-l border-border/50">
                <a
                    href="https://github.com/Selimo100/DockTutor" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-all hover:scale-110 text-muted-foreground hover:text-foreground"
                    title="GitHub"
                >
                    <span className="sr-only">GitHub</span>
                    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <div className="bg-muted/30 p-1 rounded-full border border-border/50">
                   <ThemeToggle />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
