import { CalendarHeartIcon } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/app/components/Container';
import {
  DesktopNavigation,
  NavMenuItemFromSanity,
} from '@/app/components/DesktopNavigation';
import { Logo } from '@/app/components/Logo';

// eslint-disable-next-line no-restricted-imports
import { type NAVIGATION_QUERYResult } from '../../../sanity.types';

export const Header = ({
  navigation,
}: {
  navigation: NAVIGATION_QUERYResult;
}) => {
  const navMenuItems = navigation?.navMenuItems as NavMenuItemFromSanity[];

  return (
    <header className="border-fuego-200 fixed w-full border-b bg-white/75 px-4 backdrop-blur-sm lg:static">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Logo />
        {navMenuItems != null && (
          <DesktopNavigation navMenuItems={navMenuItems} />
        )}
        <div className="hidden xl:flex">
          <Link
            href="https://green-point-beauty.salonic.hu/"
            target="_blank"
            rel="noopener noreferrer"
            className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-4 py-2 text-lg font-semibold transition-colors lg:self-start"
          >
            <CalendarHeartIcon />
            <span>Foglalás</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};
