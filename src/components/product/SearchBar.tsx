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
    <div className="group  h-auto w-auto grow self-end  sm:right-0 sm:top-0 ">
      <div className="mx-2 mb-2 flex grow rounded-lg bg-white px-2 shadow-md  sm:px-4">
        <input
          className=" grow truncate py-1 focus:outline-0  sm:w-full"
          autoComplete="off"
          id="searchBar"
          value={value}
          type="text"
          placeholder="Buscar... "
          onChange={(e) => onChange({ searchInput: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchHandler({ searchInput: value });
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
                className="cursor-pointer hover:bg-background md:pl-4"
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
