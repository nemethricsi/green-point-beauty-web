import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';

import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { components } from '@/app/components/PortableTextComponents';
import { fetchCustomPageBySlug } from '@/sanity/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: pageData } = await fetchCustomPageBySlug(slug);
  if (!pageData) return {};
  const url = `/p/${slug}`;
  const title = pageData.seoTitle ?? pageData.title ?? undefined;
  const description = pageData.seoDescription ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { siteName: 'Green Point Beauty', locale: 'hu_HU', type: 'article', url, title, description },
    twitter: { card: 'summary_large_image', title, description, images: [`${url}/opengraph-image`] },
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;

  const { data: pageData } = await fetchCustomPageBySlug(slug);

  if (pageData?.content == null || pageData?.title == null) {
    notFound();
  }

  const { title, content } = pageData;

  return (
    <>
      {/* <Header navigation={navigation} /> */}
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-6 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex w-full max-w-5xl">
            <div className="flex flex-col gap-6 lg:gap-10">
              <h1 className="text-fuego-900 font-serif text-3xl font-bold lg:text-5xl">
                {title}
              </h1>
              <div className="prose lg:prose-lg">
                <PortableText value={content} components={components} />
              </div>
              {/* <Link
                href="/"
                className="text-fuego-600 hover:bg-fuego-200/75 flex items-center gap-2 rounded-md p-2 font-semibold md:self-start"
              >
                <ArrowLeftIcon className="h-6 w-6" />
                <span>Vissza</span>
              </Link>
              <h1 className="text-fuego-900 font-serif text-3xl font-bold lg:text-5xl">
                {name}
              </h1>
              <div className="text-fuego-900 bg-fuego-100 border-fuego-300 flex max-w-2xl flex-col gap-6 rounded-md border p-4 lg:text-lg">
                <p>{shortDescription}</p>
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
              </div> */}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
