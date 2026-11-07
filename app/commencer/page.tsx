"use client";

import { useState } from "react";
import Fantome from "../lib/Fantome";
import { detecter, type Fantome as Prelevement, type Resultat } from "../lib/detect";
import { questions, exemple, lire } from "../lib/outils";
import Questions from "./Questions";
import Depot from "./Depot";
import Liste from "./Liste";

export default function Commencer() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<number[]>([]);
  const [fantomes, setFantomes] = useState<Prelevement[] | null>(null);
  const [erreur, setErreur] = useState("");

  const fini = etape >= questions.length;
  const progression = fantomes ? 100 : Math.round((Math.min(etape, questions.length) / questions.length) * 100);

  function analyser(r: Resultat) {
    if (r.ok) {
      setErreur("");
      setFantomes(r.fantomes);
    } else if (r.raison === "rien") {
      setErreur("Aucun prélèvement régulier trouvé. Il faut au moins 2 à 3 mois de relevé : essaie avec une période plus longue.");
    } else {
      setErreur("On n'a pas réussi à lire ce fichier. Il faut un export CSV de ta banque, avec une colonne date, un libellé et un montant.");
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
        <div className="h-full rounded-full bg-brule transition-all duration-300" style={{ width: `${progression}%` }} />
      </div>

      {!fini && (
        <Questions
          etape={etape}
          choisir={(i) => {
            setReponses([...reponses, i]);
            setEtape(etape + 1);
          }}
          retour={() => {
            setReponses(reponses.slice(0, -1));
            setEtape(Math.max(0, etape - 1));
          }}
        />
      )}

      {fini && !fantomes && (
        <Depot
          reponses={reponses}
          erreur={erreur}
          surFichier={surFichier}
          surExemple={() => analyser(detecter(exemple()))}
        />
      )}

      {fantomes && (
        <Liste
          fantomes={fantomes}
          recommencer={() => {
            setFantomes(null);
            setErreur("");
          }}
        />
      )}
    </main>
  );
}
