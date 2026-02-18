import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cover Letter Guide — How to Write a Cover Letter That Gets Read',
  description: 'Learn how to write an effective cover letter with templates, examples, and expert tips. Complement your resume and stand out from other applicants.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/cover-letter' },
};

export default function CoverLetterPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
          <div className="flex items-center gap-6">
            <Link href="/resume-tips" className="text-sm text-gray-500 hover:text-gray-700">Tips</Link>
            <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700">Templates</Link>
            <Link href="/editor" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Build Resume →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Cover Letter Guide</h1>
          <p className="text-base text-gray-500">
            A strong cover letter complements your resume and gives you a chance to show personality, explain gaps, and make a direct case for why you&apos;re the right fit.
          </p>
        </div>

        <article>
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Cover Letters Still Matter</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              While some hiring managers skip them, many still read cover letters — especially for competitive roles. A well-written cover letter can be the difference between getting an interview and getting passed over. It&apos;s your chance to tell a story that a resume can&apos;t.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Use your cover letter to explain why you want this specific role at this specific company. Generic cover letters are worse than no cover letter at all. Research the company, reference their mission or recent work, and connect it to your experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter Structure</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Keep your cover letter to one page with 3-4 paragraphs:
            </p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Opening Paragraph</h3>
                <p className="text-sm text-gray-500">State the position you&apos;re applying for and one compelling reason you&apos;re a strong fit. Hook the reader immediately. Avoid &ldquo;I am writing to apply for...&rdquo;</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Body Paragraphs (1-2)</h3>
                <p className="text-sm text-gray-500">Highlight 2-3 relevant achievements that directly relate to the job requirements. Use specific numbers and results. This is where you prove your claims with evidence.</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Closing Paragraph</h3>
                <p className="text-sm text-gray-500">Restate your enthusiasm, mention you&apos;ve attached your resume, and include a clear call to action. Thank them for their time and express interest in discussing the role further.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter Template</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-sm text-gray-700 leading-relaxed space-y-4">
              <p>Dear [Hiring Manager&apos;s Name],</p>
              <p>
                I&apos;m excited to apply for the [Position] role at [Company]. With [X years] of experience in [relevant field], I&apos;ve consistently [key achievement that matches the job]. I&apos;m drawn to [Company] because [specific reason — product, mission, culture].
              </p>
              <p>
                In my current role at [Current Company], I [specific achievement with numbers]. This involved [relevant skill from job description], which directly aligns with what you&apos;re looking for. Previously, I [another relevant achievement] that resulted in [measurable outcome].
              </p>
              <p>
                I&apos;d love the opportunity to bring this experience to [Company] and contribute to [specific goal or project]. I&apos;ve attached my resume for your review and would welcome the chance to discuss how I can add value to your team.
              </p>
              <p>Thank you for your consideration.</p>
              <p>Best regards,<br />[Your Name]</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for a Great Cover Letter</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-gray-400">•</span>Address a specific person whenever possible — &ldquo;Dear Hiring Manager&rdquo; is fine as a fallback</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Keep it under one page (250-400 words is ideal)</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Don&apos;t repeat your resume — expand on 2-3 highlights with context and narrative</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Show you&apos;ve researched the company — mention specific products, values, or news</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Match the tone of the company — formal for finance, slightly casual for startups</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Proofread carefully — typos in a cover letter are more damaging than on a resume</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Save as PDF with a clear filename: &ldquo;FirstName-LastName-Cover-Letter.pdf&rdquo;</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Cover Letter Mistakes</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-gray-400">•</span>Starting with &ldquo;To Whom It May Concern&rdquo; — it signals you didn&apos;t try to find the right person</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Making it all about you — focus on what you can do for the company</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Being too generic — a cover letter that could apply to any company is a wasted opportunity</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Mentioning salary expectations unless specifically asked</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Writing more than one page — respect the reader&apos;s time</li>
            </ul>
          </section>
        </article>

        {/* CTA */}
        <section className="mt-8 text-center py-10 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Build the resume to go with it</h2>
          <p className="text-sm text-gray-500 mb-6">Create a professional, ATS-friendly resume in minutes. Free, no sign-up.</p>
          <Link href="/editor" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Start Building — Free
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Is a cover letter always required?</h3>
              <p className="text-sm text-gray-500">Not always, but it&apos;s recommended whenever the option exists. Some ATS systems penalize applications without a cover letter. When in doubt, include one.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">How long should a cover letter be?</h3>
              <p className="text-sm text-gray-500">Keep it to one page, ideally 250-400 words. Hiring managers are busy — make every sentence count.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Should my cover letter match my resume design?</h3>
              <p className="text-sm text-gray-500">Ideally, yes. Using the same font and header style creates a cohesive application package that looks polished and intentional.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Can I use AI to write my cover letter?</h3>
              <p className="text-sm text-gray-500">AI can help draft a starting point, but always personalize it heavily. Hiring managers can spot generic AI-generated text. Add your own voice, specific examples, and genuine enthusiasm.</p>
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
