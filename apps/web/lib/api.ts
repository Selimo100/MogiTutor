// apps/web/lib/api.ts

const isServer = typeof window === 'undefined';
// API Base is /api
const API_BASE = isServer 
  ? (process.env.INTERNAL_API_BASE_URL || 'http://api:8080/api') 
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4180/api');

export async function fetchTutors() {
  const res = await fetch(`${API_BASE}/tutors`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tutors');
  return res.json();
}

export async function fetchCompetencies(tutorSlug: string, moduleCode: string) {
  const res = await fetch(`${API_BASE}/tutors/${tutorSlug}/modules/${moduleCode}/competencies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchCompetency(tutorSlug: string, moduleCode: string, code: string) {
  const res = await fetch(`${API_BASE}/tutors/${tutorSlug}/modules/${moduleCode}/competencies/${code}`, { cache: 'no-store' });
  if (!res.ok) {
     if (res.status === 404) return null;
     throw new Error('Failed to fetch competency');
  }
  return res.json();
}

export async function updateCompetency(tutorSlug: string, moduleCode: string, code: string, data: any) {
  const res = await fetch(`${API_BASE}/tutors/${tutorSlug}/modules/${moduleCode}/competencies/${code}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function uploadEvidence(tutorSlug: string, moduleCode: string, code: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${API_BASE}/tutors/${tutorSlug}/modules/${moduleCode}/competencies/${code}/evidence`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
     const error = await res.json();
     throw new Error(error.error || 'Upload failed');
  }
  return res.json();
}

export function getFileUrl(assetId: string) {
  // Always use client-side URL for this as it's used in <img> src
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4180/api';
  return `${base}/files/${assetId}`;
}

export async function deleteEvidence(evidenceId: string) {
    const res = await fetch(`${API_BASE}/evidence/${evidenceId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed delete');
    return res.json();
}
