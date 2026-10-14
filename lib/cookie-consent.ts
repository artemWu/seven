export const COOKIE_CONSENT_KEY = "seven-cookie-consent";
export const COOKIE_CONSENT_EVENT = "seven-cookie-consent-updated";

export function hasCookieConsent() {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}
