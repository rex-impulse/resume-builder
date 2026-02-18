import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinkedIn Profile to Resume Converter — Free Resume Builder',
  description: 'Convert your LinkedIn profile into a professional resume instantly. Paste your LinkedIn text and get a formatted, ATS-friendly resume ready to download as PDF.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/linkedin' },
  openGraph: {
    title: 'LinkedIn Profile to Resume Converter — Free Resume Builder',
    description: 'Convert your LinkedIn profile into a professional resume instantly.',
    url: 'https://resume.impulsestudios.cc/linkedin',
  },
};

export default function LinkedInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
