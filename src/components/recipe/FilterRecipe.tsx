import { IFilterRecipe } from "@utils/validations/recipe";
import { Dispatch, SetStateAction } from "react";

function FilterRecipe({
  filter,
  setFilter,
}: {
  filter: IFilterRecipe;
  setFilter: Dispatch<SetStateAction<IFilterRecipe>>;
}) {
  return (
    <div className="mx-5 flex justify-between rounded-md bg-white p-5 text-kym4 shadow-sm shadow-kym4">
      <div className="flex flex-col px-5 py-3">
        <p className="font-bold">Duración</p>
        <div className="flex flex-col">
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({
                  ...filter,
                  maxTime: undefined,
                  minTime: undefined,
                });
              }}
            />
            <p className="pl-2">Todas</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">0-60 mins</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">1-2 horas</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-5"
              type="radio"
              value=""
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, minTime: 121 });
              }}
            />
            <p className="pl-2">+2 horas</p>
          </label>
        </div>
      </div>

      <div className="flex flex-col px-5 py-3">
        <p className="font-bold">Dificultad</p>
        <div className="flex flex-col">
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">Todas</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">Difícil</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">Media</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="pl-2">Fácil</p>
          </label>
        </div>
      </div>
      <div className="flex flex-col px-5 py-3">
        <p className="font-bold">Raciones</p>
        <div className="flex flex-col">
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio-three"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({
                  ...filter,
                  minPortion: undefined,
                  maxPortion: undefined,
                });
              }}
            />
            <p className="pl-2">Todas</p>
          </label>
          <label className="ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio-three"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, minPortion: 1, maxPortion: 2 });
              }}
            />
            <p className="pl-2">1-2 raciones</p>
          </label>
          <label className=" ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio-three"
              className="h-4 w-4 border-gray-300 bg-gray-100  text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, minPortion: 2, maxPortion: 4 });
              }}
            />
            <p className="pl-2">2-4 raciones</p>
          </label>
          <label className=" ml-2 flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio-three"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              onChange={() => {
                return setFilter({ ...filter, minPortion: 5 });
              }}
            />
            <p className="pl-2">+4 raciones</p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterRecipe;
