import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, description, align = "left", id }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`mb-14 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
