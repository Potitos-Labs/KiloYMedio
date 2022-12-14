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
    <div className="mb-10 mt-6 grid w-full grid-cols-1 gap-y-6 md:grid-cols-2">
      <div className="flex">
        <div className="w-[250px]">
          <p className="mb-2 font-raleway">Duración</p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="default-radio"
                className="radio h-4 w-4 checked:bg-secondary"
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
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, maxTime: 60, minTime: 30 });
                }}
              />
              <p className="pl-2">0-60 min</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, maxTime: 120, minTime: 60 });
                }}
              />
              <p className="pl-2">1-2 horas</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, minTime: 121 });
                }}
              />
              <p className="pl-2">+2 horas</p>
            </label>
          </div>
        </div>

        <div className="w-[300px]">
          <p className="mb-2 font-raleway">Dificultad</p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-two"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, difficulty: undefined });
                }}
              />
              <p className="pl-2">Todas</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-two"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, difficulty: "hard" });
                }}
              />
              <p className="pl-2">Difícil</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-two"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, difficulty: "moderate" });
                }}
              />
              <p className="pl-2">Media</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-two"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, difficulty: "easy" });
                }}
              />
              <p className="pl-2">Fácil</p>
            </label>
          </div>
        </div>
        <div className="w-[300px]">
          <p className="mb-2 font-raleway">Raciones</p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-three"
                className="radio h-4 w-4 checked:bg-secondary"
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
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-three"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, minPortion: 1, maxPortion: 2 });
                }}
              />
              <p className="pl-2">1-2 raciones</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-three"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, minPortion: 2, maxPortion: 4 });
                }}
              />
              <p className="pl-2">2-4 raciones</p>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio-three"
                className="radio h-4 w-4 checked:bg-secondary"
                onChange={() => {
                  return setFilter({ ...filter, minPortion: 5 });
                }}
              />
              <p className="pl-2">+4 raciones</p>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:ml-4">
        <h1 className="mb-2 font-raleway">Alérgenos</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {allergenList.map((allergen, index) => {
            return (
              <div key={index} className="form-control">
                <label className="label cursor-pointer justify-start gap-x-2">
                  <input
                    type="checkbox"
                    value={allergen}
                    className="checkbox checkbox-sm"
                    onChange={(e) => allergensHandler(e.target.value)}
                  />
                  <span className="label-text">
                    {allergensinSpanish?.get(allergen)}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterRecipe;
