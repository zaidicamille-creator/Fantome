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
    <div className="min-h-[100svh] bg-encre text-creme">
      <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-6 pb-10 pt-5">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Fantômes
          </a>
          {!fini && (
            <p className="text-sm text-creme/60">
              Question {etape + 1} sur {questions.length}
            </p>
          )}
        </div>

        <div
          className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-creme/15"
          role="progressbar"
          aria-valuenow={progression}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[#FF5A1F] transition-all duration-300"
            style={{ width: `${progression}%` }}
          />
        </div>

        {!fini ? (
          <section className="mt-10 flex flex-1 flex-col">
            <h1 className="text-[2.1rem] font-bold leading-[1.1] tracking-tight">
              {questions[etape].titre}
            </h1>
            <div className="mt-8 space-y-3">
              {questions[etape].options.map((o) => (
                <button
                  key={o}
                  onClick={() => choisir(questions[etape].options.indexOf(o))}
                  className="flex w-full items-center rounded-full border border-creme/20 bg-creme/5 px-7 py-5 text-left text-lg font-medium transition active:border-[#FF5A1F] active:bg-[#FF5A1F] active:text-encre"
                >
                  {o}
                </button>
              ))}
            </div>
            {etape > 0 && (
              <button onClick={retour} className="mt-6 self-start text-sm text-creme/60 underline">
                Revenir à la question précédente
              </button>
            )}
          </section>
        ) : (
          <section className="mt-10">
            <p className="text-lg text-creme/80">D&rsquo;après tes réponses, tu paies environ</p>
            <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-[#FF5A1F]">
              {euros(annuel)}
            </p>
            <p className="mt-3 text-lg text-creme/80">
              par an en abonnements, soit {euros(mensuel)} par mois.
            </p>

            <div className="mt-6 rounded-3xl border border-creme/15 bg-creme/5 p-5 leading-relaxed">
              <p className="text-creme/90">
                Tu as indiqué que tu as{" "}
                <strong>{questions[0].options[reponses[0]].toLowerCase()}</strong> abonnements
                et que ta dernière vérification date de :{" "}
                <strong>{questions[2].options[reponses[2]].toLowerCase()}</strong>.
              </p>
              <p className="mt-3 text-creme/90">
                Exemple : si un quart de cette somme ne te sert plus, cela représente{" "}
                <strong className="text-[#FF5A1F]">{euros(annuel / 4)} par an</strong> que tu
                pourrais récupérer.
              </p>
              <p className="mt-3 text-sm text-creme/60">
                Ce chiffre est une estimation basée sur tes réponses. Ton relevé donnera le
                montant réel.
              </p>
            </div>

            <button
              disabled
              className="mt-8 flex w-full cursor-not-allowed items-center justify-center rounded-full bg-creme/25 px-7 py-5 text-lg font-bold text-creme/70"
            >
              Déposer mon relevé (bientôt)
            </button>
            <p className="mt-3 text-center text-sm text-creme/60">
              Cette étape arrive très vite.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
