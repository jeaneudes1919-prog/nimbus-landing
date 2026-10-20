import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import { FEATURES } from "../../data/features";
import { FeatureVisual } from "./FeatureVisual";

const MAX_TILT = 3;

const GLOW = {
  primary: "rgba(124, 92, 255, 0.16)",
  accent: "rgba(34, 211, 238, 0.14)",
};

function FeatureCard({ feature }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  function handleMouseMove(event) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
    if (reducedMotion) return;
    rotateX.set(((y / rect.height) - 0.5) * -MAX_TILT * 2);
    rotateY.set(((x / rect.width) - 0.5) * MAX_TILT * 2);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const Icon = feature.icon;

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      className={`group surface relative flex flex-col overflow-hidden p-5 ${feature.span}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${GLOW[feature.accent]}, transparent 68%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mb-5 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0B0B12]/60 px-4 py-3">
        <FeatureVisual name={feature.visual} />
      </div>

      <div className="relative mt-auto">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
              feature.accent === "accent"
                ? "border-accent/20 bg-accent/10 text-accent"
                : "border-primary/20 bg-primary/10 text-primary"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {feature.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
      </div>
    </motion.article>
  );
}

export function Features() {
  return (
    <section id="fonctionnalites" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Fonctionnalités"
          title="Une plateforme complète, pensée pour aller vite."
          description="Chaque brique de Nimbus est conçue pour réduire le temps entre une idée et une automatisation en production."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
