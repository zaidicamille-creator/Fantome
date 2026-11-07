import { questions, euros } from "../lib/outils";

export default function Depot({
  reponses,
  erreur,
  surFichier,
  surExemple,
}: {
  reponses: number[];
  erreur: string;
  surFichier: (e: React.ChangeEvent<HTMLInputElement>) => void;
  surExemple: () => void;
}) {
  const mensuel = (questions[1].valeurs as number[])[reponses[1]];

  return (
    <section className="mt-10">
      <p className="text-lg">D&rsquo;après tes réponses, tu paies environ</p>
      <p className="mt-2 text-7xl font-bold leading-none tracking-tight text-brule">
        {euros(mensuel * 12)}
      </p>
      <p className="mt-3 text-lg">par an en abonnements, soit {euros(mensuel)} par mois.</p>

      <div className="mt-6 rounded-[2rem] bg-white/70 p-5 leading-relaxed">
        <p>
          Tu as indiqué que tu as{" "}
          <strong>{questions[0].options[reponses[0]].toLowerCase()}</strong> abonnements et que
          ta dernière vérification date de :{" "}
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

      <button onClick={surExemple} className="mt-5 w-full text-center text-base font-medium underline">
        Pas de relevé sous la main ? Essayer avec un exemple
      </button>
      <p className="mt-4 text-center text-sm text-encre/70">
        Ton fichier est lu sur ton téléphone. Il n&rsquo;est envoyé nulle part.
      </p>
    </section>
  );
}
