'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type Person = {
  id: number;
  name: string;
};

const people: Person[] = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
  { id: 6, name: 'John Doe' },
  { id: 7, name: 'Harry Potter' },
  { id: 8, name: 'Hermione Granger' },
  { id: 9, name: 'Ron Weasley' },
  { id: 10, name: 'Ginny Weasley' },
  { id: 11, name: 'Fred Weasley' },
  { id: 12, name: 'George Weasley' },
  { id: 13, name: 'Bill Weasley' },
  { id: 14, name: 'Charlie Weasley' },
  { id: 15, name: 'Percy Weasley' },
  { id: 16, name: 'Fred Weasley' },
  { id: 17, name: 'George Weasley' },
  { id: 18, name: 'Bill Weasley' },
  { id: 19, name: 'Charlie Weasley' },
  { id: 20, name: 'Percy Weasley' },
];

export const Search = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(
    people[0],
  );
  const [query, setQuery] = useState('');

  const filteredPeople = query
    ? people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <Combobox
      as="div"
      className="border-fuego-500 relative mx-auto w-full max-w-2xl overflow-hidden rounded-md border bg-white focus-within:shadow-2xl"
      value={selectedPerson}
      // TODO: Navigate the user to the selected treatment page
      onChange={setSelectedPerson}
      onClose={() => setQuery('')}
    >
      <SearchIcon className="text-fuego-500 absolute top-1/2 left-4 hidden -translate-y-1/2 lg:block" />
      <ComboboxInput
        aria-label="Treatment"
        displayValue={(person: Person) => person?.name}
        className="text-fuego-600 w-full border-none bg-transparent px-4 py-2 text-lg font-medium outline-none focus:ring-0 lg:pl-14"
        placeholder="Keresés a kezeléseink között..."
        onChange={(event) => setQuery(event.target.value)}
      />
      {filteredPeople.length > 0 && (
        <ComboboxOptions
          anchor={{ to: 'bottom', gap: 8 }}
          portal={false}
          modal
          className="border-fuego-500 block max-h-96 w-(--input-width) overflow-y-auto rounded-md border bg-white py-4 shadow-2xl empty:invisible"
        >
          {filteredPeople.map((person) => (
            <ComboboxOption key={person.id} value={person}>
              {({ focus }) => (
                <div
                  className={cn(
                    'px-4 py-2',
                    focus && 'bg-fuego-600 text-fuego-50',
                  )}
                >
                  {person.name}
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
