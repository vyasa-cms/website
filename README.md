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

vyasa.site is a Cloudflare Worker that serves the static export (no script),
configured in `wrangler.jsonc`:

```bash
VYASA_SRC=../vyasa pnpm build
npx wrangler deploy
```

`.github/workflows/deploy.yml` does the same on every push to `main` once
GitHub Actions is available to this repository (it builds pull requests
without deploying). Secrets: `VYASA_READ_TOKEN` (fine-grained token,
Contents: read on vyasa-cms/vyasa, only while that repository is private),
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Licence

MIT OR Apache-2.0, like Vyasa.
