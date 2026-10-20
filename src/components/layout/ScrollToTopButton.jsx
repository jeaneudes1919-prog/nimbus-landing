import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";

const VISIBILITY_THRESHOLD = 600;

export function ScrollToTopButton() {
  const visible = useScrolled(VISIBILITY_THRESHOLD);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Revenir en haut de la page"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="focus-ring fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-card/90 text-fg shadow-card backdrop-blur-xl transition-colors hover:border-accent/40 hover:text-accent"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
