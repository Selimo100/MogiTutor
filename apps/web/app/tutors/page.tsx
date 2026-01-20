import { getAllTutors } from '@/lib/tutors/registry';
import { TutorCard } from '@/components/TutorCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tutors | MogiTutor',
  description: 'Select a tutor to start learning.',
};

export default function TutorsPage() {
  const tutors = getAllTutors();

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {tutors.map((tutor, index) => (
                    <TutorCard key={tutor.slug} tutor={tutor} index={index} />
                ))}
            </div>
       </div>
    </div>
  );
}
