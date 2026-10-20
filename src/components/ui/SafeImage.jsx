import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * Image robuste : affiche un dégradé + icône pendant le chargement
 * et en cas d'erreur. Fondu à l'apparition, jamais d'image cassée.
 */
export function SafeImage({ src, alt, className = "", imgClassName = "", ...props }) {
  const [status, setStatus] = useState("loading");

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/25 via-card to-accent/20 ${className}`}>
      {status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          {...props}
        />
      )}
      {status !== "loaded" && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {status === "error" ? (
            <ImageOff className="h-5 w-5 text-white/60" />
          ) : (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/70 motion-reduce:animate-none" />
          )}
        </div>
      )}
    </div>
  );
}
