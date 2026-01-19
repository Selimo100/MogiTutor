import Link from 'next/link';
import Image from 'next/image';
import { fetchTutors } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  let tutors = [];
  try {
     tutors = await fetchTutors();
  } catch(e) { console.error("API Fetch Error:", e); }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          MogiTutor
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interaktive Lernplattform für technische Kompetenzen.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
            {tutors && tutors.length > 0 ? tutors.map((tutor: any) => (
                <Link key={tutor.slug} href={`/tutors/${tutor.slug}`} className="group relative block p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                    <div className="h-24 w-24 rounded-2xl flex items-center justify-center mb-6 relative">
                        {tutor.slug.includes('sql') ? (
                           <Image src="/SqlTutor.png" alt="SQL Tutor" fill className="object-contain" />
                        ) : tutor.slug.includes('docktutor') ? (
                           <Image src="/DockerTutor.png" alt="Docker Tutor" fill className="object-contain" />
                        ) : (
                           <Image src="/logo.png" alt="Tutor" fill className="object-contain" />
                        )}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{tutor.name}</h2>
                    <p className="text-muted-foreground text-left">
                        {tutor.slug === 'docktutor' ? 'Learn Container Virtualization, Dockerfiles, and Orchestration.' : 'Understand relational databases, SQL queries, and normalization.'}
                    </p>
                    <div className="mt-8 flex gap-2 flex-wrap">
                        {tutor.modules.map((m: any) => (
                             <span key={m.code} className="px-3 py-1 rounded-full bg-background border border-border text-xs font-mono text-muted-foreground">
                                 {m.code}
                             </span>
                        ))}
                    </div>
                </Link>
            )) : (
                <div className="col-span-2 text-center text-muted-foreground">
                    <p>Connecting to backend...</p>
                    <p className="text-sm opacity-50">Ensure API is running on localhost:8080 or configured URL</p>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
