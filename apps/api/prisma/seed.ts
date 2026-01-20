import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const M347_DATA = [
  // A - Grundlagen
  { code: 'A1G', level: 'G', title: 'Container vs VM', description: 'Ich kann zwischen Container und virtuellen Maschinen unterscheiden und deren Vor- und Nachteile aufzählen' },
  { code: 'A1F', level: 'F', title: 'Anforderungen erfassen', description: 'Ich kann Anforderungen für einen Dienst mit Containern zielgerichtet und strukturiert erfassen' },
  { code: 'A1E', level: 'E', title: 'Anforderungen analysieren', description: 'Ich kann Anforderungen für einen Dienst mit Containern analysieren und Verbesserung/Optimierungen vorschlagen.' },
  
  // B - Architektur
  { code: 'B1G', level: 'G', title: 'Monolith vs Microservices', description: 'Ich kann die Unterschiede zwischen monolithischen und Micro-Service-Architekturen darlegen und beschreiben.' },
  { code: 'B1F', level: 'F', title: 'Container Komposition', description: 'Ich kann aufgrund der Anforderungen eine sinnvolle Container-Komposition vorschlagen und begründen.' },
  { code: 'B1E', level: 'E', title: 'Komposition Varianten', description: 'Ich kann aufgrund der Anforderungen mehrere Varianten von Container-Komposition vorschlagen und deren Vor- und Nachteile begründen.' },
  { code: 'B2G', level: 'G', title: 'Container Technologie', description: 'Ich kann die wichtigsten Bestandteile der Container-Technologie aufzählen und beschreiben.' },
  { code: 'B2F', level: 'F', title: 'Container Analyse', description: 'Ich kann eine einfache Analyse zur Entwicklung von containerisierten Diensten erstellen und erklären' },
  { code: 'B2E', level: 'E', title: 'Betriebsdiagramm', description: 'Ich kann ein einfaches (Netzwerk-)Diagramm zum sicheren Betrieb von containerisierten Diensten erstellen und beschreiben.' },

  // C - Dienstleister
  { code: 'C1G', level: 'G', title: 'Dienste aufzählen', description: 'Ich kann die benötigten Dienste des Containerdienstleisters für meine Zielapplikation aufzählen und beschreiben.' },
  { code: 'C1F', level: 'F', title: 'Public Cloud Pros/Cons', description: 'Ich kann die Vor- und Nachteile von Public-Cloud-Anbietern (PCA) aufzählen.' },
  { code: 'C1E', level: 'E', title: 'Entscheidungsmatrix', description: 'Ich kann eine Entscheidungsmatrix mit relevanten Kriterien erstellen, um einen Containerdienstleister auszuwählen.' },
  { code: 'C2G', level: 'G', title: 'Container Registry', description: 'Ich kann wesentliche Merkmale einer Container-Registry nennen und Beispiele aufzählen.' },
  { code: 'C2F', level: 'F', title: 'Orchestrierung', description: 'Ich kann die relevantesten Technologien zur Orchestrierung von Containern aufzählen und deren Zweck beschreiben.' },
  { code: 'C2E', level: 'E', title: 'Public vs Private Registry', description: 'Ich kann die Unterschiede zwischen public vs. private Container Registry aufzählen und in eigenen Worten beschreiben.' },

  // D - Praxis Entwicklung
  { code: 'D1G', level: 'G', title: 'Virtualisierung Schritte', description: 'Ich kann die Schritte zur Virtualisierung eines containerisierten Dienstes aufzeigen und beschreiben.' },
  { code: 'D1F', level: 'F', title: 'Einfache Config', description: 'Ich kann eine einfache Container-Konfiguration gemäss Vorgaben erweitern, anpassen und ausführen.' },
  { code: 'D1E', level: 'E', title: 'Umfangreiche Config', description: 'Ich kann eine umfangreiche Container-Konfiguration gemäss Vorgaben erweitern, anpassen und ausführen, mögliche Fehlerquellen erkennen und beheben.' },
  { code: 'D2G', level: 'G', title: 'Image Lifecycle', description: 'Ich kann Container-Images aus einem Repository beziehen und anschliessend starten, anbinden/ausführen (attach/exec), evtl. Ports mappen, stoppen, löschen.' },
  { code: 'D2F', level: 'F', title: 'Registry Publish', description: 'Ich kann selbst erstellte Container-Images in einer Registry dokumentieren und publizieren.' },
  { code: 'D2E', level: 'E', title: 'Multi-Registry', description: 'Ich kann selbst erstellte Container-Images in mehrere Registries dokumentieren und publizieren.' },

  // E - Praxis PCA
  { code: 'E1G', level: 'G', title: 'PCA Zugriff', description: 'Ich kann einen sicheren Zugriff auf den PCA konfigurieren und anwenden.' },
  { code: 'E1F', level: 'F', title: 'Cloud Instanz', description: 'Ich kann eine Cloud-Instanz des PCA konfigurieren und verwalten.' },
  { code: 'E1E', level: 'E', title: 'Netzwerk Config', description: 'Ich kann ein einfaches Netzwerk gemäss Vorgaben zum sicheren Betrieb von containerisierten Diensten konfigurieren.' },
  { code: 'E2G', level: 'G', title: 'Storage Config', description: 'Ich kann mindestens eine - vom PCA zur Verfügung gestellte - Storage-Variante beschreiben, konfigurieren und anwenden.' },
  { code: 'E2F', level: 'F', title: 'Scaling', description: 'Ich kann die verschiedenen Varianten zur Skalierung von PCA-Instanzen aufzählen und mindestens eine konfigurieren und verwalten.' },
  { code: 'E2E', level: 'E', title: 'Metadata', description: 'Ich kann Metadaten einer Cloud-Instanz verwalten und auslesen.' },

  // F - Qualität
  { code: 'F1G', level: 'G', title: 'QS Methoden', description: 'Ich kann die wichtigsten Methoden zur Qualitätssicherung und -kontrolle von Containern aufzählen und beschreiben.' },
  { code: 'F1F', level: 'F', title: 'Security Indikatoren', description: 'Ich kann die wichtigsten Indikatoren zum sicheren Betreiben (Security) von Containern aufzählen und beschreiben.' },
  { code: 'F1E', level: 'E', title: 'Sicherheitslücken fixen', description: 'Ich kann bei einem vorgegebenen Container-Image die grundlegendsten Sicherheitslücken überprüfen und beseitigen.' },
];

