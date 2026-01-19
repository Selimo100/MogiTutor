export type Competency = {
  id: string;
  code: string; // e.g., "A1G"
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
  title: string; // e.g., "A - Grundlagen"
  rows: CompetencyRow[];
};

export const m347Data: CompetencyBand[] = [
  {
    id: 'A',
    title: 'A - Grundlagen',
    rows: [
      {
        hz: '1',
        competencies: [
          { id: 'a1g', code: 'A1G', level: 'Grundlagen', description: 'Ich kann zwischen Container und virtuellen Maschinen unterscheiden und deren Vor- und Nachteile aufzählen' },
          { id: 'a1f', code: 'A1F', level: 'Fortgeschritten', description: 'Ich kann Anforderungen für einen Dienst mit Containern zielgerichtet und strukturiert erfassen' },
          { id: 'a1e', code: 'A1E', level: 'Erweitert', description: 'Ich kann Anforderungen für einen Dienst mit Containern analysieren und Verbesserung/Optimierungen vorschlagen.' }
        ]
      }
    ]
  },
  {
    id: 'B',
    title: 'B - Containerkomposition (Architektur)',
    rows: [
      {
        hz: '2',
        competencies: [
          { id: 'b1g', code: 'B1G', level: 'Grundlagen', description: 'Ich kann die Unterschiede zwischen monolithischen und Micro-Service-Architekturen darlegen und beschreiben.' },
          { id: 'b1f', code: 'B1F', level: 'Fortgeschritten', description: 'Ich kann aufgrund der Anforderungen eine sinnvolle Container-Komposition vorschlagen und begründen.' },
          { id: 'b1e', code: 'B1E', level: 'Erweitert', description: 'Ich kann aufgrund der Anforderungen mehrere Varianten von Container-Komposition vorschlagen und deren Vor- und Nachteile begründen.' }
        ]
      },
      {
        hz: '2',
        competencies: [
          { id: 'b2g', code: 'B2G', level: 'Grundlagen', description: 'Ich kann die wichtigsten Bestandteile der Container-Technologie aufzählen und beschreiben.' },
          { id: 'b2f', code: 'B2F', level: 'Fortgeschritten', description: 'Ich kann eine einfache Analyse zur Entwicklung von containerisierten Diensten erstellen und erklären' },
          { id: 'b2e', code: 'B2E', level: 'Erweitert', description: 'Ich kann ein einfaches (Netzwerk-)Diagramm zum sicheren Betrieb von containerisierten Diensten erstellen und beschreiben.' }
        ]
      }
    ]
  },
  {
    id: 'C',
    title: 'C - Containerdienstleister auswählen',
    rows: [
      {
        hz: '3',
        competencies: [
          { id: 'c1g', code: 'C1G', level: 'Grundlagen', description: 'Ich kann die benötigten Dienste des Containerdienstleisters für meine Zielapplikation aufzählen und beschreiben.' },
          { id: 'c1f', code: 'C1F', level: 'Fortgeschritten', description: 'Ich kann die Vor- und Nachteile von Public-Cloud-Anbietern (PCA) aufzählen.' },
          { id: 'c1e', code: 'C1E', level: 'Erweitert', description: 'Ich kann eine Entscheidungsmatrix mit relevanten Kriterien erstellen, um einen Containerdienstleister auszuwählen.' }
        ]
      },
      {
        hz: '3',
        competencies: [
          { id: 'c2g', code: 'C2G', level: 'Grundlagen', description: 'Ich kann wesentliche Merkmale einer Container-Registry nennen und Beispiele aufzählen.' },
          { id: 'c2f', code: 'C2F', level: 'Fortgeschritten', description: 'Ich kann die relevantesten Technologien zur Orchestrierung von Containern aufzählen und deren Zweck beschreiben.' },
          { id: 'c2e', code: 'C2E', level: 'Erweitert', description: 'Ich kann die Unterschiede zwischen public vs. private Container Registry aufzählen und in eigenen Worten beschreiben.' }
        ]
      }
    ]
  },
  {
    id: 'D',
    title: 'D - Praxis mit Containern in der Entwicklung erlangen',
    rows: [
      {
        hz: '4',
        competencies: [
          { id: 'd1g', code: 'D1G', level: 'Grundlagen', description: 'Ich kann die Schritte zur Virtualisierung eines containerisierten Dienstes aufzeigen und beschreiben.' },
          { id: 'd1f', code: 'D1F', level: 'Fortgeschritten', description: 'Ich kann eine einfache Container-Konfiguration gemäss Vorgaben erweitern, anpassen und ausführen.' },
          { id: 'd1e', code: 'D1E', level: 'Erweitert', description: 'Ich kann eine umfangreiche Container-Konfiguration gemäss Vorgaben erweitern, anpassen und ausführen, mögliche Fehlerquellen erkennen und beheben.' }
        ]
      },
      {
        hz: '4',
        competencies: [
          { id: 'd2g', code: 'D2G', level: 'Grundlagen', description: 'Ich kann Container-Images aus einem Repository beziehen und anschliessend starten, anbinden/ausführen (attach/exec), evtl. Ports mappen, stoppen, löschen.' },
          { id: 'd2f', code: 'D2F', level: 'Fortgeschritten', description: 'Ich kann selbst erstellte Container-Images in einer Registry dokumentieren und publizieren.' },
          { id: 'd2e', code: 'D2E', level: 'Erweitert', description: 'Ich kann selbst erstellte Container-Images in mehrere Registries dokumentieren und publizieren.' }
        ]
      }
    ]
  },
  {
    id: 'E',
    title: 'E - Praxis beim Public-Cloud-Anbieter (PCA)',
    rows: [
      {
        hz: '2,3,4',
        competencies: [
          { id: 'e1g', code: 'E1G', level: 'Grundlagen', description: 'Ich kann einen sicheren Zugriff auf den PCA konfigurieren und anwenden.' },
          { id: 'e1f', code: 'E1F', level: 'Fortgeschritten', description: 'Ich kann eine Cloud-Instanz des PCA konfigurieren und verwalten.' },
          { id: 'e1e', code: 'E1E', level: 'Erweitert', description: 'Ich kann ein einfaches Netzwerk gemäss Vorgaben zum sicheren Betrieb von containerisierten Diensten konfigurieren.' }
        ]
      },
      {
        hz: '2,3,4',
        competencies: [
          { id: 'e2g', code: 'E2G', level: 'Grundlagen', description: 'Ich kann mindestens eine - vom PCA zur Verfügung gestellte - Storage-Variante beschreiben, konfigurieren und anwenden.' },
          { id: 'e2f', code: 'E2F', level: 'Fortgeschritten', description: 'Ich kann die verschiedenen Varianten zur Skalierung von PCA-Instanzen aufzählen und mindestens eine konfigurieren und verwalten.' },
          { id: 'e2e', code: 'E2E', level: 'Erweitert', description: 'Ich kann Metadaten einer Cloud-Instanz verwalten und auslesen.' }
        ]
      }
    ]
  },
  {
    id: 'F',
    title: 'F - Qualitätskontrollen planen und umsetzen',
    rows: [
      {
        hz: '5',
        competencies: [
          { id: 'f1g', code: 'F1G', level: 'Grundlagen', description: 'Ich kann die wichtigsten Methoden zur Qualitätssicherung und -kontrolle von Containern aufzählen und beschreiben.' },
          { id: 'f1f', code: 'F1F', level: 'Fortgeschritten', description: 'Ich kann die wichtigsten Indikatoren zum sicheren Betreiben (Security) von Containern aufzählen und beschreiben.' },
          { id: 'f1e', code: 'F1E', level: 'Erweitert', description: 'Ich kann bei einem vorgegebenen Container-Image die grundlegendsten Sicherheitslücken überprüfen und beseitigen.' }
        ]
      }
    ]
  }
];
