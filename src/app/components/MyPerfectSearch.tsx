'use client';

// import { Command as CommandPrimitive } from 'cmdk';
// import { SearchIcon } from 'lucide-react';
import { CalendarDaysIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
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

type Treatment = {
  id: number;
  name: string;
  description: string;
  href: string;
};

const treatments: Treatment[] = [
  {
    id: 1,
    name: 'Kavitációs zsírbontás',
    description:
      'Ez a kezelés segít lebontani a zsírt az egész testen. Meg még arra is jó, hogy még egy sort írjak ide.',
    href: '/kezelesek/kavitacios-zsirbontas',
  },
  {
    id: 2,
    name: 'IPL szőrtelenítés',
    href: '/kezelesek/ipl-szortelenites',
    description:
      'Teljes szőrtelenítés, majdnem végleges. De ennek is inkább két sorosnak kell lennie.',
  },
  {
    id: 3,
    name: 'Dermarolleres testkezelések',
    href: '/kezelesek/dermarolleres-testkezelesek',
    description:
      'A dermaroller kezelés egy olyan modern bőrfeszesítő eljárás, melynek során, a bőr...',
  },
  {
    id: 4,
    name: 'Cellulit kezelés',
    href: '/kezelesek/cellulit-kezeles',
    description:
      'A narancsbőr, vagy más néven cellulit a női szépség makacs ellensége.',
  },
  {
    id: 5,
    name: 'Foglalás',
    href: '/foglalas',
    description: 'Foglalás a kezelésre.',
  },
];

export const MyPerfectSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls=""
          className="border-fuego-500 flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2"
        >
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <span className="text-fuego-800/50">Keress a kezeléseink között</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[311px] p-0 sm:w-[482px] md:w-[740px] lg:w-[1024px]">
        <Command className="max-h-[300px] overflow-y-auto bg-white/95 backdrop-blur-sm sm:max-h-[400px]">
          <CommandInput placeholder="Kezdj gépelni..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {treatments.map(({ id, name, href, description }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Link
                    href={href}
                    className="flex flex-1 items-center justify-between p-4"
                  >
                    <div className="flex flex-1 flex-col gap-2">
                      <span className="text-fuego-950 font-medium">{name}</span>
                      <p className="text-sm text-neutral-500">{description}</p>
                    </div>
                    <button className="from-fuego-300 to-fuego-400 hover:from-fuego-400 hover:to-fuego-300 border-fuego-500 text-fuego-800 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-linear-to-br px-2 py-1 font-semibold transition-colors">
                      <CalendarDaysIcon />
                      <span>Foglalás</span>
                    </button>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
