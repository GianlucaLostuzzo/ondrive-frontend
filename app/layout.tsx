import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'], // puoi aggiungere altri pesi
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "ONDRIVE",
  description: "Il network tecnico per la mobilità del futuro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={roboto.className}>
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
