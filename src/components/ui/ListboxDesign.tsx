import { Listbox } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

function ListboxDesign({
  onChange,
  value,
  list,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  value: string;
  list: string[];
}) {
  let i = 0;
  const options = list.map((o) => {
    return { id: i++, name: o };
  });

  return (
    <div className="dropdown  w-40 ">
      <Listbox
        value={options.find((o) => o.name == value)}
        onChange={(o) => onChange(o.name)}
      >
        {/* <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"> */}
        <Listbox.Button className="btn btn-outline btn-sm w-full justify-start capitalize">
          {value}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoIosArrowDown className="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="dropdown-content rounded-box menu-vertical max-h-52 overflow-y-scroll bg-base-100 p-2">
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
