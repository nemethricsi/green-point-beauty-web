import type { Metadata } from 'next';
import { Geist_Mono, Bricolage_Grotesque, Inter } from 'next/font/google';

import { Providers } from '@/app/components/Providers';
import { SanityLive } from '@/sanity/lib/live';
import { SITE_NAME } from '@/lib/constants';

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
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: 'Beauty, cosmetic & personal care',
  metadataBase: new URL('https://green-point-beauty.vercel.app/'),
  alternates: { canonical: '/' },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'hu_HU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
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
        <Providers>{children}</Providers>
        <SanityLive />
      </body>
    </html>
  );
}
