import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf', fontWeight: 700 },
  ],
});

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Inter', fontSize: 10, color: '#1a1a1a', lineHeight: 1.5 },
  name: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4, fontSize: 9, color: '#555' },
  contactItem: {},
  separator: { color: '#ccc' },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#e5e5e5', paddingBottom: 4, marginBottom: 8, color: '#1a1a1a' },
  summary: { fontSize: 10, color: '#444', lineHeight: 1.6 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expTitle: { fontSize: 10, fontWeight: 600 },
  expCompany: { fontSize: 10, color: '#555' },
  expDate: { fontSize: 9, color: '#888' },
  bullet: { flexDirection: 'row', marginBottom: 2, paddingLeft: 8 },
  bulletDot: { width: 12, fontSize: 10, color: '#888' },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333' },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillTag: { fontSize: 9, color: '#444', backgroundColor: '#f3f4f6', padding: '3 8', borderRadius: 3 },
  expBlock: { marginBottom: 10 },
  link: { color: '#2563eb', textDecoration: 'none' },
});

export default function CleanModernPdf({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, certifications, languages, projects } = data;
  const pageSize = data.paperSize === 'letter' ? 'LETTER' : 'A4';

  return (
    <Document>
      <Page size={pageSize} style={s.page}>
        {/* Header */}
        <Text style={s.name}>{personal.fullName || 'Your Name'}</Text>
        <View style={s.contactRow}>
          {personal.email && <Text style={s.contactItem}>{personal.email}</Text>}
          {personal.email && personal.phone && <Text style={s.separator}>|</Text>}
          {personal.phone && <Text style={s.contactItem}>{personal.phone}</Text>}
          {personal.phone && personal.location && <Text style={s.separator}>|</Text>}
          {personal.location && <Text style={s.contactItem}>{personal.location}</Text>}
        </View>
        <View style={s.contactRow}>
          {personal.linkedinUrl && <Link src={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} style={s.link}>{personal.linkedinUrl}</Link>}
          {personal.portfolioUrl && <Link src={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} style={s.link}>{personal.portfolioUrl}</Link>}
        </View>

        {/* Summary */}
        {summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Professional Summary</Text>
            <Text style={s.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.some(e => e.jobTitle || e.company) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experience</Text>
            {experience.filter(e => e.jobTitle || e.company).map((exp) => (
              <View key={exp.id} style={s.expBlock}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{exp.jobTitle}</Text>
                  <Text style={s.expDate}>{exp.startDate}{exp.startDate && (exp.endDate || exp.isPresent) ? ' — ' : ''}{exp.isPresent ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={s.expCompany}>{exp.company}</Text>
                {exp.bullets.filter(b => b).map((bullet, bi) => (
                  <View key={bi} style={s.bullet}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.some(e => e.school) && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {education.filter(e => e.school).map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={s.eduRow}>
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

        {/* Skills */}
        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills</Text>
            <View style={s.skillsRow}>
              {skills.map((skill, i) => (
                <Text key={i} style={s.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && certifications.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                <Text style={{ fontSize: 10 }}>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</Text>
                <Text style={s.expDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {data.showLanguages && languages.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Languages</Text>
            <Text style={{ fontSize: 10, color: '#444' }}>{languages.join(', ')}</Text>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={s.expTitle}>{proj.name}</Text>
                {proj.url && <Link src={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} style={{ ...s.link, fontSize: 9 }}>{proj.url}</Link>}
                {proj.description && <Text style={{ fontSize: 9.5, color: '#444', marginTop: 2 }}>{proj.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
