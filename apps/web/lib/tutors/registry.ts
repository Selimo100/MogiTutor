export interface TutorTheme {
  primary: string;
  secondary: string;
  background?: string;
}

export interface TutorModuleRef {
  code: string;
  title: string;
}

export interface TutorConfig {
  slug: string; // "docktutor", "sqltutor"
  name: string;
  shortDescription: string;
  icon: string; // Path to public image
  status: 'active' | 'coming_soon' | 'maintenance';
  theme: TutorTheme;
  defaultModules: string[]; // Codes of modules to show as chips
  landingSections?: {
    overview?: boolean;
    cheatSheet?: boolean;
    custom?: boolean;
  };
}

export const TUTOR_REGISTRY: Record<string, TutorConfig> = {
  docktutor: {
    slug: 'docktutor',
    name: 'DockerTutor',
    shortDescription: 'Master Container Virtualization, Dockerfiles, and Orchestration.',
    icon: '/DockerTutor.png',
    status: 'active',
    theme: {
      primary: '201 96% 32%', // Docker Blue
      secondary: '210 40% 96.1%',
    },
    defaultModules: ['M347'],
    landingSections: {
      overview: true,
      cheatSheet: true,
    },
  },
  sqltutor: {
    slug: 'sqltutor',
    name: 'SQLTutor',
    shortDescription: 'Understand relational databases, SQL queries, and normalization.',
    icon: '/SqlTutor.png',
    status: 'active',
    theme: {
      primary: '262 83% 58%', // Purple-ish for SQL? Or maybe blue/orange. Let's pick a distinct one.
      secondary: '210 40% 96.1%',
    },
    defaultModules: ['M165'],
    landingSections: {
      overview: true,
      cheatSheet: true,
    },
  },
  // Example of a future tutor
 /*
  cloudtutor: {
    slug: 'cloudtutor',
    name: 'CloudTutor',
    shortDescription: 'Introduction to AWS, Azure, and Cloud Computing concepts.',
    icon: '/logo.png', // Placeholder
    status: 'coming_soon',
    theme: {
      primary: '32 95% 44%', // Orange for AWS-like feel
      secondary: '210 40% 96.1%',
    },
    defaultModules: [],
    landingSections: {
      overview: true,
    },
  },
  */
};

export const getAllTutors = () => Object.values(TUTOR_REGISTRY);
export const getTutor = (slug: string) => TUTOR_REGISTRY[slug];
