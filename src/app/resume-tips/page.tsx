import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Writing Tips — How to Write a Resume That Gets Interviews',
  description: 'Expert resume writing tips for 2025. Learn how to write a professional resume with actionable advice on formatting, content, keywords, and common mistakes to avoid.',
  alternates: { canonical: 'https://resume.impulsestudios.cc/resume-tips' },
};

export default function ResumeTipsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
          <div className="flex items-center gap-6">
            <Link href="/resume-examples" className="text-sm text-gray-500 hover:text-gray-700">Examples</Link>
            <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700">Templates</Link>
            <Link href="/editor" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Build Resume →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Resume Writing Tips</h1>
          <p className="text-base text-gray-500">
            Everything you need to know to write a resume that gets past ATS filters and impresses hiring managers.
          </p>
        </div>

        <article className="prose-sm">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Start With a Strong Professional Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Your professional summary is the first thing recruiters read. In 2-3 sentences, communicate who you are, what you bring, and what you&apos;re looking for. Avoid generic statements like &ldquo;hardworking team player.&rdquo; Instead, lead with specifics: years of experience, key skills, and measurable achievements.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              For example: &ldquo;Product manager with 5 years of experience in B2B SaaS, specializing in growth strategy and user retention. Led cross-functional teams that increased annual recurring revenue by $3M.&rdquo; This immediately tells the recruiter your level, domain, and impact.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Quantify Your Achievements</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Numbers are the most powerful tool on a resume. Instead of saying &ldquo;improved sales,&rdquo; write &ldquo;increased quarterly sales by 35% ($420K) through a targeted outbound strategy.&rdquo; Quantified achievements give recruiters concrete evidence of your impact.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Think about: revenue generated, costs saved, team size managed, users served, projects delivered, efficiency improvements (as percentages), and customer satisfaction scores. Even non-sales roles can quantify — a designer might say &ldquo;redesigned onboarding flow, reducing drop-off by 28%.&rdquo;
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Tailor Your Resume for Each Job</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Sending the same resume to every job is one of the most common mistakes. Study the job description carefully: identify the key skills, qualifications, and keywords the employer uses. Then mirror that language in your resume — not by lying, but by emphasizing the most relevant parts of your experience.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Most companies use Applicant Tracking Systems (ATS) that scan for keyword matches. If the job description says &ldquo;project management&rdquo; and your resume says &ldquo;managed projects,&rdquo; you might not get flagged. Use the exact phrasing from the listing where it honestly applies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Use Clean, ATS-Friendly Formatting</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Fancy designs with columns, graphics, and custom fonts can break ATS parsing. Stick with a clean, single-column layout (or a simple two-column design). Use standard section headings: &ldquo;Experience,&rdquo; &ldquo;Education,&rdquo; &ldquo;Skills.&rdquo; Avoid headers, footers, tables, and text boxes in Word documents.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              PDF format is generally safest for preserving layout. Use a readable font size (10-12pt for body text) and maintain consistent spacing. White space is your friend — a cramped resume is harder to scan quickly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Choose the Right Resume Format</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              There are three main resume formats: reverse-chronological (most common and recommended), functional (skills-based, useful for career changers), and combination (hybrid of both). For most job seekers, reverse-chronological is the safest choice — recruiters are familiar with it and ATS systems parse it reliably.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              List your most recent position first and work backward. Include company name, job title, dates of employment, and 3-5 bullet points describing your responsibilities and achievements. Focus on accomplishments over duties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Keep It Concise</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Recruiters spend an average of 6-7 seconds on an initial resume scan. Every line must earn its place. One page is ideal for candidates with less than 10 years of experience. Two pages are acceptable for senior professionals, but only if every section adds clear value.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cut filler phrases like &ldquo;responsible for&rdquo; and &ldquo;duties included.&rdquo; Start each bullet with a strong action verb: led, built, designed, increased, reduced, launched, managed. Remove outdated experience (15+ years old) unless it&apos;s directly relevant.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Include a Skills Section</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              A dedicated skills section helps ATS systems find keyword matches and gives recruiters a quick snapshot of your capabilities. List hard skills (programming languages, tools, certifications) separately from soft skills. Be honest — only list skills you can demonstrate in an interview.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Group related skills together for readability. For technical roles, consider organizing by category: &ldquo;Languages: Python, JavaScript, SQL&rdquo; and &ldquo;Tools: AWS, Docker, Git.&rdquo; Avoid listing basic skills like &ldquo;Microsoft Word&rdquo; unless the job explicitly requires it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Common Mistakes to Avoid</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-gray-400">•</span>Typos and grammatical errors — proofread twice, then have someone else read it</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Using an unprofessional email address</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Including irrelevant personal information (age, marital status, photo in most countries)</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Listing every job you&apos;ve ever had instead of the most relevant ones</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Using the same generic resume for every application</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Writing in first person (&ldquo;I managed&rdquo;) — use implied first person (&ldquo;Managed&rdquo;)</li>
              <li className="flex gap-2"><span className="text-gray-400">•</span>Forgetting to include your LinkedIn profile URL</li>
            </ul>
          </section>
        </article>

        {/* CTA */}
        <section className="mt-8 text-center py-10 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Put these tips into action</h2>
          <p className="text-sm text-gray-500 mb-6">Build a professional, ATS-friendly resume in minutes with our free builder.</p>
          <Link href="/editor" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Start Building — Free
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">What is the best resume format in 2025?</h3>
              <p className="text-sm text-gray-500">The reverse-chronological format remains the gold standard. It&apos;s what recruiters expect and what ATS systems parse most reliably. List your most recent experience first.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Should I use a resume template?</h3>
              <p className="text-sm text-gray-500">Yes — a well-designed template ensures consistent formatting and professional appearance. Just make sure it&apos;s ATS-friendly (avoid complex graphics and non-standard layouts).</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">How do I make my resume ATS-friendly?</h3>
              <p className="text-sm text-gray-500">Use standard section headings, avoid tables and text boxes, include keywords from the job description, and save as PDF. Our templates are designed to be fully ATS-compatible.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Do I need a cover letter?</h3>
              <p className="text-sm text-gray-500">If the job posting asks for one, absolutely. Even when optional, a strong cover letter can differentiate you from other candidates. Check our <Link href="/cover-letter" className="text-gray-900 underline">cover letter guide</Link> for tips.</p>
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
