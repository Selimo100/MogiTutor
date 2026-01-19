// apps/web/lib/api.ts

const isServer = typeof window === 'undefined';
// Note: API_BASE still points to /api root generally, but we'll construct paths carefully.
// The backend changed prefixes:
// /api/modules -> Module routes
// /api/files, /api/evidence -> General routes
const API_BASE = isServer 
  ? (process.env.INTERNAL_API_BASE_URL || 'http://api:8080/api') 
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4180/api');

export async function fetchModules() {
  const res = await fetch(`${API_BASE}/modules`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch modules');
  return res.json();
}

export async function fetchCompetencies(moduleCode: string) {
  const res = await fetch(`${API_BASE}/modules/${moduleCode}/competencies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchCompetency(moduleCode: string, code: string) {
  const res = await fetch(`${API_BASE}/modules/${moduleCode}/competencies/${code}`, { cache: 'no-store' });
  if (!res.ok) {
     if (res.status === 404) return null;
     throw new Error('Failed to fetch competency');
  }
  return res.json();
}

export async function updateCompetency(moduleCode: string, code: string, data: any) {
  const res = await fetch(`${API_BASE}/modules/${moduleCode}/competencies/${code}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function uploadEvidence(moduleCode: string, code: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  // Endpoint expects param names
  const res = await fetch(`${API_BASE}/modules/${moduleCode}/competencies/${code}/evidence`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
     const text = await res.text();
     throw new Error(text || 'Upload failed');
  }
  return res.json();
}

export async function deleteEvidence(evidenceId: string) {
    const res = await fetch(`${API_BASE}/evidence/${evidenceId}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
}

export function getFileUrl(fileId: string) {
    return `${API_BASE}/files/${fileId}`;
}

// Deprecated or re-mapped legacy calls if needed (but we should migrate all callers)
// export async function fetchAllCompetencies(module = 'M347') -> fetchCompetencies(module)

