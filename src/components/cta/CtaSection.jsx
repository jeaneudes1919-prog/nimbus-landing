import { CreditCard, Sparkles, Timer } from "lucide-react";
import { Container } from "../ui/Container";
import { NewsletterForm } from "./NewsletterForm";

const GUARANTEES = [
  { icon: Timer, label: "14 jours d'essai, sans engagement" },
  { icon: CreditCard, label: "Aucune carte bancaire requise" },
  { icon: Sparkles, label: "Installation guidée en 2 minutes" },
];

export function CtaSection() {
  return (
    <section id="essai-gratuit" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/40 via-white/[0.06] to-accent/40 p-px">
          <div className="noise relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#0A0A12] px-6 py-12 sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
              aria-hidden="true"
            />

            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Prêt à récupérer <span className="text-signature">vos journées ?</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                  Rejoignez 2 500+ équipes qui automatisent leurs opérations avec
                  Nimbus. Recevez votre guide de démarrage et un accès anticipé
                  aux nouveautés.
                </p>

                <ul className="mt-8 space-y-3">
                  {GUARANTEES.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 text-sm text-fg/85"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
