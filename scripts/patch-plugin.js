import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const patchesDir = path.join(__dirname, 'patches');

const PATCH_TARGETS = new Map(
  Object.entries({
    [path.join(root, 'src/data/siteConfig.js')]: path.join(patchesDir, 'siteConfig.js'),
    [path.join(root, 'src/data/projects.js')]: path.join(patchesDir, 'projects.js'),
    [path.join(root, 'src/hooks/useParallax.js')]: path.join(patchesDir, 'useParallax.js'),
    [path.join(root, 'src/components/ProjectCard/ProjectCard.jsx')]: path.join(patchesDir, 'ProjectCard.jsx'),
    [path.join(root, 'src/components/ProjectCard/ProjectCard.module.css')]: path.join(
      patchesDir,
      'ProjectCard.module.css',
    ),
    [path.join(root, 'src/components/Hero/Hero.jsx')]: path.join(patchesDir, 'Hero.jsx'),
    [path.join(root, 'src/components/Hero/Hero.module.css')]: path.join(patchesDir, 'Hero.module.css'),
    [path.join(root, 'src/components/About/About.module.css')]: path.join(patchesDir, 'About.module.css'),
    [path.join(root, 'src/components/ExperienceRail/ExperienceRail.jsx')]: path.join(
      patchesDir,
      'ExperienceRail.jsx',
    ),
    [path.join(root, 'src/components/ExperienceRail/ExperienceRail.module.css')]: path.join(
      patchesDir,
      'ExperienceRail.module.css',
    ),
    [path.join(root, 'src/components/Navbar/Navbar.jsx')]: path.join(patchesDir, 'Navbar.jsx'),
    [path.join(root, 'src/components/Footer/Footer.jsx')]: path.join(patchesDir, 'Footer.jsx'),
    [path.join(root, 'src/components/Contact/Contact.jsx')]: path.join(patchesDir, 'Contact.jsx'),
    [path.join(root, 'src/components/Education/Education.jsx')]: path.join(patchesDir, 'Education.jsx'),
    [path.join(root, 'src/data/education.js')]: path.join(patchesDir, 'education.js'),
  }).map(([target, patch]) => [path.normalize(target), path.normalize(patch)]),
);

const SEO_SNIPPET = fs.readFileSync(path.join(patchesDir, 'index.html'), 'utf8').match(
  /<!-- portfolio-seo:start -->[\s\S]*?<!-- portfolio-seo:end -->/,
)?.[0] ?? '';

export function portfolioPatchPlugin() {
  return {
    name: 'portfolio-patch',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer) return null;

      const resolved = await this.resolve(source, importer, {
        skipSelf: true,
        ...options,
      });

      if (!resolved?.id) return null;

      const patch = PATCH_TARGETS.get(path.normalize(resolved.id));
      return patch ?? null;
    },
    transformIndexHtml(html) {
      if (!SEO_SNIPPET) return html;

      if (html.includes('portfolio-seo:start')) {
        return html;
      }

      let next = html.replace(
        '<meta name="viewport"',
        `${SEO_SNIPPET}\n    <meta name="viewport"`,
      );

      const titleMatch = fs.readFileSync(path.join(patchesDir, 'index.html'), 'utf8')
        .match(/<title>[^<]*<\/title>/);
      if (titleMatch) {
        next = next.replace(/<title>[^<]*<\/title>/, titleMatch[0]);
      }

      return next;
    },
  };
}