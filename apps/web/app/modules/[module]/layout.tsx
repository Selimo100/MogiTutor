import { ModuleSidebar } from '@/components/modules/ModuleSidebar';
import { getModuleData } from '@/lib/modules';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ module: string }>;
};

export default async function ModuleLayout({
  children,
  params, // Props must be awaited in Next.js 15
}: LayoutProps) {
  const { module: moduleCode } = await params;
  const data = getModuleData(moduleCode) || [];

  return (
    <div className="flex container mx-auto px-4 max-w-7xl animate-in fade-in duration-300">
      <ModuleSidebar moduleCode={moduleCode} data={data} />
      <div className="flex-1 min-w-0 py-8 px-4 md:px-8">
        {children}
      </div>
    </div>
  );
}
