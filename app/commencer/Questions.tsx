import { questions } from "../lib/outils";

export default function Questions({
  etape,
  choisir,
  retour,
}: {
  etape: number;
  choisir: (i: number) => void;
  retour: () => void;
}) {
  return (
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
  );
}
