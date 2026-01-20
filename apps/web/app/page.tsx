import { fetchTutors } from '@/lib/api';
import { LandingHero } from '@/components/LandingHero';
import { TutorCard } from '@/components/TutorCard';

// Force dynamic matching previous setup, though static generation with revalidation is usually better.
export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  let tutors = [];
  let error = null;
  
  try {
     tutors = await fetchTutors();
  } catch(e) { 
      console.error("API Fetch Error:", e); 
      error = "Could not load tutors. Backend might be unreachable.";
  }

  return (
    <div className="min-h-screen flex flex-col">
       <LandingHero />
       
       <section className="container mx-auto px-6 py-12 flex-1 max-w-6xl">
           {error ? (
               <div className="text-center p-12 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive">
                   <p className="font-semibold">{error}</p>
                   <p className="text-sm opacity-70 mt-2">Ensure the API service is running.</p>
               </div>
           ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {tutors && tutors.length > 0 ? (
                        tutors.map((tutor: any, index: number) => (
                            <TutorCard key={tutor.slug} tutor={tutor} index={index} />
                        ))
                    ) : (
                        <div className="col-span-2 text-center text-muted-foreground py-20">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="w-12 h-12 bg-muted rounded-full mb-4"></div>
                                <div className="h-4 w-48 bg-muted rounded mb-2"></div>
                                <div className="h-3 w-32 bg-muted rounded"></div>
                            </div>
                        </div>
                    )}
                </div>
           )}
       </section>
    </div>
  );
}
