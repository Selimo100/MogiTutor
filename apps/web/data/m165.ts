export type Competency = {
  id: string;
  code: string;
  level: 'Grundlagen' | 'Fortgeschritten' | 'Erweitert';
  description: string;
  notes?: string; 
};

export type CompetencyRow = {
  hz: string;
  competencies: Competency[];
};

export type CompetencyBand = {
  id: string;
  title: string;
  rows: CompetencyRow[];
};

export const m165Data: CompetencyBand[] = [
  {
    id: 'A',
    title: 'A - NoSQL Grundlagen',
    rows: [
      {
        hz: '1',
        competencies: [
          { id: 'a1g', code: 'A1G', level: 'Grundlagen', description: 'Ich kann Begriffe und Konzepte der NoSQL Datenbanken erläutern.' },
          { id: 'a1f', code: 'A1F', level: 'Fortgeschritten', description: 'Ich kann eine NoSQL Datenbank gezielt für eine spezifische Anwendung auswählen.' },
          { id: 'a1e', code: 'A1E', level: 'Erweitert', description: 'Ich kann den Einsatz einer NoSQL Datenbank kritisch hinterfragen und Verbesserungen vorschlagen.' }
        ]
      }
    ]
  },
  {
    id: 'B',
    title: 'B - NoSQL Datenbank implementieren',
    rows: [
      {
        hz: '2',
        competencies: [
          { id: 'b1g', code: 'B1G', level: 'Grundlagen', description: 'Ich kann ein Datenmodell für eine NoSQL Datenbank interpretieren und erläutern.' },
          { id: 'b1f', code: 'B1F', level: 'Fortgeschritten', description: 'Ich kann ein vorgegebenes Datenmodell mit einer NoSQL Datenbank umsetzen.' },
          { id: 'b1e', code: 'B1E', level: 'Erweitert', description: 'Ich kann ein Datenmodell für eine NoSQL Datenbank entwerfen.' }
        ]
      }
    ]
  },
  {
    id: 'C',
    title: 'C - Daten in NoSQL Datenbank eintragen',
    rows: [
      {
        hz: '2',
        competencies: [
          { id: 'c1g', code: 'C1G', level: 'Grundlagen', description: 'Ich kann die Struktur von Daten in einer NoSQL Datenbank erläutern.' },
          { id: 'c1f', code: 'C1F', level: 'Fortgeschritten', description: 'Ich kann Daten in eine NoSQL Datenbank übernehmen.' },
          { id: 'c1e', code: 'C1E', level: 'Erweitert', description: 'Ich kann Probleme bei der Übernahme von Daten in eine NoSQL Datenbank erkennen und Lösungen aufzeigen.' }
        ]
      }
    ]
  },
  {
    id: 'D',
    title: 'D - Zugriffsberechtigungen anwenden',
    rows: [
      {
        hz: '3',
        competencies: [
          { id: 'd1g', code: 'D1G', level: 'Grundlagen', description: 'Ich kann die Funktion von Zugriffsberechtigungen in einer NoSQL Datenbank erläutern.' },
          { id: 'd1f', code: 'D1F', level: 'Fortgeschritten', description: 'Ich kann vordefinierte Zugriffsberechtigungen in einer NoSQL Datenbank umsetzen.' },
          { id: 'd1e', code: 'D1E', level: 'Erweitert', description: 'Ich kann ein Konzept für Zugriffsberechtigungen einer NoSQL Datenbank entwerfen.' }
        ]
      }
    ]
  },
  {
    id: 'E',
    title: 'E - Backup erstellen Restore durchführen',
    rows: [
      {
        hz: '4',
        competencies: [
          { id: 'e1g', code: 'E1G', level: 'Grundlagen', description: 'Ich kann Konzepte für ein Backup einer NoSQL Datenbank erläutern.' },
          { id: 'e1f', code: 'E1F', level: 'Fortgeschritten', description: 'Ich kann ein Backup und Restore bei einer NoSQL Datenbank anwenden.' },
          { id: 'e1e', code: 'E1E', level: 'Erweitert', description: 'Ich kann ein Konzept für das Backup einer NoSQL Datenbank erstellen.' }
        ]
      }
    ]
  },
  {
    id: 'F',
    title: 'F - Skalierung und Replikation',
    rows: [
      {
        hz: '5',
        competencies: [
          { id: 'f1g', code: 'F1G', level: 'Grundlagen', description: 'Ich kann das Prinzip der Skalierung und die unterschiedlichen Replikationsarten für eine NoSQL Datenbank erläutern.' },
          { id: 'f1f', code: 'F1F', level: 'Fortgeschritten', description: 'Ich kann für eine NoSQL Datenbank eine Replikation anwenden.' },
          { id: 'f1e', code: 'F1E', level: 'Erweitert', description: 'Ich kann ein Konzept für die Skalierung einer NoSQL Datenbank erstellen.' }
        ]
      }
    ]
  },
  {
    id: 'G',
    title: 'G - Anbindung an NoSQL Datenbank',
    rows: [
      {
        hz: '6',
        competencies: [
          { id: 'g1g', code: 'G1G', level: 'Grundlagen', description: 'Ich kann das Prinzip des Zugriffes bei einer NoSQL Datenbank erläutern.' },
          { id: 'g1f', code: 'G1F', level: 'Fortgeschritten', description: 'Ich kann eine Anbindung an eine NoSQL Datenbank implementieren.' },
          { id: 'g1e', code: 'G1E', level: 'Erweitert', description: 'Ich kann das Prinzip der parallelen Verarbeitung bei NoSQL Datenbanken anwenden.' }
        ]
      }
    ]
  }
];
