import { llms, loader } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // `source`: the repository file a synced page is generated from, so
    // "edit on GitHub" opens the file to edit rather than a git-ignored copy.
    schema: pageSchema.extend({ source: z.string().optional() }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Blog posts: MDX under content/blog with a date and an author.
const blogDocs = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: pageSchema.extend({ date: z.string(), author: z.string() }),
  },
  meta: { schema: metaSchema },
});

export const blog = loader({
  baseUrl: '/blog',
  source: blogDocs.toFumadocsSource(),
});

/** Posts, newest first. */
export function blogPosts() {
  return blog
    .getPages()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
