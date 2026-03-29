/**
 * Heuristic for showing GDPR/ePrivacy-style notices (cookie banner, etc.).
 * Not a geo-IP substitute — uses browser locale and timezone only.
 */

const EU_EEA_UK_COUNTRY_CODES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "UK",
  "GI",
  "CH",
]);

/** IANA time zones commonly used in EU, EEA, UK, and CH (best-effort). */
const EU_EEA_UK_TIMEZONES = new Set([
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Busingen",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Mariehamn",
  "Europe/Monaco",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/San_Marino",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Vaduz",
  "Europe/Vatican",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Zurich",
  "Atlantic/Reykjavik",
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
]);

function regionFromLocales(): boolean {
  if (typeof navigator === "undefined") return false;
  const list = navigator.languages?.length ? [...navigator.languages] : [navigator.language];
  for (const lang of list) {
    const m = /^[a-z]{2}-([A-Z]{2})/.exec(lang);
    if (m && EU_EEA_UK_COUNTRY_CODES.has(m[1])) return true;
  }
  return false;
}

function regionFromTimeZone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return false;
    if (EU_EEA_UK_TIMEZONES.has(tz)) return true;
    return false;
  } catch {
    return false;
  }
}

/**
 * Returns true if the visitor is likely in the EU/EEA/UK/CH area for privacy notices.
 * False positives/negatives are possible; refine with server-side geo if required.
 */
export function isLikelyEuEeaOrUkVisitor(): boolean {
  if (typeof window === "undefined") return false;
  if (import.meta.env.VITE_FORCE_COOKIE_BANNER === "1") return true;
  return regionFromLocales() || regionFromTimeZone();
}
