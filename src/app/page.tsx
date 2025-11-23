import { CalendarDaysIcon } from 'lucide-react';
import Image from 'next/image';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { MyPerfectSearch } from '@/app/components/MyPerfectSearch';
import { fetchHomePage } from '@/sanity/lib/queries';

export default async function Home() {
  const { headline, subheading, ctaLabel } = await fetchHomePage();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-4 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex max-w-5xl flex-1 items-center justify-center">
            <div className="flex flex-col gap-12 lg:gap-20">
              <MyPerfectSearch />
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="flex flex-col gap-2">
                  <h1 className="text-fuego-900 font-serif text-4xl leading-tight font-bold lg:text-6xl">
                    {headline}
                  </h1>
                  <p className="text-fuego-700/85 font-medium lg:text-lg">
                    {subheading}
                  </p>
                  <button className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-4 py-2 text-lg font-semibold uppercase transition-colors lg:self-start">
                    <CalendarDaysIcon />
                    <span>{ctaLabel}</span>
                  </button>
                </div>
                <Image
                  src="/images/pexels-karolina-grabowska-6629549.jpg"
                  alt="Green Point Beauty"
                  width={500}
                  height={500}
                  className="rounded-3xl"
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
