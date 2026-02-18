'use client';

import { TEMPLATES, TemplateName } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadResume, saveResume } from '@/lib/storage';

const TEMPLATE_PREVIEWS: Record<TemplateName, { bg: string; accent: string; layout: 'single' | 'two-col' }> = {
  'clean-modern': { bg: '#ffffff', accent: '#1a1a1a', layout: 'single' },
  'two-column': { bg: '#f8f9fa', accent: '#2563eb', layout: 'two-col' },
  'minimal': { bg: '#ffffff', accent: '#888888', layout: 'single' },
  'executive': { bg: '#ffffff', accent: '#1e3a5f', layout: 'single' },
  'creative': { bg: '#7c3aed', accent: '#ffffff', layout: 'two-col' },
  'technical': { bg: '#ffffff', accent: '#059669', layout: 'single' },
};

function TemplateCard({ id, name, description, premium, previewColor }: {
  id: TemplateName; name: string; description: string; premium: boolean; previewColor: string;
}) {
  const router = useRouter();
  const preview = TEMPLATE_PREVIEWS[id];

  const handleSelect = () => {
    const data = loadResume();
    data.template = id;
    saveResume(data);
    router.push('/editor');
  };

  return (
    <div className="group cursor-pointer" onClick={handleSelect}>
      {/* Preview thumbnail */}
      <div className="relative aspect-[3/4] rounded-md overflow-hidden border border-gray-200 mb-3 transition-shadow group-hover:shadow-lg">
        <div className="absolute inset-0" style={{ backgroundColor: preview.layout === 'two-col' && id === 'creative' ? preview.bg : '#fff' }}>
          {/* Mock resume layout */}
          <div className="p-4 h-full flex flex-col" style={preview.layout === 'two-col' ? { flexDirection: 'row' } : {}}>
            {preview.layout === 'two-col' ? (
              <>
                <div className="w-[35%] h-full rounded-sm p-3" style={{ backgroundColor: id === 'creative' ? previewColor : '#f3f4f6' }}>
                  <div className="w-3/4 h-2 rounded-full mb-3" style={{ backgroundColor: id === 'creative' ? 'rgba(255,255,255,0.8)' : previewColor }} />
                  <div className="space-y-1.5">
                    {[...Array(4)].map((_, i) => <div key={i} className="w-full h-1.5 rounded-full" style={{ backgroundColor: id === 'creative' ? 'rgba(255,255,255,0.3)' : '#e5e7eb' }} />)}
                  </div>
                  <div className="mt-4 w-2/3 h-1.5 rounded-full mb-2" style={{ backgroundColor: id === 'creative' ? 'rgba(255,255,255,0.6)' : previewColor, opacity: 0.6 }} />
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-4/5 h-1 rounded-full" style={{ backgroundColor: id === 'creative' ? 'rgba(255,255,255,0.2)' : '#f3f4f6' }} />)}
                  </div>
                </div>
                <div className="flex-1 p-3">
                  <div className="w-2/3 h-2.5 rounded-full mb-2" style={{ backgroundColor: previewColor }} />
                  <div className="space-y-1 mb-3">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-1.5 rounded-full bg-gray-200" style={{ width: `${85 - i * 10}%` }} />)}
                  </div>
                  <div className="w-1/2 h-1.5 rounded-full mb-2" style={{ backgroundColor: previewColor, opacity: 0.5 }} />
                  <div className="space-y-1">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-1 rounded-full bg-gray-100" style={{ width: `${90 - i * 8}%` }} />)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 h-3 rounded-full mb-1" style={{ backgroundColor: previewColor }} />
                <div className="flex gap-2 mb-3">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-1 w-12 rounded-full bg-gray-300" />)}
                </div>
                <div className="w-full h-px mb-3" style={{ backgroundColor: id === 'executive' ? previewColor : '#e5e5e5' }} />
                <div className="w-1/3 h-1.5 rounded-full mb-2" style={{ backgroundColor: previewColor, opacity: id === 'minimal' ? 0.4 : 0.7 }} />
                <div className="space-y-1 mb-3">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-1 rounded-full bg-gray-200" style={{ width: `${90 - i * 10}%` }} />)}
                </div>
                <div className="w-1/4 h-1.5 rounded-full mb-2" style={{ backgroundColor: previewColor, opacity: id === 'minimal' ? 0.4 : 0.7 }} />
                <div className="space-y-1 mb-3">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-1 rounded-full bg-gray-100" style={{ width: `${85 - i * 8}%` }} />)}
                </div>
                {id === 'technical' && (
                  <div className="flex gap-1 mt-1">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-3 w-10 rounded-sm" style={{ backgroundColor: '#f0fdf4', border: '0.5px solid #d1fae5' }} />)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {premium && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-900 text-white text-[10px] font-medium rounded">
            Premium
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md">Use Template</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-900">{name}</h3>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
            <span className="text-sm text-gray-500">Templates</span>
          </div>
          <Link href="/editor" className="text-sm text-gray-600 hover:text-gray-900">← Back to Editor</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Resume Templates</h1>
          <p className="text-sm text-gray-500">Choose a template that fits your style. All templates are ATS-friendly and professionally designed.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} {...t} />
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Are these templates ATS-friendly?</h3>
              <p className="text-sm text-gray-500">Yes. All templates use clean structure with standard section headings that Applicant Tracking Systems can parse.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Can I switch templates after filling in my info?</h3>
              <p className="text-sm text-gray-500">Absolutely. Your content is separate from the template. Switch freely and your data stays intact.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">What format is the exported PDF?</h3>
              <p className="text-sm text-gray-500">PDFs are generated with selectable, searchable text — not screenshots. Perfect for ATS and easy sharing.</p>
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
