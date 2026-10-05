import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    links: [
      { text: 'Docs', url: '/docs' },
      { text: 'Blog', url: '/blog' },
      { text: 'Live demo', url: 'https://demo.vyasa.site', external: true },
      { text: 'Marketplace', url: 'https://github.com/vyasa-cms/marketplace', external: true },
    ],
    githubUrl: 'https://github.com/vyasa-cms/vyasa',
  };
}
