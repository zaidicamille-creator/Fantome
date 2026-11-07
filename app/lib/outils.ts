export const questions = [
  {
    titre: "Combien d'abonnements penses-tu avoir ?",
    options: ["1 à 3", "4 à 6", "7 à 10", "Plus de 10"],
  },
  {
    titre: "Combien paies-tu par mois en tout, à ton avis ?",
    options: ["Moins de 20 €", "20 à 50 €", "50 à 100 €", "Plus de 100 €"],
    valeurs: [15, 35, 75, 120],
  },
  {
    titre: "Quand as-tu vérifié tes prélèvements pour la dernière fois ?",
    options: ["Ce mois-ci", "Il y a quelques mois", "Il y a plus d'un an", "Jamais vraiment"],
  },
];

export const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

export const euros2 = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

export function exemple(): string {
  const jour = (m: number, j: number) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - m);
    d.setDate(j);
    return d.toLocaleDateString("fr-FR");
  };
  let t = "Date;Libellé;Montant\n";
  for (let m = 1; m <= 6; m++) {
    t += `${jour(m, 2)};VIR SALAIRE;2 100,00\n`;
    t += `${jour(m, 3)};PRLV NETFLIX;-13,49\n`;
    t += `${jour(m, 8)};PRLV SPOTIFY;-10,99\n`;
    t += `${jour(m, 14)};PRLV BASIC FIT;-29,99\n`;
    t += `${jour(m, 21)};CB ADOBE SYSTEMS;-24,19\n`;
    t += `${jour(m, 26)};PRLV CANAL+;-24,99\n`;
    t += `${jour(m, 11)};CARTE CARREFOUR;-${(38 + m * 9.7).toFixed(2).replace(".", ",")}\n`;
  }
  return t;
}

export async function lire(f: File): Promise<string> {
  const buf = await f.arrayBuffer();
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    return new TextDecoder("windows-1252").decode(buf);
  }
}
