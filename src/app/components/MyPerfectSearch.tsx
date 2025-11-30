'use client';

import { CalendarDaysIcon, SearchIcon } from 'lucide-react';
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

// eslint-disable-next-line no-restricted-imports
import { TREATMENTS_QUERYResult } from '../../../sanity.types';

type MyPerfectSearchProps = {
  treatments: TREATMENTS_QUERYResult;
};

export const MyPerfectSearch = ({ treatments }: MyPerfectSearchProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls=""
          className="border-fuego-500 flex w-full cursor-pointer items-center gap-2 self-center rounded-md border bg-white p-3 lg:w-3xl"
        >
          <SearchIcon className="text-fuego-500 size-6 shrink-0" />
          <span className="text-fuego-800/50 text-lg">
            Keress a kezeléseink között
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[311px] p-0 sm:w-xl md:w-2xl lg:w-3xl">
        <Command className="max-h-[300px] overflow-y-auto bg-white/95 backdrop-blur-sm sm:max-h-[400px]">
          <CommandInput placeholder="Kezdj gépelni..." />
          <CommandList>
            <CommandEmpty>Nem található eredmény.</CommandEmpty>
            <CommandGroup>
              {treatments.map(
                ({ id, name, salonicUrl, shortDescription, slug }) => {
                  if (
                    name == null ||
                    salonicUrl == null ||
                    shortDescription == null ||
                    slug == null
                  ) {
                    return null;
                  }

                  const handleClick = () => {
                    router.push(`/kezelesek/${slug}`);
                  };

                  const handleKeyDown = (
                    e: React.KeyboardEvent<HTMLDivElement>,
                  ) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClick();
                    }
                  };

                  return (
                    <CommandItem
                      key={id}
                      value={name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <div
                        role="link"
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        onClick={handleClick}
                        aria-label={`Kezelés: ${name}`}
                        className="flex flex-1 cursor-pointer flex-col justify-between gap-6 p-4 lg:flex-row lg:items-center"
                      >
                        <div className="flex flex-1 flex-col gap-2">
                          <span className="text-fuego-950 font-medium">
                            {name}
                          </span>
                          <p className="text-sm text-neutral-500">
                            {shortDescription}
                          </p>
                        </div>
                        <a
                          href={salonicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-2 py-1 font-semibold transition-colors"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent outer click handler
                          }}
                        >
                          <CalendarDaysIcon />
                          <span>Foglalás</span>
                        </a>
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
};
