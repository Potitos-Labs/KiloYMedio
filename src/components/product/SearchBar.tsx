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
  };

  const searchHandler = ({ searchInput }: { searchInput: string }) => {
    setValue(searchInput);
    return setFilter({
      ...filter,
      name: searchInput
        .normalize("NFD")
        .replace(/[\u0300-\u0301]/g, "")
        .toLowerCase(),
    });
  };

  return (
    <div className="relative h-4/5 w-4/5 sm:h-auto sm:w-auto">
      <div className="mb-2 flex  rounded-lg bg-white px-2 shadow-md  sm:px-4">
        <input
          className="w-full focus:outline-0 sm:py-1 "
          autoComplete="off"
          id="searchBar"
          value={value}
          type="text"
          placeholder="Buscar... "
          onChange={(e) => onChange({ searchInput: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onChange({ searchInput: value });
            }
          }}
        ></input>
        <div
          className="ml-2 mt-2"
          onClick={() => searchHandler({ searchInput: value })}
        >
          <FaSearch />
        </div>
      </div>
      <div className="scrollbar-hide absolute z-50  w-full overflow-auto rounded-md bg-slate-50 shadow-xl ">
        {data
          ?.filter((product) => {
            return (
              value &&
              product.name.toLowerCase().startsWith(value) &&
              product.name.toLowerCase() !== value
            );
          })
          .slice(0, 10)
          .map((product) => (
            <div
              className="ml-4 cursor-pointer"
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
  );
};
export default SearchBar;
