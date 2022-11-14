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
    eCategories: [],
    neCategories: [],
  });

  return (
    <div className="group relative h-4/5 w-4/5 sm:h-auto md:w-64">
      <div className="input input-bordered mb-2 flex max-h-8 rounded-lg border-black shadow-md  sm:px-4">
        <input
          className="input h-full w-full truncate focus:outline-0 sm:py-1"
          autoComplete="off"
          id="searchBar"
          value={value}
          type="text"
          placeholder="Ingrediente"
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </div>

      <div className="scrollbar-hide absolute top-8  z-10 hidden w-full group-hover:block">
        <div className="scrollbar-hide  mt-2 w-full overflow-auto rounded-md bg-slate-50 shadow-xl">
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
                className="cursor-pointer pl-4 hover:bg-background"
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
