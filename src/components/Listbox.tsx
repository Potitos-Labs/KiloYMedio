import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { BsCheck, BsChevronDown } from "react-icons/bs";

export default function MyListbox(
  props: {
    list: {
      value: string;
      text: string;
    }[];
    label?: string;
    defaultValue?: string;
  } & { setValue: Dispatch<SetStateAction<string>> },
) {
  const { list, label, setValue, defaultValue } = props;
  const [selected, setSelected] = useState(defaultValue ?? "Ninguno");

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
          <Listbox.Button className="relative -mt-1 w-full cursor-default rounded-md border-2 border-gray-300 bg-white py-2 pl-3 pr-10 text-left">
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
            {list.map(({ text }, index) => (
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
