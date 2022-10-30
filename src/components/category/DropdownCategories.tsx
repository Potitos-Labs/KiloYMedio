import Link from "next/link";
import { RiListUnordered } from "react-icons/ri";

//import { trpc } from "../../utils/trpc";

function DropdownCategories() {
  //   const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  //   const { data: nCategories } =
  //     trpc.product.getAllNonEdibleCategories.useQuery();

  const englishName = "flours";

  return (
    <div className="absolute z-10 hidden group-hover:block">
      <div className="flex w-[240px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
        <div className="group">
          <Link href={`/category`}>
            <button className="flex w-full flex-row px-5 py-3 hover:rounded-md hover:bg-background">
              <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
              Comestibles
            </button>
          </Link>
          <div className="absolute z-20 hidden">
            <div className="flex w-[220px] flex-col rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
              <Link href={`/product?category=${englishName}`}>
                <a className="px-5 py-3 hover:rounded-md hover:bg-background">
                  Harinas
                </a>
              </Link>
              <Link href={`/product?category=legumes`}>
                <a className="px-5 py-3 hover:rounded-md hover:bg-background">
                  Legumbres
                </a>
              </Link>
            </div>
          </div>
        </div>

        <Link href={`/category#nCat`}>
          <a className="flex flex-row px-5 py-3 hover:bg-background">
            <RiListUnordered className="mr-1 h-6 w-6 fill-kym2" />
            No comestibles
          </a>
        </Link>

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
