import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf', fontWeight: 600 },
  ],
});

const s = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Inter', fontSize: 10, color: '#1a1a1a', lineHeight: 1.6 },
  name: { fontSize: 26, fontWeight: 400, letterSpacing: 2, marginBottom: 6, textAlign: 'center' },
  contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24, fontSize: 9, color: '#888' },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, color: '#888' },
  expBlock: { marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expTitle: { fontSize: 10, fontWeight: 500 },
  expSub: { fontSize: 9.5, color: '#666', marginBottom: 3 },
  expDate: { fontSize: 9, color: '#aaa' },
  bullet: { flexDirection: 'row', marginBottom: 2, paddingLeft: 4 },
  bulletDot: { width: 10, fontSize: 10, color: '#ccc' },
  bulletText: { flex: 1, fontSize: 9.5, color: '#444' },
  skills: { fontSize: 10, color: '#444' },
});

export default function MinimalPdf({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, certifications, languages, projects } = data;
  const pageSize = data.paperSize === 'letter' ? 'LETTER' : 'A4';

  return (
    <Document>
      <Page size={pageSize} style={s.page}>
        <Text style={s.name}>{(personal.fullName || 'Your Name').toUpperCase()}</Text>
        <View style={s.contactRow}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((item, i) => (
            <Text key={i}>{item}</Text>
          ))}
        </View>

        {summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>About</Text>
            <Text style={{ fontSize: 10, color: '#444' }}>{summary}</Text>
          </View>
        )}

        {experience.some(e => e.jobTitle || e.company) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experience</Text>
            {experience.filter(e => e.jobTitle || e.company).map((exp) => (
              <View key={exp.id} style={s.expBlock}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{exp.jobTitle}{exp.company ? `, ${exp.company}` : ''}</Text>
                  <Text style={s.expDate}>{exp.startDate}{exp.startDate && (exp.endDate || exp.isPresent) ? ' — ' : ''}{exp.isPresent ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.bullets.filter(b => b).map((bullet, bi) => (
                  <View key={bi} style={s.bullet}>
                    <Text style={s.bulletDot}>—</Text>
                    <Text style={s.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.some(e => e.school) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {education.filter(e => e.school).map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{edu.school}</Text>
                  <Text style={s.expDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={s.expSub}>
                  {edu.degree}{edu.degree && edu.fieldOfStudy ? ' in ' : ''}{edu.fieldOfStudy}
                  {edu.gpa ? ` — GPA: ${edu.gpa}` : ''}{edu.honors ? ` — ${edu.honors}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills</Text>
            <Text style={s.skills}>{skills.join('  ·  ')}</Text>
          </View>
        )}

        {data.showLanguages && languages.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Languages</Text>
            <Text style={s.skills}>{languages.join('  ·  ')}</Text>
          </View>
        )}

        {data.showCertifications && certifications.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <Text key={cert.id} style={{ fontSize: 10, color: '#444', marginBottom: 3 }}>
                {cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}{cert.date ? `, ${cert.date}` : ''}
              </Text>
            ))}
          </View>
        )}

        {data.showProjects && projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={s.expTitle}>{proj.name}</Text>
                {proj.description && <Text style={{ fontSize: 9.5, color: '#666', marginTop: 2 }}>{proj.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
