import { MetadataRoute } from 'next';
import { getPages } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links: MetadataRoute.Sitemap = [
    {
      url: 'https://www.chancetix.com', // 替換為你的主頁 URL
      lastModified: new Date(),
    },
  ];

  const pages = await getPages();
  pages.forEach((page) => {
    links.push({
      url: page.url,
      lastModified: page.lastModified,
    });
  });

  return links;
}
