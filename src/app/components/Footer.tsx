import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { type IconType } from 'react-icons';
import { SiFacebook, SiGmail, SiInstagram } from 'react-icons/si';

import { Container } from '@/app/components/Container';

export const Footer = () => {
  return (
    <footer className="border-fuego-200 bg-fuego-900 mt-auto border-t px-4 backdrop-blur-sm">
      <Container className="text-fuego-100 flex flex-col items-center justify-between gap-2.5 py-3 text-sm lg:flex-row-reverse">
        <div className="flex items-center gap-6 lg:gap-4">
          <SocialLink
            href="https://www.facebook.com/GreenPointBeauty"
            icon={SiFacebook}
          />
          <SocialLink
            href="https://www.instagram.com/green.point.beauty.salon"
            icon={SiInstagram}
          />
          <SocialLink href="mailto:info@greenpoint.hu" icon={SiGmail} />
        </div>
        <div className="border-fuego-800 text-fuego-100 mt-2.5 border-t pt-5 lg:border-t-0 lg:pt-0">
          <p className="font-medium">
            &#169; Green Point Beauty 2013 - {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
};

type SocialLinkProps = {
  href: string;
  icon: IconType | LucideIcon;
};

const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="hover:bg-fuego-700 group flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
    >
      <Icon className="group-hover:fill-fuego-100 fill-fuego-500 size-6" />
    </Link>
  );
};
