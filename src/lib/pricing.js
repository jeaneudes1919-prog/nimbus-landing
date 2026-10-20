export const ANNUAL_DISCOUNT = 0.2;
export const MONTHS_PER_YEAR = 12;

export const BILLING = {
  monthly: "monthly",
  annual: "annual",
};

function round2(value) {
  return Math.round(value * 100) / 100;
}

/**
 * Prix mensuel équivalent selon la facturation.
 * Annuel = -20 % appliqué au prix mensuel.
 */
export function getMonthlyEquivalent(baseMonthlyPrice, billing) {
  const base = Number(baseMonthlyPrice);
  if (!Number.isFinite(base) || base < 0) return 0;
  if (billing === BILLING.annual) return round2(base * (1 - ANNUAL_DISCOUNT));
  return round2(base);
}

/**
 * Total facturé sur 12 mois selon la facturation.
 */
export function getAnnualTotal(baseMonthlyPrice, billing) {
  return round2(getMonthlyEquivalent(baseMonthlyPrice, billing) * MONTHS_PER_YEAR);
}

export function getYearlySavings(baseMonthlyPrice) {
  return round2(
    getMonthlyEquivalent(baseMonthlyPrice, BILLING.monthly) * MONTHS_PER_YEAR -
      getAnnualTotal(baseMonthlyPrice, BILLING.annual)
  );
}

export function formatPrice(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "0 €";
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}
