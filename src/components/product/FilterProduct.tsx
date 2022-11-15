import { trpc } from "@utils/trpc";
import { IFilterProduct } from "@utils/validations/product";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FcInfo } from "react-icons/fc";

export function CheckboxLoad() {
  return (
    <div className="flex animate-pulse items-center space-y-4 space-x-2">
      <div className="h-4 w-4 rounded-full bg-slate-200" />
      <div className="h-2 w-28 self-center rounded bg-slate-200" />
    </div>
  );
}

export default function FilterProduct({
  filter,
  setFilter,
  className,
}: {
  filter: IFilterProduct;
  setFilter: Dispatch<SetStateAction<IFilterProduct>>;
  className?: string;
}) {
  const { data: categories } = trpc.product.getAllCategories.useQuery();
  const { data: allergens } = trpc.product.getAllAllergensInSpanish.useQuery();
  const [errorPrice, setErrorPrice] = useState(false);

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
    <div className={`${className} p-4`}>
      <div className="flex flex-col">
        <span className="whitespace-nowrap font-semibold sm:text-lg">
          Ordenar por:
        </span>
        <select
          onChange={handleOrderByChange}
          value={
            filter.orderByName
              ? "name" + filter.orderByName
              : filter.orderByPrice
              ? "price" + filter.orderByPrice
              : "noSelection"
          }
          className="select select-bordered select-xs mx-4 mt-1 w-full max-w-[80%] bg-white"
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
          <span>Mín:</span>
          <input
            type="number"
            placeholder="0€"
            step="any"
            className={`input ml-2 h-6 w-20 ${
              errorPrice && "border-pink-600"
            } `}
            onChange={(e) => {
              const minValue = e.target.valueAsNumber
                ? e.target.valueAsNumber
                : 0;
              if (filter.maxPrice ?? 5000 < minValue) {
                setErrorPrice(true);
                return;
              }
              setErrorPrice(false);
              setFilter({
                ...filter,
                minPrice: minValue,
              });
            }}
          />
          <div
            className={`tooltip tooltip-top tooltip-accent ${
              errorPrice && "tooltip-open"
            } tooltip-error z-10`}
            data-tip="El precio mínimo no puede ser mayor al máximo"
          />
        </label>
        <label className="mt-2 ml-4 flex">
          <span>Máx:</span>
          <input
            type="number"
            placeholder="5000€"
            step="any"
            className={`input ml-2 h-6 w-20 ${
              errorPrice && "border-pink-600"
            } `}
            onChange={(e) => {
              const maxValue = e.target.valueAsNumber
                ? e.target.valueAsNumber
                : 5000;
              if (filter.minPrice ?? 0 > maxValue) {
                setErrorPrice(true);
                return;
              }
              setErrorPrice(false);
              setFilter({
                ...filter,
                maxPrice: maxValue,
              });
            }}
          />
        </label>
      </div>
      <div className="mt-2">
        <p className="grow whitespace-nowrap font-semibold sm:text-lg">
          Categorías
        </p>
        {categories && allergens ? (
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
                      checked={filter.eCategories.includes(c.category)}
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
                    checked={filter.neCategories.includes(c.category)}
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
        ) : (
          [...Array(14)].map((e, i) => {
            return <CheckboxLoad key={i} />;
          })
        )}
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
            className="tooltip tooltip-right tooltip-info z-10 mt-2"
            data-tip="Los productos mostrados no contendrán los alérgenos seleccionados"
          >
            <FcInfo className="-mt-0.5" />
          </div>
        </div>
        <div className="flex flex-col pl-4">
          {allergens
            ? allergens
                .sort((a, b) =>
                  a.allergenInSpanish.localeCompare(b.allergenInSpanish),
                )
                .map((a) => {
                  return (
                    <label key={a.id}>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs"
                        checked={filter.allergens.includes(a.allergen)}
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
                })
            : [...Array(12)].map((e, i) => {
                return <CheckboxLoad key={i} />;
              })}
        </div>
      </div>
    </div>
  );
}
