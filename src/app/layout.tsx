import type { Metadata } from 'next';
import { Geist_Mono, Bricolage_Grotesque, Inter } from 'next/font/google';

import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';

import '@/app/globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const bricolageGrotesqueSerif = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque-serif',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Green Point Beauty',
  description: 'Beauty, cosmetic & personal care',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="min-h-screen">
      <body
        className={`${interSans.variable} ${geistMono.variable} ${bricolageGrotesqueSerif.variable} bg-fuego-50 flex min-h-screen flex-col text-black antialiased`}
      >
        <Header />
        <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
          <Container className="flex flex-1 flex-col py-4">
            {children}
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
