"use client";

import { useState } from "react";
import type { Fantome as Prelevement } from "../lib/detect";
import { euros, euros2 } from "../lib/outils";
import { garder } from "../lib/panier";
import Lettre from "./Lettre";

const GRATUITS = 2;

export default function Liste({
  fantomes,
  recommencer,
}: {
  fantomes: Prelevement[];
  recommencer: () => void;
}) {
  const [coches, setCoches] = useState<string[]>([]);
  const [ouvert, setOuvert] = useState<Prelevement | null>(null);

  const total = fantomes.reduce((s, f) => s + f.annuel, 0);
  const economie = fantomes
    .filter((f, i) => i < GRATUITS && coches.includes(f.nom))
    .reduce((s, f) => s + f.annuel, 0);
  const pluriel = fantomes.length > 1 ? "s" : "";

  function basculer(nom: string) {
    setCoches(coches.includes(nom) ? coches.filter((n) => n !== nom) : [...coches, nom]);
  }

  return (
    <section className="mt-10">
      <p className="text-lg">
        {fantomes.length} fantôme{pluriel} trouvé{pluriel}, qui te coûtent
      </p>
      <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-brule">{euros(total)}</p>
      <p className="mt-3 text-lg">par an, soit {euros(total / 12)} par mois.</p>

      <div className="mt-6 rounded-[2rem] bg-encre p-5 text-creme">
        <p className="text-sm uppercase tracking-[0.16em] text-creme/70">Économie prévue</p>
        <p className="mt-1 text-5xl font-bold tracking-tight">{euros(economie)}</p>
        <p className="mt-1 text-sm text-creme/80">
          par an, avec les {coches.length} abonnement{coches.length > 1 ? "s" : ""} que tu résilies. Coche-les ci-dessous.
        </p>
      </div>
      <p className="mt-3 text-sm text-encre/70">
        Vérifie chaque ligne : certains prélèvements sont utiles (loyer, électricité, assurance).
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
                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3 text-base font-medium">
                    <input
                      type="checkbox"
                      checked={coches.includes(f.nom)}
                      onChange={() => basculer(f.nom)}
                      className="h-6 w-6 accent-[#C2410C]"
                    />
                    Je résilie celui-ci
                  </label>
                  <button
                    onClick={() => setOuvert(f)}
                    className="w-full rounded-full bg-encre px-6 py-4 text-base font-bold text-creme"
                  >
                    Écrire ma lettre de résiliation
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <button
        onClick={() => {
          garder(fantomes);
          window.location.href = "/paiement";
        }}
        className="mt-8 flex w-full items-center justify-center rounded-full bg-encre px-7 py-5 text-lg font-bold text-creme shadow-[0_6px_0_#9a3412]"
      >
        Débloquer ma liste complète
      </button>
      <button onClick={recommencer} className="mt-5 w-full text-center text-sm underline">
        Recommencer avec un autre fichier
      </button>

      {ouvert && <Lettre fantome={ouvert} fermer={() => setOuvert(null)} />}
    </section>
  );
}
