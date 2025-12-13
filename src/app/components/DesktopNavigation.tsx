import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu';
import { urlFor } from '@/sanity/lib/image';

// eslint-disable-next-line no-restricted-imports
import { SanityImageAsset } from '../../../sanity.types';

type TreatmentInNav = {
  name: string;
  slug: string;
  mainImage: SanityImageAsset;
  shortDescription: string;
};

type ExternalLink = {
  label: string;
  mode: 'link';
  link: {
    type: 'external';
    url: string;
  };
};

type InternalLink = {
  label: string;
  mode: 'link';
  link: {
    type: 'internal';
    target: TreatmentInNav;
  };
};

type Collection = {
  mode: 'group';
  label: string;
  group: TreatmentInNav[];
};

export type NavMenuItemFromSanity = ExternalLink | InternalLink | Collection;

type DesktopNavigationProps = {
  navMenuItems: NavMenuItemFromSanity[];
};

export const DesktopNavigation = ({ navMenuItems }: DesktopNavigationProps) => {
  return (
    <div className="hidden justify-center lg:flex">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {navMenuItems &&
            navMenuItems.map((menuItem) => (
              <Fragment key={menuItem.label}>
                {menuItem.mode === 'link' &&
                  menuItem.link.type === 'external' && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <a
                          href={menuItem.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {menuItem.label}
                        </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                {menuItem.mode === 'link' &&
                  menuItem.link.type === 'internal' && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/kezelesek/${menuItem.link.target.slug}`}>
                          {menuItem.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                {menuItem.mode === 'group' && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {menuItem.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-96 flex-col gap-2">
                        {menuItem.group.map(
                          ({ name, slug, shortDescription, mainImage }) => (
                            <ListItem
                              key={slug}
                              title={name}
                              image={mainImage}
                              href={`/kezelesek/${slug}`}
                            >
                              {shortDescription}
                            </ListItem>
                          ),
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </Fragment>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

function ListItem({
  title,
  children,
  href,
  image,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & {
  href: string;
  image: SanityImageAsset;
}) {
  const src =
    image != null
      ? urlFor(image).width(80).height(80).quality(100).auto('format').url()
      : 'https://placehold.co/80x80';
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex flex-row items-center gap-3">
          <Image
            src={src}
            alt={title || ''}
            width={80}
            height={80}
            className="shrink-0 rounded-md"
          />
          <div className="flex flex-col gap-1">
            <div className="text-fuego-900 text-sm leading-none font-bold">
              {title}
            </div>
            <p className="text-fuego-900/60 line-clamp-3 text-sm leading-snug font-medium">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
