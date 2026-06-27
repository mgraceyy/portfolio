import { education, awards, certifications, showCertifications } from './education.js';
import { SectionHeading } from '../../src/components/SectionHeading/SectionHeading.jsx';
import { Reveal } from '../../src/components/Reveal/Reveal.jsx';
import { Parallax } from '../../src/components/Parallax/Parallax.jsx';
import { ParallaxOrbs } from '../../src/components/ParallaxOrbs/ParallaxOrbs.jsx';
import styles from '../../src/components/Education/Education.module.css';

function EducationTimeline({ items }) {
  return (
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <Reveal key={item.credential} className={styles.eduItem} delay={i * 80}>
          <div className={styles.eduMarker}>
            <span className={styles.eduDot} />
            {i < items.length - 1 && <span className={styles.eduLine} />}
          </div>
          <div className={styles.eduContent}>
            <span className={styles.eduYear}>{item.year}</span>
            <h3 className={styles.eduTitle}>{item.credential}</h3>
            <p className={styles.eduSchool}>{item.institution}</p>
            {item.honor && <span className={styles.eduHonor}>{item.honor}</span>}
            {item.description && (
              <p className={styles.eduDesc}>{item.description}</p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function AwardCard({ award, delay }) {
  return (
    <Reveal className={styles.awardCard} delay={delay}>
      <div className={styles.awardBadge}>
        <span className={styles.awardPlacement}>{award.placement}</span>
        <span className={styles.awardYear}>{award.year}</span>
      </div>
      <h3 className={styles.awardTitle}>{award.title}</h3>
      <p className={styles.awardOrg}>{award.institution}</p>
      {award.description && (
        <p className={styles.awardDesc}>{award.description}</p>
      )}
    </Reveal>
  );
}

export function Education() {
  const hasCertifications = showCertifications && certifications.length > 0;

  return (
    <section id="education" className={styles.section}>
      <ParallaxOrbs variant="rose" />
      <div className={styles.container}>
        <SectionHeading
          number="04"
          title="Education & Achievements"
          subtitle="Academic foundation and recognitions in engineering, programming, and innovation."
        />

        <div className={styles.layout}>
          <Parallax className={styles.block} speed={0.1}>
            <Reveal className={styles.blockHeader} delay={0}>
              <h3 className={styles.blockTitle}>Education</h3>
              <p className={styles.blockSubtitle}>Degrees and academic programs</p>
            </Reveal>
            <EducationTimeline items={education} />
          </Parallax>

          <Parallax className={styles.block} speed={0.14}>
            <Reveal className={styles.blockHeader} delay={60}>
              <h3 className={styles.blockTitle}>Achievements</h3>
              <p className={styles.blockSubtitle}>Competition awards and recognitions</p>
            </Reveal>
            <div className={styles.awardGrid}>
              {awards.map((award, i) => (
                <AwardCard key={award.title} award={award} delay={80 + i * 60} />
              ))}
            </div>
          </Parallax>

          {hasCertifications && (
            <Parallax className={styles.block} speed={0.12}>
              <Reveal className={styles.blockHeader} delay={120}>
                <h3 className={styles.blockTitle}>Certifications</h3>
                <p className={styles.blockSubtitle}>Professional credentials</p>
              </Reveal>
            </Parallax>
          )}
        </div>
      </div>
    </section>
  );
}