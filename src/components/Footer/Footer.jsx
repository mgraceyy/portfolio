import { useState, useEffect } from 'react';
import { siteConfig } from './siteConfig.js';
import styles from '../../src/components/Footer/Footer.module.css';

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} {siteConfig.name}. Crafted with care.
        </p>
        <a
          href="#hero"
          className={`${styles.top} ${showTop ? styles.topVisible : ''}`}
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </a>
      </div>
    </footer>
  );
}