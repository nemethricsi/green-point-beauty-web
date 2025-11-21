'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

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
];

export const Search = () => {
  const router = useRouter();
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null,
  );
  const [query, setQuery] = useState('');

  const filteredTreatments = query
    ? treatments.filter((treatment) => {
        return treatment.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <Combobox
      as="div"
      className="border-fuego-500 mx-auto w-full max-w-2xl overflow-hidden rounded-md border bg-white focus-within:shadow-2xl"
      value={selectedTreatment}
      // TODO: Navigate the user to the selected treatment page
      onChange={(treatment) => {
        if (treatment != null) {
          router.push(treatment.href);
        }
        setSelectedTreatment(treatment);
      }}
      onClose={() => setQuery('')}
    >
      <div className="relative">
        <SearchIcon className="text-fuego-500 absolute top-1/2 left-4 hidden -translate-y-1/2 lg:block" />
        <ComboboxInput
          aria-label="Treatment"
          displayValue={(treatment: Treatment) => treatment?.name}
          className="text-fuego-600 w-full border-none bg-transparent px-4 py-2 text-lg font-medium outline-none focus:ring-0 lg:pl-14"
          placeholder="Keresés a kezeléseink között..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {filteredTreatments.length > 0 && (
        <ComboboxOptions
          anchor={{ to: 'bottom', gap: 8 }}
          portal={false}
          modal
          className="border-fuego-500 block max-h-96 w-(--input-width) overflow-y-auto rounded-md border bg-white py-4 shadow-2xl empty:invisible"
        >
          {filteredTreatments.map((treatment) => (
            <ComboboxOption key={treatment.id} value={treatment}>
              {({ focus }) => (
                <div className={cn('px-4 py-2', focus && 'bg-fuego-200')}>
                  {treatment.name}
                  <p
                    className={cn(
                      'text-fuego-600 text-sm',
                      focus && 'text-fuego-800',
                    )}
                  >
                    {treatment.description}
                  </p>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
