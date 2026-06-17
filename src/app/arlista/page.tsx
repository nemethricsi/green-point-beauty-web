import type { Metadata } from 'next';
import Link from 'next/link';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';

export const metadata: Metadata = {
  title: 'Árlista',
  description: 'TODO: price list description',
  alternates: { canonical: '/arlista' },
  openGraph: { siteName: 'Green Point Beauty', locale: 'hu_HU', type: 'website', url: '/arlista', title: 'Árlista' },
  twitter: { card: 'summary_large_image', title: 'Árlista', images: ['/opengraph-image'] },
};
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn, formatPrice } from '@/lib/utils';
import { fetchNavigation, fetchPricingPage } from '@/sanity/lib/queries';

export default async function PriceListPage() {
  const { data: navigation } = await fetchNavigation();
  const { data: categories } = await fetchPricingPage();

  return (
    <>
      <Header navigation={navigation} />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-6 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
            <h1 className="text-fuego-900 font-serif text-3xl font-bold lg:text-5xl">
              Árlista
            </h1>
            <div className="flex flex-col gap-10">
              {categories?.map((category) => (
                <section key={category.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-fuego-800 font-serif text-lg font-semibold whitespace-nowrap lg:text-xl">
                      {category.name}
                    </h2>
                    <div className="bg-fuego-300 h-px flex-1" />
                  </div>
                  <div className="border-fuego-200 flex flex-col rounded-xl border bg-white/60 px-4">
                    {category.treatments?.map((treatment) => (
                      <div
                        key={treatment.id}
                        className="flex flex-col gap-2 py-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          {treatment.name && treatment.slug && (
                            <Link
                              href={`/kezelesek/${treatment.slug.current}`}
                              className="text-fuego-900 font-semibold underline-offset-4 hover:underline"
                            >
                              {treatment.name}
                            </Link>
                          )}
                          {treatment.bookingUrl && (
                            <Link
                              href={treatment.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-fuego-600 hover:text-fuego-800 flex shrink-0 items-center gap-1 text-xs font-medium underline underline-offset-2 transition-colors"
                            >
                              Foglalás{' '}
                              <span>
                                <ArrowUpRightIcon className="size-5" />
                              </span>
                            </Link>
                          )}
                        </div>
                        {treatment.variants &&
                          treatment.variants.length > 0 && (
                            <div className="flex flex-col gap-1">
                              {treatment.variants.map((variant, index) => (
                                <div
                                  key={variant._key}
                                  className={cn(
                                    'flex items-baseline gap-2',
                                    index < treatment.variants!.length - 1 &&
                                      'pb-1',
                                  )}
                                >
                                  <span className="text-fuego-700 text-sm">
                                    {variant.label}
                                  </span>
                                  <div className="border-fuego-200 flex-1 border-b border-dashed" />
                                  <span className="text-fuego-900 text-sm font-medium tabular-nums">
                                    {variant.price != null
                                      ? formatPrice(variant.price)
                                      : '—'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
