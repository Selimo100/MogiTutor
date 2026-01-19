import { notFound } from 'next/navigation';
import { fetchCompetency } from '@/lib/api';
import { CompetencyEditor } from '@/components/CompetencyEditor';

export const dynamic = 'force-dynamic';

export default async function CompetencyPage({ params }: { params: Promise<{ tutor: string, module: string, code: string }> }) {
  const { tutor, module, code } = await params;

  let competency;

  try {
    competency = await fetchCompetency(tutor, module, code);
    if (!competency) notFound();
  } catch (e: any) {
    console.error('API Error:', e);
    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Service Unavailable</h1>
            <p className="text-muted-foreground">Could not connect to the backend API. {e.toString()}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{competency.module?.code || module}</span>
          <span>/</span>
          <span className="text-primary font-medium">{competency.code}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">{competency.code} - {competency.title}</h1>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          Level: {competency.level}
        </div>
         <p className="text-xl text-muted-foreground leading-relaxed">
          {competency.summary || competency.title} 
        </p>
      </div>

      <CompetencyEditor 
          competency={competency} 
          tutorSlug={tutor}
          moduleCode={module}
      />
    </div>
  );
}
