import { IFilterRecipe } from "@utils/validations/recipe";
import { Dispatch, SetStateAction } from "react";

function FilterRecipe({
  filter,
  setFilter,
}: {
  filter: IFilterRecipe;
  setFilter: Dispatch<SetStateAction<IFilterRecipe>>;
}) {
  //const difficulty = ["easy", "moderate", "hard"];
  return (
    <div className="mx-5 flex w-full justify-between rounded-md bg-white p-5 text-kym4 shadow-sm shadow-kym4">
      <div className="flex flex-col px-5 py-3">
        Duración
        <div className="flex flex-col">
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, maxTime: 30, minTime: 0 });
              }}
            />
            0-30 min
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-3"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, maxTime: 60, minTime: 30 });
              }}
            />
            30-60 min
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, maxTime: 120, minTime: 60 });
              }}
            />
            1-2 horas
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-5"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, minTime: 120 });
              }}
            />
            +2 horas
          </label>
        </div>
      </div>

      <div className="flex flex-col px-5 py-3">
        Dificultad
        <div className="flex flex-col">
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio-two"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, difficulty: undefined });
              }}
            />
            Todas
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio-two"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, difficulty: "hard" });
              }}
            />
            Difícil
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-3"
              type="radio"
              value=""
              name="default-radio-two"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, difficulty: "moderate" });
              }}
            />
            Medio
          </label>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio-two"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, difficulty: "easy" });
              }}
            />
            Fácil
          </label>
        </div>
      </div>
      <div className="flex flex-row px-5 py-3">
        Raciones
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}

export default FilterRecipe;
