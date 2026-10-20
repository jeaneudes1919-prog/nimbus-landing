import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "../brand/Logo";
import { NAV_LINKS } from "../../data/site";
import { useScrolled } from "../../hooks/useScrolled";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { MagneticButton } from "../ui/MagneticButton";
import { LoginModal } from "../auth/LoginModal";
import { scrollToSection } from "../../lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const nodes = Array.from(menuRef.current.querySelectorAll(FOCUSABLE));
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

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector(FOCUSABLE)?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-bg/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className={`container-page relative z-20 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <a href="#top" className="focus-ring rounded-xl" aria-label="Nimbus — retour en haut">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Se connecter
          </button>
          <MagneticButton
            onClick={() => scrollToSection("essai-gratuit")}
            className="h-10 rounded-full bg-white px-5 text-sm font-semibold text-bg transition-colors hover:bg-fg"
          >
            Essai gratuit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.08] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-10 flex flex-col overflow-y-auto bg-bg/[0.98] px-6 pb-10 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
              className="flex flex-1 flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="focus-ring block border-b border-white/[0.06] py-4 text-2xl font-semibold tracking-tight text-fg transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="mt-8 flex flex-col gap-3"
            >
              <a
                href="#essai-gratuit"
                onClick={closeMenu}
                className="focus-ring flex h-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-bg"
              >
                Essai gratuit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#tarifs"
                onClick={closeMenu}
                className="focus-ring flex h-12 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-fg"
              >
                Voir les tarifs
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
