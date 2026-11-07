export default function Apercu({ texte }: { texte: string }) {
  return (
    <details className="mt-6 rounded-2xl bg-white/70 p-4 text-sm">
      <summary className="cursor-pointer font-medium">Ce résultat te semble faux ?</summary>
      <p className="mt-3 leading-relaxed">
        Fais une capture d&rsquo;écran de ce cadre et envoie-la à la personne qui t&rsquo;a donné le lien.
        Les chiffres des lignes sont remplacés par des 9.
      </p>
      <pre className="mt-3 whitespace-pre-wrap break-words text-xs">{texte}</pre>
    </details>
  );
}
