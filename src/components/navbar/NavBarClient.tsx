import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";

import DropdownCategories from "../category/DropdownCategories";

function NavBarClient() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-md w-full">
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)} className="items-center py-2">
          <GiHamburgerMenu className="h-7 w-7" />
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
            <a className="peer mr-4 flex flex-row items-center py-2">
              <RiArrowDropDownLine className="-ml-1 mt-1 h-9 w-9" />
              tienda
            </a>
          </Link>
          <DropdownCategories />
        </div>
        <button className="py-2 lg:px-5">salud y bienestar</button>
        <Link href={`/recipe`}>
          <a className="py-2 lg:px-5">recetas</a>
        </Link>
        <button className="py-2 lg:px-5">talleres</button>
      </div>
    </nav>
  );
}

export default NavBarClient;
