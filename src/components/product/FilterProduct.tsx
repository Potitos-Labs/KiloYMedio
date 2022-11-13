import { trpc } from "@utils/trpc";
import { IFilterProduct } from "@utils/validations/product";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
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

  const handleOrderByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let selected = {};
    switch (true) {
      case value.startsWith("name"):
        value.endsWith("asc")
          ? (selected = { orderByName: "asc", orderByPrice: undefined })
          : (selected = { orderByName: "desc", orderByPrice: undefined });
        break;
      case value.startsWith("price"):
        value.endsWith("asc")
          ? (selected = { orderByName: undefined, orderByPrice: "asc" })
          : (selected = { orderByName: undefined, orderByPrice: "desc" });
        break;
      default:
        selected = { orderByName: undefined, orderByPrice: undefined };
    }
    setFilter({ ...filter, ...selected });
  };

  return (
    <div className="sm:w-full sm:max-w-xs">
      <div className="ml-12 mt-12 flex h-11 flex-row border-b-2 border-kym3">
        <p className="grow whitespace-nowrap font-semibold sm:text-lg">
          Filtros de búsqueda
        </p>
      </div>
      <div className="ml-12 mt-12 rounded-md bg-white p-4">
        <div className="flex flex-col">
          <span className="whitespace-nowrap font-semibold sm:text-lg">
            Ordenar por:
          </span>
          <select
            onChange={handleOrderByChange}
            className="select select-bordered select-xs mx-4 mt-1 w-full max-w-[90%] bg-white"
            value={"noSelection"}
          >
            <option disabled value={"noSelection"}>
              Seleccionar
            </option>
            <option value={"priceasc"}>Precios más barato primero</option>
            <option value={"pricedesc"}>Precios más caros primero</option>
            <option value={"nameasc"}>Nombre: de A-Z</option>
            <option value={"namedesc"}>Nombre: de Z-A</option>
          </select>
        </div>
        <div className="mt-2">
          <p className="grow whitespace-nowrap font-semibold sm:text-lg">
            Precio
          </p>
          <label className="ml-4 flex">
            <span>Min:</span>
            <input
              type="number"
              placeholder="0€"
              className="input ml-2 h-6 w-20"
              onChange={(e) => {
                return setFilter({
                  ...filter,
                  minPrice: e.target.valueAsNumber ? e.target.valueAsNumber : 0,
                });
              }}
            />
          </label>
          <label className="mt-2 ml-4 flex">
            <span>Max:</span>
            <input
              type="number"
              placeholder="100€"
              className="input ml-2 h-6 w-20"
              onChange={(e) =>
                setFilter({
                  ...filter,
                  maxPrice:
                    e.target.valueAsNumber || e.target.valueAsNumber == 0
                      ? e.target.valueAsNumber
                      : 100,
                })
              }
            />
          </label>
        </div>
        <div className="mt-2">
          <p className="grow whitespace-nowrap font-semibold sm:text-lg">
            Categorías
          </p>
          <div className="flex flex-col pl-4">
            {categories?.eCategories
              .sort((a, b) =>
                a.categoryInSpanish.localeCompare(b.categoryInSpanish),
              )
              .map((c) => {
                return (
                  <label key={c.id}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs"
                      defaultChecked={filter.eCategories.includes(c.category)}
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
            <hr className="my-1 ml-4 w-[75%]"></hr>
            {categories?.neCategories.map((c) => {
              return (
                <label key={c.id}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    defaultChecked={filter.neCategories.includes(c.category)}
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
        <div className="mt-2">
          <div
            className="flex flex-row"
            data-tip="Los productos mostrados no contendrán los alérgenos seleccionados"
          >
            <p className="mr-1 whitespace-nowrap font-semibold sm:text-lg">
              Alérgenos
            </p>
            <div
              className="tooltip tooltip-right tooltip-info mt-2"
              data-tip="Los productos mostrados no contendrán los alérgenos seleccionados"
            >
              <FcInfo />
            </div>
          </div>
          <div className="flex flex-col pl-4">
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
