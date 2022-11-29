import { FaSearch } from "react-icons/fa";

const WorkshopSearchBar = () => {
  return (
    <div className="">
      <div className="xs:mr-3 flex h-full grow rounded-full bg-primary px-2 shadow-md  sm:px-4">
        <div className=" flex items-center justify-center">
          <FaSearch className="fill-background" />
        </div>
        <input
          className=" font-background ml-3 grow truncate bg-primary py-1 placeholder-background focus:outline-0 sm:w-full"
          autoComplete="off"
          id="searchBar"
          type="text"
          placeholder="buscar talleres"
        ></input>
      </div>
    </div>
  );
};
export default WorkshopSearchBar;
