import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Examples — Professional Resume Samples for Every Industry',
  description: 'Browse 6 professional resume examples across industries and career levels. Get inspired and build your own resume for free with our online resume builder.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/resume-examples' },
};

const EXAMPLES = [
  {
    title: 'Software Engineer Resume',
    level: 'Mid-Level',
    industry: 'Technology',
    summary: 'Experienced software engineer with 4+ years building scalable web applications. Proficient in React, Node.js, and AWS. Led migration of monolith to microservices serving 2M+ users.',
    highlights: ['React, TypeScript, Node.js, PostgreSQL', '4 years experience', 'Led team of 3 engineers'],
  },
  {
    title: 'Marketing Manager Resume',
    level: 'Senior',
    industry: 'Marketing',
    summary: 'Results-driven marketing manager with 7 years of experience in B2B SaaS. Managed $2M annual budget and grew organic traffic by 180% in 18 months through content strategy and SEO.',
    highlights: ['B2B SaaS marketing', '$2M budget management', '180% organic growth'],
  },
  {
    title: 'Recent Graduate Resume',
    level: 'Entry-Level',
    industry: 'General',
    summary: 'Motivated recent graduate with a B.S. in Business Administration. Completed internships at two Fortune 500 companies. Strong analytical skills with proficiency in Excel and Tableau.',
    highlights: ['B.S. Business Administration', '2 internships', 'Dean\'s List, 3.8 GPA'],
  },
  {
    title: 'Registered Nurse Resume',
    level: 'Mid-Level',
    industry: 'Healthcare',
    summary: 'Compassionate registered nurse with 5 years of experience in emergency and critical care. Certified in ACLS and PALS. Consistently rated in top 10% for patient satisfaction scores.',
    highlights: ['BSN, RN, ACLS, PALS certified', '5 years ER/ICU experience', 'Top 10% patient satisfaction'],
  },
  {
    title: 'Product Manager Resume',
    level: 'Senior',
    industry: 'Technology',
    summary: 'Strategic product manager with 6 years leading cross-functional teams at high-growth startups. Shipped 12 major features that increased ARR by $4M. Data-driven with strong stakeholder management.',
    highlights: ['6 years product management', '$4M ARR impact', '12 major feature launches'],
  },
  {
    title: 'Graphic Designer Resume',
    level: 'Mid-Level',
    industry: 'Design',
    summary: 'Creative graphic designer with 3 years of agency experience. Skilled in Figma, Adobe Creative Suite, and motion graphics. Designed brand identities for 20+ clients including 3 national brands.',
    highlights: ['Figma, Adobe CC, After Effects', '20+ brand identity projects', '3 national brand clients'],
  },
];

export default function ResumeExamplesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
          <div className="flex items-center gap-6">
            <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700">Templates</Link>
            <Link href="/resume-tips" className="text-sm text-gray-500 hover:text-gray-700">Tips</Link>
            <Link href="/editor" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Build Resume →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Resume Examples</h1>
          <p className="text-base text-gray-500 max-w-2xl">
            Browse professional resume examples across different industries and experience levels. Use these as inspiration when building your own resume.
          </p>
        </div>

        <div className="space-y-8">
          {EXAMPLES.map((ex) => (
            <div key={ex.title} className="border border-gray-200 rounded-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{ex.title}</h2>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{ex.level}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{ex.industry}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{ex.summary}</p>
              <div className="flex flex-wrap gap-2">
                {ex.highlights.map((h) => (
                  <span key={h} className="text-xs text-gray-700 border border-gray-200 px-2 py-1 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-12 text-center py-10 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to create your resume?</h2>
          <p className="text-sm text-gray-500 mb-6">Use any of these examples as inspiration. Our builder makes it easy.</p>
          <Link href="/editor" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Start Building — Free
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Can I copy these resume examples directly?</h3>
              <p className="text-sm text-gray-500">These examples are meant as inspiration. Use them to understand structure and phrasing, then customize with your own experience and achievements.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Which resume format should I use?</h3>
              <p className="text-sm text-gray-500">For most job seekers, a reverse-chronological format works best. It highlights your most recent experience first, which is what recruiters expect.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">How long should my resume be?</h3>
              <p className="text-sm text-gray-500">One page is ideal for most candidates with under 10 years of experience. Senior professionals may use two pages if every line adds value.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Should I include a summary or objective?</h3>
              <p className="text-sm text-gray-500">A professional summary (2-3 sentences) is recommended for experienced candidates. New graduates can use an objective statement that focuses on what they bring to the role.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-xs text-gray-400">
          <div className="flex justify-center gap-4">
            <Link href="https://typeburst.impulsestudios.cc" className="hover:text-gray-600">TypeBurst</Link>
            <Link href="https://invoice.impulsestudios.cc" className="hover:text-gray-600">Invoice Generator</Link>
            <Link href="https://qr.impulsestudios.cc" className="hover:text-gray-600">QR Code Maker</Link>
            <Link href="https://tools.impulsestudios.cc" className="hover:text-gray-600">MarkdownPaste</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
