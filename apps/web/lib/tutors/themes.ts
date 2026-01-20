import { TUTOR_REGISTRY } from './registry';

export function getTutorThemeVars(slug: string) {
  const tutor = TUTOR_REGISTRY[slug];
  if (!tutor) return {};

  return {
    '--primary': tutor.theme.primary,
    '--secondary': tutor.theme.secondary,
    // Add other overrides if needed
  } as React.CSSProperties;
}

export function getTutorClassNames(slug: string) {
    // Return tailwind classes if you prefer class-based theming over CSS vars
    // But CSS vars are often easier for dynamic themes in Next.js
    return "";
}
