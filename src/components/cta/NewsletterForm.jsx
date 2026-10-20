import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { Toast } from "../ui/Toast";
import { isValidEmail, normalizeEmail } from "../../lib/email";

const SUBMIT_DELAY = 1400;
const TOAST_DURATION = 4000;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const submitTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(submitTimerRef.current);
      window.clearTimeout(toastTimerRef.current);
    },
    []
  );

  function handleSubmit(event) {
    event.preventDefault();
    const value = normalizeEmail(email);

    if (!isValidEmail(value)) {
      setError(
        "Hmm, cette adresse email semble invalide. Vérifiez le format (ex. camille@entreprise.fr)."
      );
      setStatus("idle");
      return;
    }

    setError("");
    setStatus("loading");

    submitTimerRef.current = window.setTimeout(() => {
      setStatus("success");
      setToastOpen(true);
      toastTimerRef.current = window.setTimeout(
        () => setToastOpen(false),
        TOAST_DURATION
      );
    }, SUBMIT_DELAY);
  }

  function resetForm() {
    setStatus("idle");
    setEmail("");
    setError("");
  }

  return (
    <div className="surface p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 16, delay: 0.1 }
              }
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15"
            >
              <CircleCheck className="h-8 w-8 text-accent" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-5 text-lg font-semibold">
              Bienvenue dans la boucle&nbsp;!
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Votre guide de démarrage arrive dans quelques instants dans votre
              boîte mail.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="focus-ring mt-6 text-xs font-semibold text-accent transition-colors hover:text-accent/80"
            >
              Inscrire une autre adresse
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="text-sm font-semibold">Recevoir le guide de démarrage</p>
            <p className="mt-1 text-xs text-muted">
              Un email par mois maximum. Désinscription en un clic.
            </p>

            <div className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="camille@entreprise.fr"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  disabled={status === "loading"}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className={`h-12 w-full rounded-xl border bg-white/[0.03] pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60 ${
                    error
                      ? "border-red-400/50 focus:border-red-400"
                      : "border-white/10 focus:border-accent/60"
                  }`}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    id="newsletter-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex items-start gap-1.5 text-xs text-red-400"
                  >
                    <CircleAlert
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <MagneticButton
              type="submit"
              disabled={status === "loading"}
              className="mt-4 h-12 w-full rounded-xl bg-signature text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  Commencer l’essai gratuit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </MagneticButton>

            {status === "loading" && (
              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-white/[0.07] motion-reduce:animate-none" />
                <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-white/[0.05] motion-reduce:animate-none" />
              </div>
            )}

            <p className="mt-4 text-center text-[11px] text-muted">
              En vous inscrivant, vous acceptez notre politique de
              confidentialité.
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <Toast
        open={toastOpen}
        tone="success"
        message="Inscription confirmée !"
        description="Vérifiez votre boîte mail pour le guide de démarrage."
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
