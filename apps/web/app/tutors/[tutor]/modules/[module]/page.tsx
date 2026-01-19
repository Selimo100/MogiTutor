import { Section } from '@/components/Section';
import { m347Data, type Competency, type CompetencyBand } from '@/data/m347';
import { m165Data } from '@/data/m165';
import Link from 'next/link';
import { fetchCompetencies } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ModulePage({ params }: { params: Promise<{ tutor: string, module: string }> }) {
  const { tutor, module } = await params;
  
  let dbCompetencies: any[] = [];
  try {
    dbCompetencies = await fetchCompetencies(tutor, module);
  } catch (e) {
    console.error("Failed to fetch competencies", e);
  }

  // Common Header
  const title = module === 'M347' 
    ? 'M347 Dienst mit Container anwenden' 
    : module === 'M165'
        ? 'M165 NoSQL-Datenbanken einsetzen'
        : module;
  
  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-4">
           <Link href={`/tutors/${tutor}`} className="flex items-center text-muted-foreground hover:text-foreground">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tutor
           </Link>
       </div>
      <Section id="header" className="mb-8 border-none pt-0">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground">Kompetenzmatrix und Fortschrittsdokumentation</p>
      </Section>

      {module === 'M347' ? (
          <CompetencyMatrix bands={m347Data} dbCompetencies={dbCompetencies} tutor={tutor} module={module} />
      ) : module === 'M165' ? (
          <CompetencyMatrix bands={m165Data} dbCompetencies={dbCompetencies} tutor={tutor} module={module} />
      ) : (
          <GenericList competencies={dbCompetencies} tutor={tutor} module={module} />
      )}
    </div>
  );
}

function CompetencyMatrix({ bands, dbCompetencies, tutor, module }: { bands: CompetencyBand[], dbCompetencies: any[], tutor: string, module: string }) {
    const compMap = new Map(dbCompetencies.map((c: any) => [c.code, c]));
    
    return (
        <div id="matrix" className="mb-12 animate-in fade-in duration-500">
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Kompetenzband</th>
                  <th className="px-6 py-4">HZ</th>
                  <th className="px-6 py-4">Grundlagen</th>
                  <th className="px-6 py-4">Fortgeschritten</th>
                  <th className="px-6 py-4">Erweitert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {bands.map((band) => (
                    band.rows.map((row, rowIndex) => (
                        <tr key={`${band.id}-${rowIndex}`} className="bg-card hover:bg-muted/20 transition-colors">
                            {rowIndex === 0 && (
                                <td className="px-6 py-4 font-medium align-top" rowSpan={band.rows.length}>
                                    {band.title}
                                </td>
                            )}
                            <td className="px-6 py-4 align-top">{row.hz}</td>
                            
                            {row.competencies.map((comp: any) => {
                                // Find in DB data using Code
                                const c: any = comp;
                                const dbComp: any = compMap.get(c.code);
                                // If dbComp exists, it has status/title etc.
                                // We use dbComp.code for link if available, or static code
                                const code = dbComp?.code || c.code;
                                const description = dbComp?.summary || dbComp?.title || c.description;

                                return (
                                <td key={c.id} className="px-6 py-4 align-top w-1/4">
                                     <Link href={`/tutors/${tutor}/modules/${module}/competencies/${code}`} className="group block h-full">
                                        <div className="p-2 -m-2 rounded hover:bg-primary/5 transition-colors h-full">
                                            <span className="font-semibold block mb-1 text-primary group-hover:underline decoration-primary/50 underline-offset-4">{code}</span>
                                            <span className="text-muted-foreground group-hover:text-foreground transition-colors line-clamp-3">
                                                {description}
                                            </span>
                                        </div>
                                     </Link>
                                </td>
                            )})}
                        </tr>
                    ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

function GenericList({ competencies, tutor, module }: any) {
    if(!competencies || competencies.length === 0) return <div>No competencies found.</div>;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competencies.map((comp: any) => (
                <Link key={comp.code} href={`/tutors/${tutor}/modules/${module}/competencies/${comp.code}`} className="block p-6 border rounded-lg hover:border-primary bg-card">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-sm px-2 py-1 bg-primary/10 rounded">{comp.code}</span>
                        <span className={`text-xs px-2 py-1 rounded border ${comp.status === 'done' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                            {comp.status}
                        </span>
                    </div>
                    <h3 className="font-bold mb-2">{comp.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{comp.summary}</p>
                </Link>
            ))}
        </div>
    )
}
