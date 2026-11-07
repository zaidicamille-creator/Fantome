import Legal from "../lib/Legal";

export const metadata = { title: "Mentions légales — Fantômes" };

const sections = [
  {
    t: "Éditeur du site",
    p: [
      "Le site Fantômes est édité par [À COMPLÉTER : prénom et nom], entrepreneur individuel (micro-entrepreneur), [À COMPLÉTER : forme juridique et nom commercial si différent].",
      "SIRET : [À COMPLÉTER : numéro SIRET].",
      "Adresse : [À COMPLÉTER : adresse postale professionnelle].",
      "E-mail : [À COMPLÉTER : adresse e-mail de contact]. Téléphone : [À COMPLÉTER : numéro de téléphone].",
      "TVA : [À COMPLÉTER : « TVA non applicable, article 293 B du CGI » ou numéro de TVA intracommunautaire].",
      "Directeur de la publication : [À COMPLÉTER : prénom et nom].",
    ],
  },
  {
    t: "Hébergement",
    p: [
      "Le site est hébergé par Vercel Inc., États-Unis (vercel.com). Adresse de l'hébergeur : [À COMPLÉTER : adresse à reprendre depuis vercel.com/legal].",
    ],
  },
  {
    t: "Propriété intellectuelle",
    p: [
      "Les textes, le logo, les illustrations et le code du site sont la propriété de l'éditeur, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.",
    ],
  },
  {
    t: "Nature du service",
    p: [
      "Fantômes est un outil d'analyse automatique. Il propose une estimation à partir du fichier que tu déposes et des modèles de lettres. Ce n'est ni un conseil financier, ni un conseil juridique. Tu restes responsable de vérifier chaque prélèvement avant de le résilier.",
    ],
  },
  {
    t: "Données personnelles",
    p: ["Le traitement de tes données est décrit dans la politique de confidentialité, accessible depuis le pied de page."],
  },
];

export default function Page() {
  return <Legal titre="Mentions légales" maj="7 novembre 2026" sections={sections} />;
}
