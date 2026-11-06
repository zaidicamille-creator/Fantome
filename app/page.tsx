function Fantome({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} role="img" aria-label="Un petit fantôme">
      <path
        d="M60 8C33 8 14 29 14 56v66c0 6 6 9 11 5l11-9 12 10c3 3 8 3 11 0l11-10 11 10c3 3 8 3 11 0l12-10 11 9c5 4 11 1 11-5V56C106 29 87 8 60 8Z"
        fill="#1B1A17"
      />
      <ellipse cx="44" cy="58" rx="8" ry="11" fill="#F6F0E4" />
      <ellipse cx="76" cy="58" rx="8" ry="11" fill="#F6F0E4" />
      <ellipse cx="60" cy="86" rx="6" ry="8" fill="#C2410C" />
    </svg>
  );
}

const benefices = [
  {
    titre: "Tu vois tout, classé par coût annuel",
    texte:
      "Les fantômes les plus chers sortent en premier, calculés sur l'année entière et non sur un mois.",
  },
  {
    titre: "Tu résilies sans te prendre la tête",
    texte:
      "Pour chaque prélèvement, une lettre de résiliation est prête. Tu l'envoies, c'est fini.",
  },
  {
    titre: "Ton relevé reste chez toi",
    texte:
      "L'analyse se fait sur ton téléphone. Ton relevé n'est jamais envoyé sur un serveur.",
  },
];

export default function Accueil() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-6 pb-14 pt-5">
      <header className="flex items-center justify-between border-b border-encre/20 pb-4">
        <div className="flex items-center gap-2">
          <Fantome className="h-7 w-6" />
          <span className="font-titre text-xl font-extrabold tracking-tight">Fantômes</span>
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-encre/60">
          Charges fixes
        </span>
      </header>

      <section className="mt-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brule">
          Relevé bancaire · 2 minutes
        </p>
        <h1 className="mt-4 font-titre text-[3.1rem] font-extrabold leading-[1.02] tracking-tight">
          Tu paies des abonnements que tu n&rsquo;utilises plus.
        </h1>
        <p className="mt-4 font-titre text-[2.2rem] font-semibold leading-[1.05] text-brule">
          On les débusque.
        </p>
        <p className="mt-8 text-lg leading-relaxed text-encre/90">
          Un essai jamais résilié, un service remplacé, une option activée une
          fois. Ces petits prélèvements s&rsquo;additionnent sans qu&rsquo;on les voie.
        </p>

        <a
          href="/commencer"
          className="mt-8 flex w-full items-center justify-between bg-encre px-6 py-5 text-lg font-bold text-creme transition active:bg-brule"
        >
          <span>Commencer, c&rsquo;est gratuit</span>
          <span aria-hidden="true" className="text-2xl">→</span>
        </a>
        <p className="mt-3 text-sm text-encre/65">
          3 questions, aucune carte bancaire demandée.
        </p>
      </section>

      <section className="mt-14 border-y border-encre/20 py-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-encre/60">
          Un exemple
        </p>
        <p className="mt-3 font-titre text-7xl font-extrabold leading-none text-brule">
          84&nbsp;€
        </p>
        <p className="mt-3 text-lg leading-snug">
          C&rsquo;est ce que coûte, sur une année, un abonnement à 7&nbsp;€ par
          mois. Petit sur un relevé, mais pas sur douze mois.
        </p>
      </section>

      <section className="mt-4">
        <ol>
          {benefices.map((b, i) => (
            <li key={b.titre} className="border-b border-encre/20 py-7">
              <p className="font-titre text-xl font-extrabold text-brule">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-titre text-2xl font-semibold leading-snug">
                {b.titre}
              </h2>
              <p className="mt-2 leading-relaxed text-encre/85">{b.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <a
        href="/commencer"
        className="mt-10 flex w-full items-center justify-between bg-encre px-6 py-5 text-lg font-bold text-creme transition active:bg-brule"
      >
        <span>Commencer, c&rsquo;est gratuit</span>
        <span aria-hidden="true" className="text-2xl">→</span>
      </a>
    </main>
  );
}
