'use client';

import { ResumeData, Experience, Education, Certification, Project } from '@/lib/types';
import { useCallback } from 'react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white"
      />
    </div>
  );
}

export default function ResumeForm({ data, onChange }: Props) {
  const update = useCallback((partial: Partial<ResumeData>) => {
    onChange({ ...data, ...partial });
  }, [data, onChange]);

  const updatePersonal = (key: keyof ResumeData['personal'], value: string) => {
    update({ personal: { ...data.personal, [key]: value } });
  };

  const addExperience = () => {
    update({
      experience: [...data.experience, {
        id: crypto.randomUUID(), company: '', jobTitle: '', startDate: '', endDate: '', isPresent: false, bullets: [''],
      }],
    });
  };

  const updateExperience = (index: number, exp: Experience) => {
    const next = [...data.experience];
    next[index] = exp;
    update({ experience: next });
  };

  const removeExperience = (index: number) => {
    update({ experience: data.experience.filter((_, i) => i !== index) });
  };

  const addEducation = () => {
    update({
      education: [...data.education, {
        id: crypto.randomUUID(), school: '', degree: '', fieldOfStudy: '', graduationDate: '', gpa: '', honors: '',
      }],
    });
  };

  const updateEducation = (index: number, edu: Education) => {
    const next = [...data.education];
    next[index] = edu;
    update({ education: next });
  };

  const removeEducation = (index: number) => {
    update({ education: data.education.filter((_, i) => i !== index) });
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !data.skills.includes(skill.trim())) {
      update({ skills: [...data.skills, skill.trim()] });
    }
  };

  const removeSkill = (index: number) => {
    update({ skills: data.skills.filter((_, i) => i !== index) });
  };

  const addCertification = () => {
    update({
      certifications: [...data.certifications, { id: crypto.randomUUID(), name: '', issuer: '', date: '' }],
    });
  };

  const addProject = () => {
    update({
      projects: [...data.projects, { id: crypto.randomUUID(), name: '', description: '', url: '' }],
    });
  };

  const addLanguage = (lang: string) => {
    if (lang.trim() && !data.languages.includes(lang.trim())) {
      update({ languages: [...data.languages, lang.trim()] });
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Personal Info */}
      <section>
        <SectionHeader title="Personal Information" />
        <div className="space-y-3">
          <Input label="Full Name" value={data.personal.fullName} onChange={(v) => updatePersonal('fullName', v)} placeholder="John Doe" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Email" value={data.personal.email} onChange={(v) => updatePersonal('email', v)} placeholder="john@example.com" type="email" />
            <Input label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="+1 (555) 000-0000" />
          </div>
          <Input label="Location" value={data.personal.location} onChange={(v) => updatePersonal('location', v)} placeholder="San Francisco, CA" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="LinkedIn URL" value={data.personal.linkedinUrl} onChange={(v) => updatePersonal('linkedinUrl', v)} placeholder="linkedin.com/in/johndoe" />
            <Input label="Portfolio URL" value={data.personal.portfolioUrl} onChange={(v) => updatePersonal('portfolioUrl', v)} placeholder="johndoe.com" />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section>
        <SectionHeader title="Professional Summary" />
        <textarea
          value={data.summary}
          onChange={(e) => update({ summary: e.target.value })}
          placeholder="A brief 2-3 sentence summary of your professional background and key strengths..."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white resize-none"
        />
      </section>

      {/* Experience */}
      <section>
        <SectionHeader title="Experience">
          <button onClick={addExperience} className="text-xs text-blue-600 hover:text-blue-700 font-medium">+ Add</button>
        </SectionHeader>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="border border-gray-200 rounded-md p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-400">#{i + 1}</span>
                {data.experience.length > 1 && (
                  <button onClick={() => removeExperience(i)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Job Title" value={exp.jobTitle} onChange={(v) => updateExperience(i, { ...exp, jobTitle: v })} placeholder="Software Engineer" />
                <Input label="Company" value={exp.company} onChange={(v) => updateExperience(i, { ...exp, company: v })} placeholder="Google" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(i, { ...exp, startDate: v })} placeholder="Jan 2022" />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                  <div className="flex items-center gap-2">
                    {!exp.isPresent && (
                      <input
                        value={exp.endDate}
                        onChange={(e) => updateExperience(i, { ...exp, endDate: e.target.value })}
                        placeholder="Dec 2023"
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                    )}
                    <label className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={exp.isPresent}
                        onChange={(e) => updateExperience(i, { ...exp, isPresent: e.target.checked, endDate: '' })}
                        className="rounded"
                      />
                      Present
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bullet Points</label>
                <div className="space-y-2">
                  {exp.bullets.map((bullet, bi) => (
                    <div key={bi} className="flex gap-2">
                      <span className="text-gray-300 mt-2 text-sm">•</span>
                      <input
                        value={bullet}
                        onChange={(e) => {
                          const bullets = [...exp.bullets];
                          bullets[bi] = e.target.value;
                          updateExperience(i, { ...exp, bullets });
                        }}
                        placeholder="Describe your achievement..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                      {exp.bullets.length > 1 && (
                        <button
                          onClick={() => {
                            const bullets = exp.bullets.filter((_, j) => j !== bi);
                            updateExperience(i, { ...exp, bullets });
                          }}
                          className="text-gray-300 hover:text-red-500 text-sm px-1"
                        >×</button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => updateExperience(i, { ...exp, bullets: [...exp.bullets, ''] })}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >+ Add bullet</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionHeader title="Education">
          <button onClick={addEducation} className="text-xs text-blue-600 hover:text-blue-700 font-medium">+ Add</button>
        </SectionHeader>
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div key={edu.id} className="border border-gray-200 rounded-md p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-400">#{i + 1}</span>
                {data.education.length > 1 && (
                  <button onClick={() => removeEducation(i)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                )}
              </div>
              <Input label="School" value={edu.school} onChange={(v) => updateEducation(i, { ...edu, school: v })} placeholder="Stanford University" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(i, { ...edu, degree: v })} placeholder="Bachelor of Science" />
                <Input label="Field of Study" value={edu.fieldOfStudy} onChange={(v) => updateEducation(i, { ...edu, fieldOfStudy: v })} placeholder="Computer Science" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input label="Graduation Date" value={edu.graduationDate} onChange={(v) => updateEducation(i, { ...edu, graduationDate: v })} placeholder="May 2022" />
                <Input label="GPA (optional)" value={edu.gpa} onChange={(v) => updateEducation(i, { ...edu, gpa: v })} placeholder="3.8" />
                <Input label="Honors (optional)" value={edu.honors} onChange={(v) => updateEducation(i, { ...edu, honors: v })} placeholder="Cum Laude" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeader title="Skills" />
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {skill}
              <button onClick={() => removeSkill(i)} className="text-gray-400 hover:text-red-500">×</button>
            </span>
          ))}
        </div>
        <input
          placeholder="Type a skill and press Enter..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
      </section>

      {/* Optional Sections Toggle */}
      <section>
        <SectionHeader title="Optional Sections" />
        <div className="space-y-2">
          {([
            ['showCertifications', 'Certifications'] as const,
            ['showLanguages', 'Languages'] as const,
            ['showProjects', 'Projects'] as const,
          ]).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={data[key]}
                onChange={(e) => update({ [key]: e.target.checked })}
                className="rounded"
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {/* Certifications */}
      {data.showCertifications && (
        <section>
          <SectionHeader title="Certifications">
            <button onClick={addCertification} className="text-xs text-blue-600 hover:text-blue-700 font-medium">+ Add</button>
          </SectionHeader>
          <div className="space-y-3">
            {data.certifications.map((cert, i) => (
              <div key={cert.id} className="border border-gray-200 rounded-md p-3 space-y-2">
                <div className="flex justify-between">
                  <Input label="Certification" value={cert.name} onChange={(v) => {
                    const next = [...data.certifications]; next[i] = { ...cert, name: v }; update({ certifications: next });
                  }} placeholder="AWS Solutions Architect" />
                  <button onClick={() => update({ certifications: data.certifications.filter((_, j) => j !== i) })} className="text-xs text-red-500 ml-2 mt-5">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Issuer" value={cert.issuer} onChange={(v) => {
                    const next = [...data.certifications]; next[i] = { ...cert, issuer: v }; update({ certifications: next });
                  }} placeholder="Amazon" />
                  <Input label="Date" value={cert.date} onChange={(v) => {
                    const next = [...data.certifications]; next[i] = { ...cert, date: v }; update({ certifications: next });
                  }} placeholder="2023" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.showLanguages && (
        <section>
          <SectionHeader title="Languages" />
          <div className="flex flex-wrap gap-2 mb-2">
            {data.languages.map((lang, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                {lang}
                <button onClick={() => update({ languages: data.languages.filter((_, j) => j !== i) })} className="text-gray-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
          <input
            placeholder="Type a language and press Enter..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addLanguage((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </section>
      )}

      {/* Projects */}
      {data.showProjects && (
        <section>
          <SectionHeader title="Projects">
            <button onClick={addProject} className="text-xs text-blue-600 hover:text-blue-700 font-medium">+ Add</button>
          </SectionHeader>
          <div className="space-y-3">
            {data.projects.map((proj, i) => (
              <div key={proj.id} className="border border-gray-200 rounded-md p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <Input label="Project Name" value={proj.name} onChange={(v) => {
                    const next = [...data.projects]; next[i] = { ...proj, name: v }; update({ projects: next });
                  }} placeholder="My Project" />
                  <button onClick={() => update({ projects: data.projects.filter((_, j) => j !== i) })} className="text-xs text-red-500 ml-2 mt-5">Remove</button>
                </div>
                <Input label="URL" value={proj.url} onChange={(v) => {
                  const next = [...data.projects]; next[i] = { ...proj, url: v }; update({ projects: next });
                }} placeholder="github.com/user/project" />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => {
                      const next = [...data.projects]; next[i] = { ...proj, description: e.target.value }; update({ projects: next });
                    }}
                    placeholder="Brief description..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
