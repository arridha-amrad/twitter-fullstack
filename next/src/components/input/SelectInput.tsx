import { Fragment, SetStateAction, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type Props = {
  label: string;
  options: string[]
  selected: string
  setSelected: (value: SetStateAction<string>) => void
}

export default function SelectInput({options, selected, setSelected, label}: Props) {

  return (
    <Listbox as="div" className="border p-1 rounded-xl w-full border-skin-base" value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-skin-base pl-4 pr-10 py-1 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-skin-base focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-sm">
          <span className='flex flex-col'>
          <span className="block truncate text-skin-accent">{label}</span>
          <span className="block truncate text-base">{selected}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-skin-accent"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >

          <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-skin-base py-1 text-base shadow-lg focus:outline-none border border-skin-base sm:text-sm">
            {options.map((month, monthIdx) => (
              <Listbox.Option
                key={monthIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-skin-fill text-skin-base' : 'text-skin-base'
                  }`
                }
                value={month}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {month}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-skin-fill">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>

        </Transition>
      </div>
    </Listbox>
  );
}
