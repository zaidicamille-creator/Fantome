import type { Fantome } from "./detect";
import { euros2 } from "./outils";

export type Infos = {
  service: string;
  nom: string;
  adresse: string;
  cpVille: string;
  reference: string;
};

const bloc = (...l: string[]) => l.filter(Boolean).join("\n");

export function redigerLettre(f: Fantome, i: Infos): string {
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const ville = i.cpVille.replace(/^\d{5}\s*/, "").trim();
  const service = i.service.trim() || f.nom;
  const ref = i.reference.trim() ? ` (référence client : ${i.reference.trim()})` : "";
  const nom = i.nom.trim() || "[Ton prénom et ton nom]";

  return [
    bloc(nom, i.adresse.trim() || "[Ton adresse]", i.cpVille.trim() || "[Code postal et ville]"),
    bloc(service, "Service résiliation", "[Adresse du service, à trouver sur ton contrat ou sur leur site]"),
    `${ville ? `${ville}, le` : "Le"} ${date}`,
    `Objet : résiliation de mon abonnement ${service}${ref}`,
    "Madame, Monsieur,",
    `Par la présente, je vous informe de ma décision de résilier mon abonnement ${service}${ref}, actuellement prélevé de ${euros2(f.mensuel)} par mois sur mon compte, avec effet à la première date possible prévue par mon contrat.`,
    bloc(
      "Je vous demande de bien vouloir :",
      "- me confirmer par écrit la prise en compte de cette résiliation et sa date d'effet ;",
      "- cesser tout prélèvement à compter de cette date ;",
      "- me rembourser tout prélèvement effectué après cette date."
    ),
    "Dans l'attente de votre confirmation, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
    nom,
  ].join("\n\n");
}
