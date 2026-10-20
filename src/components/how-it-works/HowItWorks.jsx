import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { STEPS } from "../../data/steps";

export function HowItWorks() {
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = reducedMotion ? 1 : progress;
  const scaleY = reducedMotion ? 1 : progress;

  return (
    <section id="comment-ca-marche" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-72 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(124,92,255,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          eyebrow="Comment ça marche"
          title="De l'idée à l'automatisation en moins de 15 minutes."
          description="Pas de formation, pas de consultant. Trois étapes suffisent pour mettre vos process en pilote automatique."
          align="center"
        />

        <div ref={trackRef} className="relative mt-4">
          {/* Ligne horizontale (desktop) */}
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/10 md:block" aria-hidden="true">
            <motion.div
              style={{ scaleX }}
              className="h-full origin-left bg-gradient-to-r from-primary via-[#8B7BFF] to-accent"
            />
          </div>

          {/* Ligne verticale (mobile) */}
          <div className="absolute bottom-6 left-[23px] top-6 w-px bg-white/10 md:hidden" aria-hidden="true">
            <motion.div
              style={{ scaleY }}
              className="h-full origin-top bg-gradient-to-b from-primary via-[#8B7BFF] to-accent"
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: reducedMotion ? 0 : index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex gap-5 md:block"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0D0D15] shadow-[0_0_0_6px_#07070D]">
                    <Icon
                      className={index === 1 ? "h-5 w-5 text-accent" : "h-5 w-5 text-primary"}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="md:mt-7">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-muted">
                        {step.number}
                      </span>
                      <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-muted">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
