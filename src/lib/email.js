/**
 * Validation d'email volontairement stricte mais pragmatique :
 * - pas d'espaces
 * - une seule @
 * - un domaine avec au moins un point et une extension de 2+ caractères
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length === 0 || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

export function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}
