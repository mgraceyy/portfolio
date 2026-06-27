import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import styles from './SectionHeading.module.css';

export function SectionHeading({ number, title, subtitle, align = 'left' }) {
  return (
    <Parallax speed={0.07}>
      <Reveal className={`${styles.heading} ${styles[align]}`}>
      <div className={styles.row}>
        {number && <span className={styles.number}>{number}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Reveal>
    </Parallax>
  );
}