import { trpc } from "@utils/trpc";
import { IFilterProduct } from "@utils/validations/product";
import { Dispatch, SetStateAction } from "react";

export default function FilterProduct({
  filter,
  setFilter,
}: {
  filter: IFilterProduct;
  setFilter: Dispatch<SetStateAction<IFilterProduct>>;
}) {
  const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  const { data: neCategories } =
    trpc.product.getAllNonEdibleCategories.useQuery();
  const { data: allergens } = trpc.product.getAllAllergensInSpanish.useQuery();

  return (
    <div className="w-72">
      <div className="mx-12 mt-12 flex h-11 flex-row border-b-2 border-kym3">
        <p className="grow whitespace-nowrap sm:text-lg">Filtros de búsqueda</p>
      </div>
      <div className="m-12 rounded-md bg-white p-4">
        <div>
          <p className="sm:text-md grow whitespace-nowrap font-semibold">
            Precio
          </p>
          <input
            type="number"
            placeholder="min."
            className="input h-6 w-full"
            onChange={(e) => {
              filter = { ...filter, minPrice: e.target.valueAsNumber };
              return setFilter(filter);
            }}
          ></input>
          <input
            type="number"
            placeholder="max."
            className="input mt-2 h-6 w-full"
            onChange={(e) =>
              setFilter({ ...filter, maxPrice: e.target.valueAsNumber })
            }
          ></input>
        </div>
        <div>
          <p className="sm:text-md grow whitespace-nowrap font-semibold">
            Categorías
          </p>
          <div className="flex flex-col pl-3">
            <p className="grow whitespace-nowrap border-b-2 font-medium sm:text-sm">
              Comestibles
            </p>
            {eCategories?.map((c) => {
              return (
                <label key={c.id}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    onChange={() => {
                      const index = filter.eCategories.indexOf(c.category);
                      index == -1
                        ? filter.eCategories.splice(0, 0, c.category)
                        : filter.eCategories.splice(index, 1);
                      return setFilter({ ...filter });
                    }}
                  />
                  <span className="pl-1">{c.categoryInSpanish}</span>
                </label>
              );
            })}
            <p className="grow whitespace-nowrap border-b-2 font-medium sm:text-sm">
              No Comestibles
            </p>
            {neCategories?.map((c) => {
              return (
                <label key={c.id}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    onChange={() => {
                      const index = filter.neCategories.indexOf(c.category);
                      index == -1
                        ? filter.neCategories.splice(0, 0, c.category)
                        : filter.neCategories.splice(index, 1);
                      return setFilter({ ...filter });
                    }}
                  />
                  <span className="pl-1">{c.categoryInSpanish}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <p className="sm:text-md grow whitespace-nowrap font-semibold">
            Allérgenos
          </p>
          {/*Indicar productos que no contengan esos alergenos i de información */}
          <div className="flex flex-col pl-3">
            {allergens?.map((a) => {
              return (
                <label key={a.id}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    onChange={() => {
                      const index = filter.allergens.indexOf(a.allergen);
                      index == -1
                        ? filter.allergens.splice(0, 0, a.allergen)
                        : filter.allergens.splice(index, 1);
                      return setFilter({ ...filter });
                    }}
                  />
                  <span className="pl-1">{a.allergenInSpanish}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
