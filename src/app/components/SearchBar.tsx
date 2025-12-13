'use client';

import { CalendarDaysIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/Popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { urlFor } from '@/sanity/lib/image';

// eslint-disable-next-line no-restricted-imports
import { TREATMENTS_QUERYResult } from '../../../sanity.types';

type SearchBarProps = {
  treatments: TREATMENTS_QUERYResult;
};

export const SearchBar = ({ treatments }: SearchBarProps) => {
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger className="border-fuego-500 flex w-full cursor-pointer items-center gap-2 self-center rounded-md border bg-white p-3 lg:w-3xl">
          <SearchIcon className="text-fuego-500 size-6 shrink-0" />
          <span className="text-fuego-800/50 text-lg">
            Keress a kezeléseink között
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0 shadow-2xl">
          <Command className="max-h-[300px] bg-white backdrop-blur-sm sm:max-h-[400px]">
            <CommandInput placeholder="Kezdj gépelni..." />
            <CommandList className="overflow-y-scroll">
              <CommandEmpty>Nem található eredmény.</CommandEmpty>
              <CommandGroup className="p-2">
                {treatments.map(
                  ({
                    id,
                    name,
                    bookingUrl,
                    shortDescription,
                    slug,
                    mainImage,
                  }) => {
                    if (
                      name == null ||
                      bookingUrl == null ||
                      shortDescription == null ||
                      slug == null ||
                      mainImage == null
                    ) {
                      return null;
                    }

                    const src = urlFor(mainImage)
                      .width(64)
                      .height(64)
                      .quality(100)
                      .auto('format')
                      .url();

                    return (
                      <CommandItem
                        key={id}
                        value={name}
                        className="data-[selected=true]:bg-fuego-300/25 flex flex-1 cursor-pointer flex-col justify-between gap-6 p-4 lg:flex-row lg:items-center"
                        onSelect={() => router.push(`/kezelesek/${slug}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={src}
                            alt={name}
                            width={64}
                            height={64}
                            className="shrink-0 rounded-md"
                          />
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-fuego-950 font-medium">
                              {name}
                            </span>
                            <p className="text-sm text-neutral-500">
                              {shortDescription}
                            </p>
                          </div>
                        </div>
                        <div
                          role="link"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(bookingUrl, '_blank');
                            }
                          }}
                          className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-2 py-1 font-semibold transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(bookingUrl, '_blank');
                          }}
                        >
                          <CalendarDaysIcon />
                          <span>Foglalás</span>
                        </div>
                      </CommandItem>
                    );
                  },
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="border-fuego-500 flex w-full cursor-pointer items-center gap-2 self-center rounded-md border bg-white p-3">
        <SearchIcon className="text-fuego-500 size-6 shrink-0" />
        <span className="text-fuego-800/50">Keress a kezeléseink között</span>
      </DrawerTrigger>
      <DrawerContent className="flex h-[60vh] flex-col">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Kezelés kereső</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4">
          <Command className="flex h-full flex-col bg-white backdrop-blur-sm">
            <CommandInput placeholder="Kezdj gépelni..." autoFocus />
            <CommandList className="flex-1 overflow-y-auto">
              <CommandEmpty>Nem található eredmény.</CommandEmpty>
              <CommandGroup className="p-2">
                {treatments.map(
                  ({
                    id,
                    name,
                    bookingUrl,
                    shortDescription,
                    slug,
                    mainImage,
                  }) => {
                    if (
                      name == null ||
                      bookingUrl == null ||
                      shortDescription == null ||
                      slug == null ||
                      mainImage == null
                    ) {
                      return null;
                    }

                    return (
                      <CommandItem
                        key={id}
                        value={name}
                        className="data-[selected=true]:bg-fuego-300/25 flex flex-1 cursor-pointer flex-col items-stretch justify-between gap-6 border-b border-neutral-200 p-4 lg:flex-row lg:items-center"
                        onSelect={() => {
                          setIsOpen(false);
                          router.push(`/kezelesek/${slug}`);
                        }}
                      >
                        <div className="flex flex-1 flex-col gap-1">
                          <span className="text-fuego-950 font-medium">
                            {name}
                          </span>
                          <p className="text-sm text-neutral-500">
                            {shortDescription}
                          </p>
                        </div>
                        <div
                          role="link"
                          tabIndex={0}
                          className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-2 py-1 font-semibold transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(false);
                            window.open(bookingUrl, '_blank');
                          }}
                        >
                          <CalendarDaysIcon />
                          <span>Foglalás</span>
                        </div>
                      </CommandItem>
                    );
                  },
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
