import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { TableOfContents } from '@/components/TableOfContents';
import { CodeBlock } from '@/components/CodeBlock';
import { guideContent } from '@/data/content';
import { sqlContent } from '@/data/sql-content';
import { Container, Database, ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';
import { getTutor, getAllTutors } from '@/lib/tutors/registry';
import { notFound } from 'next/navigation';
import { getTutorContent } from '@/data/tutors/loader';
import { paths } from '@/lib/paths';

export function generateStaticParams() {
  return getAllTutors().map((tutor) => ({
    tutor: tutor.slug,
  }));
}

export const dynamicParams = true;

export default async function TutorPage({ params }: { params: Promise<{ tutor: string }> }) {
  const { tutor: slug } = await params;
  const tutorConfig = getTutor(slug);

  if (!tutorConfig) {
      notFound();
  }

  // --- LEGACY ADAPTERS (Preserving existing manually crafted pages) ---
  if (slug === 'docktutor') {
      return (
        <div className="container mx-auto px-4">
          <div className="py-4">
              <Link href={paths.home} className="flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to MogiTutor
              </Link>
          </div>
          <Hero 
            imageSrc={tutorConfig.icon}
            badge="Interactive Docker Guide"
            secondaryAction={{ label: "Cheat Sheet", href: "#intro" }}
          />
          
          <div className="grid lg:grid-cols-[1fr_240px] gap-12 relative">
            <div className="space-y-8 min-w-0">
              {guideContent.map((section) => (
                <Section key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                       <Container className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.blocks.map((block, index) => {
                      if (block.type === 'code') {
                        return (
                          <CodeBlock 
                            key={index} 
                            code={block.content} 
                            language={block.language || 'text'} 
                            filename={block.filename} 
                          />
                        );
                      }
                      return (
                        <div key={index} className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          <p>{block.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </Section>
              ))}
              
              <Section id="modules" className="pt-16 mt-20 border-t-2 border-primary/20">
                  <h2 className="text-2xl font-bold mb-6">Available Modules</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                      {tutorConfig.defaultModules.map(code => (
                          <Link key={code} href={paths.tutors.module(slug, code)} className="block p-4 border rounded-lg hover:border-primary">
                              <h3 className="text-xl font-bold">{code}</h3>
                              <p className="text-muted-foreground">Go to module dashboard</p>
                          </Link>
                      ))}
                  </div>
              </Section>
            </div>
            
            <TableOfContents />
          </div>
        </div>
      );
  } 
  
  if (slug === 'sqltutor') {
      return (
        <div className="container mx-auto px-4">
             <div className="py-4">
              <Link href={paths.home} className="flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to MogiTutor
              </Link>
          </div>
          <Hero 
            imageSrc={tutorConfig.icon}
            badge="Interactive SQL & NoSQL Guide"
            title={<>Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Databases</span></>}
            subtitle={tutorConfig.shortDescription}
            primaryAction={{ label: "Start Learning", href: paths.tutors.module(slug, 'M165') }}
            secondaryAction={{ label: "View Cheatsheet", href: "#sql-basics" }}
          />

           <div className="grid lg:grid-cols-[1fr_240px] gap-12 relative">
               <div className="space-y-8 min-w-0">
                   {sqlContent.map((section) => (
                    <Section key={section.id} id={section.id}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded bg-primary/10 text-primary">
                          <Database className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">{section.title}</h2>
                      </div>
                      <div className="space-y-6">
                        {section.blocks.map((block, index) => {
                             if (block.type === 'code') {
                                return (
                                  <CodeBlock 
                                    key={index} 
                                    code={block.content} 
                                    language={block.language || 'text'} 
                                    filename={block.filename} 
                                  />
                                );
                              }
                             return (
                                <div key={index} className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {block.content.split('\n').map((line, i) => {
                                      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-foreground mt-4 mb-2">{line.replace('### ', '')}</h3>
                                      if (line.startsWith('**')) return <p key={i} className="mb-2"><strong className="text-foreground">{line.replace(/\*\*/g, '')}</strong></p>
                                      if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.replace('* ', '')}</li>
                                      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary/50 pl-4 italic my-4">{line.replace('> ', '')}</blockquote>
                                      if (line.trim().startsWith('|')) return <div key={i} className="font-mono text-xs overflow-x-auto p-2 bg-muted rounded my-2">{line}</div>
                                      if (line.trim() === '') return <br key={i} />
                                      return <p key={i} className="mb-2">{line}</p>
                                  })}
                                </div>
                             )
                        })}
                      </div>
                    </Section>
                 ))}
                 
                 <Section id="modules" className="pt-16 mt-20 border-t-2 border-primary/20">
                     <h2 className="text-2xl font-bold mb-6">Available Modules</h2>
                     <div className="grid md:grid-cols-2 gap-4">
                         {tutorConfig.defaultModules.map(code => (
                             <Link key={code} href={paths.tutors.module(slug, code)} className="block p-4 border rounded-lg hover:border-primary">
                                 <h3 className="text-xl font-bold">{code}</h3>
                                 <p className="text-muted-foreground">Go to module dashboard</p>
                             </Link>
                         ))}
                     </div>
                 </Section>
               </div>
               <TableOfContents content={sqlContent} />
           </div>
        </div>
      );
  }

  // --- GENERIC TUTOR TEMPLATE (Future Proof) ---
  const content = await getTutorContent(slug);

  return (
    <div className="container mx-auto px-4 min-h-screen">
       <div className="py-4">
          <Link href={paths.home} className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to MogiTutor
          </Link>
      </div>
      
      <Hero 
        imageSrc={tutorConfig.icon}
        badge={tutorConfig.name}
        title={<span className="text-foreground">{tutorConfig.name}</span>}
        subtitle={tutorConfig.shortDescription}
        primaryAction={tutorConfig.status === 'active' ? { label: "Start Learning", href: "#modules" } : undefined}
      />

      <div className="max-w-4xl mx-auto space-y-12 pb-20">
          {tutorConfig.status === 'coming_soon' && (
              <div className="p-8 border border-dashed border-muted-foreground/30 rounded-2xl bg-muted/10 text-center space-y-4">
                   <div className="inline-flex p-3 rounded-full bg-muted">
                        <Construction className="w-8 h-8 text-muted-foreground" />
                   </div>
                   <h3 className="text-2xl font-bold">Coming Soon</h3>
                   <p className="text-muted-foreground">This tutor is currently being built. Check back later!</p>
              </div>
          )}

          {content?.overview && (
              <Section id="overview">
                   <h2 className="text-2xl font-bold mb-4">Overview</h2>
                   <p className="text-lg text-muted-foreground leading-relaxed">{content.overview}</p>
              </Section>
          )}

          {content?.cheatSheet?.map((sheet, i) => (
             <Section key={i} id={`cheat-${i}`}>
                 <h2 className="text-2xl font-bold mb-4">{sheet.title}</h2>
                 <div className="grid gap-6">
                    {sheet.blocks.map((block, j) => (
                        <div key={j} className="space-y-2">
                             <div className="text-sm font-medium text-foreground">{block.label}</div>
                             <CodeBlock code={block.code} language={block.language} />
                        </div>
                    ))}
                 </div>
             </Section>
          ))}

          {tutorConfig.defaultModules && tutorConfig.defaultModules.length > 0 && tutorConfig.status !== 'coming_soon' && (
             <Section id="modules" className="pt-8 border-t border-border">
                  <h2 className="text-2xl font-bold mb-6">Available Modules</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                      {tutorConfig.defaultModules.map(code => (
                          <Link key={code} href={paths.tutors.module(slug, code)} className="block p-6 bg-card border border-border rounded-xl hover:border-primary transition-colors shadow-sm hover:shadow-md">
                              <h3 className="text-xl font-bold mb-2">{code}</h3>
                              <p className="text-muted-foreground text-sm">Access module dashboard</p>
                          </Link>
                      ))}
                  </div>
             </Section>
          )}
      </div>
    </div>
  );
}
