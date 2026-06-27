import { useState, useEffect } from 'react';

export function useCountUp(target, isActive, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return undefined;

    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const value = Math.round(start + (target - start) * eased);
      setCount(value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, isActive, duration]);

  return count;
}