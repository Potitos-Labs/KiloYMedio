import { FaSearch } from "react-icons/fa";

interface SearchProps {
  updateSearchFunction: (input: string) => void;
}

const SearchBar = ({ updateSearchFunction }: SearchProps) => {
  const searchHandler = () => {
    updateSearchFunction(
      (document.getElementById("searchBar") as HTMLInputElement).value,
    );
  };

  return (
    <div className="flex h-4/5 w-4/5 rounded-lg bg-white px-2 shadow-md sm:h-auto sm:w-auto sm:px-4">
      <input
        className="w-full focus:outline-0 sm:py-1 "
        id="searchBar"
        type="text"
        placeholder="Buscar... "
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            searchHandler();
          }
        }}
      ></input>
      <button className="ml-2" onClick={() => searchHandler()}>
        <FaSearch />
      </button>
    </div>
  );
};
export default SearchBar;
