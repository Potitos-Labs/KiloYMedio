import CategoriesHub from "@components/category/CategoriesHub";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbGridDots } from "react-icons/tb";

function NavBarClient() {
  const [open, setOpen] = useState(false);
  function openPopup() {
    setOpen(true);
  }

  return (
    <nav>
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)} className="items-center py-2">
          <GiHamburgerMenu className="h-7 w-7" fill="base-content" />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "block flex-grow items-center gap-6 lg:flex lg:w-auto",
        )}
      >
        <div className="group">
          <div onClick={openPopup}>
            <a className="peer flex flex-row items-center gap-2 rounded-full bg-base-content px-3 font-satoshiBold text-base-100">
              <TbGridDots className="h-3 w-3" />
              tienda
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-6 md:flex-row">
          <Link href={`/recipe`}>salud y bienestar</Link>
          <Link href={`/recipe`}>recetas</Link>
          <Link href={`/recipe`}>talleres</Link>
        </div>
      </div>
      <CategoriesHub open={open} setOpen={setOpen} />
    </nav>
  );
}

export default NavBarClient;
