import { ECategory } from "@prisma/client";
import { trpc } from "@utils/trpc";

const SearchBar = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) => {
  const { data } = trpc.product.getFilteredProducts.useQuery({
    name: "",
    maxPrice: 5000,
    minPrice: 0,
    allergens: [],
    eCategories: Object.keys(ECategory) as ECategory[],
    neCategories: [],
  });

  return (
    <div className="group relative h-4/5 w-4/5 sm:h-auto md:w-64">
      <div className="input input-bordered flex h-[60px] rounded-[30px] border-neutral">
        <input
          className="input h-full w-full bg-transparent text-sm text-neutral focus:outline-0"
          autoComplete="off"
          id="searchBar"
          value={value}
          type="text"
          placeholder="Ingrediente"
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </div>

      <div className="scrollbar-hide absolute top-[52px] z-10 hidden w-full group-hover:block">
        <div className="scrollbar-hide mt-2 w-full overflow-auto rounded-md bg-white shadow-xl">
          {data
            ?.filter((product) => {
              return (
                value &&
                (product.name.toLowerCase().startsWith(value.toLowerCase()) ||
                  product.name
                    .toLowerCase()
                    .includes(" " + value.toLowerCase())) &&
                product.name.toLowerCase() !== value.toLowerCase()
              );
            })
            .slice(0, 10)
            .map((product) => (
              <div
                className="cursor-pointer pl-4 text-sm hover:bg-amber-100"
                key={product.id}
                onClick={() =>
                  setValue(
                    product.name.charAt(0).toUpperCase() +
                      product.name.slice(1),
                  )
                }
              >
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
