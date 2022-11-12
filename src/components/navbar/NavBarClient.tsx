import clsx from "clsx";
import Link from "next/link";
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
    <nav className="w-full text-lg">
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="items-center rounded border-2 border-white px-3 py-2 text-white hover:border-kym4 hover:text-kym4"
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "block w-full flex-grow lg:flex lg:w-auto",
        )}
      >
        <div className="group">
          <Link href={`/product`}>
            <a className="peer mr-4 flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
              Productos
              <RiArrowDropDownLine className="-ml-1 h-9 w-9" />
            </a>
          </Link>
          <DropdownCategories />
        </div>

        <div className="group">
          <Link href={`/recipe`}>
            <a className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
              Recetas
              <RiArrowDropDownLine className="-ml-1 h-9 w-9" />
            </a>
          </Link>
          <div className="absolute z-10 hidden group-hover:block">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
              <Link href={`/recipe/create`}>
                <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                  <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                  Añadir recetas
                </a>
              </Link>
              <Link href={`/recipe`}>
                <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                  <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                  Ver recetas
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:flex-row lg:items-center">
          <button className="py-2 font-semibold text-white hover:text-kym4 lg:px-5">
            Talleres
          </button>

          <button className="py-2 font-semibold text-white hover:text-kym4 lg:px-5">
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBarClient;
