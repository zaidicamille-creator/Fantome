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
      "Un abonnement à 7 € par mois fait 84 € par an. Classés par montant sur l'année, les fantômes les plus chers sortent en premier.",
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
    <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-5 pb-12 pt-6">
      <header className="flex items-center gap-2">
        <Fantome className="h-8 w-7" />
        <span className="font-titre text-xl font-extrabold tracking-tight">Fantômes</span>
      </header>

      <section className="mt-10">
        <h1 className="font-titre text-[2.6rem] font-extrabold leading-[1.05] tracking-tight">
          Tu paies des abonnements que tu n&rsquo;utilises plus.
          <span className="text-brule"> On les débusque.</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Un essai jamais résilié, un service remplacé, une option activée une fois.
          Ces petits prélèvements coûtent souvent{" "}
          <strong className="font-bold text-brule">plusieurs centaines d&rsquo;euros par an</strong>.
          Ils sont trop petits pour qu&rsquo;on les remarque.
        </p>

        <a
          href="/commencer"
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-brule px-6 py-5 text-lg font-bold text-creme shadow-[0_4px_0_0_#7c2a08] transition active:translate-y-[2px] active:shadow-[0_2px_0_0_#7c2a08]"
        >
          Commencer, c&rsquo;est gratuit
        </a>
        <p className="mt-3 text-center text-sm text-encre/70">
          3 questions, 2 minutes. Aucune carte bancaire demandée.
        </p>
      </section>

      <section className="mt-14 space-y-4">
        {benefices.map((b, i) => (
          <article key={b.titre} className="rounded-2xl bg-creme2 p-5">
            <p className="font-titre text-3xl font-extrabold text-brule">{i + 1}</p>
            <h2 className="mt-1 font-titre text-xl font-semibold leading-snug">{b.titre}</h2>
            <p className="mt-2 leading-relaxed text-encre/85">{b.texte}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
