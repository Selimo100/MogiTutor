/* Data file for configuring all tutors and modules for seeding */

export interface CompetencySeed {
  code: string;
  level: string;
  title: string;
  description: string;
}

export interface ModuleSeed {
  moduleCode: string;
  title: string;
  competencies: CompetencySeed[];
}

export interface TutorSeed {
  slug: string;
  name: string;
  modules: ModuleSeed[];
}

const M347_DATA: CompetencySeed[] = [
  // A - Grundlagen
  { code: 'A1G', level: 'G', title: 'Container vs VM', description: 'Ich kann zwischen Container und virtuellen Maschinen unterscheiden und deren Vor- und Nachteile aufzählen' },
  { code: 'A1F', level: 'F', title: 'Anforderungen erfassen', description: 'Ich kann Anforderungen für einen Dienst mit Containern zielgerichtet und strukturiert erfassen' },
  { code: 'A1E', level: 'E', title: 'Anforderungen analysieren', description: 'Ich kann Anforderungen für einen Dienst mit Containern analysieren und Verbesserung/Optimierungen vorschlagen.' },
  // ... (Abbreviated for this file, keeping logical structure)
  // B - Architektur
  { code: 'B1G', level: 'G', title: 'Monolith vs Microservices', description: 'Ich kann die Unterschiede zwischen monolithischen und Micro-Service-Architekturen darlegen und beschreiben.' },
  { code: 'B2G', level: 'G', title: 'Container Technologie', description: 'Ich kann die wichtigsten Bestandteile der Container-Technologie aufzählen und beschreiben.' },
];

const M165_DATA: CompetencySeed[] = [
  // A - NoSQL Grundlagen
  { code: 'A1G', level: 'G', title: 'Begriffe und Konzepte', description: 'Ich kann Begriffe und Konzepte der NoSQL Datenbanken erläutern.' },
  { code: 'A1F', level: 'F', title: 'Datenbank Auswahl', description: 'Ich kann eine NoSQL Datenbank gezielt für eine spezifische Anwendung auswählen.' },
];

export const SEED_DATA: TutorSeed[] = [
  {
    slug: 'docktutor',
    name: 'DockerTutor',
    modules: [
      {
        moduleCode: 'M347',
        title: 'Dienst mit Containern virtualisieren',
        competencies: M347_DATA
      }
    ]
  },
  {
    slug: 'sqltutor',
    name: 'SQLTutor',
    modules: [
      {
        moduleCode: 'M165',
        title: 'NoSQL Datenbanken',
        competencies: M165_DATA
      }
    ]
  }
];
