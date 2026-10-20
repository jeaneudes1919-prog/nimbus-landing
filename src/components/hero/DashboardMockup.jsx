import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutGrid,
  Workflow,
  Plug,
  Users,
  Settings,
  TrendingUp,
  CircleCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const CHART = [42, 58, 36, 72, 54, 84, 62, 90, 48, 76, 68, 96];
const DAYS = ["L", "M", "M", "J", "V", "S", "D", "L", "M", "M", "J", "V"];

const NAV = [
  { label: "Vue d'ensemble", icon: LayoutGrid, active: true },
  { label: "Workflows", icon: Workflow },
  { label: "Intégrations", icon: Plug },
  { label: "Équipe", icon: Users },
  { label: "Réglages", icon: Settings },
];

const ACTIVITY = [
  { label: "Lead HubSpot → Slack", time: "il y a 12 s", tone: "text-accent" },
  { label: "Facture Stripe envoyée", time: "il y a 3 min", tone: "text-primary" },
  { label: "Rapport hebdo généré", time: "il y a 18 min", tone: "text-accent" },
];

const STATS = [
  { label: "Exécutions", value: "12 480", delta: "+18,4 %", icon: Zap },
  { label: "Temps gagné", value: "38,2 h", delta: "+6,3 h", icon: TrendingUp },
  { label: "Workflows actifs", value: "24", delta: "+3", icon: Workflow },
];

export function DashboardMockup() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Cartes flottantes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -right-4 -top-6 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-card backdrop-blur-xl sm:flex lg:-right-10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
          <CircleCheck className="h-5 w-5 text-accent" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-fg">Workflow terminé</p>
          <p className="text-[11px] text-muted">142 tâches · 0 erreur</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.5 }}
        className="absolute -bottom-8 -left-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-card backdrop-blur-xl sm:flex lg:-left-10"
        style={reducedMotion ? undefined : { animation: "float 7s ease-in-out infinite" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
          <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-fg">38 % de temps gagné</p>
          <p className="text-[11px] text-muted">ce mois-ci, toute l’équipe</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
      </motion.div>

      {/* Fenêtre applicative */}
      <div className="surface overflow-hidden rounded-2xl border-white/10 bg-[#0B0B12]/95 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95)]">
        {/* Barre de fenêtre */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-md items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.03] text-[11px] text-muted">
            app.nimbus.app/dashboard
          </div>
          <div className="hidden w-12 sm:block" aria-hidden="true" />
        </div>

        <div className="flex min-h-[420px]">
          {/* Sidebar */}
          <aside className="hidden w-44 shrink-0 flex-col border-r border-white/[0.06] p-3 md:flex">
            <div className="mb-4 flex items-center gap-2 px-2 py-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-signature text-[10px] font-bold text-white">
                N
              </span>
              <span className="text-sm font-semibold">Nimbus</span>
              <span className="ml-auto rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-medium text-muted">
                Pro
              </span>
            </div>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <span
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${
                      item.active
                        ? "bg-white/[0.07] font-semibold text-fg"
                        : "text-muted"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
              <p className="text-[11px] font-semibold text-fg">Plan Pro</p>
              <p className="mt-1 text-[10px] text-muted">18 240 / 25 000 exécutions</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[73%] rounded-full bg-signature" />
              </div>
            </div>
          </aside>

          {/* Contenu */}
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted">Vue d’ensemble</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  Bonjour Camille 👋
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot motion-reduce:animate-none" />
                Tous les systèmes opérationnels
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
                    <stat.icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xl font-semibold tabular">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-accent">{stat.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
              {/* Graphique */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Exécutions de workflows</p>
                  <span className="text-[10px] text-muted">7 derniers jours</span>
                </div>
                <div className="mt-4 flex h-32 items-end gap-1.5">
                  {CHART.map((height, index) => (
                    <motion.div
                      key={index}
                      initial={reducedMotion ? false : { scaleY: 0 }}
                      whileInView={reducedMotion ? undefined : { scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ height: `${height}%` }}
                      className={`flex-1 origin-bottom rounded-sm ${
                        index % 4 === 3
                          ? "bg-gradient-to-t from-primary/40 to-accent"
                          : "bg-gradient-to-t from-primary/15 to-primary/60"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5 text-[9px] text-muted">
                  {DAYS.map((day, index) => (
                    <span key={index} className="flex-1 text-center">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activité */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 lg:col-span-2">
                <p className="text-xs font-semibold">Activité récente</p>
                <ul className="mt-3 space-y-3">
                  {ACTIVITY.map((item) => (
                    <li key={item.label} className="flex items-start gap-2">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${item.tone}`} />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium text-fg">{item.label}</p>
                        <p className="text-[10px] text-muted">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
                  <p className="text-[10px] text-muted">Prochaine exécution</p>
                  <p className="mt-0.5 text-[11px] font-medium">Rapport hebdo · demain 08:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
