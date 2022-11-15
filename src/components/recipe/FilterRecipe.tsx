import { IFilterRecipe } from "@utils/validations/recipe";
import { Dispatch, SetStateAction } from "react";

function FilterRecipe({
  filter,
  setFilter,
}: {
  filter: IFilterRecipe;
  setFilter: Dispatch<SetStateAction<IFilterRecipe>>;
}) {
  function si() {
    setFilter(filter);
  }
  //const difficulty = ["easy", "moderate", "hard"];
  return (
    <div className="mx-5 flex w-full justify-between rounded-md bg-white p-5 text-kym4 shadow-sm shadow-kym4">
      <div className="flex flex-col px-5 py-3">Duración</div>
      <div className="flex flex-col px-5 py-3">
        Dificultad
        <div>
          <label>
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              onChange={() => {
                si();
                // const index = filter.eCategories.indexOf(c.category);
                // index == -1
                //   ? filter.eCategories.splice(0, 0, c.category)
                //   : filter.eCategories.splice(index, 1);
                // return setFilter({ ...filter });
              }}
            />{" "}
            Fácil
          </label>
        </div>
      </div>
      <div className="flex flex-row px-5 py-3">Raciones</div>
    </div>
  );
}

export default FilterRecipe;
