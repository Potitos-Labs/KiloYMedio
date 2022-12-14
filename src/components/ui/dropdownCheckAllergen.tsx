import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Allergen } from "@prisma/client";
import clsx from "clsx";

function DropdownCheckAllergen({
  allergens,
  productAllergens,
  onChange,
}: {
  allergens: Map<Allergen, string>;
  productAllergens: Allergen[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
}) {
  const options = Array.from(allergens.keys())
    .map((key, i) => ({
      id: i,
      name: allergens.get(key as Allergen) ?? "valor no encontrado",
      value: key,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [selectedAllergen, setSelectedAllergen] = useState<string[]>([]);

  useEffect(() => {
    productAllergens.map((allergen) => {
      setSelectedAllergen((prev) => {
        const res = [...new Set([...prev, allergen])];
        return res;
      });
    });
  }, [productAllergens]);

  useEffect(() => {
    onChange(selectedAllergen);
  }, [selectedAllergen, onChange]);

  return (
    <div className="dropdown w-[100%] sm:w-[340px]">
      <Listbox value={selectedAllergen} onChange={setSelectedAllergen} multiple>
        <Listbox.Button className="btn h-[40px] w-full justify-between rounded-[30px] bg-transparent text-sm hover:bg-transparent sm:h-[60px]">
          <p className="ml-4 text-sm">Alérgenos</p>
          <span className="pointer-events-none inset-y-0 right-0 flex pr-2">
            <IoIosArrowDown className="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={`dropdown-content rounded-box menu-vertical max-h-52 overflow-y-scroll bg-base-100 p-2 leading-6`}
        >
          {options.map((allergen) => (
            <Listbox.Option
              key={allergen.id}
              value={allergen.value}
              disabled={productAllergens.includes(allergen.value)}
              className={({ active, disabled }) =>
                clsx(
                  "relative cursor-pointer select-none py-2 pl-3 pr-4",
                  active ? "bg-amber-100" : "text-gray-900",
                  disabled && "cursor-not-allowed rounded-lg bg-gray-300",
                )
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
                    <span
                      className={clsx(
                        "absolute inset-y-0 left-0 flex items-center pl-3",
                      )}
                    >
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
