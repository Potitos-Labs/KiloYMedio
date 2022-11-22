import Link from "next/link";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  RiArrowDropDownLine,
  RiEditFill,
  RiListUnordered,
  RiMenuAddLine,
} from "react-icons/ri";

function NavBarAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-lg">
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="items-center py-2 text-white hover:text-kym4"
        >
          <GiHamburgerMenu className="h-7 w-7" />
        </button>
      </div>
      <div
        className={`${
          !open && "hidden"
        } block w-full flex-grow lg:flex lg:w-auto`}
      >
        <div className="group">
          <Link href={`/product`}>
            <a className="peer mr-4 flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
              Productos
              <RiArrowDropDownLine className="mt-1 -ml-1 h-9 w-9" />
            </a>
          </Link>
          <div className="absolute z-10 hidden group-hover:block">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
              <Link href={`/product/create`}>
                <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                  <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                  Añadir productos
                </a>
              </Link>
              <Link href={`/product`}>
                <a className="flex flex-row px-5 py-3 hover:bg-background">
                  <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                  Ver productos
                </a>
              </Link>
              <Link href={`/category`}>
                <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                  <RiEditFill className="mr-1 h-6 w-6 fill-kym2" />
                  Editar categorías
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="group">
          <Link href={`/recipe`}>
            <a className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
              Recetas
              <RiArrowDropDownLine className="mt-1 -ml-1 h-9 w-9" />
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

        <button className="mr-4 py-2 font-semibold text-white hover:text-kym4 lg:px-5">
          Talleres
        </button>

        <div className="group relative">
          <button className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
            Usuarios
            <RiArrowDropDownLine className="mt-1 -ml-1 h-9 w-9" />
          </button>
          <div className="absolute z-10 hidden group-hover:block">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
              <Link href={`/admin/register`}>
                <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                  <AiOutlineUserAdd className="mr-1 h-6 w-6 fill-kym2" />
                  Crear usuarios
                </a>
              </Link>
            </div>
          </div>
        </div>

        <button className="py-2 font-semibold text-white hover:text-kym4 lg:px-5">
          Soporte
        </button>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
