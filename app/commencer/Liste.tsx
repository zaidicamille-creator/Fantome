import type { Fantome as Prelevement } from "../lib/detect";
import { euros, euros2 } from "../lib/outils";

const GRATUITS = 2;

export default function Liste({
  fantomes,
  recommencer,
}: {
  fantomes: Prelevement[];
  recommencer: () => void;
}) {
  const total = fantomes.reduce((s, f) => s + f.annuel, 0);
  const pluriel = fantomes.length > 1 ? "s" : "";

  return (
    <section className="mt-10">
      <p className="text-lg">
        {fantomes.length} fantôme{pluriel} trouvé{pluriel}, qui te coûtent
      </p>
      <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-brule">
        {euros(total)}
      </p>
      <p className="mt-3 text-lg">par an, soit {euros(total / 12)} par mois.</p>
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
              <p className="mt-3 text-sm font-bold">
                {verrouille
                  ? "Verrouillé : le nom et la lettre de résiliation"
                  : "Lettre de résiliation : bientôt disponible"}
              </p>
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
      <button onClick={recommencer} className="mt-5 w-full text-center text-sm underline">
        Recommencer avec un autre fichier
      </button>
    </section>
  );
}
