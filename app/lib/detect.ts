export type Fantome = {
  nom: string;
  mensuel: number;
  annuel: number;
  fois: number;
  dernier: string;
};

export type Resultat =
  | { ok: true; fantomes: Fantome[]; lignes: number }
  | { ok: false; raison: "illisible" | "rien" };

type Operation = { jour: number; libelle: string; montant: number };

const sansAccents = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function decoupe(ligne: string, sep: string): string[] {
  const cases: string[] = [];
  let cur = "";
  let guillemets = false;
  for (const c of ligne) {
    if (c === '"') guillemets = !guillemets;
    else if (c === sep && !guillemets) {
      cases.push(cur.trim());
      cur = "";
    } else cur += c;
  }
  cases.push(cur.trim());
  return cases;
}

function nombre(s: string): number | null {
  let t = s.replace(/[\s\u00a0\u20ac]|EUR/gi, "");
  if (!/^[+-]?(\d{1,3}(\.\d{3})*,\d+|\d+([.,]\d+)?)$/.test(t)) return null;
  if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function jourDe(s: string): number | null {
  let m = s.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4}|\d{2})/);
  let j: number, mo: number, a: number;
  if (m) {
    j = +m[1];
    mo = +m[2];
    a = +m[3] < 100 ? 2000 + +m[3] : +m[3];
  } else {
    m = s.match(/^(\d{4})[/.\-](\d{1,2})[/.\-](\d{1,2})/);
    if (!m) return null;
    a = +m[1];
    mo =
