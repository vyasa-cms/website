# vyasa.site

The website and documentation for [Vyasa](https://github.com/vyasa-cms/vyasa),
built with [Fumadocs](https://fumadocs.dev) as a static export and deployed
to Cloudflare Pages.

## Where the content comes from

- Hand-written pages live here: `content/docs/index.mdx`,
  `content/docs/getting-started.mdx` and the landing page in `app/(home)`.
- Everything else is generated from the main repository so docs and code
  never disagree: `pnpm sync:docs` copies its `docs/*.md` and
  `CONTRIBUTING.md`, and `pnpm gen:api` builds the REST reference from its
  `admin/openapi.json`. Edit those in
  [vyasa-cms/vyasa](https://github.com/vyasa-cms/vyasa), not the copies.

The scripts read the main repository from `./vyasa` (or `VYASA_SRC`).

## Working on it

```bash
git clone https://github.com/vyasa-cms/website && cd website
git clone https://github.com/vyasa-cms/vyasa
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in out/
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request and
deploys `main` to the Cloudflare Pages project `vyasa-site`. It rebuilds
daily, and whenever vyasa-cms/vyasa sends a `docs-changed` dispatch.
Secrets: `VYASA_DEPLOY_KEY` (read-only deploy key on vyasa-cms/vyasa) or
`VYASA_READ_TOKEN` (fine-grained token, Contents: read on vyasa-cms/vyasa) —
either, and only while that repository is private; `CLOUDFLARE_API_TOKEN` (Pages: Edit) and
`CLOUDFLARE_ACCOUNT_ID`.

## Licence

MIT OR Apache-2.0, like Vyasa.
