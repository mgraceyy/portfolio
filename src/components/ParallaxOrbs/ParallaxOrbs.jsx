import { Parallax } from '../Parallax/Parallax';
import styles from './ParallaxOrbs.module.css';

export function ParallaxOrbs({ variant = 'default' }) {
  return (
    <div className={`${styles.orbs} ${styles[variant]}`} aria-hidden="true">
      <Parallax className={styles.orb} speed={0.14}>
        <span className={styles.orbPrimary} />
      </Parallax>
      <Parallax className={styles.orb} speed={-0.09}>
        <span className={styles.orbSecondary} />
      </Parallax>
    </div>
  );
}