function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} role="img" aria-label="Un petit fantôme">
      <path
        d="M60 8C33 8 14 29 14 56v66c0 6 6 9 11 5l11-9 12 10c3 3 8 3 11 0l11-10 11 10c3 3 8 3 11 0l12-10 11 9c5 4 11 1 11-5V56C106 29 87 8 60 8Z"
        fill="#F6F0E4"
      />
      <ellipse cx="44" cy="58" rx="8" ry="11" fill="#1B1A17" />
      <ellipse cx="76" cy="58" rx="8" ry="11" fill="#1B1A17" />
    </svg>
  );
}

function Filigrane() {
  return (
    <svg
      viewBox="0 0 120 140"
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 top-28 w-80 opacity-[0.07]"
    >
      <path
        d="M60 8C33 8 14 29 14 56v66c0 6 6 9 11 5l11-9 12 10c3 3 8 3 11 0l11-10 11 10c3 3 8 3 11 0l12-10 11 9c5 4 11 1 11-5V56C106 29 87 8 60 8Z"
        fill="none"
        stroke="#F6F0E4"
        strokeWidth="6"
      />
    </svg>
  );
}

const benefices = [
  {
    titre: "Classé par coût annuel",
    texte:
      "Les fantômes les plus chers sortent en premier, calculés sur l'année entière et non sur un mois.",
  },
  {
    titre: "Une lettre pour chacun",
    texte:
      "Pour chaque prélèvement, une lettre de résiliation est prête. Tu l'envoies, c'est fini.",
  },
  {
    titre: "Ton relevé reste chez toi",
    texte:
      "L'analyse se fait sur ton téléphone. Ton relevé n'est jamais envoyé sur un serveur.",
  },
];

const categories = ["Streaming", "Musique", "Presse en ligne", "Salle de sport", "Antivirus", "Cloud"];

function Bouton() {
  return (
    <a
      href="/commencer"
      className="flex w-full items-center justify-between rounded-full bg-creme px-7 py-5 text-lg font-bold text-encre transition active:scale-[0.99] active:bg-[#FF5A1F]"
    >
      <span>Trouver mes fantômes, gratuit</span>
      <span aria-hidden="true" className="text-2xl">→</span>
    </a>
  );
}

export default function Accueil() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-encre text-creme">
      <Filigrane />
      <main className="relative mx-auto max-w-xl px-6 pb-14 pt-5">
        <header className="flex items-center gap-2">
          <Logo className="h-8 w-7" />
          <span className="text-xl font-bold tracking-tight">Fantômes</span>
        </header>

        <section className="mt-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-creme/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-creme/80">
            <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
            Audit d&rsquo;abonnements
          </p>

          <h1 className="mt-6 text-[3.2rem] font-bold leading-[1.02] tracking-tight">
            Débusque les abonnements que tu paies{" "}
            <span className="text-creme/45">sans t&rsquo;en servir.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-creme/70">
            Dépose ton relevé bancaire. Fantômes repère tes prélèvements
            réguliers, les classe par ce qu&rsquo;ils te coûtent sur un an et
            rédige tes lettres de résiliation.
          </p>

          <div className="mt-8">
            <Bouton />
            <p className="mt-4 text-center text-sm text-creme/60">
              Gratuit · Sans carte bancaire · Ton relevé reste sur ton téléphone
            </p>
          </div>
        </section>

        <div className="-mx-6 mt-14 overflow-hidden bg-[#FF5A1F] py-4 text-encre">
          <p className="whitespace-nowrap text-lg font-extrabold uppercase tracking-wide">
            {categories.concat(categories).join("  ·  ")}
          </p>
        </div>

        <section className="mt-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-creme/60">
            Un exemple
          </p>
          <p className="mt-3 text-8xl font-bold leading-none tracking-tight text-[#FF5A1F]">
            84&nbsp;€
          </p>
          <p className="mt-4 text-lg leading-snug text-creme/80">
            C&rsquo;est ce que coûte, sur une année, un abonnement à 7&nbsp;€ par
            mois. Petit sur un relevé, mais pas sur douze mois.
          </p>
        </section>

        <section className="mt-12">
          <ol>
            {benefices.map((b, i) => (
              <li key={b.titre} className="border-t border-creme/15 py-7">
                <p className="text-sm font-bold text-[#FF5A1F]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-2xl font-bold leading-snug">{b.titre}</h2>
                <p className="mt-2 leading-relaxed text-creme/70">{b.texte}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6">
          <Bouton />
        </div>
      </main>
    </div>
  );
}
