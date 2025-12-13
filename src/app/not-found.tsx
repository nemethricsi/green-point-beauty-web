import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Image
        src="/images/undraw_page-eaten_b2rt.svg"
        alt="Page not found"
        width={100}
        height={100}
      />
      <h2 className="text-fuego-900 font-serif text-3xl font-bold">
        Az oldal nem található
      </h2>
      <p className="text-fuego-800/75 font-normal">Sajnos itt nincs semmi.</p>
      <Link
        href="/"
        className="text-fuego-700 hover:text-fuego-800 mt-4 flex items-center gap-2 rounded-md border px-4 py-2"
      >
        <ArrowLeftIcon className="text-fuego-700 size-6" />
        Vissza a főoldalra
      </Link>
    </div>
  );
}
