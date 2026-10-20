import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, LifeBuoy, Map } from "lucide-react";
import { Container } from "../components/ui/Container";

const SUGGESTIONS = [
  {
    icon: Map,
    title: "Découvrir les fonctionnalités",
    description: "Workflows sans code, analytics, sécurité…",
    href: "/#fonctionnalites",
  },
  {
    icon: Compass,
    title: "Comparer les tarifs",
    description: "Starter, Pro ou Entreprise — −20 % en annuel.",
    href: "/#tarifs",
  },
  {
    icon: LifeBuoy,
    title: "Consulter la FAQ",
    description: "Essai, sécurité, intégrations, facturation.",
    href: "/#faq",
  },
];

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px] animate-aurora motion-reduce:animate-none"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-signature text-[clamp(5rem,18vw,9rem)] font-bold leading-none tracking-tighter"
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Cette page s’est perdue dans les nuages.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base"
          >
            Le lien est peut-être obsolète ou la page a été déplacée. Pas de
            panique : tout ce dont vous avez besoin est à un clic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-8"
          >
            <Link
              to="/"
              className="focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-signature px-7 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour à l’accueil
            </Link>
          </motion.div>

          <div className="mt-14 grid w-full gap-3 sm:grid-cols-3">
            {SUGGESTIONS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + index * 0.08 }}
              >
                <Link
                  to={item.href}
                  className="surface focus-ring group flex h-full flex-col items-start gap-2 p-4 text-left transition-colors hover:border-white/20"
                >
                  <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="text-sm font-semibold">{item.title}</span>
                  <span className="text-xs leading-relaxed text-muted">
                    {item.description}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
