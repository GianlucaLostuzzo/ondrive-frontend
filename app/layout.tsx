import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Fade from '@/app/components/FadeIn';
import { Analytics } from "@vercel/analytics/next";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
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
          <Fade>
          <main className="flex-grow">
            {children}
            <Analytics />
          </main>
          </Fade>
        </div>
      </body>
    </html>
  );
}
// This layout component wraps the entire application, providing a consistent header and footer.
// It also includes a fade-in/fade-out animation for page transitions using the FadeWrapper component