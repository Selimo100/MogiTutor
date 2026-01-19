import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { TableOfContents } from '@/components/TableOfContents';
import { CodeBlock } from '@/components/CodeBlock';
import { guideContent } from '@/data/content';
import { Container } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      
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
          
           {/* Future Improvements Roadmap */}
          <Section id="roadmap" className="border-t-2 border-primary/20 pt-16 mt-20">
             <h2 className="text-2xl font-bold mb-6">Future Improvements</h2>
             <div className="grid md:grid-cols-2 gap-4">
               {[
                 "Interactive terminal playground",
                 "Advanced Kubernetes section",
                 "Docker Swarm guide",
                 "CI/CD Pipeline examples",
                 "Security scanning integration",
                 "User accounts & progress tracking"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 border border-border rounded-lg bg-card/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                 </div>
               ))}
             </div>
          </Section>
        </div>
        
        <TableOfContents />
      </div>
    </div>
  );
}
