import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, CircleAlert, X } from "lucide-react";

const TONE_STYLES = {
  success: {
    icon: CircleCheck,
    iconClass: "text-accent",
    border: "border-accent/30",
  },
  error: {
    icon: CircleAlert,
    iconClass: "text-red-400",
    border: "border-red-400/30",
  },
};

export function Toast({ open, message, description, tone = "success", onClose }) {
  const config = TONE_STYLES[tone] ?? TONE_STYLES.success;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-6 left-1/2 z-[60] flex w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 items-start gap-3 rounded-2xl border ${config.border} bg-card/95 p-4 shadow-card backdrop-blur-xl`}
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
            <Icon className={`h-4 w-4 ${config.iconClass}`} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{message}</p>
            {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la notification"
              className="focus-ring rounded-lg p-1 text-muted transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
