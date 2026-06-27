import styles from './ProjectCard.module.css';

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ProjectCard({ project, index, featured = false }) {
  const num = String(index + 1).padStart(2, '0');
  const hasLive = Boolean(project.liveUrl);
  const hasCode = Boolean(project.githubUrl && project.githubUrl !== '#');
  const primaryUrl = project.liveUrl || project.githubUrl || '#';
  const accentFrom = project.accent?.from ?? '#2a1f35';
  const accentTo = project.accent?.to ?? '#d4849f';

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.layout}>
        <a
          href={primaryUrl}
          className={styles.visualLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title}`}
        >
          <div
            className={styles.visual}
            style={{
              '--accent-from': accentFrom,
              '--accent-to': accentTo,
            }}
          >
            <div className={styles.visualMesh} aria-hidden="true" />
            <div className={styles.visualGrid} aria-hidden="true" />
            <span className={styles.shortLabel}>{project.shortLabel ?? project.title}</span>
            <div className={styles.hoverPanel}>
              <span className={styles.viewLabel}>View project</span>
              <ExternalIcon />
            </div>
          </div>
        </a>

        <div className={styles.body}>
          <div className={styles.header}>
            <span className={styles.index}>{num}</span>
            <h3 className={styles.title}>{project.title}</h3>
          </div>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.footer}>
            <div className={styles.tags}>
              {project.tech.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            <div className={styles.links}>
              {hasCode && (
                <a
                  href={project.githubUrl}
                  className={styles.actionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code
                  <ExternalIcon />
                </a>
              )}
              {hasLive && (
                <a
                  href={project.liveUrl}
                  className={styles.actionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live
                  <ExternalIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}