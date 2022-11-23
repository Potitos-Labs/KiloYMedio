import { ECategory, NECategory } from "@prisma/client";
import { IFilterProduct } from "@utils/validations/product";

interface tittleProps {
  filter: IFilterProduct;
  inSpanish: (category: ECategory | NECategory | "") => string | undefined;
}

const Tittle = ({ filter, inSpanish }: tittleProps) => {
  {
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
          {inSpanish(filter.neCategories[0] as ECategory | NECategory)}
        </p>
      );
    }

    if (filter.eCategories.length == 1 && filter.neCategories.length == 0) {
      return (
        <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
          {inSpanish(filter.eCategories[0] as ECategory | NECategory)}
        </p>
      );
    }
    return (
      <p className="ml-2 grow whitespace-nowrap font-bold normal-case sm:m-0 md:text-lg">
        Filtrando por {filter.neCategories.length + filter.eCategories.length}{" "}
        categorías
      </p>
    );
  }
};
export default Tittle;
