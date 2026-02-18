import Link from 'next/link';
import { TEMPLATES } from '@/lib/types';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">Resume Builder</span>
          <div className="flex items-center gap-6">
            <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700">Templates</Link>
            <Link href="/editor" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Build Resume →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-4">
          Build a resume that<br />gets you hired
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Free, professional resume builder with live preview and instant PDF export. No sign-up required. Your data never leaves your browser.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/editor" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Start Building — It&apos;s Free
          </Link>
          <Link href="/templates" className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
            Browse Templates
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: 'Live Preview', desc: 'See your resume update in real-time as you type. What you see is what you get.' },
            { title: 'ATS-Friendly', desc: 'Clean structure and standard headings that Applicant Tracking Systems can parse perfectly.' },
            { title: 'Instant PDF', desc: 'Download a pixel-perfect PDF with selectable, searchable text. Ready to send in seconds.' },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template Preview */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">6 Professional Templates</h2>
          <p className="text-sm text-gray-500">Each one designed to look like a $20 premium template. Yours for free.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {TEMPLATES.map((t) => (
            <Link key={t.id} href="/templates" className="group">
              <div className="aspect-[3/4] rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center group-hover:shadow-md transition-shadow">
                <div className="text-center px-4">
                  <div className="w-8 h-1 rounded-full mx-auto mb-3" style={{ backgroundColor: t.previewColor }} />
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.premium ? 'Premium' : 'Free'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="space-y-6">
          {[
            { step: '1', title: 'Fill in your details', desc: 'Structured form with sections for experience, education, skills, and more.' },
            { step: '2', title: 'Choose a template', desc: 'Pick from 6 professionally designed templates. Switch anytime without losing data.' },
            { step: '3', title: 'Download your PDF', desc: 'One click to generate a polished, ATS-friendly PDF ready to send to employers.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 text-sm font-medium rounded-md flex-shrink-0">{s.step}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'Is this resume builder really free?', a: 'Yes! Create and export resumes as PDF completely free with all 6 professional templates.' },
            { q: 'Is the resume ATS-friendly?', a: 'All templates use clean structure and standard headings, making them fully compatible with Applicant Tracking Systems.' },
            { q: 'Do I need to sign up?', a: 'No account required. Your data stays in your browser via localStorage. Start building immediately.' },
            { q: 'Where is my data stored?', a: 'Everything stays in your browser. We don\'t have a backend or database. Your resume data never leaves your device.' },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="text-sm font-medium text-gray-900 mb-1">{f.q}</h3>
              <p className="text-sm text-gray-500">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to build your resume?</h2>
        <Link href="/editor" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
          Start Building — Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
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
