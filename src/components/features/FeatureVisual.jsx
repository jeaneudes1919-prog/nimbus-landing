import { motion } from "framer-motion";
import { Zap, Shield, Lock, ArrowUpRight, Check } from "lucide-react";

const NODES = [
  { label: "Nouveau ticket", top: "6%", left: "0%" },
  { label: "IA qualifie", top: "38%", left: "36%" },
  { label: "Slack notifié", top: "10%", left: "74%" },
];

function WorkflowVisual() {
  return (
    <div className="relative h-32 w-full">
      <svg className="absolute inset-0 h-full w-full text-white/15" aria-hidden="true">
        <path d="M52 34 C110 34 110 78 168 78" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <path d="M218 70 C240 50 250 44 268 40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      </svg>
      {NODES.map((node, index) => (
        <div
          key={node.label}
          className="absolute flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#12121C]/90 px-2.5 py-1.5 text-[9px] font-medium text-fg/90 shadow-lg"
          style={{ top: node.top, left: node.left }}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              index === 1 ? "bg-accent" : "bg-primary"
            }`}
          />
          {node.label}
        </div>
      ))}
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]"
        animate={{ left: ["12%", "40%", "78%"], top: ["30%", "52%", "34%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function PulseVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute h-20 w-20 rounded-full border border-accent/30"
          animate={{ scale: [0.6, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.8, ease: "easeOut" }}
        />
      ))}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
        <Zap className="h-6 w-6 text-accent" aria-hidden="true" />
      </span>
      <span className="absolute bottom-2 right-3 rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent">
        42 ms
      </span>
    </div>
  );
}

function TeamVisual() {
  const members = [
    { initials: "CR", tone: "from-primary to-[#5B43D6]" },
    { initials: "TL", tone: "from-accent to-[#0E9FB8]" },
    { initials: "SB", tone: "from-[#F472B6] to-[#BE185D]" },
    { initials: "MD", tone: "from-[#FBBF24] to-[#B45309]" },
  ];
  return (
    <div className="relative flex h-32 items-center justify-center gap-0">
      {members.map((member, index) => (
        <motion.span
          key={member.initials}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }}
          className={`-ml-2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#111118] bg-gradient-to-br text-[11px] font-bold text-white first:ml-0 ${member.tone}`}
        >
          {member.initials}
        </motion.span>
      ))}
      <span className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/20 text-[10px] font-semibold text-muted">
        +8
      </span>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[9px] text-muted">
        4 rôles · permissions fines
      </span>
    </div>
  );
}

const BARS = [38, 54, 46, 68, 58, 82, 72, 94];

function ChartVisual() {
  return (
    <div className="flex h-32 items-end gap-1.5 px-1 pb-1">
      {BARS.map((height, index) => (
        <motion.div
          key={index}
          initial={{ scaleY: 0.15 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: `${height}%` }}
          className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-primary/20 via-primary/50 to-accent"
        />
      ))}
      <span className="ml-1 mb-1 flex items-center gap-0.5 text-[10px] font-semibold text-accent">
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        +38 %
      </span>
    </div>
  );
}

const TOOLS = ["Sl", "No", "St", "Hs", "Fi", "Ai"];

function IntegrationsVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signature text-sm font-bold text-white shadow-glow">
        N
      </span>
      {TOOLS.map((tool, index) => {
        const angle = (index / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 46;
        return (
          <motion.span
            key={tool}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
            className="absolute flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#15151F] text-[8px] font-bold text-fg/80"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px - 14px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px - 14px)`,
            }}
          >
            {tool}
          </motion.span>
        );
      })}
      <span className="absolute bottom-0 text-[9px] text-muted">150+ connecteurs natifs</span>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center gap-6">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,rgba(34,211,238,0.6),transparent_45%,rgba(124,92,255,0.6))]"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <span className="absolute inset-[2px] rounded-2xl bg-[#111118]" />
        <Shield className="relative h-7 w-7 text-accent" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        {["AES-256", "SSO & SCIM", "ISO 27001"].map((label) => (
          <span key={label} className="flex items-center gap-1.5 text-[10px] text-muted">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-2 w-2 text-accent" aria-hidden="true" />
            </span>
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <Lock className="h-3 w-3 text-accent" aria-hidden="true" />
          Hébergé en UE
        </span>
      </div>
    </div>
  );
}

const VISUALS = {
  workflow: WorkflowVisual,
  pulse: PulseVisual,
  team: TeamVisual,
  chart: ChartVisual,
  integrations: IntegrationsVisual,
  security: SecurityVisual,
};

export function FeatureVisual({ name }) {
  const Visual = VISUALS[name] ?? WorkflowVisual;
  return <Visual />;
}
