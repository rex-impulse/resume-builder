import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

Font.register({
  family: 'JetBrainsMono',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@2.304/fonts/ttf/JetBrainsMono-Regular.ttf', fontWeight: 400 },
    { src: 'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@2.304/fonts/ttf/JetBrainsMono-Bold.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf', fontWeight: 600 },
  ],
});

const GREEN = '#059669';

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Inter', fontSize: 10, color: '#1a1a1a', lineHeight: 1.5 },
  name: { fontSize: 24, fontWeight: 600, marginBottom: 4 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16, fontSize: 9, color: '#666' },
  section: { marginTop: 16 },
  sectionTitle: { fontFamily: 'JetBrainsMono', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: GREEN, marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#e5e5e5' },
  commentStyle: { fontFamily: 'JetBrainsMono', fontSize: 8, color: '#999', marginBottom: 6 },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expTitle: { fontSize: 10, fontWeight: 600 },
  expCompany: { fontSize: 10, color: '#555' },
  expDate: { fontFamily: 'JetBrainsMono', fontSize: 8, color: GREEN, backgroundColor: '#f0fdf4', padding: '2 6', borderRadius: 2 },
  bullet: { flexDirection: 'row', marginBottom: 2, paddingLeft: 8 },
  bulletDot: { fontFamily: 'JetBrainsMono', width: 14, fontSize: 9, color: GREEN },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333' },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillTag: { fontFamily: 'JetBrainsMono', fontSize: 8, color: GREEN, backgroundColor: '#f0fdf4', padding: '3 8', borderRadius: 2, borderWidth: 0.5, borderColor: '#d1fae5' },
  link: { color: GREEN, textDecoration: 'none', fontFamily: 'JetBrainsMono', fontSize: 8 },
});

export default function TechnicalPdf({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, certifications, languages, projects } = data;
  const pageSize = data.paperSize === 'letter' ? 'LETTER' : 'A4';

  return (
    <Document>
      <Page size={pageSize} style={s.page}>
        <Text style={s.name}>{personal.fullName || 'Your Name'}</Text>
        <View style={s.contactRow}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
          {personal.linkedinUrl && <Link src={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} style={s.link}>{personal.linkedinUrl}</Link>}
          {personal.portfolioUrl && <Link src={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} style={s.link}>{personal.portfolioUrl}</Link>}
        </View>

        {summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// ABOUT'}</Text>
            <Text style={{ fontSize: 10, color: '#444', lineHeight: 1.6 }}>{summary}</Text>
          </View>
        )}

        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// TECH STACK'}</Text>
            <View style={s.skillsGrid}>
              {skills.map((skill, i) => (
                <Text key={i} style={s.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {experience.some(e => e.jobTitle || e.company) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// EXPERIENCE'}</Text>
            {experience.filter(e => e.jobTitle || e.company).map((exp) => (
              <View key={exp.id} style={s.expBlock}>
                <View style={s.expHeader}>
                  <View>
                    <Text style={s.expTitle}>{exp.jobTitle}</Text>
                    <Text style={s.expCompany}>{exp.company}</Text>
                  </View>
                  <Text style={s.expDate}>{exp.startDate}{exp.startDate && (exp.endDate || exp.isPresent) ? ' → ' : ''}{exp.isPresent ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.bullets.filter(b => b).map((bullet, bi) => (
                  <View key={bi} style={s.bullet}>
                    <Text style={s.bulletDot}>→</Text>
                    <Text style={s.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.some(e => e.school) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// EDUCATION'}</Text>
            {education.filter(e => e.school).map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{edu.school}</Text>
                  <Text style={s.expDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={s.expCompany}>
                  {edu.degree}{edu.degree && edu.fieldOfStudy ? ' in ' : ''}{edu.fieldOfStudy}
                  {edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.showProjects && projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// PROJECTS'}</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <Text style={s.expTitle}>{proj.name}</Text>
                {proj.url && <Link src={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} style={s.link}>{proj.url}</Link>}
                {proj.description && <Text style={{ fontSize: 9.5, color: '#444', marginTop: 2 }}>{proj.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && certifications.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// CERTIFICATIONS'}</Text>
            {certifications.map((cert) => (
              <Text key={cert.id} style={{ fontSize: 10, marginBottom: 3 }}>
                {cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
              </Text>
            ))}
          </View>
        )}

        {data.showLanguages && languages.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>{'// LANGUAGES'}</Text>
            <Text style={{ fontSize: 10, color: '#444' }}>{languages.join('  •  ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
