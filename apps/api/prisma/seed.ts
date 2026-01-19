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

const M346_DATA = [
  // A - Cloud Grundlagen (Examples)
  { code: 'A1G', level: 'G', title: 'Cloud Definition', description: 'Ich kann Cloud Computing definieren und Hauptmerkmale nennen.' },
  { code: 'A1F', level: 'F', title: 'Service Modelle', description: 'Ich kann IaaS, PaaS und SaaS unterscheiden.' },
  // Duplicate code test
  { code: 'D1G', level: 'G', title: 'CLI Tools', description: 'Ich kann CLI Tools für Cloud Provider installieren und nutzen.' },
];

async function seedModule(moduleName: string, data: typeof M347_DATA) {
  for (const item of data) {
    const uniqueConstraint = {
      module_code: {
        module: moduleName,
        code: item.code
      }
    };

    const exists = await prisma.competency.findUnique({
      where: uniqueConstraint
    });

    if (!exists) {
      const res = await prisma.competency.create({
        data: {
          code: item.code,
          title: item.title,
          summary: item.description,
          level: item.level,
          module: moduleName,
          status: 'open'
        }
      });
      console.log(`Created ${moduleName}/${item.code}`);
    } else {
        // Update title/desc if needed
        await prisma.competency.update({
            where: uniqueConstraint,
            data: {
                title: item.title,
                summary: item.description
            }
        });
        console.log(`Updated ${moduleName}/${item.code}`);
    }
  }
}

async function main() {
  console.log(`Start seeding ...`);

  await seedModule('M347', M347_DATA);
  await seedModule('M346', M346_DATA);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
