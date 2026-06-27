import { useInView } from '../../hooks/useInView';
import styles from './Reveal.module.css';

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
}) {
  const [ref, isInView] = useInView();
  const classes = [
    styles.reveal,
    styles[direction],
    isInView ? styles.visible : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}