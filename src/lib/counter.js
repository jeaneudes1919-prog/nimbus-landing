export function easeOutCubic(progress) {
  const t = Math.min(Math.max(progress, 0), 1);
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Valeur entière d'un compteur animé pour une progression 0 → 1.
 * À progress = 1, la valeur est exactement la cible.
 */
export function counterValue(target, progress) {
  const safeTarget = Number.isFinite(Number(target)) ? Number(target) : 0;
  return Math.round(safeTarget * easeOutCubic(progress));
}

export function formatStat(value) {
  return new Intl.NumberFormat("fr-FR").format(value);
}
