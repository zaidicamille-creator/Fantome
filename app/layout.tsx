import type { Metadata, Viewport } from "next";
import "./globals.css";

const titre = "Fantômes — Débusque les abonnements que tu paies sans t'en servir";
const description =
  "Dépose ton relevé bancaire : on repère les prélèvements oubliés et on t'écrit la lettre pour les résilier. Ton relevé ne quitte pas ton téléphone.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: titre,
  description,
  openGraph: {
    title: titre,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Fantômes",
  },
  twitter: { card: "summary_large_image", title: titre, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F0E4",
};

const polices = {
  "--font-fraunces": "'Fraunces'",
  "--font-dmsans": "'DM Sans'",
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" style={polices}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:wght@600;800&display=swap"
        />
      </head>
      <body className="font-texte antialiased">{children}</body>
    </html>
  );
}
