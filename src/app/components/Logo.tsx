import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href="/" className="hidden w-fit shrink-0 lg:flex">
        <Image
          src="/images/gpb-logo.svg"
          alt="Green Point Beauty logo"
          width={180}
          height={50}
        />
      </Link>
      <Link href="/" className="flex w-fit lg:hidden">
        <Image
          src="/images/gpb-logo.svg"
          alt="Green Point Beauty logo"
          width={133.95}
          height={40}
        />
      </Link>
    </>
  );
};
