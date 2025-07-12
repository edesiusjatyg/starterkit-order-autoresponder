import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Artisan Bakery - Kue Segar Setiap Hari",
  description: "Artisan Bakery menyajikan kue-kue segar yang dipanggang dengan cinta setiap hari. Rasakan kelezatan autentik dalam setiap gigitan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${playfairDisplay.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
