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

const ACCENT = '#2563eb';

const s = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Inter', fontSize: 10, color: '#1a1a1a' },
  sidebar: { width: '35%', backgroundColor: '#f8f9fa', padding: 28, paddingTop: 36 },
  main: { width: '65%', padding: 32, paddingTop: 36 },
  name: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  title: { fontSize: 10, color: '#666', marginBottom: 16 },
  sideSection: { marginBottom: 18 },
  sideSectionTitle: { fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: ACCENT, marginBottom: 8 },
  contactItem: { fontSize: 9, color: '#444', marginBottom: 4, lineHeight: 1.5 },
  mainSection: { marginBottom: 16 },
  mainSectionTitle: { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1.5, borderBottomColor: ACCENT, paddingBottom: 4, marginBottom: 10, color: '#1a1a1a' },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expTitle: { fontSize: 10, fontWeight: 600 },
  expCompany: { fontSize: 10, color: '#555', marginBottom: 3 },
  expDate: { fontSize: 9, color: '#888' },
  bullet: { flexDirection: 'row', marginBottom: 2, paddingLeft: 4 },
  bulletDot: { width: 10, fontSize: 10, color: ACCENT },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333', lineHeight: 1.5 },
  skillTag: { fontSize: 9, color: '#333', backgroundColor: '#e5e7eb', padding: '3 8', borderRadius: 3, marginBottom: 4, marginRight: 4 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  link: { color: ACCENT, textDecoration: 'none', fontSize: 9 },
});

export default function TwoColumnPdf({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, certifications, languages, projects } = data;
  const pageSize = data.paperSize === 'letter' ? 'LETTER' : 'A4';

  return (
    <Document>
      <Page size={pageSize} style={s.page}>
        {/* Sidebar */}
        <View style={s.sidebar}>
          <View style={s.sideSection}>
            <Text style={s.sideSectionTitle}>Contact</Text>
            {personal.email && <Text style={s.contactItem}>{personal.email}</Text>}
            {personal.phone && <Text style={s.contactItem}>{personal.phone}</Text>}
            {personal.location && <Text style={s.contactItem}>{personal.location}</Text>}
            {personal.linkedinUrl && <Link src={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} style={s.link}>{personal.linkedinUrl}</Link>}
            {personal.portfolioUrl && <Text style={{ marginTop: 4 }}><Link src={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} style={s.link}>{personal.portfolioUrl}</Link></Text>}
          </View>

          {skills.length > 0 && (
            <View style={s.sideSection}>
              <Text style={s.sideSectionTitle}>Skills</Text>
              <View style={s.skillsRow}>
                {skills.map((skill, i) => (
                  <Text key={i} style={s.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {data.showLanguages && languages.length > 0 && (
            <View style={s.sideSection}>
              <Text style={s.sideSectionTitle}>Languages</Text>
              {languages.map((lang, i) => (
                <Text key={i} style={s.contactItem}>{lang}</Text>
              ))}
            </View>
          )}

          {data.showCertifications && certifications.length > 0 && (
            <View style={s.sideSection}>
              <Text style={s.sideSectionTitle}>Certifications</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 9, fontWeight: 500 }}>{cert.name}</Text>
                  <Text style={{ fontSize: 8, color: '#666' }}>{cert.issuer}{cert.date ? ` — ${cert.date}` : ''}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={s.main}>
          <Text style={s.name}>{personal.fullName || 'Your Name'}</Text>

          {summary && (
            <View style={s.mainSection}>
              <Text style={s.mainSectionTitle}>Summary</Text>
              <Text style={{ fontSize: 10, color: '#444', lineHeight: 1.6 }}>{summary}</Text>
            </View>
          )}

          {experience.some(e => e.jobTitle || e.company) && (
            <View style={s.mainSection}>
              <Text style={s.mainSectionTitle}>Experience</Text>
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

          {education.some(e => e.school) && (
            <View style={s.mainSection}>
              <Text style={s.mainSectionTitle}>Education</Text>
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

          {data.showProjects && projects.length > 0 && (
            <View style={s.mainSection}>
              <Text style={s.mainSectionTitle}>Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 6 }}>
                  <Text style={s.expTitle}>{proj.name}</Text>
                  {proj.url && <Link src={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} style={s.link}>{proj.url}</Link>}
                  {proj.description && <Text style={{ fontSize: 9.5, color: '#444', marginTop: 2 }}>{proj.description}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
