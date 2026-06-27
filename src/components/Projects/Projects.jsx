import { useState, useMemo } from 'react';
import { projects } from '../../data/projects';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import { ParallaxOrbs } from '../ParallaxOrbs/ParallaxOrbs';
import styles from './Projects.module.css';

const ALL_FILTER = 'All';

export function Projects() {
  const allTech = useMemo(() => {
    const techSet = new Set();
    projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return [ALL_FILTER, ...Array.from(techSet).sort()];
  }, []);

  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filtered = useMemo(
    () =>
      activeFilter === ALL_FILTER
        ? projects
        : projects.filter((p) => p.tech.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <section id="projects" className={styles.section}>
      <ParallaxOrbs variant="default" />
      <div className={styles.container}>
        <SectionHeading
          number="03"
          title="Featured Projects"
          subtitle="Real platforms and products — from employee workspaces and HR systems to company websites and custom applications."
        />
        <Reveal className={styles.filters} delay={0}>
          {allTech.map((tech) => (
            <button
              key={tech}
              className={`${styles.filter} ${activeFilter === tech ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </Reveal>
        <div className={styles.list}>
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <Parallax speed={0.08 + (i % 3) * 0.04}>
                <ProjectCard
                  project={project}
                  index={i}
                  featured={i === 0 && activeFilter === ALL_FILTER}
                />
              </Parallax>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className={styles.empty}>No projects match this filter.</p>
        )}
      </div>
    </section>
  );
}