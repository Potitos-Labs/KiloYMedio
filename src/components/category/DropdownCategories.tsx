import Link from "next/link";
import { GiGrain } from "react-icons/gi";
import { RiListUnordered, RiShoppingBasket2Line } from "react-icons/ri";

import { trpc } from "../../utils/trpc";

function DropdownCategories() {
  const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  const { data: nCategories } =
    trpc.product.getAllNonEdibleCategories.useQuery();

  return (
    <div className="absolute z-10 hidden group-hover:block">
      <div className="flex w-[240px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
        <Link href={`/product`}>
          <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-background">
            <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
            Todos los productos
          </a>
        </Link>
        <div className="relative">
          <Link href={`/category`}>
            <button className="peer flex w-full flex-row px-5 py-3 hover:rounded-md hover:bg-background">
              <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
              Comestibles
            </button>
          </Link>

          <div className="absolute left-40 top-8 z-20 hidden hover:grid peer-hover:grid">
            <div className="grid w-[800px] grid-cols-3 rounded-md bg-white text-kym4 shadow-md shadow-kym4">
              {eCategories ? (
                eCategories?.map((eCategory) => {
                  return (
                    <Link
                      href={`/product?category=${eCategory.category}`}
                      key={eCategory.id}
                    >
                      <a className="px-5 py-3 flex flex-row hover:rounded-md gap-1 hover:bg-background">
                        <GiGrain className="mr-1 h-6 w-6 fill-kym2" />
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
          <div className="absolute left-40 top-8 z-20 hidden hover:grid peer-hover:grid">
            <div className="grid w-[500px] grid-cols-2 rounded-md bg-white text-kym4 shadow-md shadow-kym4">
              {nCategories ? (
                nCategories?.map((nCategory) => {
                  return (
                    <Link
                      href={`/product?category=${nCategory.category}`}
                      key={nCategory.id}
                    >
                      <a className="px-5 py-3 flex flex-row hover:rounded-md hover:bg-background">
                        <RiShoppingBasket2Line className="mr-1 h-6 w-6 fill-kym2" />
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
      </div>
    </div>
  );
}

export default DropdownCategories;
