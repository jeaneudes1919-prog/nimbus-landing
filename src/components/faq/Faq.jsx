import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessagesSquare, ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FAQ_ITEMS } from "../../data/faq";

export function Faq() {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title="Les réponses avant même de poser la question."
              description="Tout ce qu'il faut savoir sur l'essai, la sécurité, les intégrations et la facturation."
            />
            <div className="surface -mt-4 flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MessagesSquare className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Une autre question ?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Notre équipe répond en moins de 2 heures ouvrées.
                </p>
                <a
                  href="#essai-gratuit"
                  className="focus-ring mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
                >
                  Contacter le support
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface divide-y divide-white/[0.07] overflow-hidden p-0">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id}>
                    <h3>
                      <button
                        type="button"
                        id={`faq-trigger-${item.id}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        onClick={() => toggle(item.id)}
                        className="focus-ring flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] sm:px-6"
                      >
                        <span className="text-sm font-medium text-fg sm:text-base">
                          {item.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen
                              ? "border-accent/30 bg-accent/10 text-accent"
                              : "border-white/10 bg-white/[0.03] text-muted"
                          }`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={`faq-panel-${item.id}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 pr-12 text-sm leading-relaxed text-muted sm:px-6">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
