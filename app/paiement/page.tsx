"use client";

import { useEffect, useState } from "react";
import Fantome from "../lib/Fantome";
import type { Fantome as Prelevement } from "../lib/detect";
import { euros } from "../lib/outils";
import { PRIX, reprendre } from "../lib/panier";
import Faq from "./Faq";

export default function Paiement() {
  const [liste, setListe] = useState<Prelevement[] | null>(null);
  const [pret, setPret] = useState(false);
  const [accord, setAccord] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    setListe(reprendre());
    setPret(true);
  }, []);

  async function payer() {
    setErreur("");
    setEnCours(true);
    try {
      const rep = await fetch("/api/checkout", { method: "POST" });
      const data = await rep.json();
      if (!rep.ok || !data.url) throw new Error("echec");
      window.location.href = data.url;
    } catch {
      setErreur("Le paiement n'a pas pu démarrer. Aucun montant n'a été débité. Réessaie dans un instant.");
      setEnCours(false);
    }
  }

  const total = liste ? liste.reduce((s, f) => s + f.annuel, 0) : 0;
  const premier = liste ? liste[0].annuel : 0;
  const fois = Math.floor(premier / PRIX);

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-6 pb-10 pt-5">
      <a href="/commencer" className="flex items-center gap-2">
        <Fantome className="h-9 w-9" />
        <span className="text-xl font-bold tracking-tight">Fantômes</span>
      </a>

      {pret && !liste && (
        <section className="mt-10">
          <h1 className="text-3xl font-bold leading-tight">Dépose d&rsquo;abord ton relevé.</h1>
          <p className="mt-3 text-lg">On a besoin de ton analyse pour te proposer la liste complète.</p>
          <a href="/commencer" className="mt-6 flex w-full justify-center rounded-full bg-encre px-6 py-5 text-lg font-bold text-creme">
            Trouver mes fantômes
          </a>
        </section>
      )}

      {liste && (
        <>
          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight">Débloque ta liste complète.</h1>
          <p className="mt-3 text-lg">
            {liste.length} fantôme{liste.length > 1 ? "s" : ""} te coûtent <b className="text-brule">{euros(total)}</b> par an.
            {fois >= 1 && ` Le premier de ta liste, à lui seul, coûte ${fois} fois le prix de Fantômes.`}
          </p>

          <div className="mt-6 rounded-[2rem] bg-white/80 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brule">Paiement unique</p>
            <p className="mt-1 text-6xl font-bold tracking-tight">{PRIX.toString().replace(".", ",")} €</p>
            <p className="mt-2 text-base text-encre/80">
              Soit moins de 3 centimes par jour sur un an. Aucun abonnement, aucun prélèvement ensuite.
            </p>
            <ul className="mt-4 space-y-1 text-base">
              <li>✓ Tous tes fantômes, avec leur nom</li>
              <li>✓ Une lettre de résiliation pour chacun</li>
              <li>✓ Accès immédiat après le paiement</li>
            </ul>
          </div>

          <div className="mt-4 rounded-[2rem] bg-encre p-5 text-creme">
            <p className="text-lg font-bold">Satisfait ou remboursé, 14 jours</p>
            <p className="mt-1 text-sm text-creme/85">
              Pas convaincu ? Écris-nous un e-mail dans les 14 jours : remboursement intégral, sans justification, sous 14 jours maximum.
            </p>
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm leading-snug">
            <input type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 accent-[#C2410C]" />
            <span>
              Je veux accéder à ma liste tout de suite et je renonce à mon droit de rétractation de 14 jours. La garantie
              satisfait ou remboursé reste valable. J&rsquo;ai lu les <a href="/cgv" className="underline">CGV</a>.
            </span>
          </label>

          <button
            onClick={payer}
            disabled={!accord || enCours}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-encre px-7 py-5 text-lg font-bold text-creme shadow-[0_6px_0_#9a3412] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {enCours ? "Un instant…" : "Payer 9,99 € et débloquer"}
          </button>
          <p className="mt-3 text-center text-sm text-encre/80">Paiement sécurisé par Stripe. Sans engagement.</p>
          {erreur && <p className="mt-3 rounded-2xl bg-white/80 p-4 text-base font-medium text-brule">{erreur}</p>}

          <Faq />
        </>
      )}
    </main>
  );
}
