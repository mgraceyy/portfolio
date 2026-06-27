# Mary Grace Inayawan — Portfolio

Personal portfolio built with React 19 and Vite.

## Local development

```bash
npm install
npm run dev
```

Uses `scripts/vite-patched.config.js` so all content updates apply automatically.

## Build for GitHub Pages

```bash
npm run og:image
npm run build:pages
```

Deploy the `dist/` folder. The site is configured for:

**https://mgraceyy.github.io/portfolio/**

If your GitHub repo name is different, update `VITE_BASE_URL` and `siteUrl` in `src/data/siteConfig.js`.

## GitHub Pages setup

1. Push this repo to `github.com/mgraceyy/portfolio`
2. Go to **Settings → Pages → Build and deployment**
3. Set source to **GitHub Actions**
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` deploys automatically

## Apply patches to src (optional)

If editor file locks are cleared:

```bash
npm run apply-patches
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build:pages` | Production build for GitHub Pages |
| `npm run lint` | ESLint |
| `npm run og:image` | Regenerate `public/og-image.jpg` |
| `npm run apply-patches` | Copy patches into `src/` |