import { skills } from '../../data/skills';
import { experience } from '../../data/experience';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { ExperienceRail } from '../ExperienceRail/ExperienceRail';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import { ParallaxOrbs } from '../ParallaxOrbs/ParallaxOrbs';
import styles from './SkillsAndExperience.module.css';

function SkillRow({ group, delay }) {
  return (
    <Reveal className={styles.skillRow} delay={delay}>
      <span className={styles.skillLabel}>{group.category}</span>
      <div className={styles.skillItems}>
        {group.items.map((skill) => (
          <span key={skill} className={styles.skillChip}>{skill}</span>
        ))}
      </div>
    </Reveal>
  );
}

export function SkillsAndExperience() {
  const softSkills = skills.find((g) => g.category === 'Soft Skills');
  const technicalSkills = skills.filter((g) => g.category !== 'Soft Skills');

  return (
    <section id="skills" className={styles.section}>
      <ParallaxOrbs variant="lavender" />
      <div className={styles.container}>
        <SectionHeading
          number="02"
          title="Skills & Experience"
          subtitle="Technical skills and professional experience from software development, web engineering, and automation."
        />

        <Parallax speed={0.1}>
          <Reveal className={styles.splitPanel} delay={0}>
          <div className={styles.skillsPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon} aria-hidden="true">✦</span>
              <h3 className={styles.panelTitle}>Skills</h3>
            </div>

            <div className={styles.skillList}>
              {softSkills && (
                <SkillRow group={softSkills} delay={40} />
              )}
              {technicalSkills.map((group, i) => (
                <SkillRow key={group.category} group={group} delay={80 + i * 40} />
              ))}
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.expPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon} aria-hidden="true">◎</span>
              <h3 className={styles.panelTitle}>Experience</h3>
            </div>
            <ExperienceRail experience={experience} />
          </div>
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}