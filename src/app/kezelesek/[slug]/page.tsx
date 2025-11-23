import { BackgroundShapes } from '@/app/components/BackgroundShapes';
import { Container } from '@/app/components/Container';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';

export default async function KezelesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-4 pt-20 lg:px-0 lg:pt-0">
        <Container className="flex flex-1 flex-col py-4 lg:py-12">
          <BackgroundShapes />
          <div className="mx-auto flex w-full max-w-5xl">
            <div className="flex flex-col gap-12 lg:gap-20">
              <h1 className="text-fuego-900 text-2xl font-bold lg:text-4xl">
                {slug}
              </h1>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
