import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const STRENGTH = 0.22;
const MAX_SHIFT = 9;

export function MagneticButton({
  children,
  className = "",
  strength = STRENGTH,
  type = "button",
  ...props
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });

  function handleMouseMove(event) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const deltaX = event.clientX - (rect.left + rect.width / 2);
    const deltaY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, deltaX * strength)));
    y.set(Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, deltaY * strength)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={`focus-ring inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
