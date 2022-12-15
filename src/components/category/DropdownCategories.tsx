import Link from "next/link";
import { GiGrain } from "react-icons/gi";
import { RiListUnordered, RiShoppingBasket2Line } from "react-icons/ri";
import { BsChevronRight } from "react-icons/bs";

import { trpc } from "../../utils/trpc";

function DropdownCategories() {
  const { data: categories } = trpc.product.getAllCategories.useQuery();

  let eCategories;
  let nCategories;
  if (categories) {
    eCategories = categories.eCategories;
    nCategories = categories.neCategories;
  }
  return (
    <div className="absolute z-10 hidden group-hover:block">
      <div className="flex w-[260px] flex-col rounded-md bg-white text-base-200 shadow-sm shadow-base-200">
        <Link href={`/product`}>
          <a className="flex flex-row py-3 pl-5 hover:rounded-md hover:bg-base-100">
            <RiListUnordered className="mr-1 h-6 w-6 fill-accent" />
            Todos los productos
          </a>
        </Link>

        <div className="relative">
          <Link href={`/category`}>
            <button className="peer flex w-full flex-row py-3 pl-5 hover:btn-sm hover:rounded-md">
              <RiListUnordered className="mr-1 h-6 w-6 fill-accent" />
              Comestibles
              <BsChevronRight className="invisible ml-20 mt-1 fill-base-200 lg:visible" />
            </button>
          </Link>
          <div className="absolute left-40 top-8 z-20 hidden lg:hover:grid lg:peer-hover:grid">
            <div className="grid w-[760px] grid-cols-3 rounded-md bg-white text-base-200 shadow-md shadow-base-200">
              {eCategories ? (
                eCategories.map((eCategory) => {
                  return (
                    <Link
                      href={`/product?category=${eCategory.category}`}
                      key={eCategory.id}
                    >
                      <a className="flex flex-row gap-1 px-5 py-3 hover:rounded-md hover:bg-base-100">
                        <GiGrain className="mr-1 h-6 w-6 fill-accent" />
                        {eCategory.categoryInSpanish}
                      </a>
                    </Link>
                  );
                })
              ) : (
                <p className="font-semibold text-base-200">Cargando...</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Link href={`/category#nCat`}>
            <a className="peer flex w-full flex-row py-3 pl-5 hover:rounded-md hover:bg-base-100">
              <RiListUnordered className="mr-1 h-6 w-6 fill-accent" />
              No comestibles
              <BsChevronRight className="invisible ml-14 mt-1 fill-base-200 lg:visible" />
            </a>
          </Link>
          <div className="absolute left-40 top-8 z-20 hidden lg:hover:grid lg:peer-hover:grid">
            <div className="grid w-[760px] grid-cols-3 rounded-md bg-white text-base-200 shadow-md shadow-base-200">
              {nCategories ? (
                nCategories?.map((nCategory) => {
                  return (
                    <Link
                      href={`/product?category=${nCategory.category}`}
                      key={nCategory.id}
                    >
                      <a className="flex flex-row px-5 py-3 hover:rounded-md hover:bg-base-100">
                        <RiShoppingBasket2Line className="mr-1 h-6 w-6 fill-accent" />
                        {nCategory.categoryInSpanish}
                      </a>
                    </Link>
                  );
                })
              ) : (
                <p className="font-semibold text-base-200">Cargando...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownCategories;
