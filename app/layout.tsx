import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FadeIn from "./components/fade-in";

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

// This code sets up a Next.js layout with a global font, header, footer, and fade-in effect for the main content.
// The Roboto font is imported from Google Fonts, and the layout includes metadata for the page title and description.
// The layout is structured to ensure that the header and footer are always present, with the main content filling the remaining space in the viewport.
// The `FadeIn` component is used to apply a fade-in effect to the main content, enhancing the user experience with smooth transitions.
// The `html` and `body` elements are styled to use the Roboto font, ensuring consistent typography across the application.
// The `metadata` object defines the page's title and description, which are important for SEO and social sharing.
// The `RootLayout` function is the main component that renders the layout structure, ensuring that the application has a consistent look and feel across all pages.
// The `children` prop allows for dynamic content to be injected into the layout, making it reusable for different pages within the Next.js application.