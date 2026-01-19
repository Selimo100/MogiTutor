import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { TableOfContents } from '@/components/TableOfContents';
import { CodeBlock } from '@/components/CodeBlock';
import { guideContent } from '@/data/content';
import { sqlContent } from '@/data/sql-content';
import { Container, Database, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function TutorPage({ params }: { params: Promise<{ tutor: string }> }) {
  const { tutor } = await params;

  if (tutor === 'docktutor') {
      return (
        <div className="container mx-auto px-4">
          <div className="py-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to MogiTutor
              </Link>
          </div>
          <Hero 
            imageSrc="/DockerTutor.png"
            badge="Interactive Docker Guide"
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
                      <Link href="/tutors/docktutor/modules/M347" className="block p-4 border rounded-lg hover:border-primary">
                          <h3 className="text-xl font-bold">M347</h3>
                          <p className="text-muted-foreground">Dienst mit Containern anwenden</p>
                      </Link>
                  </div>
              </Section>
            </div>
            
            <TableOfContents />
          </div>
        </div>
      );
  } else if (tutor === 'sqltutor') {
      return (
        <div className="container mx-auto px-4">
             <div className="py-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to MogiTutor
              </Link>
          </div>
          <Hero 
            imageSrc="/SqlTutor.png"
            badge="Interactive SQL & NoSQL Guide"
            title={<>Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Databases</span></>}
            subtitle="Understand SQL and NoSQL concepts, scaling, and implementation."
            primaryAction={{ label: "Start Learning", href: "/tutors/sqltutor/modules/M165" }}
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
                                    // Basic markdown-like rendering for this specific content
                                    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-foreground mt-4 mb-2">{line.replace('### ', '')}</h3>
                                    if (line.startsWith('**')) return <p key={i} className="mb-2"><strong className="text-foreground">{line.replace(/\*\*/g, '')}</strong></p>
                                    if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.replace('* ', '')}</li>
                                    if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary/50 pl-4 italic my-4">{line.replace('> ', '')}</blockquote>
                                    if (line.trim().startsWith('|')) return <div key={i} className="font-mono text-xs overflow-x-auto p-2 bg-muted rounded my-2">{line}</div> // Very basic table fallback
                                    return <p key={i} className="mb-2">{line}</p>
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </Section>
                   ))}

                    <Section id="modules" className="pt-8 text-left border-t-2 border-primary/20 mt-12">
                        <h2 className="text-2xl font-bold mb-6">Available Modules</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Link href="/tutors/sqltutor/modules/M165" className="block p-4 border rounded-lg hover:border-primary">
                                <h3 className="text-xl font-bold">M165</h3>
                                <p className="text-muted-foreground">NoSQL Datenbanken einsetzen</p>
                            </Link>
                        </div>
                   </Section>
               </div>
               
               <TableOfContents />
           </div>
        </div>
      )
  }

  return <div>Tutor not found</div>;
}
