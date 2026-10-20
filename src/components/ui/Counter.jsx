import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { counterValue, formatStat } from "../../lib/counter";

const ANIMATION_STEPS = 40;

export function Counter({ value, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    if (reducedMotion) {
      setProgress(1);
      return undefined;
    }

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setProgress(Math.min(step / ANIMATION_STEPS, 1));
      if (step >= ANIMATION_STEPS) clearInterval(interval);
    }, duration / ANIMATION_STEPS);

    return () => clearInterval(interval);
  }, [isInView, reducedMotion, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {formatStat(counterValue(value, progress))}
      {suffix}
    </span>
  );
}
