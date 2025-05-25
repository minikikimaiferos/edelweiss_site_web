import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Edel - Boutique de Mode",
  description: "Boutique de mode Edel - Vêtements et accessoires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${arcadeFont.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
