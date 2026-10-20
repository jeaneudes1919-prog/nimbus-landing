import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { Badge } from "../ui/Badge";
import { MagneticButton } from "../ui/MagneticButton";
import { SafeImage } from "../ui/SafeImage";
import { DashboardMockup } from "./DashboardMockup";
import { scrollToSection } from "../../lib/scroll";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
];

const TILT = 6;

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [TILT, -TILT]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-TILT, TILT]), {
    stiffness: 120,
    damping: 20,
  });
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 800], [0, reducedMotion ? 0 : 70]);

  function handlePointerMove(event) {
    if (reducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="noise relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[140px] animate-aurora motion-reduce:animate-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[130px] animate-aurora-slow motion-reduce:animate-none"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge icon={Sparkles}>Nouveau — Nimbus 2.0 avec agents IA</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-balance text-[clamp(2.6rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em]"
          >
            Libérez vos équipes du travail{" "}
            <span className="relative inline-block">
              <span className="text-signature">répétitif.</span>
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/50"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 140 2 298 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            Nimbus connecte vos outils et automatise vos workflows en quelques
            minutes. Sans code, sans friction — pour que vos équipes se
            concentrent enfin sur ce qui compte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <MagneticButton
              type="button"
              onClick={() => scrollToSection("essai-gratuit")}
              className="group h-12 w-full rounded-full bg-signature px-7 text-sm font-semibold text-white shadow-glow transition-shadow hover:shadow-[0_0_60px_-10px_rgba(124,92,255,0.8)] sm:w-auto"
            >
              Démarrer gratuitement
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </MagneticButton>
            <a
              href="#comment-ca-marche"
              className="focus-ring group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 text-sm font-semibold text-fg backdrop-blur transition-colors hover:bg-white/[0.07] sm:w-auto"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <Play className="h-3 w-3 fill-current" aria-hidden="true" />
              </span>
              Voir la démo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <div className="flex -space-x-2.5">
              {AVATARS.map((src, index) => (
                <SafeImage
                  key={src}
                  src={src}
                  alt={`Membre d'équipe ${index + 1}`}
                  className="h-8 w-8 rounded-full border-2 border-bg"
                />
              ))}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg bg-card text-[10px] font-semibold text-muted">
                2k+
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-fg">4,9/5</strong> — 2 500+
                équipes conquises
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="perspective relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <motion.div
            style={{
              rotateX: reducedMotion ? 0 : rotateX,
              rotateY: reducedMotion ? 0 : rotateY,
            }}
            className="preserve-3d relative"
          >
            <div
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-primary/25 via-transparent to-accent/25 blur-2xl"
              aria-hidden="true"
            />
            <DashboardMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
