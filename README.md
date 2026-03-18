# git-shadow-site

Site officiel de [git-shadow](https://github.com/filozofer/git-shadow) — construit avec [Astro](https://astro.build).

## Développement

```bash
npm install
npm run dev
```

## Structure

```
src/
├── components/     # Header, Footer, Sidebar, TOC, Pagination, Callout
├── layouts/        # BaseLayout, DocsLayout
├── pages/          # index.astro, docs/
├── content/docs/   # Markdown — concept/, commands/, getting-started, faq
└── styles/         # global.css (Tailwind v4)
```

## Déploiement

Déployé automatiquement sur [Cloudflare Pages](https://pages.cloudflare.com) à chaque push sur `main`.