const M165_DATA = [
  // A - NoSQL Grundlagen
  { code: 'A1G', level: 'G', title: 'Begriffe und Konzepte', description: 'Ich kann Begriffe und Konzepte der NoSQL Datenbanken erläutern. (z. B. CAP-Theorem, BASE, ACID, Indexing Strukturen, Caching, Datenanalyse, Datawarehouse, FullText Search, Netzwerke, Testing).' },
  { code: 'A1F', level: 'F', title: 'Datenbank Auswahl', description: 'Ich kann eine NoSQL Datenbank gezielt für eine spezifische Anwendung auswählen. (z. B. Document Store für Videos)' },
  { code: 'A1E', level: 'E', title: 'Einsatz hinterfragen', description: 'Ich kann den Einsatz einer NoSQL Datenbank kritisch hinterfragen und Verbesserungen vorschlagen.' },
  
  // B - NoSQL Datenbank implementieren
  { code: 'B1G', level: 'G', title: 'Datenmodell interpretieren', description: 'Ich kann ein Datenmodell für eine NoSQL Datenbank interpretieren und erläutern.' },
  { code: 'B1F', level: 'F', title: 'Datenmodell umsetzen', description: 'Ich kann ein vorgegebenes Datenmodell mit einer NoSQL Datenbank umsetzen.' },
  { code: 'B1E', level: 'E', title: 'Datenmodell entwerfen', description: 'Ich kann ein Datenmodell für eine NoSQL Datenbank entwerfen.' },

  // C - Daten in NoSQL Datenbank eintragen
  { code: 'C1G', level: 'G', title: 'Datenstruktur erläutern', description: 'Ich kann die Struktur von Daten in einer NoSQL Datenbank erläutern.' },
  { code: 'C1F', level: 'F', title: 'Daten übernehmen', description: 'Ich kann Daten in eine NoSQL Datenbank übernehmen.' },
  { code: 'C1E', level: 'E', title: 'Import Probleme lösen', description: 'Ich kann Probleme bei der Übernahme von Daten in eine NoSQL Datenbank erkennen und Lösungen aufzeigen.' },

  // D - Zugriffsberechtigungen anwenden
  { code: 'D1G', level: 'G', title: 'Berechtigungskonzepte', description: 'Ich kann die Funktion von Zugriffsberechtigungen in einer NoSQL Datenbank erläutern. (Benutzer, Rollen, Zugriffsrechte)' },
  { code: 'D1F', level: 'F', title: 'Berechtigungen umsetzen', description: 'Ich kann vordefinierte Zugriffsberechtigungen in einer NoSQL Datenbank umsetzen. (z. B. Rollen)' },
  { code: 'D1E', level: 'E', title: 'Berechtigungskonzept', description: 'Ich kann ein Konzept für Zugriffsberechtigungen einer NoSQL Datenbank entwerfen.' },

  // E - Backup erstellen Restore durchführen
  { code: 'E1G', level: 'G', title: 'Backup Konzepte', description: 'Ich kann Konzepte für ein Backup einer NoSQL Datenbank erläutern. (z. B. on-demand snapshots, continous cloud backups, legacy backups)' },
  { code: 'E1F', level: 'F', title: 'Backup und Restore', description: 'Ich kann ein Backup und Restore bei einer NoSQL Datenbank anwenden.' },
  { code: 'E1E', level: 'E', title: 'Backup Konzept', description: 'Ich kann ein Konzept für das Backup einer NoSQL Datenbank erstellen.' },

  // F - Skalierung und Replikation bei einer NoSQL Datenbank anwenden
  { code: 'F1G', level: 'G', title: 'Skalierung Prinzipien', description: 'Ich kann das Prinzip der Skalierung und die unterschiedlichen Replikationsarten für eine NoSQL Datenbank erläutern. (z. B. Multimaster, primary and replica, Aktiv-Passiv und horizontale Skalierung)' },
  { code: 'F1F', level: 'F', title: 'Replikation anwenden', description: 'Ich kann für eine NoSQL Datenbank eine Replikation anwenden.' },
  { code: 'F1E', level: 'E', title: 'Skalierungskonzept', description: 'Ich kann ein Konzept für die Skalierung einer NoSQL Datenbank erstellen.' },

  // G - Anbindung an NoSQL Datenbank erstellen
  { code: 'G1G', level: 'G', title: 'Zugriffsprinzipien', description: 'Ich kann das Prinzip des Zugriffes bei einer NoSQL Datenbank erläutern. (z. B. Queries, Projections)' },
  { code: 'G1F', level: 'F', title: 'Anbindung implementieren', description: 'Ich kann eine Anbindung an eine NoSQL Datenbank implementieren. (z. B. API)' },
  { code: 'G1E', level: 'E', title: 'Parallele Verarbeitung', description: 'Ich kann das Prinzip der parallelen Verarbeitung bei NoSQL Datenbanken anwenden. (z. B. MapReduce Algorithmen)' },
];

