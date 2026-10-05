import { blogPosts } from '@/lib/source';

export const dynamic = 'force-static';

const site = 'https://vyasa.site';
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = blogPosts()
    .map(
      (post) => `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${site}${post.url}</link>
      <guid>${site}${post.url}</guid>
      <pubDate>${new Date(`${post.data.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.data.description ?? '')}</description>
    </item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Vyasa blog</title>
    <link>${site}/blog</link>
    <description>Design notes and release writing from the people building Vyasa.</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
