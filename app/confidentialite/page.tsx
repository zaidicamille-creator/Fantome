import Legal from "../lib/Legal";

export const metadata = { title: "Politique de confidentialité — Fantômes" };

const sections = [
  {
    t: "Qui est responsable",
    p: [
      "Le responsable du traitement est [À COMPLÉTER : prénom et nom de l'éditeur], dont les coordonnées figurent dans les mentions légales. Contact : [À COMPLÉTER : adresse e-mail].",
    ],
  },
  {
    t: "Ce qui reste sur ton appareil",
    p: [
      "Le fichier de relevé bancaire que tu déposes est lu par ton navigateur, sur ton téléphone ou ton ordinateur. Il n'est pas envoyé à nos serveurs et nous n'en gardons aucune copie.",
      "Quand tu écris une lettre de résiliation, ton nom et ton adresse sont mémorisés uniquement dans le stockage local de ton navigateur, pour t'éviter de les retaper. Tu peux les effacer à tout moment en supprimant les données du site dans ton navigateur.",
    ],
  },
  {
    t: "Ce que nous collectons",
    p: [
      "Lors d'un achat : ton adresse e-mail, la date, le montant et le statut du paiement. Le paiement est traité par Stripe (Stripe Payments Europe, Limited, Irlande) : nous ne voyons ni ne conservons ton numéro de carte.",
      "Mesure d'audience : [À COMPLÉTER : nom de l'outil de mesure d'audience, une fois choisi et mis en place. Il doit fonctionner sans cookie publicitaire].",
    ],
  },
  {
    t: "Pourquoi, et sur quelle base",
    p: [
      "Exécuter ta commande et te donner accès à ce que tu as acheté (exécution du contrat). Respecter nos obligations comptables et légales. Comprendre combien de visiteurs deviennent clients (intérêt légitime, sans te suivre d'un site à l'autre).",
    ],
  },
  {
    t: "Durées de conservation",
    p: [
      "Les justificatifs de paiement sont conservés 10 ans, conformément aux obligations comptables. Les échanges avec le support sont conservés [À COMPLÉTER : durée, par exemple 3 ans].",
    ],
  },
  {
    t: "Destinataires et transferts",
    p: [
      "Tes données sont traitées par nos prestataires techniques : Stripe pour le paiement et Vercel pour l'hébergement [À COMPLÉTER : ajouter les autres prestataires utilisés]. Certains traitements peuvent avoir lieu hors de l'Union européenne, avec les garanties prévues par le RGPD.",
    ],
  },
  {
    t: "Tes droits",
    p: [
      "Tu peux demander l'accès, la rectification, l'effacement de tes données, t'opposer à leur traitement, en demander la limitation ou la portabilité, en écrivant à [À COMPLÉTER : adresse e-mail]. Si tu estimes que tes droits ne sont pas respectés, tu peux saisir la CNIL (cnil.fr).",
    ],
  },
];

export default function Page() {
  return <Legal titre="Politique de confidentialité" maj="7 novembre 2026" sections={sections} />;
}
