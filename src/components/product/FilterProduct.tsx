import { trpc } from "@utils/trpc";
import { IFilterProduct } from "@utils/validations/product";
import { Dispatch, SetStateAction } from "react";
import { FcInfo } from "react-icons/fc";

export default function FilterProduct({
  filter,
  setFilter,
}: {
  filter: IFilterProduct;
  setFilter: Dispatch<SetStateAction<IFilterProduct>>;
}) {
  const { data: categories } = trpc.product.getAllCategories.useQuery();
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
              return setFilter({
                ...filter,
                minPrice: e.target.valueAsNumber ? e.target.valueAsNumber : 0,
              });
            }}
          />
          <input
            type="number"
            placeholder="max."
            className="input mt-2 h-6 w-full"
            onChange={(e) =>
              setFilter({
                ...filter,
                maxPrice: e.target.valueAsNumber
                  ? e.target.valueAsNumber
                  : 1000000,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="sm:text-md grow whitespace-nowrap font-semibold">
            Tipo de producto
          </p>
          <label>
            <input
              type="checkbox"
              placeholder="min."
              className="checkbox checkbox-xs ml-3"
              defaultChecked={true}
              onChange={() => {
                const index = filter.typeProduct.indexOf("Edible");
                index == -1
                  ? filter.typeProduct.splice(0, 0, "Edible")
                  : filter.typeProduct.splice(index, 1);
                return setFilter({ ...filter });
              }}
            />
            <span className="pl-1">Comestibles</span>
          </label>
          <label>
            <input
              type="checkbox"
              placeholder="max."
              className="checkbox checkbox-xs ml-3"
              defaultChecked={true}
              onChange={() => {
                const index = filter.typeProduct.indexOf("NonEdible");
                index == -1
                  ? filter.typeProduct.splice(0, 0, "NonEdible")
                  : filter.typeProduct.splice(index, 1);
                return setFilter({ ...filter });
              }}
            />
            <span className="pl-1">No comestibles</span>
          </label>
        </div>
        <div>
          <p className="sm:text-md grow whitespace-nowrap font-semibold">
            Categorías
          </p>
          <div className="flex flex-col pl-3">
            {categories?.eCategories.map((c) => {
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
            {categories?.neCategories.map((c) => {
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
          <div
            className="flex flex-row"
            data-tip="Los productos mostrados no contendrán los alérgenos seleccionados"
          >
            <p className="sm:text-md mr-1 whitespace-nowrap font-semibold">
              Alérgenos
            </p>
            <div
              className="tooltip tooltip-right tooltip-info mt-1"
              data-tip="Los productos mostrados no contendrán los alérgenos seleccionados"
            >
              <FcInfo />
            </div>
          </div>
          <div className="flex flex-col pl-3">
            {allergens
              ?.sort((a, b) =>
                a.allergenInSpanish.localeCompare(b.allergenInSpanish),
              )
              .map((a) => {
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
