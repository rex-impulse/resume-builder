export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
  gpa: string;
  honors: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  languages: string[];
  projects: Project[];
  showCertifications: boolean;
  showLanguages: boolean;
  showProjects: boolean;
  template: TemplateName;
  paperSize: 'a4' | 'letter';
}

export type TemplateName = 'clean-modern' | 'two-column' | 'minimal' | 'executive' | 'creative' | 'technical';

export interface TemplateInfo {
  id: TemplateName;
  name: string;
  description: string;
  premium: boolean;
  previewColor: string;
}

export const TEMPLATES: TemplateInfo[] = [
  { id: 'clean-modern', name: 'Clean Modern', description: 'Single column, whitespace, sans-serif. Notion resume vibes.', premium: false, previewColor: '#1a1a1a' },
  { id: 'two-column', name: 'Two Column', description: 'Sidebar with contact/skills, main area for experience.', premium: false, previewColor: '#2563eb' },
  { id: 'minimal', name: 'Minimal', description: 'Just typography, no lines or boxes. Elegant simplicity.', premium: false, previewColor: '#666666' },
  { id: 'executive', name: 'Executive', description: 'Serif fonts, subtle horizontal rules, power layout.', premium: true, previewColor: '#1e3a5f' },
  { id: 'creative', name: 'Creative', description: 'Accent color sidebar, icon-based skills, modern feel.', premium: true, previewColor: '#7c3aed' },
  { id: 'technical', name: 'Technical', description: 'Monospace section headers, code-inspired, for developers.', premium: true, previewColor: '#059669' },
];

export function createDefaultResume(): ResumeData {
  return {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedinUrl: '',
      portfolioUrl: '',
    },
    summary: '',
    experience: [
      {
        id: crypto.randomUUID(),
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        isPresent: false,
        bullets: [''],
      },
    ],
    education: [
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: '',
        gpa: '',
        honors: '',
      },
    ],
    skills: [],
    certifications: [],
    languages: [],
    projects: [],
    showCertifications: false,
    showLanguages: false,
    showProjects: false,
    template: 'clean-modern',
    paperSize: 'a4',
  };
}
