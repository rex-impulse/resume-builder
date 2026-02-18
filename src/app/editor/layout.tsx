import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Editor — Free Resume Builder',
  description: 'Edit your resume with a live preview. Choose from professional templates, customize sections, and export as PDF. No sign-up required.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/editor' },
  openGraph: {
    title: 'Resume Editor — Free Resume Builder',
    description: 'Edit your resume with a live preview and export as PDF.',
    url: 'https://resume.impulsestudios.cc/editor',
  },
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
