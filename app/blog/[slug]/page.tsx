import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { formatDate } from '../page';

type Props = { params: Promise<{ slug: string }> };

export default async function Post(props: Props) {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="mb-6 text-sm">
        <Link href="/blog" className="text-fd-muted-foreground hover:underline">← Blog</Link>
      </p>
      <header className="mb-8 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{page.data.title}</h1>
        <p className="text-fd-muted-foreground">{page.data.description}</p>
        <p className="text-sm text-fd-muted-foreground">
          {page.data.author} · <time dateTime={page.data.date}>{formatDate(page.data.date)}</time>
        </p>
      </header>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </main>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
    authors: [{ name: page.data.author }],
    openGraph: { type: 'article', publishedTime: page.data.date },
  };
}
