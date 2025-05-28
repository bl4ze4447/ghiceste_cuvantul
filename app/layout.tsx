import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ro">
      <body>
        {children}
      </body>
    </html>
  );
}
