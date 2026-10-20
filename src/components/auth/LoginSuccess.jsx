import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export function LoginSuccess({ email, onClose, onSignup }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative py-6 text-center">
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 16 }
        }
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15"
      >
        <CircleCheck className="h-7 w-7 text-accent" aria-hidden="true" />
      </motion.span>

      <h3 className="mt-4 text-lg font-semibold">Connexion réussie</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Bienvenue <span className="font-medium text-fg">{email}</span>.
        <br />
        Ceci est une simulation : aucune donnée n’a été transmise.
      </p>

      <MagneticButton
        type="button"
        onClick={onClose}
        className="mt-6 h-11 w-full rounded-xl bg-signature text-sm font-semibold text-white shadow-glow"
      >
        Fermer
      </MagneticButton>

      <button
        type="button"
        onClick={onSignup}
        className="focus-ring mt-3 text-xs font-semibold text-accent transition-colors hover:text-accent/80"
      >
        Pas encore de compte ? Essayer gratuitement
      </button>
    </div>
  );
}
