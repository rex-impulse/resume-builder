'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResumeData, TemplateName, createDefaultResume } from '@/lib/types';
import { loadResume, saveResume, exportResumeJson, importResumeJson } from '@/lib/storage';
import ResumeForm from '@/components/resume-form';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ResumePreview = dynamic(() => import('@/components/resume-preview'), { ssr: false });
const PdfDownload = dynamic(() => import('@/components/pdf-download'), { ssr: false });

function EditorContent() {
  const [data, setData] = useState<ResumeData>(createDefaultResume());
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    const loaded = loadResume();
    const templateParam = searchParams.get('template') as TemplateName | null;
    if (templateParam && ['clean-modern', 'two-column', 'minimal', 'executive', 'creative', 'technical'].includes(templateParam)) {
      loaded.template = templateParam;
      saveResume(loaded);
    }
    setData(loaded);
  }, [searchParams]);

  const handleChange = useCallback((newData: ResumeData) => {
    setData(newData);
    saveResume(newData);
  }, []);

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const imported = await importResumeJson(file);
          handleChange(imported);
        } catch {}
      }
    };
    input.click();
  };

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
          <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700 hidden sm:inline">Templates</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => exportResumeJson(data)} className="text-xs text-gray-500 hover:text-gray-700 hidden sm:inline">Export JSON</button>
          <button onClick={handleImport} className="text-xs text-gray-500 hover:text-gray-700 hidden sm:inline">Import JSON</button>
          <PdfDownload data={data} />
        </div>
      </header>

      {/* Mobile Toggle */}
      <div className="flex sm:hidden border-b border-gray-200">
        <button
          onClick={() => setShowPreview(false)}
          className={`flex-1 py-2.5 text-sm font-medium text-center ${!showPreview ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`}
        >
          Editor
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`flex-1 py-2.5 text-sm font-medium text-center ${showPreview ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`}
        >
          Preview
        </button>
      </div>

      {/* Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form - left */}
        <div className={`w-full sm:w-1/2 lg:w-[45%] overflow-y-auto border-r border-gray-200 ${showPreview ? 'hidden sm:block' : ''}`}>
          <ResumeForm data={data} onChange={handleChange} />
        </div>

        {/* Preview - right */}
        <div className={`w-full sm:w-1/2 lg:w-[55%] ${!showPreview ? 'hidden sm:block' : ''}`}>
          <ResumePreview
            data={data}
            onTemplateChange={(t) => handleChange({ ...data, template: t })}
            onPaperSizeChange={(s) => handleChange({ ...data, paperSize: s })}
          />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
