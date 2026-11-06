import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmsans.variable}`}>
      <body className="font-texte antialiased">{children}</body>
    </html>
  );
}
