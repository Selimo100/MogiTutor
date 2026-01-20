'use client';

import { useState } from 'react';
import { updateCompetency, uploadEvidence, deleteEvidence, getFileUrl } from '@/lib/api';
import { Section } from './Section';
import { useRouter } from 'next/navigation';
import { ExternalLink, Trash2, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Evidence {
  id: string;
  title: string;
  type: string;
  fileAsset?: {
    id: string;
    originalName: string;
    mimeType: string;
    width?: number; 
    height?: number;
  };
}

interface Competency {
  id: string;
  code: string;
  title: string;
  level: string;
  summary?: string;
  implementationNotes?: string;
  reflection?: string;
  learningGoal?: string;
  status: 'open' | 'in_progress' | 'done';
  tags: string[];
  evidence?: Evidence[];
}

interface CompetencyEditorProps {
  competency: Competency;
  tutorSlug: string;
  moduleCode: string;
}

export function CompetencyEditor({ competency: initialData, tutorSlug, moduleCode }: CompetencyEditorProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [evidence, setEvidence] = useState<Evidence[]>(initialData.evidence || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<{url: string, title: string} | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCompetency(tutorSlug, moduleCode, data.code, {
        summary: data.summary,
        implementationNotes: data.implementationNotes,
        reflection: data.reflection,
        learningGoal: data.learningGoal,
        status: data.status,
        tags: data.tags,
      });
      setIsEditing(false);
      router.refresh();
    } catch (e) {
      alert('Failed to save');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    
    // Client-side Validation
    const isImage = file.type.startsWith('image/');
    if (isImage && file.size > 10 * 1024 * 1024) {
        alert('Image too large (max 10MB)');
        e.target.value = '';
        return;
    }
    if (!isImage && file.type === 'application/pdf' && file.size > 25 * 1024 * 1024) {
        alert('PDF too large (max 25MB)');
        e.target.value = '';
        return;
    }

    setIsUploading(true);
    try {
      const newEvidence = await uploadEvidence(tutorSlug, moduleCode, data.code, file);
      setEvidence([newEvidence, ...evidence]); // Prepend logic
      router.refresh();
    } catch (e) {
        alert('Upload failed. Please check file type and size.');
    } finally {
        setIsUploading(false);
        e.target.value = '';
    }
  };

  const handleDeleteEvidence = async (evidenceId: string) => {
      if(!confirm('Are you sure you want to delete this file?')) return;
      try {
          await deleteEvidence(evidenceId);
          setEvidence(evidence.filter(e => e.id !== evidenceId));
          router.refresh();
      } catch (e) {
          alert('Failed to delete evidence');
      }
  };

  return (
    <div className="space-y-8">
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setPreviewImage(null)}>
            <div className="relative max-w-full max-h-full overflow-hidden flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 right-0 p-4 z-10">
                    <button 
                        onClick={() => setPreviewImage(null)} 
                        className="text-white/80 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-colors"
                    >
                        ✕
                    </button>
                </div>
                <img 
                    src={previewImage.url} 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                    alt={previewImage.title} 
                />
                <div className="flex gap-4 mt-4">
                     <a 
                        href={previewImage.url} 
                        download={previewImage.title}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
                        target="_blank" rel="noreferrer"
                     >
                        <ExternalLink className="w-4 h-4" /> Download Original
                     </a>
                </div>
            </div>
        </div>
      )}

      <div className="flex justify-between items-center print:hidden">
        <div className="flex gap-4 items-center">
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                {isEditing ? (
                  <select 
                    value={data.status}
                    onChange={(e) => setData({...data, status: e.target.value as any})}
                    className="bg-background border rounded px-2 py-1 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs border ${
                      data.status === 'done' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400' :
                      data.status === 'in_progress' ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {data.status.replace('_', ' ')}
                  </span>
                )}
             </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => window.print()}
                className="px-3 py-2 border rounded-md text-sm hover:bg-muted transition-colors"
                title="Print to PDF"
            >
                PDF Export
            </button>
            <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Mode'}
            </button>
        </div>
      </div>

      <Section id="summary">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        {isEditing ? (
            <textarea
                className="w-full min-h-[100px] bg-background border rounded-md p-3"
                value={data.summary || ''}
                onChange={e => setData({...data, summary: e.target.value})}
                placeholder="Write a brief summary in your own words..."
            />
        ) : (
            <p className="text-muted-foreground">
                {data.summary || <span className="italic opacity-50">No summary yet.</span>}
            </p>
        )}
      </Section>

      <Section id="learning-goal">
        <h2 className="text-xl font-semibold mb-4">Learning Goal</h2>
        {isEditing ? (
            <textarea
                className="w-full min-h-[100px] bg-background border rounded-md p-3"
                value={data.learningGoal || ''}
                onChange={e => setData({...data, learningGoal: e.target.value})}
                placeholder="Define your learning goal for this competency..."
            />
        ) : (
            <p className="text-muted-foreground">
                {data.learningGoal || <span className="italic opacity-50">No learning goal added yet.</span>}
            </p>
        )}
      </Section>

      <Section id="implementation-notes">
        <h2 className="text-xl font-semibold mb-4">Implementation Notes</h2>
        {isEditing ? (
            <textarea
                className="w-full min-h-[200px] bg-background border rounded-md p-3 font-mono text-sm"
                value={data.implementationNotes || ''}
                onChange={e => setData({...data, implementationNotes: e.target.value})}
                placeholder="Markdown implementation notes..."
            />
        ) : (
            <div className="prose dark:prose-invert max-w-none">
                {data.implementationNotes ? (
                    <div className="whitespace-pre-wrap">{data.implementationNotes}</div>
                ) : (
                    <span className="italic text-muted-foreground opacity-50">No implementation notes added.</span>
                )}
            </div>
        )}
      </Section>
      
      <Section id="reflection">
        <h2 className="text-xl font-semibold mb-4">Reflection</h2>
        {isEditing ? (
            <textarea
                className="w-full min-h-[150px] bg-background border rounded-md p-3"
                value={data.reflection || ''}
                onChange={e => setData({...data, reflection: e.target.value})}
                placeholder="Reflect on what you learned..."
            />
        ) : (
            <div className="prose dark:prose-invert max-w-none">
                 {data.reflection ? (
                    <div className="whitespace-pre-wrap">{data.reflection}</div>
                ) : (
                    <span className="italic text-muted-foreground opacity-50">No reflection added.</span>
                )}
            </div>
        )}
      </Section>

      <Section id="evidence">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Evidence & Files</h2>
            <div className="relative">
                <input 
                    type="file" 
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    disabled={isUploading}
                />
                <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 disabled:opacity-50">
                     {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : '+ Upload File'}
                </button>
            </div>
        </div>
        
        {evidence.length === 0 ? (
            <p className="text-muted-foreground italic text-sm">No evidence uploaded yet.</p>
        ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {evidence.map(e => {
                    const isImg = e.fileAsset?.mimeType.startsWith('image/');
                    return (
                    <div key={e.id} className="group relative border rounded-lg bg-card hover:shadow-md transition-all overflow-hidden">
                         {/* Preview Area */}
                        <div className="h-40 bg-muted/20 flex items-center justify-center relative overflow-hidden border-b">
                            {isImg && e.fileAsset ? (
                                <Image 
                                    src={getFileUrl(e.fileAsset.id)} 
                                    alt={e.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 300px"
                                />
                            ) : (
                                <FileText className="w-12 h-12 text-muted-foreground/40" />
                            )}
                            
                            {/* Overlay */}
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-[1px]">
                                {e.fileAsset && (
                                     <button 
                                        onClick={() => {
                                            if (isImg && e.fileAsset) {
                                                setPreviewImage({ url: getFileUrl(e.fileAsset.id), title: e.title });
                                            } else if (e.fileAsset) {
                                                window.open(getFileUrl(e.fileAsset.id), '_blank');
                                            }
                                        }}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors"
                                        title={isImg ? "View Preview" : "Download PDF"}
                                    >
                                        {isImg ? <ImageIcon className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteEvidence(e.id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                             </div>
                        </div>

                        {/* Info Area */}
                        <div className="p-3">
                            <div className="font-medium text-sm truncate mb-1" title={e.title}>{e.title}</div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="uppercase tracking-wider font-semibold opacity-70">{isImg ? 'IMG' : 'PDF'}</span>
                                <span>{e.fileAsset?.originalName}</span>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        )}
      </Section>
    </div>
  );
}
