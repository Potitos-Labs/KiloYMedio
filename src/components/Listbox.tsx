import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDown, BsCheck } from "react-icons/bs";
import { Fragment, useState } from "react";
import { z } from "zod";
import {
  useController,
  UseControllerProps,
  ControllerRenderProps,
  UseFormSetValue,
} from "react-hook-form";
import { NECategory, ECategory } from "@prisma/client";
import { IProduct } from "../utils/validations/product";

export default function MyListbox(
  props: {
    list: {
      id: string;
      imageURL: string;
      category: NECategory | ECategory;
      categoryInSpanish: string;
    }[];
  } & { setValue: UseFormSetValue<IProduct> },
) {
  const [selected, setSelected] = useState("Ninguno");

  /*const {
    field: { value, onChange },
  } = useController(props);*/

  const { list, setValue } = props;

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown
              className="h-5 w-5 text-gray-400"
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map(({ category, categoryInSpanish }, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={category}
              >
                {({ selected }) => (
                  <>
                    <ElementList
                      selected={selected}
                      setValue={setValue}
                      category={category}
                      categoryInSpanish={categoryInSpanish}
                    ></ElementList>
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

function ElementList({
  selected,
  setValue,
  category,
  categoryInSpanish,
}: {
  selected: boolean;
  setValue: UseFormSetValue<IProduct>;
  category: NECategory | ECategory;
  categoryInSpanish: string;
}) {
  if (selected) {
    let ecategory;
    let necategory;

    try {
      ecategory = z.nativeEnum(ECategory).parse(category);
    } catch (error) {}

    try {
      necategory = z.nativeEnum(NECategory).parse(category);
    } catch (error) {}

    if (ecategory) setValue("Edible.category", ecategory);
    if (necategory) setValue("NonEdible.category", necategory);
  }

  return (
    <span
      className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
    >
      {categoryInSpanish}
    </span>
  );
}
