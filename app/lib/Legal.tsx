export type Section = { t: string; p: string[] };

function Texte({ s }: { s: string }) {
  return (
    <>
      {s.split(/(\[À COMPLÉTER[^\]]*\])/).map((part, i) =>
        part.startsWith("[À COMPLÉTER") ? (
          <mark key={i} className="rounded bg-yellow-200 px-1 text-encre">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function Legal({
  titre,
  maj,
  sections,
}: {
  titre: string;
  maj: string;
  sections: Section[];
}) {
  return (
    <main className="mx-auto max-w-xl px-6 pb-10 pt-5">
      <a href="/" className="text-base font-medium underline">
        ← Retour à l&rsquo;accueil
      </a>
      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">{titre}</h1>
      <p className="mt-2 text-sm text-encre/70">Dernière mise à jour : {maj}</p>
      {sections.map((s) => (
        <section key={s.t} className="mt-8">
          <h2 className="text-xl font-bold">{s.t}</h2>
          {s.p.map((x, i) => (
            <p key={i} className="mt-3 leading-relaxed text-encre/90">
              <Texte s={x} />
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
