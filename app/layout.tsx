import "./globals.css";

import {
  Exo_2, 
  Bungee
} from 'next/font/google';
import { Metadata }  from "next";
import { Analytics } from "@vercel/analytics/next";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
});
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ghicește cuvântul",
  description: "Descoperă cuvântul zilei sau încearcă să ajungi la nivele mai mari ca prietenii tai!",
  keywords: [
    "wordle română",
    "cuvântul zilei",
    "jocuri românești",
    "ghiceste cuvantul",
    "ghiceste",
    "wordle ro",
    "wordle in romana"
  ],
  openGraph: {
    title: "Ghicește cuvântul",
    description: "Joacă ghicește cuvântul și descoperă cuvintele înaintea prietenilor!",
    images: ["https://wordle-ro.com/social_media.png"],
    url: "https://wordle-ro.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${exo2.className} ${bungee.className}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
