import { ResumeData, TemplateName } from '@/lib/types';
import CleanModernPdf from './clean-modern';
import TwoColumnPdf from './two-column';
import MinimalPdf from './minimal';
import ExecutivePdf from './executive';
import CreativePdf from './creative';
import TechnicalPdf from './technical';

export function getPdfDocument(data: ResumeData) {
  switch (data.template) {
    case 'two-column': return <TwoColumnPdf data={data} />;
    case 'minimal': return <MinimalPdf data={data} />;
    case 'executive': return <ExecutivePdf data={data} />;
    case 'creative': return <CreativePdf data={data} />;
    case 'technical': return <TechnicalPdf data={data} />;
    case 'clean-modern':
    default: return <CleanModernPdf data={data} />;
  }
}
