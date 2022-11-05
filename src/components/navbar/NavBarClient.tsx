import clsx from "clsx";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  RiArrowDropDownLine,
  RiListUnordered,
  RiMenuAddLine,
} from "react-icons/ri";

import DropdownCategories from "../category/DropdownCategories";

function NavBarClient() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex w-full gap-4 text-lg">
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-2 border-2 items-center border-white rounded text-white hover:text-kym4 hover:border-kym4"
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "w-full block flex-grow lg:flex lg:w-auto",
        )}
      >
        <div className="group">
          <a
            href={`/product`}
            className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4"
          >
            Productos
            <RiArrowDropDownLine className="h-9 w-9 -ml-1" />
          </a>
          <DropdownCategories />
        </div>

        <div className="group">
          <a
            href={`/recipe`}
            className="peer ml-4 flex flex-row items-center py-2 font-semibold text-white hover:text-kym4"
          >
            Recetas
            <RiArrowDropDownLine className="h-9 w-9 -ml-1" />
          </a>
          <div className="absolute z-10 hidden group-hover:block">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
              <a
                href={`/recipe/create`}
                className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background"
              >
                <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                Añadir recetas
              </a>
              <a
                href={`/recipe`}
                className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background"
              >
                <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                Ver recetas
              </a>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row items-center flex-col">
          <button className="px-5 py-2 font-semibold text-white hover:text-kym4">
            Talleres
          </button>

          <button className="px-5 py-2 font-semibold text-white hover:text-kym4">
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBarClient;
