import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Free Resume Builder — Create Professional Resumes Online',
  description: 'Build beautiful, ATS-friendly resumes for free. 6 professional templates, live preview, instant PDF export. No sign-up required.',
  keywords: 'resume builder, free resume maker, resume template, CV builder, ATS resume',
  openGraph: {
    title: 'Free Resume Builder — Professional Templates & PDF Export',
    description: 'Build beautiful, ATS-friendly resumes for free. No sign-up required.',
    url: 'https://resume.impulsestudios.cc',
    type: 'website',
  },
  metadataBase: new URL('https://resume.impulsestudios.cc'),
  alternates: { canonical: 'https://resume.impulsestudios.cc' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Resume Builder',
              url: 'https://resume.impulsestudios.cc',
              description: 'Free online resume builder with professional templates and PDF export.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                { '@type': 'Question', name: 'Is this resume builder really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! You can create and export resumes as PDF completely free with 3 professional templates.' } },
                { '@type': 'Question', name: 'Is the resume ATS-friendly?', acceptedAnswer: { '@type': 'Answer', text: 'All templates use clean structure and standard headings, making them fully compatible with Applicant Tracking Systems.' } },
                { '@type': 'Question', name: 'Do I need to sign up?', acceptedAnswer: { '@type': 'Answer', text: 'No account required. Your data stays in your browser. Start building immediately.' } },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
