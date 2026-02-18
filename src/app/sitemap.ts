import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://resume.impulsestudios.cc';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/editor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/templates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];
}
