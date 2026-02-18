import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://resume.impulsestudios.cc';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/editor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/templates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/resume-examples`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/resume-tips`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/cover-letter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/linkedin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
