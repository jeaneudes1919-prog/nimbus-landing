import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { PLANS } from "../../data/pricing";
import {
  BILLING,
  formatPrice,
  getAnnualTotal,
  getMonthlyEquivalent,
  getYearlySavings,
} from "../../lib/pricing";
import { readStorage, writeStorage } from "../../lib/storage";

const STORAGE_KEY = "nimbus:billing";

function BillingToggle({ billing, onChange }) {
  return (
    <div
      role="group"
      aria-label="Période de facturation"
      className="relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1"
    >
      {[
        { value: BILLING.monthly, label: "Mensuel" },
        { value: BILLING.annual, label: "Annuel" },
      ].map((option) => {
        const active = billing === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`focus-ring relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active ? "text-white" : "text-muted hover:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId="billing-thumb"
                className="absolute inset-0 rounded-full bg-signature"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative z-10">
              {option.label}
              {option.value === BILLING.annual && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    active ? "bg-white/20 text-white" : "bg-accent/15 text-accent"
                  }`}
                >
                  −20 %
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, billing, index }) {
  const monthlyPrice = getMonthlyEquivalent(plan.monthlyPrice, billing);
  const annualTotal = getAnnualTotal(plan.monthlyPrice, billing);
  const savings = getYearlySavings(plan.monthlyPrice);
  const highlighted = plan.highlighted;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full flex-col rounded-3xl ${
        highlighted
          ? "bg-gradient-to-b from-primary/70 via-primary/25 to-accent/50 p-px shadow-soft lg:-my-4"
          : ""
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-signature px-3 py-1 text-[11px] font-semibold text-white shadow-glow">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {plan.badge}
        </span>
      )}

      <div
        className={`flex h-full flex-col rounded-3xl border p-6 sm:p-7 ${
          highlighted
            ? "border-transparent bg-[#0C0C14]"
            : "border-white/[0.08] bg-white/[0.025]"
        }`}
      >
        <header>
          <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
          <p className="mt-1.5 min-h-[40px] text-sm leading-relaxed text-muted">
            {plan.description}
          </p>
        </header>

        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${plan.id}-${billing}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="flex items-end gap-1.5"
            >
              <span
                data-testid={`plan-price-${plan.id}`}
                className="text-4xl font-bold tracking-tight tabular sm:text-5xl"
              >
                {formatPrice(monthlyPrice)}
              </span>
              <span className="pb-1.5 text-sm text-muted">/mois</span>
            </motion.div>
          </AnimatePresence>
          <p className="mt-2 min-h-[20px] text-xs text-muted">
            {billing === BILLING.annual ? (
              <>
                Facturé {formatPrice(annualTotal)} par an ·{" "}
                <span className="font-medium text-accent">économisez {formatPrice(savings)}</span>
              </>
            ) : (
              "Sans engagement, résiliable à tout moment"
            )}
          </p>
        </div>

        <a
          href="#essai-gratuit"
          className={`focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-all ${
            highlighted
              ? "bg-signature text-white shadow-glow hover:brightness-110"
              : "border border-white/10 bg-white/[0.04] text-fg hover:bg-white/[0.08]"
          }`}
        >
          {plan.cta}
        </a>

        <ul className="mt-7 space-y-3 border-t border-white/[0.07] pt-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/85">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15">
                <Check className="h-2.5 w-2.5 text-accent" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState(() => {
    const stored = readStorage(STORAGE_KEY, BILLING.monthly);
    return stored === BILLING.annual ? BILLING.annual : BILLING.monthly;
  });

  function handleBillingChange(value) {
    setBilling(value);
    writeStorage(STORAGE_KEY, value);
  }

  return (
    <section id="tarifs" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(124,92,255,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Tarifs"
            title="Un prix simple, une valeur évidente."
            description="Commencez gratuitement pendant 14 jours. Changez d'offre ou annulez quand vous voulez, sans frais cachés."
            align="center"
          />
          <div className="-mt-6 mb-12">
            <BillingToggle billing={billing} onChange={handleBillingChange} />
            <p className="mt-3 text-center text-xs text-muted">
              {billing === BILLING.annual
                ? "2 mois offerts par rapport au mensuel."
                : "Passez à l'annuel pour économiser 20 %."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} index={index} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Prix HT. TVA applicable selon votre pays. Paiement sécurisé par carte bancaire.
        </p>
      </Container>
    </section>
  );
}
