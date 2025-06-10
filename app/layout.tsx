import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'], // puoi aggiungere altri pesi
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Ondrive - il network tecnico",
  description: "Il network tecnico per la mobilità del futuro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={roboto.className}>
      <body className={`${roboto.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
