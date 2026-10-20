export function Badge({ children, icon: Icon, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-fg/90 backdrop-blur-md ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {Icon && <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
      {children}
    </span>
  );
}
