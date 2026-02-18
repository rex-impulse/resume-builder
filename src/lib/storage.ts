import { ResumeData, createDefaultResume } from './types';

const STORAGE_KEY = 'resume-builder-data';
const RESUMES_KEY = 'resume-builder-saved';

export function loadResume(): ResumeData {
  if (typeof window === 'undefined') return createDefaultResume();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return createDefaultResume();
}

export function saveResume(data: ResumeData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  updatedAt: string;
}

export function loadSavedResumes(): SavedResume[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(RESUMES_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return [];
}

export function saveSavedResumes(resumes: SavedResume[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
  } catch {}
}

export function exportResumeJson(data: ResumeData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resume-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importResumeJson(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(e.target?.result as string));
      } catch { reject(new Error('Invalid JSON')); }
    };
    reader.readAsText(file);
  });
}
