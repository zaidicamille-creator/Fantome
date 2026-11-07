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
    <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-6 pb-10 pt-5">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Fantome className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight">Fantômes</span>
        </a>
        {!fini && (
          <p className="text-sm text-encre/70">
            Question {etape + 1} sur {questions.length}
          </p>
        )}
      </div>

      <div
        className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/60"
        role="progressbar"
        aria-valuenow={progression}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-brule transition-all duration-300"
          style={{ width: `${progression}%` }}
        />
      </div>

      {!fini && (
        <section className="mt-10 flex flex-1 flex-col">
          <h1 className="text-[2.1rem] font-bold leading-[1.1] tracking-tight">
            {questions[etape].titre}
          </h1>
          <div className="mt-8 space-y-3">
            {questions[etape].options.map((o, i) => (
              <button
                key={o}
                onClick={() => choisir(i)}
                className="flex w-full items-center rounded-full bg-white/75 px-7 py-5 text-left text-lg font-medium transition active:bg-brule active:text-white"
              >
                {o}
              </button>
            ))}
          </div>
          {etape > 0 && (
            <button onClick={retour} className="mt-6 self-start text-sm text-encre/70 underline">
              Revenir à la question précédente
            </button>
          )}
        </section>
      )}

      {fini && !fantomes && (
        <section className="mt-10">
          <p className="text-lg">D&rsquo;après tes réponses, tu paies environ</p>
          <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-brule">
            {euros(estimation)}
          </p>
          <p className="mt-3 text-lg">
            par an en abonnements, soit {euros(mensuel)} par mois.
          </p>

          <div className="mt-6 rounded-[2rem] bg-white/70 p-5 leading-relaxed">
            <p>
              Tu as indiqué que tu as{" "}
              <strong>{questions[0].options[reponses[0]].toLowerCase()}</strong> abonnements et
              que ta dernière vérification date de :{" "}
              <strong>{questions[2].options[reponses[2]].toLowerCase()}</strong>.
            </p>
            <p className="mt-3 text-sm text-encre/70">
              Ce chiffre est une estimation basée sur tes réponses. Ton relevé donnera le montant
              réel.
            </p>
          </div>

          <label className="mt-8 flex w-full cursor-pointer items-center justify-between rounded-full bg-encre px-7 py-5 text-lg font-bold text-creme shadow-[0_6px_0_0_#8a3a12] active:translate-y-[2px] active:shadow-[0_3px_0_0_#8a3a12]">
            <span>Déposer mon relevé (CSV)</span>
            <span aria-hidden="true" className="text-2xl">↑</span>
            <input
              type="file"
              accept=".csv,.txt,text/csv,text/plain,application/vnd.ms-excel"
              onChange={surFichier}
              className="sr-only"
            />
          </label>

          {erreur && (
            <p role="alert" className="mt-4 rounded-2xl bg-white/80 p-4 text-sm leading-relaxed">
              {erreur}
            </p>
          )}

          <button
            onClick={() => analyser(detecter(exemple()))}
            className="mt-5 w-full text-center text-base font-medium underline"
          >
            Pas de relevé sous la main ? Essayer avec un exemple
          </button>
          <p className="mt-4 text-center text-sm text-encre/70">
            Ton fichier est lu sur ton téléphone. Il n&rsquo;est envoyé nulle part.
          </p>
        </section>
      )}

      {fantomes && (
        <section className="mt-10">
          <p className="text-lg">
            {fantomes.length} fantôme{fantomes.length > 1 ? "s" : ""} trouvé
            {fantomes.length > 1 ? "s" : ""}, qui te coûtent
          </p>
          <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-brule">
            {euros(total)}
          </p>
          <p className="mt-3 text-lg">par an, soit {euros(total / 12)} par mois.</p>
          <p className="mt-3 text-sm text-encre/70">
            Vérifie chaque ligne : certains prélèvements sont utiles (loyer, électricité,
            assurance).
          </p>

          <ol className="mt-6 space-y-3">
            {fantomes.map((f, i) => {
              const verrouille = i >= GRATUITS;
              return (
                <li key={f.nom} className="rounded-[2rem] bg-white/75 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2
                      className={`text-xl font-bold leading-snug ${verrouille ? "select-none blur-[6px]" : ""}`}
                      aria-hidden={verrouille}
                    >
                      {f.nom}
                    </h2>
                    <p className="whitespace-nowrap text-2xl font-bold text-brule">
                      {euros(f.annuel)}
                      <span className="text-sm font-medium text-encre/70"> /an</span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-encre/70">
                    {euros2(f.mensuel)} par mois · vu {f.fois} fois · dernier : {f.dernier}
                  </p>
                  {verrouille ? (
                    <p className="mt-3 text-sm font-bold">Verrouillé : le nom et la lettre de résiliation</p>
                  ) : (
                    <p className="mt-3 text-sm font-bold text-encre/70">
                      Lettre de résiliation : bientôt disponible
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          <button
            disabled
            className="mt-8 flex w-full cursor-not-allowed items-center justify-center rounded-full bg-encre/40 px-7 py-5 text-lg font-bold text-white"
          >
            Débloquer ma liste complète (bientôt)
          </button>
          <button
            onClick={() => {
              setFantomes(null);
              setErreur("");
            }}
            className="mt-5 w-full text-center text-sm underline"
          >
            Recommencer avec un autre fichier
          </button>
        </section>
      )}
    </main>
  );
}
