import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Counter } from "../ui/Counter";
import { STATS } from "../../data/stats";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative py-16 sm:py-20">
      <Container>
        <div className="surface relative overflow-hidden px-5 py-10 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_0%,rgba(124,92,255,0.16),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <p
              id="stats-title"
              className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted"
            >
              Nimbus en chiffres
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative text-center lg:border-l lg:border-white/[0.07] lg:first:border-l-0"
                >
                  <dd className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 text-sm font-medium text-fg/90">{stat.label}</dt>
                  <p className="mt-1 text-xs text-muted">{stat.detail}</p>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
