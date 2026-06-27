import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

function write(relPath, content) {
  const full = path.join(root, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('wrote', relPath);
}

function remove(relPath) {
  const full = path.join(root, relPath);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    console.log('removed', relPath);
  }
}

remove('src/hooks/useParallax.test.js');

const deadFiles = [
  'src/components/ExperienceTimeline/ExperienceTimeline.jsx',
  'src/components/ExperienceTimeline/ExperienceTimeline.module.css',
  'src/components/SkillBadge/SkillBadge.jsx',
  'src/components/SkillBadge/SkillBadge.module.css',
];

for (const file of deadFiles) {
  try {
    remove(file);
  } catch (err) {
    console.warn('could not remove', file, err.message);
  }
}

write('src/hooks/useParallax.js', `import { useState, useEffect, useRef, useCallback } from 'react';

const subscribers = new Map();
let frameId = null;
let isListening = false;

function tick() {
  frameId = null;
  subscribers.forEach((callback) => callback());
}

function onScroll() {
  if (!frameId) {
    frameId = requestAnimationFrame(tick);
  }
}

function ensureListener() {
  if (!isListening) {
    isListening = true;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }
}

function removeListenerIfEmpty() {
  if (subscribers.size === 0 && isListening) {
    isListening = false;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }
}

export function useParallax({ speed = 0.15, axis = 'y', offset = 0, externalRef } = {}) {
  const internalRef = useRef(null);
  const ref = externalRef ?? internalRef;
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const optionsRef = useRef({ speed, axis, offset });

  useEffect(() => {
    optionsRef.current = { speed, axis, offset };
  }, [speed, axis, offset]);

  const update = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const { speed: rate, axis: direction, offset: base } = optionsRef.current;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height * 0.5;
    const distanceFromCenter = elementCenter - viewportHeight * 0.5;
    const shift = distanceFromCenter * rate + base;

    const x = direction === 'x' || direction === 'both' ? shift : 0;
    const y = direction === 'y' || direction === 'both' ? shift : 0;

    setTransform((previous) => (
      previous.x === x && previous.y === y ? previous : { x, y }
    ));
  }, [ref]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return undefined;

    subscribers.set(update, update);
    ensureListener();
    update();

    return () => {
      subscribers.delete(update);
      removeListenerIfEmpty();
    };
  }, [update]);

  return [ref, transform];
}
`);

write('.gitignore', `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Dev artifacts
scripts/.vite-cache
scripts/*.log
terminals

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`);

write('eslint.config.js', `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'scripts/.vite-cache']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
`);

write('src/data/siteConfig.js', `export const siteConfig = {
  name: 'Grace Inayawan',
  tagline: 'Powering Growth Through Technology',
  // Update before deploy — used for Open Graph absolute URLs
  siteUrl: '',
  hero: {
    headline: 'Powering Growth Through Technology',
    intro:
      "I'm Grace Inayawan, a full-stack software developer and technology entrepreneur passionate about creating technology that delivers real-world value.",
    bio: 'From business management platforms and workflow automation to custom web applications and digital products, I build solutions that help organizations streamline operations, embrace digital transformation, and scale with confidence.',
  },
  stats: [
    { label: 'Years Experience', value: 4, suffix: '+' },
    { label: 'Projects Shipped', value: 5, suffix: '' },
    { label: 'Technologies', value: 20, suffix: '+' },
  ],
  email: 'inayawan.mg@gmail.com',
  github: 'https://github.com/mgraceyy',
  linkedin: 'https://www.linkedin.com/in/grace-inayawan',
  resumeUrl: '/resume.pdf',
  photoUrl: '/photo.jpg',
  about: {
    paragraphs: [
      "Technology has always been more than just code to me—it's a tool for solving problems, creating opportunities, and driving meaningful growth.",
      'As a full-stack software developer and technology entrepreneur, I specialize in building digital solutions that help organizations improve efficiency, streamline operations, and adapt to an increasingly digital world. My work spans business management platforms, workflow automation systems, custom web applications, and digital products designed to deliver measurable impact.',
      "Beyond development, I'm passionate about understanding the challenges organizations face and translating those challenges into practical, scalable solutions. I believe that successful technology is not defined by complexity, but by the value it creates for the people who use it.",
    ],
  },
};
`);

write('src/data/projects.js', `export const projects = [
  {
    title: 'TalaSora Prime',
    shortLabel: 'TalaSora',
    description:
      'Corporate website for a vertically integrated technology company — services, team, business model, and growth roadmap presented through a modern, responsive Next.js experience.',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    accent: { from: '#2a1f35', to: '#d4849f' },
    liveUrl: 'https://talasoraprime.com',
    githubUrl: 'https://github.com/mgraceyy/talasoraprime',
  },
  {
    title: 'TalaSora Prime Employee Workspace',
    shortLabel: 'Workspace',
    description:
      'Full-featured employee timekeeping and workspace platform for TalaSora Prime — daily time records, payroll runs, EOD reporting, requirements tracking, PIN management, and role-based dashboards for employees, managers, and admins.',
    tech: ['Rust', 'Axum', 'PostgreSQL', 'Docker', 'TypeScript'],
    accent: { from: '#1a2438', to: '#7a9ec7' },
    liveUrl: '',
    githubUrl: 'https://github.com/mgraceyy/tspemployeeworkspace',
  },
  {
    title: 'KAOS Cafe HRIS',
    shortLabel: 'KAOS',
    description:
      'Human Resource Information System for a multi-branch coffee shop — employee management, selfie-based attendance kiosks, shift scheduling, leave workflows, bi-monthly payroll with government deductions, and a mobile-friendly employee portal.',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    accent: { from: '#2d1f1a', to: '#c9a87c' },
    liveUrl: '',
    githubUrl: 'https://github.com/kaoscafe/kaoscafehris',
  },
  {
    title: 'Project Aura',
    shortLabel: 'Aura',
    description:
      'Custom web application built to streamline digital workflows and deliver a polished, user-centered experience — designed for scalability and real-world operational use.',
    tech: ['TypeScript', 'React', 'Node.js'],
    accent: { from: '#1f1a2e', to: '#b8a4c9' },
    liveUrl: '',
    githubUrl: 'https://github.com/mgraceyy/project-aura',
  },
  {
    title: 'Student Portal',
    shortLabel: 'Portal',
    description:
      'Web-based student portal for managing academic information, access to institutional resources, and a centralized hub for students to interact with school services online.',
    tech: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
    accent: { from: '#1a2a2a', to: '#6b9e8a' },
    liveUrl: '',
    githubUrl: 'https://github.com/mgraceyy/studentportal',
  },
];
`);

console.log('done');