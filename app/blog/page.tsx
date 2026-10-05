import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from '@/lib/source';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Design notes and release writing from the people building Vyasa.',
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
};

export default function BlogIndex() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-fd-muted-foreground">
          Why Vyasa is built the way it is, and what each release changes.{' '}
          <a href="/rss.xml" className="underline">RSS</a>
        </p>
      </header>
      <ul className="flex flex-col gap-8">
        {blogPosts().map((post) => (
          <li key={post.url} className="flex flex-col gap-1">
            <time className="text-sm text-fd-muted-foreground" dateTime={post.data.date}>
              {formatDate(post.data.date)}
            </time>
            <Link href={post.url} className="text-xl font-medium hover:underline">
              {post.data.title}
            </Link>
            <p className="text-fd-muted-foreground">{post.data.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
