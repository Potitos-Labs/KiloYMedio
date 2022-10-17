import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDown, BsCheck } from "react-icons/bs";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

export default function MyListbox(
  props: {
    list: {
      value: string;
      text: string;
    }[];
    label?: string;
  } & { setValue: Dispatch<SetStateAction<string>> },
) {
  const [selected, setSelected] = useState("Ninguno");

  const { list, label, setValue } = props;

  function handleChange(input: string) {
    setSelected(input);
    console.log(input, list.find((i) => i.text == input)?.value);
    setValue(list.find((i) => i.text == input)?.value ?? "");
  }
  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mt-1">
        <div className="flex flex-row place-content-between">
          <Listbox.Label>{label}</Listbox.Label>
          <Listbox.Button className="relative ml-2 -mt-1 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map(({ value, text }, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={text}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {text}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <BsCheck className="h-5 w-5" aria-hidden="true" />
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
