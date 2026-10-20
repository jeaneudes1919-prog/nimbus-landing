import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, X } from "lucide-react";
import { Logo } from "../brand/Logo";
import { LoginForm } from "./LoginForm";
import { LoginSuccess } from "./LoginSuccess";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { scrollToSection } from "../../lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function LoginModal({ open, onClose }) {
  const [successEmail, setSuccessEmail] = useState(null);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    setSuccessEmail(null);
    previousFocusRef.current = document.activeElement;

    return () => {
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function goToSignup() {
    onClose();
    window.setTimeout(() => scrollToSection("essai-gratuit"), 150);
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="login-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="surface relative w-full max-w-md overflow-hidden p-6 sm:p-7"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-[70px]"
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fenêtre de connexion"
              className="focus-ring absolute right-4 top-4 rounded-lg p-1.5 text-muted transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative">
              <Logo withWordmark={false} />
              <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <KeyRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 id="login-title" className="mt-4 text-xl font-bold tracking-tight">
                Bon retour parmi nous
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                Connectez-vous à votre espace Nimbus.
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {successEmail ? (
                <motion.div
                  key="login-success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginSuccess
                    email={successEmail}
                    onClose={onClose}
                    onSignup={goToSignup}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoginForm onSuccess={setSuccessEmail} onSignup={goToSignup} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
