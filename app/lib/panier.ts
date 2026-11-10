import type { Fantome } from "./detect";

export const PRIX = 9.99;
const CLE = "fantomes-resultat";

export function garder(liste: Fantome[]) {
  try {
    localStorage.setItem(CLE, JSON.stringify(liste));
  } catch {}
}

export function reprendre(): Fantome[] | null {
  try {
    const t = localStorage.getItem(CLE);
    if (!t) return null;
    const v = JSON.parse(t);
    return Array.isArray(v) && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}
