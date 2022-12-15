import { ECategory, NECategory } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

const Tittle = ({
  inSpanish,
}: {
  inSpanish: Record<ECategory | NECategory, string>;
}) => {
  const router = useRouter();
  const { supracategory, category } = router.query;

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href={"/product?category=all"}>
            <a className="text-xs uppercase">tienda</a>
          </Link>
        </li>
        {category === "all" && (
          <li>
            <p className="text-xs uppercase">todos los productos</p>
          </li>
        )}
        {category != "all" && (
          <li>
            {category?.indexOf(",") === -1 ? (
              <Link href={`/product?supracategory=${supracategory}&category=`}>
                <a className="text-xs uppercase">{supracategory}</a>
              </Link>
            ) : (
              <p className="text-xs uppercase">{supracategory}</p>
            )}
          </li>
        )}
        {category?.indexOf(",") === -1 && (
          <li>
            <p className="text-xs uppercase">
              {inSpanish[category as ECategory | NECategory]}
            </p>
          </li>
        )}
      </ul>
    </div>
  );

  /*{
    if (filter.eCategories.length == 0 && filter.neCategories.length == 0) {
      return (
        <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
          Todos los productos
        </p>
      );
    }

    if (filter.eCategories.length == 0 && filter.neCategories.length == 1) {
      return (
        <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
          {inSpanish[filter.neCategories[0] as ECategory | NECategory]}
        </p>
      );
    }

    if (filter.eCategories.length == 1 && filter.neCategories.length == 0) {
      return (
        <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
          {inSpanish[filter.eCategories[0] as ECategory | NECategory]}
        </p>
      );
    }
    return (
      <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
        Filtrando por {filter.neCategories.length + filter.eCategories.length}{" "}
        categorías
      </p>
    );
  }*/
};
export default Tittle;
