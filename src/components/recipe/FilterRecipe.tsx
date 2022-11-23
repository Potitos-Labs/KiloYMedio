import { Allergen } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { IFilterRecipe } from "@utils/validations/recipe";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

function FilterRecipe({
  filter,
  setFilter,
}: {
  filter: IFilterRecipe;
  setFilter: Dispatch<SetStateAction<IFilterRecipe>>;
}) {
  const { data: allergensinSpanish } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  const allergenList = data?.map((e) => e.allergen) ?? [];

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const list = filter.allergens ? filter.allergens : [];
    const index = list?.indexOf(allergen);
    if (index != -1) list?.splice(index, 1);
    else list?.push(allergen);
    setFilter({ ...filter, allergens: list });
  };
  return (
    <div className="mx-5 flex w-full  rounded-md bg-white p-5 text-kym4 shadow-sm shadow-kym4 sm:w-auto">
      <div className=" mr-3 flex w-[250px] flex-col py-3 sm:px-5">
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
          <label className="ml-2  flex flex-row p-1 text-sm font-medium text-gray-900 dark:text-gray-300">
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
            <p className="flex pl-2">0-60 mins</p>
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

      <div className="mr-4 flex flex-col py-3 sm:px-5">
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
      <div className="flex w-[250px] flex-col px-0 py-3 sm:px-5">
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
      <div className="container ml-8 max-w-full font-sans text-base">
        <div className="m-auto flex w-full flex-col overflow-hidden border border-gray-400 pb-4 shadow-lg">
          <div className="flex flex-col">
            <h1 className="mt-3 ml-3 flex flex-col text-lg font-bold underline">
              Alérgenos
            </h1>
            <div className="grid grid-cols-2">
              {allergenList.map((allergen) => {
                return (
                  <label key="" className="custom-label mt-2 ml-3 flex">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center bg-white p-1 shadow">
                      <input
                        type="checkbox"
                        value={allergen}
                        onChange={(e) => allergensHandler(e.target.value)}
                      />
                    </div>
                    <span className="select-none">
                      {allergensinSpanish?.get(allergen)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterRecipe;
