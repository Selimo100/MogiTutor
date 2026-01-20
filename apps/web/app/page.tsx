import { getAllTutors } from '@/lib/tutors/registry';
import { LandingHero } from '@/components/LandingHero';
import { TutorCard } from '@/components/TutorCard';

// Page now statically generated using registry logic, much faster.
export default function LandingPage() {
  const tutors = getAllTutors();

  return (
    <div className="min-h-screen flex flex-col">
       <LandingHero />
       
       <section className="container mx-auto px-6 py-12 flex-1 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
               {tutors.map((tutor, index) => (
                   <TutorCard key={tutor.slug} tutor={tutor} index={index} />
               ))}
           </div>
       </section>
    </div>
  );
}
