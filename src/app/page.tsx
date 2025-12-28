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
              <div className="bg-fuego-700/25 h-px w-full md:my-6" />
              <div className="flex flex-col gap-6">
                <div className="text-fuego-900 flex flex-col gap-3 text-sm font-medium md:text-base">
                  <strong className="font-serif text-xl">
                    Green Point Beauty
                  </strong>
                  <span className="text-fuego-900/75">
                    📍 1066 Budapest, Zichy Jenő u. 1. Fsz. 2.
                  </span>
                  <a
                    className="text-fuego-900/75 underline underline-offset-4"
                    href="tel:+36304200933"
                  >
                    📞 +36 30 420 0933
                  </a>
                </div>
                <div className="border-fuego-700/25 rounded-lg border">
                  <iframe
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.327326328058!2d19.052879476329124!3d47.50301627118055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc5d208bb3a7%3A0xc5311960d2e1452d!2sGreen%20Point%20Beauty!5e0!3m2!1sen!2shu!4v1766956749972!5m2!1sen!2shu"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.8318315820144!2d19.054810666706768!3d47.50301627118057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc5d208bb3a7%3A0xc5311960d2e1452d!2sGreen%20Point%20Beauty!5e0!3m2!1sen!2shu!4v1766957080319!5m2!1sen!2shu"
                    width="100%"
                    height="450"
                    style={{ border: '0' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg border"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
