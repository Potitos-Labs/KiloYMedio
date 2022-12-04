import { Listbox } from "@headlessui/react";
import { IngredientUnit } from "@prisma/client";
import { IoIosArrowDown } from "react-icons/io";

function ListboxDesign({
  onChange,
  value,
  list,
  order = "alphabetical",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  value: string;
  list: Record<string, string>;
  order?: "alphabetical" | "normal";
}) {
  let options = Object.keys(list).map((key, i) => ({
    id: i,
    name: list[key] ?? "valor no encontrado",
    value: key,
  }));

  if (order === "alphabetical") {
    options = options.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="dropdown w-40">
      <Listbox
        value={options.find((o) => o.value == value)}
        onChange={(o) => onChange(o.value)}
      >
        <Listbox.Button className="btn h-[60px] w-full justify-start rounded-[30px] bg-transparent text-sm hover:bg-transparent">
          {list[value as IngredientUnit]}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoIosArrowDown className="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={`dropdown-content rounded-box menu-vertical max-h-52 bg-base-100 p-2 ${
            order == "alphabetical" ? "overflow-y-scroll" : "w-40 overflow-auto"
          }`}
        >
          {options.map((item) => (
            <Listbox.Option
              key={item.id}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-3 pr-4 ${
                  active ? "bg-amber-100" : "text-gray-900"
                }`
              }
              value={item}
            >
              {item.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default ListboxDesign;
