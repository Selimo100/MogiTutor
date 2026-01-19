import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 py-10 bg-muted/20">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 opacity-90">
          <div className="relative w-8 h-8">
            <Image src="/logo.png" alt="Logo" fill sizes="32px" className="object-contain" />
          </div>
          <span className="font-semibold tracking-tight text-foreground">
            MogiTutor
          </span>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p className="pt-2">
            &copy; {new Date().getFullYear()} Selina Mogicato. All rights
            reserved.
          </p>
          <p>
            Built with Next.js, Tailwind, & Docker.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
