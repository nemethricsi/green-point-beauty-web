import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';

import { NavMenuItemFromSanity } from '@/app/components/DesktopNavigation';
import { Logo } from '@/app/components/Logo';

type MobileNavigationProps = {
  navMenuItems: NavMenuItemFromSanity[];
};

export const MobileNavigation = ({ navMenuItems }: MobileNavigationProps) => {
  return (
    <div className="lg:hidden">
      <SheetPrimitive.Root>
        <SheetPrimitive.Trigger asChild>
          <button className="bg-fuego-100 rounded-xl p-2">
            <MenuIcon className="text-fuego-700 size-6" />
          </button>
        </SheetPrimitive.Trigger>
        <SheetPrimitive.Portal>
          <SheetPrimitive.Overlay className="fixed inset-0" />
          <SheetPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left fixed inset-0 z-50 overflow-y-auto bg-white/80 backdrop-blur-md transition ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300">
            <div className="absolute top-4 left-4">
              <Logo />
            </div>
            <SheetPrimitive.Close asChild>
              <button className="bg-fuego-100/50 fixed top-4 right-4 rounded-xl p-2">
                <XIcon className="text-fuego-700 size-6" />
              </button>
            </SheetPrimitive.Close>
            <SheetPrimitive.Title className="sr-only">
              Mobile navigation
            </SheetPrimitive.Title>
            <SheetPrimitive.Description className="sr-only">
              Mobile navigation
            </SheetPrimitive.Description>
            <div className="min-h-screen p-2 pt-24">
              <AccordionPrimitive.Root
                type="single"
                collapsible
                className="flex flex-col"
              >
                <ul>
                  {navMenuItems.map((menuItem) => {
                    return (
                      <li
                        key={menuItem.label}
                        className="border-b border-black/20 py-1"
                      >
                        {menuItem.mode === 'link' &&
                          menuItem.link.type === 'external' && (
                            <a
                              href={menuItem.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-fuego-900 flex w-full items-center justify-between px-2 py-3 font-serif font-medium"
                            >
                              {menuItem.label}
                              <ArrowUpRightIcon className="text-fuego-700 size-6" />
                            </a>
                          )}
                        {menuItem.mode === 'link' &&
                          menuItem.link.type === 'internal' && (
                            <Link
                              href={`/kezelesek/${menuItem.link.target.slug}`}
                              className="text-fuego-900 flex w-full items-center justify-between px-2 py-3 font-serif font-medium"
                            >
                              {menuItem.label}
                              <ArrowRightIcon className="text-fuego-700 size-6" />
                            </Link>
                          )}
                        {menuItem.mode === 'group' && (
                          <AccordionPrimitive.Item
                            value={menuItem.label}
                            key={menuItem.label}
                          >
                            <AccordionPrimitive.Trigger className="flex w-full flex-row items-center justify-between px-2 py-3 transition-all [&[data-state=open]>svg]:rotate-180">
                              <p className="text-fuego-900 font-serif font-medium">
                                {menuItem.label}
                              </p>
                              <ChevronDownIcon className="text-fuego-700 size-6 transition-transform duration-200" />
                            </AccordionPrimitive.Trigger>
                            <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden pl-6">
                              <ul className="grid w-96 flex-col gap-2 p-2">
                                {menuItem.group.map(({ name, slug }) => (
                                  <li key={slug} className="py-1">
                                    <Link
                                      href={`/kezelesek/${slug}`}
                                      className="text-fuego-950/85 px-2 py-3 text-sm"
                                    >
                                      {name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionPrimitive.Content>
                          </AccordionPrimitive.Item>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionPrimitive.Root>
            </div>
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>
    </div>
  );
};
