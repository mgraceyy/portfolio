import { Parallax } from '../Parallax/Parallax';
import styles from './Marquee.module.css';

export function Marquee({ items, speed = 30 }) {
  const track = [...items, ...items];

  return (
    <Parallax className={styles.parallaxWrap} speed={0.05}>
      <div className={styles.wrapper} aria-hidden="true">
        <div
          className={styles.track}
          style={{ '--marquee-speed': `${speed}s` }}
        >
          {track.map((item, i) => (
            <span key={`${item}-${i}`} className={styles.item}>
              {item}
              <span className={styles.dot} />
            </span>
          ))}
        </div>
      </div>
    </Parallax>
  );
}
