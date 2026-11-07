import Fantome from "./lib/Fantome";

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

function Bouton() {
  return (
    <a
      href="/commencer"
      className="flex w-full items-center justify-between rounded-full bg-encre px-7 py-5 text-lg font-bold text-creme shadow-[0_6px_0_0_#8a3a12] transition active:translate-y-[2px] active:shadow-[0_3px_0_0_#8a3a12]"
    >
      <span>Trouver mes fantômes, gratuit</span>
      <span aria-hidden="true" className="text-2xl">→</span>
    </a>
  );
}

export default function Accueil() {
  return (
    <main className="mx-auto max-w-xl px-6 pb-14 pt-5">
      <header className="flex items-center gap-2">
        <Fantome className="h-10 w-10" />
        <span className="text-xl font-bold tracking-tight">Fantômes</span>
      </header>

      <section className="mt-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-brule" />
          Audit d&rsquo;abonnements
        </p>

        <h1 className="mt-6 text-[3.1rem] font-bold leading-[1.02] tracking-tight">
          Débusque les abonnements que tu paies{" "}
          <span className="text-brule">sans t&rsquo;en servir.</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-encre/80">
          Dépose ton relevé bancaire. Fantômes repère tes prélèvements
          réguliers, les classe par ce qu&rsquo;ils te coûtent sur un an et
          rédige tes lettres de résiliation.
        </p>

        <div className="mt-8">
          <Bouton />
          <p className="mt-4 text-center text-sm text-encre/70">
            Gratuit · Sans carte bancaire · Ton relevé reste sur ton téléphone
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] bg-white/70 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-encre/60">
          Un exemple
        </p>
        <p className="mt-3 text-8xl font-bold leading-none tracking-tight text-brule">
          84&nbsp;€
        </p>
        <p className="mt-4 text-lg leading-snug">
          C&rsquo;est ce que coûte, sur une année, un abonnement à 7&nbsp;€ par
          mois. Petit sur un relevé, mais pas sur douze mois.
        </p>
      </section>

      <section className="mt-6 space-y-4">
        {benefices.map((b, i) => (
          <article key={b.titre} className="rounded-[2rem] bg-white/55 p-6">
            <p className="text-sm font-bold text-brule">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-1 text-2xl font-bold leading-snug">{b.titre}</h2>
            <p className="mt-2 leading-relaxed text-encre/80">{b.texte}</p>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Bouton />
      </div>
    </main>
  );
}
