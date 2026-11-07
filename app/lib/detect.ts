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
    mo = +m[2];
    j = +m[3];
  }
  if (mo < 1 || mo > 12 || j < 1 || j > 31) return null;
  return Math.floor(Date.UTC(a, mo - 1, j) / 86400000);
}

const BRUIT = new Set(
  (
    "PRLV PRELEVEMENT PRELEV SEPA CB CARTE PAIEMENT PAIEMENTS ACHAT FACTURE FACT REF ECH ECHEANCE " +
    "DE DU LE LA LES DES MANDAT NUM NO VIR VIREMENT PAR EUR FR COM WWW HTTP HTTPS TIP DOM ID"
  ).split(" ")
);

function cle(libelle: string): string {
  const mots = sansAccents(libelle)
    .toUpperCase()
    .replace(/\d{1,2}[/.]\d{1,2}([/.]\d{2,4})?/g, " ")
    .replace(/[^A-Z0-9+ ]/g, " ")
    .split(/\s+/)
    .filter((m) => m.length >= 2 && !/\d/.test(m.replace("+", "")) && !BRUIT.has(m));
  return mots.slice(0, 2).join(" ");
}

function joli(k: string): string {
  return k
    .toLowerCase()
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

function mediane(v: number[]): number {
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function lireOperations(texte: string): Operation[] {
  const lignes = texte.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lignes.length < 2) return [];
  const sep = [";", "\t", ","]
    .map((s) => [s, lignes.slice(0, 10).join("\n").split(s).length] as const)
    .sort((a, b) => b[1] - a[1])[0][0];

  let iDate = -1,
    iLib = -1,
    iMontant = -1,
    iDebit = -1,
    iCredit = -1,
    debut = 0;

  for (let i = 0; i < Math.min(lignes.length, 15); i++) {
    const c = decoupe(lignes[i], sep).map((x) => sansAccents(x).toLowerCase());
    const d = c.findIndex((x) => x.includes("date"));
    const m = c.findIndex((x) => x.includes("montant") || x.includes("amount"));
    const db = c.findIndex((x) => x.startsWith("debit"));
    if (d >= 0 && (m >= 0 || db >= 0)) {
      iDate = d;
      iMontant = m;
      iDebit = db;
      iCredit = c.findIndex((x) => x.startsWith("credit"));
      iLib = c.findIndex((x) => !x.includes("date") && /libelle|label|description|operation|detail|intitule|nature/.test(x));
      debut = i + 1;
      break;
    }
  }

  const ops: Operation[] = [];
  for (const l of lignes.slice(debut)) {
    const c = decoupe(l, sep);
    let jour: number | null = null;
    let libelle = "";
    let montant: number | null = null;

    if (iDate >= 0) {
      jour = jourDe(c[iDate] ?? "");
      if (iLib >= 0) libelle = c[iLib] ?? "";
      if (iDebit >= 0) {
        const deb = nombre(c[iDebit] ?? "");
        const cre = iCredit >= 0 ? nombre(c[iCredit] ?? "") : null;
        if (deb !== null && deb !== 0) montant = -Math.abs(deb);
        else if (cre !== null) montant = Math.abs(cre);
      } else if (iMontant >= 0) montant = nombre(c[iMontant] ?? "");
      if (!libelle)
        libelle = c.filter((x, k) => k !== iDate && nombre(x) === null && jourDe(x) === null).sort((a, b) => b.length - a.length)[0] ?? "";
    } else {
      const k = c.findIndex((x) => jourDe(x) !== null);
      if (k < 0) continue;
      jour = jourDe(c[k]);
      const nums = c.map((x, i) => [i, nombre(x)] as const).filter(([i, n]) => i !== k && n !== null);
      if (nums.length) montant = nums[nums.length - 1][1];
      libelle = c.filter((x, i) => i !== k && nombre(x) === null && jourDe(x) === null).sort((a, b) => b.length - a.length)[0] ?? "";
    }
    if (jour === null || montant === null || !libelle) continue;
    ops.push({ jour, libelle, montant });
  }

  if (ops.length && !ops.some((o) => o.montant < 0) && iDebit < 0) {
    return ops
      .filter((o) => !/^(VIR|VIREMENT|SALAIRE|REMISE)/i.test(sansAccents(o.libelle).trim()))
      .map((o) => ({ ...o, montant: -Math.abs(o.montant) }));
  }
  return ops.filter((o) => o.montant < 0);
}

export function detecter(texte: string): Resultat {
  const ops = lireOperations(texte);
  if (ops.length < 3) return { ok: false, raison: "illisible" };

  const groupes = new Map<string, Operation[]>();
  for (const o of ops) {
    const k = cle(o.libelle);
    if (!k) continue;
    groupes.set(k, [...(groupes.get(k) ?? []), o]);
  }

  const fantomes: Fantome[] = [];
  for (const [k, liste] of groupes) {
    if (liste.length < 2) continue;
    const med = mediane(liste.map((o) => Math.abs(o.montant)));
    const tol = Math.max(0.5, med * 0.05);
    const proches = liste
      .filter((o) => Math.abs(Math.abs(o.montant) - med) <= tol)
      .sort((a, b) => a.jour - b.jour);
    if (proches.length < 2 || proches.length < liste.length * 0.6) continue;

    const ecarts = proches.slice(1).map((o, i) => o.jour - proches[i].jour);
    const e = mediane(ecarts);
    if (e < 24 || e > 38) continue;
    if (ecarts.filter((x) => x >= 20 && x <= 42).length < ecarts.length * 0.6) continue;

    const mensuel = mediane(proches.map((o) => Math.abs(o.montant)));
    const dernier = new Date(proches[proches.length - 1].jour * 86400000);
    fantomes.push({
      nom: joli(k),
      mensuel,
      annuel: mensuel * 12,
      fois: proches.length,
      dernier: dernier.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
    });
  }

  if (!fantomes.length) return { ok: false, raison: "rien" };
  fantomes.sort((a, b) => b.annuel - a.annuel);
  return { ok: true, fantomes, lignes: ops.length };
      }
