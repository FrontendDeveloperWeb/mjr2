import { useEffect, useRef, useState } from 'react';

export function useCountUp(finalValue, { duration = 1500 } = {}) {
  const target = parseInt(finalValue, 10);
  const suffix = String(finalValue).replace(/^[0-9]+/, '');
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    if (Number.isNaN(target)) {
      setDisplay(finalValue);
      return undefined;
    }
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(`${target}${suffix}`);
        clearInterval(interval);
      } else {
        setDisplay(`${Math.floor(current)}${suffix}`);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [target, suffix, duration, finalValue]);

  return [display, ref];
}
