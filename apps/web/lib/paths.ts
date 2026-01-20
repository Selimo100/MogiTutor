export const paths = {
  home: '/',
  tutors: {
    root: '/tutors',
    overview: (slug: string) => `/tutors/${slug}`,
    module: (tutorSlug: string, moduleCode: string) => `/tutors/${tutorSlug}/modules/${moduleCode}`,
    competency: (tutorSlug: string, moduleCode: string, competencyCode: string) => 
      `/tutors/${tutorSlug}/modules/${moduleCode}/competencies/${competencyCode}`,
  }
};
