import Link from "next/link";
import Fantome from "./lib/Fantome";

export const metadata = { title: "Page introuvable — Fantômes" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-xl flex-col justify-center px-6 py-10">
      <Fantome className="h-24 w-24" />
      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-brule">Erreur 404</p>
      <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight">
        Cette page a disparu, comme un vrai fantôme.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-encre/80">
        Le lien est peut-être erroné. Reviens à l&rsquo;accueil, tout est là.
      </p>
      <Link
        href="/"
        className="mt-8 flex w-full items-center justify-center rounded-full bg-encre px-6 py-5 text-lg font-bold text-creme shadow-[0_6px_0_#9a3412]"
      >
        Retour à l&rsquo;accueil
      </Link>
    </main>
  );
}
