"use client";

import Link from "next/link";
import Fantome from "./lib/Fantome";

export default function Erreur({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-xl flex-col justify-center px-6 py-10">
      <Fantome className="h-24 w-24" />
      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
        Quelque chose s&rsquo;est mal passé.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-encre/80">
        Ce n&rsquo;est pas ta faute. Réessaie, ou reviens à l&rsquo;accueil.
      </p>
      <button
        onClick={reset}
        className="mt-8 flex w-full items-center justify-center rounded-full bg-encre px-6 py-5 text-lg font-bold text-creme shadow-[0_6px_0_#9a3412]"
      >
        Réessayer
      </button>
      <Link
        href="/"
        className="mt-5 flex w-full items-center justify-center rounded-full bg-white/70 px-6 py-5 text-lg font-bold text-encre"
      >
        Retour à l&rsquo;accueil
      </Link>
    </main>
  );
}
