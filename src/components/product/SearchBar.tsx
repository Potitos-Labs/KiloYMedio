import { trpc } from "@utils/trpc";
import { IFilterProduct } from "@utils/validations/product";
import { Dispatch, SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  filter,
  setFilter,
}: {
  filter: IFilterProduct;
  setFilter: Dispatch<SetStateAction<IFilterProduct>>;
}) => {
  const [value, setValue] = useState("");
  const { data } = trpc.product.getAllProducts.useQuery();

  const onChange = ({ searchInput }: { searchInput: string }) => {
    setValue(searchInput);
    if (searchInput.length == 0 || searchInput == "") {
      return setFilter({
        ...filter,
        name: searchInput
          .normalize("NFD")
          .replace(/[\u0300-\u0301]/g, "")
          .toLowerCase(),
      });
    }
  };
  const searchHandler = ({ searchInput }: { searchInput: string }) => {
    setValue(searchInput);
    return setFilter({
      name: searchInput
        .normalize("NFD")
        .replace(/[\u0300-\u0301]/g, "")
        .toLowerCase(),
      allergens: [],
      eCategories: [],
      neCategories: [],
      maxPrice: undefined,
      minPrice: undefined,
    });
  };

  return (
    <div className="group h-auto w-full flex-initial sm:right-0 sm:top-0 ">
      <div className="mx-2 flex h-10 rounded-3xl bg-accent px-4 shadow-md">
        <div
          className="mt-3 mr-2"
          onClick={() => searchHandler({ searchInput: value })}
        >
          <FaSearch className="fill-base-100" />
        </div>
        <input
          className="w-full truncate bg-accent py-1 text-xs text-base-100 placeholder-base-100 focus:outline-0"
          autoComplete="off"
          id="searchBar"
          value={value}
          type="text"
          placeholder="Buscar productos"
          onChange={(e) => onChange({ searchInput: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchHandler({ searchInput: value });
            }
          }}
        ></input>
      </div>

      <div className="scrollbar-hide absolute top-10 z-10 hidden w-full group-hover:block">
        <div className="scrollbar-hide mt-2 w-full overflow-auto rounded-md bg-base-100 shadow-xl">
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
                className="cursor-pointer hover:bg-accent hover:text-base-100 md:pl-4"
                key={product.id}
                onClick={() =>
                  searchHandler({
                    searchInput:
                      product.name.charAt(0).toUpperCase() +
                      product.name.slice(1),
                  })
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
