import { m347Data, CompetencyBand } from '@/data/m347';

// Registry of module static data
// To add a new module, import its data structure and add it here.
const MODULE_REGISTRY: Record<string, CompetencyBand[]> = {
  'M347': m347Data,
  'm347': m347Data, // Case insensitive fallback
};

export function getModuleData(moduleCode: string): CompetencyBand[] | null {
  return MODULE_REGISTRY[moduleCode] || MODULE_REGISTRY[moduleCode.toUpperCase()] || null;
}
