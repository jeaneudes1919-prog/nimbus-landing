export function Logo({ className = "", withWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Logo Nimbus"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="nimbus-mark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        <path
          d="M20 44V24c0-2 2-3 4-2l16 10v-8c0-2 2-3 4-2v20c0 2-2 3-4 2L24 34v10c0 2-2 3-4 2z"
          fill="url(#nimbus-mark)"
        />
      </svg>
      {withWordmark && (
        <span className="text-[1.35rem] font-bold tracking-tight">
          Nimbus<span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}
