"use client";

import { useState } from "react";

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
    options: [
      "Ce mois-ci",
      "Il y a quelques mois",
      "Il y a plus d'un an",
      "Jamais vraiment",
    ],
  },
];

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

export default function Commencer() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<number[]>([]);

  const fini = etape >= questions.length;
  const progression = Math.round((Math.min(etape, questions.length) / questions.length) * 100);

  function choisir(i: number) {
    setReponses([...reponses, i]);
    setEtape(etape + 1);
  }

  function retour() {
    if (etape === 0) return;
    setReponses(reponses.slice(0, -1));
    setEtape(etape - 1);
  }

  const mensuel = fini ? (questions[1].valeurs as number[])[reponses[1]] : 0;
  const annuel = mensuel * 12;

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-5 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <a href="/" className="font-titre text-xl font-extrabold tracking-tight">
          Fantômes
        </a>
        {!fini && (
          <p className="text-sm text-encre/70">
            Question {etape + 1} sur {questions.length}
          </p>
        )}
      </div>

      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-creme2"
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

      {!fini ? (
        <section className="mt-10 flex flex-1 flex-col">
          <h1 className="font-titre text-3xl font-extrabold leading-tight">
            {questions[etape].titre}
          </h1>
          <div className="mt-8 space-y-3">
            {questions[etape].options.map((o, i) => (
              <button
                key={o}
                onClick={() => choisir(i)}
                className="flex w-full items-center rounded-2xl bg-creme2 px-5 py-5 text-left text-lg font-medium active:bg-brule active:text-creme"
              >
                {o}
              </button>
            ))}
          </div>
          {etape > 0 && (
            <button onClick={retour} className="mt-6 self-start text-sm underline">
              Revenir à la question précédente
            </button>
          )}
        </section>
      ) : (
        <section className="mt-10">
          <p className="text-lg">D&rsquo;après tes réponses, tu paies environ</p>
          <p className="mt-2 font-titre text-6xl font-extrabold text-brule">
            {euros(annuel)}
          </p>
          <p className="mt-1 text-lg">
            par an en abonnements, soit {euros(mensuel)} par mois.
          </p>

          <div className="mt-6 rounded-2xl bg-creme2 p-5 leading-relaxed">
            <p>
              Tu as indiqué que tu as{" "}
              <strong>{questions[0].options[reponses[0]].toLowerCase()}</strong> abonnements
              et que ta dernière vérification date de :{" "}
              <strong>{questions[2].options[reponses[2]].toLowerCase()}</strong>.
            </p>
            <p className="mt-3">
              Exemple : si un quart de cette somme ne te sert plus, cela représente{" "}
              <strong className="text-brule">{euros(annuel / 4)} par an</strong> que tu pourrais
              récupérer.
            </p>
            <p className="mt-3 text-sm text-encre/70">
              Ce chiffre est une estimation basée sur tes réponses. Ton relevé donnera le
              montant réel.
            </p>
          </div>

          <button
            disabled
            className="mt-8 flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-encre/40 px-6 py-5 text-lg font-bold text-creme"
          >
            Déposer mon relevé (bientôt)
          </button>
          <p className="mt-3 text-center text-sm text-encre/70">
            Cette étape arrive très vite.
          </p>
        </section>
      )}
    </main>
  );
}
