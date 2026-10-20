import { CLIENTS } from "../../data/clients";

const ITEMS = [...CLIENTS, ...CLIENTS];

export function LogoMarquee() {
  return (
    <section
      aria-label="Entreprises qui utilisent Nimbus"
      className="relative border-y border-white/[0.06] bg-white/[0.015] py-10"
    >
      <div className="container-page">
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
          Ils automatisent déjà avec Nimbus
        </p>
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {ITEMS.map((client, index) => (
            <span
              key={`${client}-${index}`}
              className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-muted/70 transition-colors hover:text-fg sm:text-xl"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
