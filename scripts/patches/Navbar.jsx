import { useState } from 'react';
import { siteConfig } from './siteConfig.js';
import { useActiveSection } from '../../src/hooks/useActiveSection.js';
import { useScrollY } from '../../src/hooks/useScrollY.js';
import { ThemeToggle } from '../../src/components/ThemeToggle/ThemeToggle.jsx';
import styles from '../../src/components/Navbar/Navbar.module.css';

const NAV_LINKS = [
  { href: '#hero', label: 'Home', id: 'hero' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const scrollY = useScrollY();
  const isScrolled = scrollY > 40;

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo}>
          <span className={styles.logoMark}>{siteConfig.logoMark}</span>
          <span className={styles.logoText}>{siteConfig.name}</span>
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label="Toggle navigation"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <div
          id="nav-links"
          className={`${styles.links} ${menuOpen ? styles.visible : ''}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}