'use client';

import { useState, useEffect } from 'react';
import { ResumeData, TEMPLATES, TemplateName } from '@/lib/types';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);

function PreviewSkeleton() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Loading preview...</p>
      </div>
    </div>
  );
}

interface Props {
  data: ResumeData;
  onTemplateChange: (template: TemplateName) => void;
  onPaperSizeChange: (size: 'a4' | 'letter') => void;
}

export default function ResumePreview({ data, onTemplateChange, onPaperSizeChange }: Props) {
  const [PdfDoc, setPdfDoc] = useState<React.ReactNode>(null);
  const [zoom, setZoom] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Dynamically import to avoid SSR issues
    import('./pdf-templates').then(({ getPdfDocument }) => {
      setPdfDoc(getPdfDocument(data));
    });
  }, [data, mounted]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-xs text-gray-500">Live Preview</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={data.template}
            onChange={(e) => onTemplateChange(e.target.value as TemplateName)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}{t.premium ? ' ★' : ''}
              </option>
            ))}
          </select>
          <select
            value={data.paperSize}
            onChange={(e) => onPaperSizeChange(e.target.value as 'a4' | 'letter')}
            className="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          >
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select>
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded text-sm">−</button>
            <span className="text-xs text-gray-500 w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded text-sm">+</button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto hide-scrollbar" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
        {mounted && PdfDoc ? (
          <PDFViewer width="100%" height="100%" showToolbar={false} style={{ border: 'none' }}>
            {PdfDoc as any}
          </PDFViewer>
        ) : (
          <PreviewSkeleton />
        )}
      </div>
    </div>
  );
}
