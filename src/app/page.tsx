import { CalendarHeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { SearchBar } from '@/app/components/SearchBar';
import { urlFor } from '@/sanity/lib/image';
import {
  fetchHomePage,
  fetchNavigation,
  fetchTreatments,
} from '@/sanity/lib/queries';

export default async function Home() {
  const { data: homePageData } = await fetchHomePage();
  const { data: treatments } = await fetchTreatments();
  const { data: navigation } = await fetchNavigation();

  if (
    homePageData?.headline == null ||
    homePageData?.subheading == null ||
    homePageData?.ctaLabel == null ||
    homePageData?.image == null
  ) {
    notFound();
  }

  const { headline, subheading, ctaLabel, image } = homePageData;

  return (
    <>
      <Header navigation={navigation} />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-4 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex max-w-5xl flex-1 items-start justify-center">
            <div className="flex flex-col gap-12 lg:gap-12">
              <div className="hidden justify-center md:flex">
                <SearchBar treatments={treatments} />
              </div>
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-fuego-900 font-serif text-4xl leading-none font-bold lg:text-[56px]">
                      {headline}
                    </h1>
                    <p className="text-fuego-800/75 font-normal lg:text-lg">
                      {subheading}
                    </p>
                  </div>
                  <Link
                    href="https://green-point-beauty.salonic.hu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-4 py-2 text-lg font-semibold uppercase transition-colors lg:self-start"
                  >
                    <CalendarHeartIcon />
                    <span>{ctaLabel}</span>
                  </Link>
                </div>
                <Image
                  src={urlFor(image).quality(100).auto('format').url()}
                  alt={image.alt ?? ''}
                  width={500}
                  height={500}
                  className="w-full rounded-3xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
