import { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { isValidEmail, normalizeEmail } from "../../lib/email";

const SUBMIT_DELAY = 900;

export function LoginForm({ onSuccess, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!isValidEmail(email)) {
      nextErrors.email = "Entrez une adresse email valide (ex. camille@entreprise.fr).";
    }
    if (password.length < 8) {
      nextErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    timerRef.current = window.setTimeout(
      () => onSuccess(normalizeEmail(email)),
      SUBMIT_DELAY
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mt-6">
      <div>
        <label
          htmlFor="login-email"
          className="mb-1.5 block text-xs font-medium text-fg/90"
        >
          Adresse email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="camille@entreprise.fr"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((current) => ({ ...current, email: "" }));
            }}
            disabled={status === "loading"}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className={`h-11 w-full rounded-xl border bg-white/[0.03] pl-10 pr-3.5 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60 ${
              errors.email
                ? "border-red-400/50 focus:border-red-400"
                : "border-white/10 focus:border-accent/60"
            }`}
          />
        </div>
        {errors.email && (
          <p id="login-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="login-password" className="text-xs font-medium text-fg/90">
            Mot de passe
          </label>
          <span className="text-[11px] text-muted">Démo : 8 caractères</span>
        </div>
        <div className="relative">
          <LockKeyhole
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((current) => ({ ...current, password: "" }));
            }}
            disabled={status === "loading"}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "login-password-error" : undefined}
            className={`h-11 w-full rounded-xl border bg-white/[0.03] pl-10 pr-11 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60 ${
              errors.password
                ? "border-red-400/50 focus:border-red-400"
                : "border-white/10 focus:border-accent/60"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:text-fg"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="login-password-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.password}
          </p>
        )}
      </div>

      <MagneticButton
        type="submit"
        disabled={status === "loading"}
        className="mt-5 h-11 w-full rounded-xl bg-signature text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            Connexion…
          </>
        ) : (
          "Se connecter"
        )}
      </MagneticButton>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        Mode démo : saisissez un email valide et un mot de passe de 8 caractères
        minimum. Aucune donnée n’est envoyée.
      </p>

      <button
        type="button"
        onClick={onSignup}
        className="focus-ring mt-3 w-full text-center text-xs font-semibold text-accent transition-colors hover:text-accent/80"
      >
        Pas encore de compte ? Essayer gratuitement
      </button>
    </form>
  );
}
