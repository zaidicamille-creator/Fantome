const questions = [
  {
    q: "Mon relevé bancaire est-il envoyé quelque part ?",
    r: "Non. Ton fichier est lu par ton téléphone, il n'est jamais envoyé à nos serveurs. Seul ton paiement passe par Stripe, qui nous transmet ton e-mail et jamais ton numéro de carte.",
  },
  {
    q: "Et si la liste est fausse ou ne me sert à rien ?",
    r: "Tu es remboursé sous 14 jours, sans avoir à te justifier. Tu écris un e-mail, on rembourse. Même si tu as déjà vu ta liste.",
  },
  {
    q: "Est-ce un abonnement de plus ?",
    r: "Non. Tu paies 9,99 € une seule fois. Aucun prélèvement ne suit, rien à résilier.",
  },
  {
    q: "Pourquoi payer, je peux chercher moi-même ?",
    r: "Oui, avec beaucoup de lignes à relire. Fantômes les classe par coût annuel en quelques secondes et écrit chaque lettre de résiliation pour toi. Tu gagnes le temps, et tu ne laisses pas passer le prélèvement oublié.",
  },
];

export default function Faq() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight">Tes questions</h2>
      <div className="mt-4 space-y-3">
        {questions.map((x) => (
          <details key={x.q} className="rounded-[1.5rem] bg-white/75 p-5">
            <summary className="cursor-pointer text-base font-bold">{x.q}</summary>
            <p className="mt-3 leading-relaxed text-encre/90">{x.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
