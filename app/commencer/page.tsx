"use client";

import { useState } from "react";
import Fantome from "../lib/Fantome";
import { detecter, type Fantome as Prelevement, type Resultat } from "../lib/detect";

const questions = [
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

const euros = (n: number) =>
  `${Math.round(n).toLocaleString("fr-FR")} €`;
const euros2 = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

function exemple(): string {
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

async function lire(f: File): Promise<string> {
  const buf = await f.arrayBuffer();
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    return new TextDecoder("windows-1252").decode(buf);
  }
}

const GRATUITS = 2;

export default function Commencer() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<number[]>([]);
  const [fantomes, setFantomes] = useState<Prelevement[] | null>(null);
  const [erreur, setErreur] = useState("");

  const fini = etape >= questions.length;
  const progression = fantomes
    ? 100
    : Math.round((Math.min(etape, questions.length) / questions.length) * 100);

  function choisir(i: number) {
    setReponses([...reponses, i]);
    setEtape(etape + 1);
  }

  function retour() {
    if (etape === 0) return;
    setReponses(reponses.slice(0, -1));
    setEtape(etape - 1);
  }

  function analyser(r: Resultat) {
    if (r.ok) {
      setErreur("");
      setFantomes(r.fantomes);
    } else if (r.raison === "rien") {
      setErreur(
        "Aucun prélèvement régulier trouvé. Il faut au moins 2 à 3 mois de relevé : essaie avec une période plus longue."
      );
    } else {
      setErreur(
        "On n'a pas réussi à lire ce fichier. Il faut un export CSV de ta banque, avec une colonne date, un libellé et un montant."
      );
    }
  }

  async function surFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5_000_000) {
      setErreur("Ce fichier est trop gros. Un relevé CSV pèse en général moins de 1 Mo.");
      return;
    }
    try {
      analyser(detecter(await lire(f)));
    } catch {
      setErreur("Ce fichier n'a pas pu être ouvert. Réessaie, ou choisis un autre export.");
    }
  }

  const mensuel = fini ? (questions[1].valeurs as number[])[reponses[1]] : 0;
  const estimation = mensuel * 12;
  const total = fantomes ? fantomes.reduce((s, f) => s + f.annuel, 0) : 0;

  return (
