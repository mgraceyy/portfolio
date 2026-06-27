import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const patchesDir = path.join(import.meta.dirname, 'patches');

const copies = [
  ['useParallax.js', 'src/hooks/useParallax.js'],
  ['siteConfig.js', 'src/data/siteConfig.js'],
  ['projects.js', 'src/data/projects.js'],
  ['ProjectCard.jsx', 'src/components/ProjectCard/ProjectCard.jsx'],
  ['ProjectCard.module.css', 'src/components/ProjectCard/ProjectCard.module.css'],
  ['Hero.jsx', 'src/components/Hero/Hero.jsx'],
  ['Hero.module.css', 'src/components/Hero/Hero.module.css'],
  ['About.module.css', 'src/components/About/About.module.css'],
  ['ExperienceRail.jsx', 'src/components/ExperienceRail/ExperienceRail.jsx'],
  ['ExperienceRail.module.css', 'src/components/ExperienceRail/ExperienceRail.module.css'],
  ['Navbar.jsx', 'src/components/Navbar/Navbar.jsx'],
  ['Footer.jsx', 'src/components/Footer/Footer.jsx'],
  ['Contact.jsx', 'src/components/Contact/Contact.jsx'],
  ['Education.jsx', 'src/components/Education/Education.jsx'],
  ['education.js', 'src/data/education.js'],
  ['index.html', 'index.html'],
  ['package.json', 'package.json'],
  ['README.md', 'README.md'],
];

const gitignoreAppend = `

# Dev artifacts
scripts/.vite-cache
scripts/*.log
terminals
dist-patched
`;

const deadFiles = [
  'src/components/ExperienceTimeline/ExperienceTimeline.jsx',
  'src/components/ExperienceTimeline/ExperienceTimeline.module.css',
  'src/components/SkillBadge/SkillBadge.jsx',
  'src/components/SkillBadge/SkillBadge.module.css',
];

let failed = 0;

function copyFile(from, to) {
  const dest = path.join(root, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(from, dest);
  console.log(`✓ ${to}`);
}

for (const [patchName, destRel] of copies) {
  const src = path.join(patchesDir, patchName);
  try {
    copyFile(src, destRel);
  } catch (err) {
    console.error(`✗ ${destRel}: ${err.message}`);
    failed += 1;
  }
}

for (const rel of deadFiles) {
  const full = path.join(root, rel);
  try {
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`✓ removed ${rel}`);
    }
  } catch (err) {
    console.error(`✗ remove ${rel}: ${err.message}`);
    failed += 1;
  }
}

try {
  const gitignorePath = path.join(root, '.gitignore');
  let gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!gitignore.includes('scripts/.vite-cache')) {
    gitignore += gitignoreAppend;
    fs.writeFileSync(gitignorePath, gitignore, 'utf8');
    console.log('✓ .gitignore');
  }
} catch (err) {
  console.error(`✗ .gitignore: ${err.message}`);
  failed += 1;
}

try {
  const eslintPath = path.join(root, 'eslint.config.js');
  let eslint = fs.readFileSync(eslintPath, 'utf8');
  if (!eslint.includes('scripts/.vite-cache')) {
    eslint = eslint.replace(
      "globalIgnores(['dist'])",
      "globalIgnores(['dist', 'scripts/.vite-cache'])",
    );
    fs.writeFileSync(eslintPath, eslint, 'utf8');
    console.log('✓ eslint.config.js');
  }
} catch (err) {
  console.error(`✗ eslint.config.js: ${err.message}`);
  failed += 1;
}

if (!fs.existsSync(path.join(root, 'public/resume.pdf'))) {
  try {
    fs.copyFileSync(path.join(root, 'DEV.pdf'), path.join(root, 'public/resume.pdf'));
    console.log('✓ public/resume.pdf');
  } catch (err) {
    console.error(`✗ public/resume.pdf: ${err.message}`);
    failed += 1;
  }
}

if (!fs.existsSync(path.join(root, 'public/og-image.jpg'))) {
  try {
    fs.copyFileSync(path.join(root, 'public/photo.jpg'), path.join(root, 'public/og-image.jpg'));
    console.log('✓ public/og-image.jpg');
  } catch (err) {
    console.error(`✗ public/og-image.jpg: ${err.message}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} operation(s) failed — close open files in your editor and re-run: node scripts/apply-patches.mjs`);
  process.exit(1);
}

console.log('\nAll patches applied successfully.');
console.log('You can now use: npm run dev, npm run build, npm run lint');
console.log('(Or remove scripts/vite-patched.config.js from start-dev.ps1 if using default vite.config.js)');