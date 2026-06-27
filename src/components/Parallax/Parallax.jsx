import { forwardRef } from 'react';
import { useParallax } from '../../hooks/useParallax';
import styles from './Parallax.module.css';

export const Parallax = forwardRef(function Parallax(
  {
    children,
    className = '',
    speed = 0.15,
    axis = 'y',
    offset = 0,
    as: Tag = 'div',
    style,
    ...props
  },
  ref,
) {
  const [, transform] = useParallax({ speed, axis, offset, externalRef: ref });

  return (
    <Tag
      ref={ref}
      className={`${styles.parallax} ${className}`.trim()}
      style={{
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
});