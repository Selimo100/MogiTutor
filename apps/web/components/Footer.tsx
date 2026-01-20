import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto bg-muted/30 backdrop-blur-sm print:hidden">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3 opacity-90">
          <div className="relative w-8 h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Image src="/logo.png" alt="Logo" fill sizes="32px" className="object-contain" />
          </div>
          <span className="font-semibold tracking-tight text-foreground/80">
            Mogi<span className="text-secondary">Tutor</span>
          </span>
        </div>

        <div className="flex flex-col md:items-end gap-2 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Selina Mogicato.
          </p>
          <div className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/tutors" className="hover:text-foreground">Tutors</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
