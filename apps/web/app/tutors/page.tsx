import { fetchTutors } from '@/lib/api';
import { TutorCard } from '@/components/TutorCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tutors | MogiTutor',
  description: 'Select a tutor to start learning.',
};

export const dynamic = 'force-dynamic';

export default async function TutorsPage() {
  let tutors = [];
  let error = null;

  try {
     tutors = await fetchTutors();
  } catch(e) { 
      console.error("API Fetch Error:", e);
      error = "Failed to load tutors.";
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
       <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-4">
                <hr className="w-12 border-primary/50 border-t-4 rounded mb-8" />
                <h1 className="text-4xl font-bold tracking-tight">Available Tutors</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Choose a domain to start your mastery journey. Each tutor provides specific modules and hands-on exercises.
                </p>
            </div>

            {error ? (
               <div className="p-8 text-destructive border border-destructive/20 bg-destructive/5 rounded-xl">
                   {error}
               </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {tutors && tutors.length > 0 ? (
                        tutors.map((tutor: any, index: number) => (
                            <TutorCard key={tutor.slug} tutor={tutor} index={index} />
                        ))
                    ) : (
                        <p className="text-muted-foreground">Loading tutors...</p>
                    )}
                </div>
            )}
       </div>
    </div>
  );
}
