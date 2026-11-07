"use client";

import { useEffect, useState } from "react";
import type { Fantome as Prelevement } from "../lib/detect";
import { redigerLettre, type Infos } from "../lib/lettre";

const CLE = "fantomes-infos";

const champs: [keyof Infos, string][] = [
  ["service", "Nom du service"],
  ["nom", "Ton prénom et ton nom"],
  ["adresse", "Ton adresse"],
  ["cpVille", "Code postal et ville"],
  ["reference", "Référence client (facultatif)"],
];

export default function Lettre({ fantome, fermer }: { fantome: Prelevement; fermer: () => void }) {
  const [infos, setInfos] = useState<Infos>({
    service: fantome.nom,
    nom: "",
    adresse: "",
    cpVille: "",
    reference: "",
  });
  const [copie, setCopie] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(CLE);
      if (s) setInfos((i) => ({ ...i, ...JSON.parse(s) }));
    } catch {}
  }, []);

  function maj(k: keyof Infos, v: string) {
    const n = { ...infos, [k]: v };
    setInfos(n);
    try {
      localStorage.setItem(CLE, JSON.stringify({ nom: n.nom, adresse: n.adresse, cpVille: n.cpVille }));
    } catch {}
  }

  const texte = redigerLettre(fantome, infos);
  const objet = encodeURIComponent(`Résiliation de mon abonnement ${infos.service}`);
  const mail = `mailto:?subject=${objet}&body=${encodeURIComponent(texte)}`;

  async function copier() {
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      alert("Copie impossible : sélectionne le texte de la lettre et copie-le à la main.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "linear-gradient(160deg, #ffe1cf 0%, #fbd0df 48%, #dcd6ff 100%)" }}
    >
      <div className="mx-auto max-w-xl px-6 pb-12 pt-5">
        <button onClick={fermer} className="text-base font-medium underline">
          ← Retour à ma liste
        </button>
        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight">
          Ta lettre pour résilier {fantome.nom}
        </h2>
        <p className="mt-2 text-sm text-encre/70">
          Tes informations restent sur ton téléphone. Elles sont mémorisées pour tes prochaines lettres.
        </p>

        {champs.map(([k, l]) => (
          <label key={k} className="mt-4 block text-sm font-medium">
            {l}
            <input
              value={infos[k]}
              onChange={(e) => maj(k, e.target.value)}
              className="mt-1 w-full rounded-2xl bg-white/85 px-4 py-3 text-base"
            />
          </label>
        ))}

        <pre className="mt-6 whitespace-pre-wrap rounded-[2rem] bg-white/85 p-5 font-texte text-sm leading-relaxed">
          {texte}
        </pre>

        <button
          onClick={copier}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-encre px-7 py-5 text-lg font-bold text-creme"
        >
          {copie ? "Lettre copiée ✓" : "Copier la lettre"}
        </button>
        <a
          href={mail}
          className="mt-3 flex w-full items-center justify-center rounded-full bg-white/85 px-7 py-5 text-lg font-bold"
        >
          L&rsquo;ouvrir dans mon e-mail
        </a>

        <p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed">
          Envoie-la de préférence en recommandé avec accusé de réception, ou depuis l&rsquo;espace client du
          service, et garde la preuve. Vérifie le préavis et la durée d&rsquo;engagement de ton contrat. Cette
          lettre est un modèle à adapter, pas un conseil juridique.
        </p>
      </div>
    </div>
  );
}
