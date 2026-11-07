import Legal from "../lib/Legal";

export const metadata = { title: "Conditions générales de vente — Fantômes" };

const sections = [
  {
    t: "1. Vendeur",
    p: ["Fantômes est édité par la personne identifiée dans les mentions légales (« le vendeur »). Les présentes conditions s'appliquent à tout achat sur le site par un consommateur."],
  },
  {
    t: "2. Le service",
    p: [
      "Fantômes analyse, sur l'appareil du client, un relevé bancaire au format CSV qu'il dépose, repère les prélèvements réguliers, les classe par coût annuel et propose un modèle de lettre de résiliation pour chacun.",
      "Un aperçu gratuit est accessible sans paiement. L'achat donne accès à la liste complète et à toutes les lettres.",
    ],
  },
  {
    t: "3. Prix et paiement",
    p: [
      "Prix : 9,99 € TTC en paiement unique pour la liste complète et les lettres. Un suivi mensuel optionnel est proposé à 4,99 € TTC par mois. Les prix sont indiqués en euros, toutes taxes comprises. [À COMPLÉTER : mention de TVA applicable].",
      "Le paiement est sécurisé et traité par Stripe. La commande est confirmée par un e-mail envoyé à l'adresse indiquée par le client.",
    ],
  },
  {
    t: "4. Accès au service",
    p: ["L'accès est ouvert immédiatement après la confirmation du paiement. Aucun envoi physique n'a lieu."],
  },
  {
    t: "5. Droit de rétractation",
    p: [
      "Le client dispose en principe de 14 jours pour se rétracter d'un achat à distance. Le service étant un contenu numérique fourni immédiatement, le client demande, avant de payer, l'exécution immédiate du contrat en cochant la case prévue à cet effet. Il reconnaît alors perdre son droit de rétractation, conformément à l'article L221-28 du Code de la consommation.",
      "Cette renonciation ne remet pas en cause la garantie « satisfait ou remboursé » ci-dessous, qui reste applicable.",
    ],
  },
  {
    t: "6. Garantie satisfait ou remboursé",
    p: [
      "Pendant 14 jours à compter du paiement, le client peut demander le remboursement intégral, sans avoir à se justifier. Pour cela, il écrit à [À COMPLÉTER : adresse e-mail] en indiquant l'adresse e-mail utilisée pour payer.",
      "Le vendeur rembourse sous 14 jours maximum, par le moyen de paiement utilisé lors de l'achat.",
    ],
  },
  {
    t: "7. Suivi mensuel (optionnel)",
    p: [
      "Le suivi mensuel est sans engagement et résiliable à tout moment, en écrivant à l'adresse e-mail indiquée ci-dessus. La résiliation prend effet à la fin de la période mensuelle déjà payée, sans nouveau prélèvement ensuite.",
      "Il comprend : [À COMPLÉTER : ce que le suivi mensuel apporte concrètement].",
    ],
  },
  {
    t: "8. Responsabilité",
    p: [
      "Les résultats sont une estimation automatique fondée sur le fichier déposé. Ils peuvent être incomplets ou erronés, selon le format du fichier. Les lettres sont des modèles à adapter, et ne constituent pas un conseil juridique. Il appartient au client de vérifier chaque prélèvement et les conditions de son contrat avant de résilier.",
    ],
  },
  {
    t: "9. Données personnelles",
    p: ["Voir la politique de confidentialité, accessible depuis le pied de page."],
  },
  {
    t: "10. Médiation et litiges",
    p: [
      "En cas de litige, le client peut contacter le vendeur à l'adresse e-mail indiquée ci-dessus. À défaut de solution amiable, il peut recourir gratuitement au médiateur de la consommation : [À COMPLÉTER : nom et coordonnées du médiateur auquel le vendeur adhère].",
      "Les présentes conditions sont soumises au droit français.",
    ],
  },
];

export default function Page() {
  return <Legal titre="Conditions générales de vente" maj="7 novembre 2026" sections={sections} />;
}
