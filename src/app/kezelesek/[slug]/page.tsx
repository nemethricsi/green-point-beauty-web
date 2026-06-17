import { ArrowLeftIcon, ArrowRightIcon, CalendarHeartIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { components } from '@/app/components/PortableTextComponents';
import { cn, formatPrice } from '@/lib/utils';
import { fetchNavigation, fetchTreatmentBySlug } from '@/sanity/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: treatment } = await fetchTreatmentBySlug(slug);
  if (!treatment) return {};
  const url = `/kezelesek/${slug}`;
  const title = treatment.seoTitle ?? treatment.name ?? undefined;
  const description =
    treatment.seoDescription ?? treatment.shortDescription ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { siteName: 'Green Point Beauty', locale: 'hu_HU', type: 'article', url, title, description },
    twitter: { card: 'summary_large_image', title, description, images: [`${url}/opengraph-image`] },
  };
}

export default async function KezelesPage({ params }: Props) {
  const { slug } = await params;

  const { data: treatment } = await fetchTreatmentBySlug(slug);
  const { data: navigation } = await fetchNavigation();

  if (
    treatment == null ||
    treatment.bookingUrl == null ||
    treatment.name == null ||
    treatment.shortDescription == null ||
    treatment.details == null
  ) {
    notFound();
  }

  const { name, bookingUrl, shortDescription, details, variants } = treatment;

  return (
    <>
      <Header navigation={navigation} />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-6 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex w-full max-w-5xl">
            <div className="flex flex-col gap-6 lg:gap-10">
              <Link
                href="/"
                className="text-fuego-600 hover:bg-fuego-200/75 flex items-center gap-2 rounded-md p-2 font-semibold md:self-start"
              >
                <ArrowLeftIcon className="h-6 w-6" />
                <span>Vissza</span>
              </Link>
              <h1 className="text-fuego-900 font-serif text-3xl font-bold lg:text-5xl">
                {name}
              </h1>
              <div className="text-fuego-800 border-fuego-200 flex max-w-2xl flex-col gap-6 rounded-md border bg-white/60 p-4 lg:text-lg">
                <p>{shortDescription}</p>
                {variants && variants.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {variants.map((variant, index) => (
                      <div
                        key={variant._key}
                        className={cn(
                          'flex items-baseline gap-2',
                          index < variants.length - 1 && 'pb-1',
                        )}
                      >
                        <span className="text-fuego-700 text-sm">
                          {variant.label}
                        </span>
                        <div className="border-fuego-300 flex-1 border-b border-dashed" />
                        <span className="text-fuego-900 text-sm font-medium tabular-nums">
                          {variant.price != null
                            ? formatPrice(variant.price)
                            : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-fuego-400 group bg-fuego-300 flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors hover:drop-shadow-sm md:self-start"
                >
                  <CalendarHeartIcon className="text-fuego-800/75" />
                  <span>Foglalás</span>
                  <ArrowRightIcon className="-rotate-45 transition-transform group-hover:-rotate-45 group-focus:-rotate-45 group-active:translate-x-0.5 lg:rotate-0" />
                </Link>
              </div>
              <div className="prose lg:prose-lg">
                <PortableText value={details} components={components} />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
