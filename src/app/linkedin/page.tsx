'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeData, createDefaultResume } from '@/lib/types';

interface ParsedData {
  fullName: string;
  headline: string;
  location: string;
  email: string;
  experience: { company: string; jobTitle: string; startDate: string; endDate: string; bullets: string[] }[];
  education: { school: string; degree: string; fieldOfStudy: string; graduationDate: string }[];
  skills: string[];
}

function parseLinkedInText(text: string): ParsedData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const result: ParsedData = {
    fullName: '',
    headline: '',
    location: '',
    email: '',
    experience: [],
    education: [],
    skills: [],
  };

  if (lines.length === 0) return result;

  // First line is usually the name
  result.fullName = lines[0] || '';
  // Second line is often headline
  if (lines.length > 1) result.headline = lines[1] || '';
  // Look for location patterns
  for (const line of lines.slice(0, 10)) {
    if (/,\s*(united states|usa|uk|canada|australia|germany|france|india|[A-Z]{2})/i.test(line) || /\b\d{5}\b/.test(line)) {
      result.location = line;
      break;
    }
  }

  // Find experience section
  const expHeaders = ['experience', 'work experience', 'professional experience'];
  const eduHeaders = ['education'];
  const skillHeaders = ['skills', 'top skills', 'skills & endorsements'];

  let currentSection = '';
  let currentExp: { company: string; jobTitle: string; startDate: string; endDate: string; bullets: string[] } | null = null;
  let currentEdu: { school: string; degree: string; fieldOfStudy: string; graduationDate: string } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    // Detect section headers
    if (expHeaders.includes(lower)) { currentSection = 'experience'; continue; }
    if (eduHeaders.includes(lower)) {
      if (currentExp) { result.experience.push(currentExp); currentExp = null; }
      currentSection = 'education'; continue;
    }
    if (skillHeaders.includes(lower)) {
      if (currentExp) { result.experience.push(currentExp); currentExp = null; }
      if (currentEdu) { result.education.push(currentEdu); currentEdu = null; }
      currentSection = 'skills'; continue;
    }

    // Detect new sections that end current parsing
    if (['licenses & certifications', 'certifications', 'volunteer', 'publications', 'honors', 'languages', 'interests', 'recommendations', 'courses', 'projects'].includes(lower)) {
      if (currentExp) { result.experience.push(currentExp); currentExp = null; }
      if (currentEdu) { result.education.push(currentEdu); currentEdu = null; }
      currentSection = '';
      continue;
    }

    if (currentSection === 'experience') {
      // Date pattern: "Jan 2020 - Present" or "2020 - 2023" etc.
      const dateMatch = line.match(/(\w+\s+\d{4}|\d{4})\s*[-–]\s*(\w+\s+\d{4}|\d{4}|present|current)/i);
      if (dateMatch) {
        if (currentExp) result.experience.push(currentExp);
        // Previous line might be job title, line before that company
        const jobTitle = i > 0 ? lines[i - 1] : '';
        const company = i > 1 ? lines[i - 2] : '';
        currentExp = {
          company: company,
          jobTitle: jobTitle,
          startDate: dateMatch[1],
          endDate: dateMatch[2],
          bullets: [],
        };
      } else if (currentExp && (line.startsWith('•') || line.startsWith('-') || line.startsWith('·'))) {
        currentExp.bullets.push(line.replace(/^[•\-·]\s*/, ''));
      } else if (currentExp && line.length > 20 && !dateMatch) {
        // Might be a bullet without a marker
        currentExp.bullets.push(line);
      }
    }

    if (currentSection === 'education') {
      // Simple heuristic: first line after header = school, next = degree
      if (!currentEdu) {
        currentEdu = { school: line, degree: '', fieldOfStudy: '', graduationDate: '' };
      } else if (!currentEdu.degree) {
        currentEdu.degree = line;
      } else {
        const yearMatch = line.match(/\d{4}/);
        if (yearMatch) {
          currentEdu.graduationDate = yearMatch[0];
          result.education.push(currentEdu);
          currentEdu = null;
        } else if (line.length < 60) {
          currentEdu.fieldOfStudy = line;
        }
      }
    }

    if (currentSection === 'skills') {
      // Skills are often one per line or separated by · or ,
      if (line.includes('·')) {
        result.skills.push(...line.split('·').map(s => s.trim()).filter(Boolean));
      } else if (line.includes(',')) {
        result.skills.push(...line.split(',').map(s => s.trim()).filter(Boolean));
      } else if (line.length < 50) {
        result.skills.push(line);
      }
    }
  }

  if (currentExp) result.experience.push(currentExp);
  if (currentEdu) result.education.push(currentEdu);

  // Deduplicate skills
  result.skills = Array.from(new Set(result.skills)).slice(0, 20);

  return result;
}

