import { notFound } from 'next/navigation';
import { fetchCompetency } from '@/lib/api';
import { CompetencyEditor } from '@/components/CompetencyEditor';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ module: string; code: string }>;
};

export default async function CompetencyPage({ params }: PageProps) {
  const { module: moduleCode, code } = await params;

  // Fetch from API
  let competency;

  try {
    competency = await fetchCompetency(moduleCode, code);
    if (!competency) notFound();
  } catch (e) {
    console.error('API Error:', e);
    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Service Unavailable</h1>
            <p className="text-muted-foreground">Could not connect to the backend API. Ensure Docker is running.</p>
        </div>
    );
  }

  // Evidence is now included in the competency object from the API
  const evidence = competency.evidence || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="font-mono">{competency.module}</span>
          <span>/</span>
          <span className="text-primary font-medium">{competency.code}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">{competency.code} - {competency.title}</h1>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          Level: {competency.level}
        </div>
         <p className="text-xl text-muted-foreground leading-relaxed">
          {competency.title} 
        </p>
      </div>

      <CompetencyEditor competency={competency} evidence={evidence} />
    </div>
  );
}
