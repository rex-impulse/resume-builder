import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resume Builder Blog — Tips & Guides | Impulse Studios',
  description: 'Expert resume writing tips, career advice, and job search guides. Learn how to build a professional resume that gets interviews.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/blog' },
  openGraph: {
    title: 'Resume Builder Blog — Tips & Guides',
    description: 'Expert resume writing tips, career advice, and job search guides.',
    url: 'https://resume.impulsestudios.cc/blog',
    siteName: 'Resume Builder',
    type: 'website',
  },
};

const articles = [
  {
    slug: 'resume-guide',
    title: 'The Complete Guide to Building a Professional Resume in 2025',
    description: 'Learn how to create a resume that stands out to hiring managers and passes ATS systems. Step-by-step guide with examples.',
    date: '2025-03-01',
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Resume Builder</Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Blog</h1>
        <p className="text-gray-500 mb-10">Resume writing tips, career advice, and job search guides.</p>
        
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-gray-100 pb-8">
              <Link href={`/blog/${article.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{article.title}</h2>
                <p className="text-gray-500 mt-2 text-sm">{article.description}</p>
                <time className="text-xs text-gray-400 mt-2 block">{article.date}</time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