function convertToResumeData(parsed: ParsedData): ResumeData {
  const resume = createDefaultResume();
  resume.personal.fullName = parsed.fullName;
  resume.personal.location = parsed.location;
  resume.personal.email = parsed.email;
  resume.summary = parsed.headline;
  resume.skills = parsed.skills;

  if (parsed.experience.length > 0) {
    resume.experience = parsed.experience.map(exp => ({
      id: crypto.randomUUID(),
      company: exp.company,
      jobTitle: exp.jobTitle,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isPresent: /present|current/i.test(exp.endDate),
      bullets: exp.bullets.length > 0 ? exp.bullets : [''],
    }));
  }

  if (parsed.education.length > 0) {
    resume.education = parsed.education.map(edu => ({
      id: crypto.randomUUID(),
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      graduationDate: edu.graduationDate,
      gpa: '',
      honors: '',
    }));
  }

  return resume;
}

export default function LinkedInImportPage() {
  const router = useRouter();
  const [profileUrl, setProfileUrl] = useState('');
  const [profileText, setProfileText] = useState('');
  const [parsed, setParsed] = useState<ParsedData | null>(null);
  const [error, setError] = useState('');

  const handleParse = () => {
    if (!profileText.trim()) {
      setError('Please paste your LinkedIn profile text.');
      return;
    }
    setError('');
    const result = parseLinkedInText(profileText);
    setParsed(result);
  };

  const handleUseData = () => {
    if (!parsed) return;
    const resumeData = convertToResumeData(parsed);
    localStorage.setItem('resume-builder-data', JSON.stringify(resumeData));
    router.push('/editor');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-gray-900">Resume Builder</Link>
          <div className="flex items-center gap-6">
            <Link href="/templates" className="text-sm text-gray-500 hover:text-gray-700">Templates</Link>
            <Link href="/editor" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Build Resume →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Import from LinkedIn</h1>
          <p className="text-base text-gray-500">
            Quickly populate your resume with data from your LinkedIn profile. Copy your profile text and paste it below.
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 border border-gray-200 rounded-md p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">How to copy your LinkedIn profile text</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-medium rounded flex-shrink-0">1</div>
              <p className="text-sm text-gray-600">Go to your LinkedIn profile page</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-medium rounded flex-shrink-0">2</div>
              <p className="text-sm text-gray-600">Click &ldquo;More&rdquo; → &ldquo;Save to PDF&rdquo; or select all text on the page (Ctrl+A / Cmd+A) and copy it</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-medium rounded flex-shrink-0">3</div>
              <p className="text-sm text-gray-600">Paste the copied text into the textarea below</p>
            </div>
          </div>
        </div>

        {!parsed ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="linkedin-url"
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              />
              <p className="mt-1 text-xs text-gray-400">We can&apos;t scrape LinkedIn directly. Please paste your profile text below instead.</p>
            </div>

            <div>
              <label htmlFor="linkedin-text" className="block text-sm font-medium text-gray-700 mb-1">
                Paste your LinkedIn profile text here
              </label>
              <textarea
                id="linkedin-text"
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
                rows={16}
                placeholder={"John Doe\nSenior Software Engineer at Acme Corp\nSan Francisco, CA\n\nExperience\n\nAcme Corp\nSenior Software Engineer\nJan 2022 - Present\n• Led development of microservices platform\n• Reduced API latency by 40%\n\nEducation\n\nMIT\nB.S. Computer Science\n2018\n\nSkills\nReact · Node.js · Python · AWS"}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 font-mono"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              onClick={handleParse}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Parse &amp; Import
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Parsed Data Preview</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Name</h3>
                  <p className="text-sm text-gray-900">{parsed.fullName || '—'}</p>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Headline / Summary</h3>
                  <p className="text-sm text-gray-900">{parsed.headline || '—'}</p>
                </div>

                {parsed.location && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Location</h3>
                    <p className="text-sm text-gray-900">{parsed.location}</p>
                  </div>
                )}

                {parsed.experience.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Experience ({parsed.experience.length})</h3>
                    <div className="space-y-3">
                      {parsed.experience.map((exp, i) => (
                        <div key={i} className="border-l-2 border-gray-200 pl-3">
                          <p className="text-sm font-medium text-gray-900">{exp.jobTitle}</p>
                          <p className="text-sm text-gray-500">{exp.company} · {exp.startDate} – {exp.endDate}</p>
                          {exp.bullets.length > 0 && (
                            <ul className="mt-1 space-y-0.5">
                              {exp.bullets.slice(0, 3).map((b, j) => (
                                <li key={j} className="text-xs text-gray-600">• {b}</li>
                              ))}
                              {exp.bullets.length > 3 && <li className="text-xs text-gray-400">+ {exp.bullets.length - 3} more</li>}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsed.education.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Education ({parsed.education.length})</h3>
                    <div className="space-y-2">
                      {parsed.education.map((edu, i) => (
                        <div key={i} className="border-l-2 border-gray-200 pl-3">
                          <p className="text-sm font-medium text-gray-900">{edu.school}</p>
                          <p className="text-sm text-gray-500">{[edu.degree, edu.fieldOfStudy, edu.graduationDate].filter(Boolean).join(' · ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsed.skills.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Skills ({parsed.skills.length})</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {parsed.skills.map((skill) => (
                        <span key={skill} className="text-xs text-gray-700 border border-gray-200 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUseData}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Use This Data →
              </button>
              <button
                onClick={() => setParsed(null)}
                className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Back to Edit
              </button>
            </div>
          </div>
        )}
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
