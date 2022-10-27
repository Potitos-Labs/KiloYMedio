import Link from "next/link";
import {
  RiArrowDropDownLine,
  RiMenuAddLine,
  RiEditFill,
  RiListUnordered,
} from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

function NavBarAdmin() {
  return (
    <nav className="flex w-full flex-row gap-4 text-lg">
      <div className="group relative">
        <Link href={`/product`}>
          <button className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
            Productos
            <RiArrowDropDownLine className="h-9 w-9" />
          </button>
        </Link>
        <div className="absolute z-10 hidden group-hover:block">
          <div className="flex w-[220px] flex-col rounded-md bg-white py-4 text-kym4 shadow-sm shadow-kym4">
            <Link href={`/product/create`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                Añadir productos
              </a>
            </Link>
            <Link href={`/category`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiEditFill className="mr-1 h-6 w-6 fill-kym2" />
                Editar categorías
              </a>
            </Link>
            <Link href={`/admin/register`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <AiOutlineUserAdd className="mr-1 h-6 w-6 fill-kym2" />
                Crear usuarios
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative">
        <button className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
          Recetas
          <RiArrowDropDownLine className="h-9 w-9" />
        </button>
        <div className="absolute z-10 hidden group-hover:block">
          <div className="flex w-[220px] flex-col rounded-md bg-white py-4 text-kym4 shadow-sm shadow-kym4">
            <Link href={`/`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                Añadir recetas
              </a>
            </Link>
            <Link href={`/`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                Ver recetas
              </a>
            </Link>
          </div>
        </div>
      </div>

      <button className="px-5 py-2 font-semibold text-white hover:text-kym4">
        Talleres
      </button>

      <button className="px-5 py-2 font-semibold text-white hover:text-kym4">
        Soporte
      </button>
    </nav>
  );
}

export default NavBarAdmin;
