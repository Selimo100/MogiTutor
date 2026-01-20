// Placeholder for now. Dynamic loading would require more setup 
// or one file per tutor exporting the content interface.
// Since we want dynamic loading, we can use a map or dynamic import in the page.
import { TutorConfig } from '@/lib/tutors/registry';

export interface TutorContent {
  overview: string;
  cheatSheet?: {
    title: string;
    blocks: { label: string; code: string; language: string }[];
  }[];
  // ... extra sections
}

const DOCKER_CONTENT: TutorContent = {
  overview: "Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. This tutor guides you through Module 347.",
  cheatSheet: [
    {
      title: "Basic Commands",
      blocks: [
        { label: "Run a container", code: "docker run -d -p 80:80 nginx", language: "bash" },
        { label: "Build an image", code: "docker build -t my-app .", language: "bash" }
      ]
    }
  ]
};

const SQL_CONTENT: TutorContent = {
  overview: "Structured Query Language (SQL) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS).",
  cheatSheet: [
    {
      title: "Queries",
      blocks: [
        { label: "Select all", code: "SELECT * FROM users;", language: "sql" }
      ]
    }
  ]
};

export async function getTutorContent(slug: string): Promise<TutorContent | null> {
  // Simulate async load or map lookup
  if (slug === 'docktutor') return DOCKER_CONTENT;
  if (slug === 'sqltutor') return SQL_CONTENT;
  return null;
}
