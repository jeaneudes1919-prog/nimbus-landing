import { Logo } from "../brand/Logo";
import { Container } from "../ui/Container";
import { FOOTER_COLUMNS, SITE, SOCIALS } from "../../data/site";

const SOCIAL_PATHS = {
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V23H.24V8.25zM8.34 8.25h4.33v2.01h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.5v-7.16c0-1.71-.03-3.9-2.38-3.9-2.38 0-2.74 1.86-2.74 3.78V23h-4.5V8.25z",
  x: "M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 3.9H5.3L17.7 20z",
  github:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0022 12.25C22 6.58 17.52 2 12 2z",
};

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d={SOCIAL_PATHS[name] ?? SOCIAL_PATHS.x} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#08080E] pb-10 pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {SITE.tagline} Connectez vos outils, composez vos workflows et
              laissez vos équipes se concentrer sur l’essentiel.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`Nimbus sur ${social.label}`}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-fg"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Liens du pied de page"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-fg/90">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="focus-ring rounded text-sm text-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nimbus. Tous droits réservés.</p>
          <p className="max-w-md sm:text-right">
            {SITE.legal} — Démo de portfolio, aucune donnée réelle n’est collectée.
          </p>
        </div>
      </Container>
    </footer>
  );
}
