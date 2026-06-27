import { useState, useEffect } from 'react';
import { siteConfig } from './siteConfig.js';
import { Parallax } from '../../src/components/Parallax/Parallax.jsx';
import styles from './Hero.module.css';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className={`${styles.hero} ${isVisible ? styles.loaded : ''}`}>
      <div className={styles.shapes} aria-hidden="true">
        <Parallax className={`${styles.shapeWrap} ${styles.shapeWrap1}`} speed={0.12}>
          <div className={`${styles.shape} ${styles.shape1}`} />
        </Parallax>
        <Parallax className={`${styles.shapeWrap} ${styles.shapeWrap2}`} speed={-0.08}>
          <div className={`${styles.shape} ${styles.shape2}`} />
        </Parallax>
      </div>
      <div className={styles.container}>
        <Parallax className={styles.topRow} speed={0.04}>
          <span className={styles.availability}>
            <span className={styles.availDot} />
            Available for work
          </span>
          <span className={styles.location}>{siteConfig.role}</span>
        </Parallax>

        <div className={styles.content}>
          <Parallax className={styles.text} speed={0.06}>
            <h1 className={styles.headline}>{siteConfig.hero.headline}</h1>
            <p className={styles.intro}>{siteConfig.hero.intro}</p>
            <p className={styles.bio}>{siteConfig.hero.bio}</p>
            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryBtn}>
                View Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              <a href="#contact" className={styles.secondaryBtn}>
                Let&apos;s talk
              </a>
            </div>
          </Parallax>

          <div className={styles.photoWrapper}>
            <Parallax className={styles.photoGlow} speed={-0.1} aria-hidden="true">
              <div className={styles.photoGlowInner} />
            </Parallax>
            <Parallax className={styles.photoAccent} speed={0.18} aria-hidden="true">
              <div className={styles.photoAccentRing} />
            </Parallax>
            <Parallax className={styles.photoParallax} speed={0.2}>
              <div className={styles.photoFrame}>
                {siteConfig.photoUrl ? (
                  <img
                    src={siteConfig.photoUrl}
                    alt={`Portrait of ${siteConfig.name}`}
                    className={styles.photo}
                    draggable="false"
                  />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <span className={styles.photoCaption}>{siteConfig.name}</span>
            </Parallax>
          </div>
        </div>

        <Parallax className={styles.meta} speed={0.08}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Focus</span>
            <span className={styles.metaValue}>Digital Transformation</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Expertise</span>
            <span className={styles.metaValue}>Computer Engineering · Full-Stack · Digital Solutions</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.metaValue}>Open to opportunities</span>
          </div>
        </Parallax>
      </div>
    </section>
  );
}