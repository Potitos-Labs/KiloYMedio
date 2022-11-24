import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbGridDots } from "react-icons/tb";

import DropdownCategories from "../category/DropdownCategories";

function NavBarClient() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)} className="items-center py-2">
          <GiHamburgerMenu className="h-7 w-7" />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "block flex-grow items-center gap-8 lg:flex lg:w-auto",
        )}
      >
        <div className="group">
          <Link href={`/product`}>
            <a className="peer flex flex-row items-center gap-2 rounded-full bg-base-content px-3 font-raleway text-xs text-base-100">
              <TbGridDots className="h-4 w-4" />
              tienda
            </a>
          </Link>
          <DropdownCategories />
        </div>
        <Link href={`/recipe`}>salud y bienestar</Link>
        <Link href={`/recipe`}>recetas</Link>
        <Link href={`/recipe`}>talleres</Link>
      </div>
    </nav>
  );
}

export default NavBarClient;
