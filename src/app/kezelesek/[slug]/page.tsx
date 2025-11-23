import { ArrowLeftIcon, ArrowRightIcon, CalendarHeartIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { components } from '@/app/components/PortableTextComponents';
import { fetchTreatmentBySlug } from '@/sanity/lib/queries';

export default async function KezelesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: treatment } = await fetchTreatmentBySlug(slug);

  if (
    treatment == null ||
    treatment.salonicUrl == null ||
    treatment.name == null ||
    treatment.shortDescription == null ||
    treatment.details == null
  ) {
    notFound();
  }

  const { name, salonicUrl, shortDescription, details } = treatment;

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-6 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex w-full max-w-5xl">
            <div className="flex flex-col gap-6 lg:gap-10">
              <Link
                href="/"
                className="text-fuego-900 flex items-center gap-2 rounded-md p-2 font-semibold hover:bg-neutral-200/50 md:self-start"
              >
                <ArrowLeftIcon className="h-6 w-6" />
                <span>Vissza</span>
              </Link>
              <h1 className="text-fuego-900 font-serif text-4xl font-bold lg:text-5xl">
                {name}
              </h1>
              <div className="text-fuego-900 bg-fuego-200 border-fuego-300 flex max-w-2xl flex-col gap-6 rounded-md border p-4 lg:text-lg">
                <p>{shortDescription}</p>
                <Link
                  href={salonicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-fuego-400 group bg-fuego-300 flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors md:self-start"
                >
                  <CalendarHeartIcon />
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
