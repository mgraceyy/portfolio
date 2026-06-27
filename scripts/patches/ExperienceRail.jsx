import styles from './ExperienceRail.module.css';

export function ExperienceRail({ experience }) {
  return (
    <div className={styles.rail}>
      {experience.map((exp, index) => (
        <article
          key={`${exp.company}-${exp.role}-${exp.startDate}`}
          className={styles.item}
        >
          <div className={styles.dateCol}>
            <span className={styles.dateStart}>{exp.startDate}</span>
            <span className={styles.dateLine} />
            <span className={styles.dateEnd}>{exp.endDate}</span>
          </div>
          <div className={styles.content}>
            <div className={styles.marker}>
              <span className={styles.dot} />
              {index < experience.length - 1 && <span className={styles.connector} />}
            </div>
            <div className={styles.body}>
              <h3 className={styles.role}>{exp.role}</h3>
              <p className={styles.company}>{exp.company}</p>
              <p className={styles.description}>{exp.description}</p>
              {exp.tech && (
                <div className={styles.tech}>
                  {exp.tech.map((t) => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              )}
              {exp.highlights && (
                <ul className={styles.highlights}>
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}