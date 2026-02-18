import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

Font.register({
  family: 'Times',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf', fontWeight: 400 },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times New Roman Bold.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf', fontWeight: 600 },
  ],
});

const NAVY = '#1e3a5f';

const s = StyleSheet.create({
  page: { padding: 44, fontFamily: 'Times', fontSize: 10.5, color: '#1a1a1a', lineHeight: 1.5 },
  name: { fontSize: 28, fontWeight: 700, color: NAVY, textAlign: 'center', marginBottom: 4 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 4, fontSize: 9, color: '#666', fontFamily: 'Inter' },
  hr: { borderBottomWidth: 1.5, borderBottomColor: NAVY, marginTop: 12, marginBottom: 4 },
  hrThin: { borderBottomWidth: 0.5, borderBottomColor: '#ddd', marginTop: 8, marginBottom: 8 },
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: NAVY, marginBottom: 8 },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expTitle: { fontSize: 11, fontWeight: 700 },
  expCompany: { fontSize: 10, color: '#555', fontStyle: 'italic' },
  expDate: { fontSize: 9, color: '#888', fontFamily: 'Inter' },
  bullet: { flexDirection: 'row', marginBottom: 2, paddingLeft: 8 },
  bulletDot: { width: 12, fontSize: 10, color: NAVY },
  bulletText: { flex: 1, fontSize: 10, color: '#333' },
  skills: { fontSize: 10, color: '#444', lineHeight: 1.8 },
});

export default function ExecutivePdf({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, certifications, languages, projects } = data;
  const pageSize = data.paperSize === 'letter' ? 'LETTER' : 'A4';

  return (
    <Document>
      <Page size={pageSize} style={s.page}>
        <Text style={s.name}>{personal.fullName || 'Your Name'}</Text>
        <View style={s.contactRow}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((item, i, arr) => (
            <Text key={i}>{item}{i < arr.length - 1 ? '  |' : ''}</Text>
          ))}
        </View>
        <View style={s.hr} />

        {summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Executive Summary</Text>
            <Text style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>{summary}</Text>
          </View>
        )}

        {experience.some(e => e.jobTitle || e.company) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Professional Experience</Text>
            {experience.filter(e => e.jobTitle || e.company).map((exp, i) => (
              <View key={exp.id}>
                {i > 0 && <View style={s.hrThin} />}
                <View style={s.expBlock}>
                  <View style={s.expHeader}>
                    <Text style={s.expTitle}>{exp.jobTitle}</Text>
                    <Text style={s.expDate}>{exp.startDate}{exp.startDate && (exp.endDate || exp.isPresent) ? ' — ' : ''}{exp.isPresent ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={s.expCompany}>{exp.company}</Text>
                  {exp.bullets.filter(b => b).map((bullet, bi) => (
                    <View key={bi} style={s.bullet}>
                      <Text style={s.bulletDot}>■</Text>
                      <Text style={s.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {education.some(e => e.school) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {education.filter(e => e.school).map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{edu.school}</Text>
                  <Text style={s.expDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={s.expCompany}>
                  {edu.degree}{edu.degree && edu.fieldOfStudy ? ' in ' : ''}{edu.fieldOfStudy}
                  {edu.gpa ? ` — GPA: ${edu.gpa}` : ''}{edu.honors ? ` — ${edu.honors}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Core Competencies</Text>
            <Text style={s.skills}>{skills.join('  •  ')}</Text>
          </View>
        )}

        {data.showCertifications && certifications.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <Text key={cert.id} style={{ fontSize: 10, marginBottom: 3 }}>
                {cert.name}{cert.issuer ? `, ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
              </Text>
            ))}
          </View>
        )}

        {data.showLanguages && languages.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Languages</Text>
            <Text style={s.skills}>{languages.join('  •  ')}</Text>
          </View>
        )}

        {data.showProjects && projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Key Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={s.expTitle}>{proj.name}</Text>
                {proj.description && <Text style={{ fontSize: 10, color: '#444', marginTop: 2 }}>{proj.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
