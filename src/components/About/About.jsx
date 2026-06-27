import { siteConfig } from '../../data/siteConfig';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import { ParallaxOrbs } from '../ParallaxOrbs/ParallaxOrbs';
import styles from './About.module.css';

function StatCard({ stat, isActive, delay }) {
  const count = useCountUp(stat.value, isActive);

  return (
    <Reveal className={styles.stat} delay={delay}>
      <span className={styles.statValue}>
        {count}{stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </Reveal>
  );
}

export function About() {
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  return (
    <section id="about" className={styles.section}>
      <ParallaxOrbs variant="blush" />
      <div className={styles.container}>
        <SectionHeading
          number="01"
          title="About Me"
          subtitle="Building technology that solves real problems and drives meaningful growth."
        />
        <div className={styles.layout}>
          <Parallax className={styles.content} speed={0.08}>
            {siteConfig.about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} className={styles.paragraph} delay={i * 100}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </Parallax>
          <Parallax ref={statsRef} className={styles.stats} speed={0.14}>
            {siteConfig.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                isActive={statsInView}
                delay={i * 120}
              />
            ))}
          </Parallax>
        </div>
      </div>
    </section>
  );
}