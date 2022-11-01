import Link from "next/link";
import { RiListUnordered } from "react-icons/ri";

import { trpc } from "../../utils/trpc";

function DropdownCategories() {
  const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  const { data: nCategories } =
    trpc.product.getAllNonEdibleCategories.useQuery();

  return (
    <div className="absolute z-10 hidden group-hover:block">
      <div className="flex w-[240px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
        <div className="relative">
          <Link href={`/category`}>
            <button className=" peer flex w-full flex-row px-5 py-3 hover:rounded-md hover:bg-background">
              <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
              Comestibles
            </button>
          </Link>

          <div className="absolute left-20 z-20 hidden w-[200px] pl-10 hover:grid peer-hover:grid">
            <div className="grid w-[800px] grid-cols-3 rounded-md bg-white text-kym4 shadow-sm shadow-kym4 ">
              {eCategories ? (
                eCategories?.map((eCategory) => {
                  return (
                    <Link
                      href={`/product?category=${eCategory.category}`}
                      key={eCategory.id}
                    >
                      <a className="px-5 py-3 hover:rounded-md hover:bg-background">
                        {eCategory.categoryInSpanish}
                      </a>
                    </Link>
                  );
                })
              ) : (
                <p className="font-semibold text-kym4">Cargando...</p>
              )}
            </div>
          </div>
        </div>
        <div className="relative">
          <Link href={`/category#nCat`}>
            <a className="peer flex w-full flex-row px-5 py-3 hover:rounded-md hover:bg-background">
              <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
              No comestibles
            </a>
          </Link>
          <div className="absolute left-20 z-20 hidden w-[200px] pl-10 hover:flex peer-open:hidden peer-hover:flex">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4 ">
              {nCategories ? (
                nCategories?.map((nCategory) => {
                  return (
                    <Link
                      href={`/product?category=${nCategory.category}`}
                      key={nCategory.id}
                    >
                      <a className="px-5 py-3 hover:rounded-md hover:bg-background">
                        {nCategory.categoryInSpanish}
                      </a>
                    </Link>
                  );
                })
              ) : (
                <p className="font-semibold text-kym4">Cargando...</p>
              )}
            </div>
          </div>
        </div>

        <Link href={`/product`}>
          <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
            <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
            Todos los productos
          </a>
        </Link>
      </div>
    </div>
  );
}

export default DropdownCategories;
