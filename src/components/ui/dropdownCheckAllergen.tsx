import { useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Allergen } from "@prisma/client";

function DropdownCheckAllergen({
  allergens,
}: {
  allergens: Map<Allergen, string>;
}) {
  const options = Array.from(allergens.keys()).map((key, i) => ({
    id: i,
    name: allergens.get(key as Allergen) ?? "valor no encontrado",
    value: key,
  }));
  const [selectedAllergen, setSelectedAllergen] = useState([]);

  console.log({ options });

  return (
    <div className="w-72">
      <Listbox value={selectedAllergen} onChange={setSelectedAllergen} multiple>
        <Listbox.Button className="btn h-[60px] w-full justify-between rounded-[30px] bg-transparent text-sm hover:bg-transparent">
          <p className="ml-4 text-sm">Alérgenos</p>
          <span className="pointer-events-none inset-y-0 right-0 flex pr-2">
            <IoIosArrowDown className="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="dropdown-content rounded-box menu-vertical max-h-52 overflow-y-scroll bg-base-100 p-2">
          {options.map((allergen) => (
            <Listbox.Option
              key={allergen.id}
              value={allergen.value}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-3 pr-4 ${
                  active ? "bg-amber-100" : "text-gray-900"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`pl-7 ${
                      selected ? "font-satoshiBold" : "font-normal"
                    }`}
                  >
                    {allergen.name}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <MdOutlineCheckBox className="h-5 w-5" />
                    </span>
                  ) : (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <MdOutlineCheckBoxOutlineBlank className="h-5 w-5" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default DropdownCheckAllergen;
