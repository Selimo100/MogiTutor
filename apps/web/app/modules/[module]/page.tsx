import { Section } from '@/components/Section';
import { getModuleData } from '@/lib/modules';
import Link from 'next/link';
import { fetchCompetencies } from '@/lib/api';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type PageProps = {
    params: Promise<{ module: string }>;
};

export default async function ModulePage({ params }: PageProps) {
  const { module: moduleCode } = await params;
  
  // 1. Get Static Structure
  const staticData = getModuleData(moduleCode);
  if (!staticData) {
      return notFound();
  }

  // 2. Fetch Live Data from API (Progress, Status, User-Specifics)
  let dbCompetencies: any[] = [];
  try {
    dbCompetencies = await fetchCompetencies(moduleCode);
  } catch (e) {
    console.error(`Failed to fetch competencies for module ${moduleCode}`, e);
  }

  // Create lookup map
  const compMap = new Map(dbCompetencies.map(c => [c.code, c]));

  return (
    <div className="container mx-auto">
      <Section id="header" className="mb-8 border-none pt-0">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{moduleCode} - Dienst mit Container anwenden</h1>
        <p className="text-xl text-muted-foreground">Kompetenzmatrix und Fortschrittsdokumentation</p>
      </Section>

      <div id="matrix" className="mb-12 animate-in fade-in duration-500">
        <div className="rounded-lg border border-border overflow-hidden shadow-sm">
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
                {staticData.map((band) => (
                    band.rows.map((row, rowIndex) => (
                        <tr key={`${band.id}-${rowIndex}`} className="bg-card hover:bg-muted/20 transition-colors">
                            {rowIndex === 0 && (
                                <td className="px-6 py-4 font-medium align-top bg-muted/5" rowSpan={band.rows.length}>
                                    <div className="sticky top-24">
                                        <span className="text-lg font-semibold block mb-1">{band.id}</span>
                                        <span className="text-muted-foreground text-xs">{band.title.split('-')[1]?.trim() ?? band.title}</span>
                                    </div>
                                </td>
                            )}
                            <td className="px-6 py-4 align-top font-mono text-muted-foreground">{row.hz}</td>
                            
                            {row.competencies.map((comp) => {
                                // Find in DB data using uppercased Code
                                const dbComp = compMap.get(comp.code);
                                // DB Data takes precedence for titles/descriptions if changed
                                const description = dbComp?.summary || dbComp?.title || comp.description;
                                
                                // Determine status color (mock logic for now, or based on dbComp fields if they exist)
                                // In a real app we'd check dbComp.status
                                
                                return (
                                <td key={comp.id} className="px-6 py-4 align-top w-1/4">
                                     <Link href={`/modules/${moduleCode}/${comp.code}`} className="group block h-full">
                                        <div className="p-3 -m-2 rounded-md hover:bg-primary/5 hover:shadow-sm transition-all h-full border border-transparent hover:border-border/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-primary group-hover:underline decoration-primary/50 underline-offset-4">{comp.code}</span>
                                                {/* Status Indicator Dot (if implemented) */}
                                                {/* <span className="w-2 h-2 rounded-full bg-green-500"></span> */}
                                            </div>
                                            <p className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground transition-colors line-clamp-4">
                                                {description}
                                            </p>
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
    </div>
  );
}