async function seedModule(tutorSlug: string, moduleCode: string, moduleTitle: string, data: any[]) {
  // 1. Get or Create Tutor
  const tutor = await prisma.tutor.findUnique({ where: { slug: tutorSlug } });
  
  if (!tutor) {
      console.error(`Tutor ${tutorSlug} not found. Please seed tutors first.`);
      return;
  }

  // 2. Get or Create Module
  let module = await prisma.module.findUnique({
      where: {
          tutorId_code: {
              tutorId: tutor.id,
              code: moduleCode
          }
      }
  });

  if (!module) {
      module = await prisma.module.create({
          data: {
              code: moduleCode,
              title: moduleTitle,
              tutor: { connect: { id: tutor.id } }
          }
      });
      console.log(`Created Module ${moduleCode} for ${tutorSlug}`);
  }

  // 3. Seed Competencies
  for (const item of data) {
    const uniqueConstraint = {
      moduleId_code: {
        moduleId: module.id,
        code: item.code
      }
    };

    const exists = await prisma.competency.findUnique({
      where: uniqueConstraint
    });

    if (!exists) {
      await prisma.competency.create({
        data: {
          code: item.code,
          title: item.title,
          summary: item.description,
          level: item.level,
          moduleId: module.id,
          status: 'open'
        }
      });
      console.log(`Created Competency ${moduleCode}/${item.code}`);
    } else {
        // Update title/desc if needed
        await prisma.competency.update({
            where: uniqueConstraint,
            data: {
                title: item.title,
                summary: item.description
            }
        });
        console.log(`Updated Competency ${moduleCode}/${item.code}`);
    }
  }
}

async function main() {
  console.log(`Start seeding ...`);

  // 1. Seed Tutors
  const dockTutor = await prisma.tutor.upsert({
      where: { slug: 'docktutor' },
      update: { name: 'DockTutor' },
      create: { slug: 'docktutor', name: 'DockTutor' }
  });
  console.log(`Seeded Tutor: ${dockTutor.name}`);

  const sqlTutor = await prisma.tutor.upsert({
      where: { slug: 'sqltutor' },
      update: { name: 'SQLTutor' },
      create: { slug: 'sqltutor', name: 'SQLTutor' }
  });
  console.log(`Seeded Tutor: ${sqlTutor.name}`);

  // 2. Seed Modules & Competencies
  await seedModule('docktutor', 'M347', 'Dienst mit Containern', M347_DATA);
  
  await seedModule('sqltutor', 'M165', 'NoSQL Datenbanken', M165_DATA);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
