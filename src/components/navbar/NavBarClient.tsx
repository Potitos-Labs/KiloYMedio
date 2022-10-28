import Link from "next/link";
import {
  RiArrowDropDownLine,
  RiMenuAddLine,
  RiListUnordered,
} from "react-icons/ri";

function NavBarClient() {
  return (
    <nav className="flex w-full gap-4 text-lg">
      <div className="group relative">
        <Link href={`/product`}>
          <button className="peer flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
            Productos
            <RiArrowDropDownLine className="h-9 w-9" />
          </button>
        </Link>
        <div className="absolute z-10 hidden group-hover:block">
          <div className="flex w-[240px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
            <Link href={`/category`}>
              <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                Comestibles
              </a>
            </Link>
            <Link href={`/category#nCat`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                No comestibles
              </a>
            </Link>
            <Link href={`/product`}>
              <a className="flex flex-row px-5 py-3 hover:bg-background">
                <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
                Todos los productos
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative">
        <Link href={`/recipes`}>
          <button className="peer ml-4 flex flex-row items-center py-2 font-semibold text-white hover:text-kym4">
            Recetas
            <RiArrowDropDownLine className="h-9 w-9" />
          </button>
        </Link>
        <div className="absolute z-10 hidden group-hover:block">
          <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
            <Link href={`/recipe/create`}>
              <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
                <RiMenuAddLine className="mr-1 h-6 w-6 fill-kym2" />
                Añadir recetas
              </a>
            </Link>
            <Link href={`/recipes`}>
              <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
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
        Contacto
      </button>
    </nav>
  );
}

export default NavBarClient;
