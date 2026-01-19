import { m347Data } from '@/data/m347';
import { m165Data } from '@/data/m165';
import { ModuleSidebar } from '@/components/modules/ModuleSidebar';

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tutor: string; module: string }>;
}) {
  const { tutor, module } = await params;

  let data: any[] = [];
  if (module === 'M347') data = m347Data;
  else if (module === 'M165') data = m165Data;

  return (
    <div className="flex min-h-screen bg-background">
      {data.length > 0 && (
         <ModuleSidebar moduleCode={module} tutorId={tutor} data={data} />
      )}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
