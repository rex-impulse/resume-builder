import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Templates — Free Professional Designs',
  description: 'Browse free professional resume templates. Classic, Modern, and Minimal designs — all ATS-friendly and ready to customize.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/templates' },
  openGraph: {
    title: 'Resume Templates — Free Professional Designs',
    description: 'Browse free professional resume templates with ATS-friendly designs.',
    url: 'https://resume.impulsestudios.cc/templates',
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
