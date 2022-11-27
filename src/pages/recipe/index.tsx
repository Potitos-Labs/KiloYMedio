import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { IFilterRecipe } from "@utils/validations/recipe";
import VerticalRecipeDisplayer from "@components/recipe/verticalRecipe/VerticalRecipeDisplayer";

import Link from "next/link";
import Image from "next/image";

const Recipes = () => {
  const { data: mostRecentRecipes } = trpc.recipe.getRecentRecipes.useQuery();
  const [filter, setFilter] = useState<IFilterRecipe>({
    difficulty: undefined,
    maxPortion: undefined,
    minPortion: undefined,
    allergens: undefined,
    maxTime: undefined,
    minTime: undefined,
  });
  const { data: filteredRecipes } =
    trpc.recipe.getFilteredRecipes.useQuery(filter);
  console.log(filteredRecipes);
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div className="m-6">
        <div>
          <h1 className="mx-10 my-20 font-raleway text-xl text-base-100 lg:mr-40 lg:text-3xl">
            ¿QUÉ TE APETECE COCINAR HOY?
          </h1>
          <div className="flex justify-between pr-14">
            <div className="ml-10 flex w-48 flex-col gap-6">
              <Link href="/recipe/create">
                <button className="rounded-full bg-base-100 py-3 font-satoshiBold text-xs text-base-content">
                  compartir recetas
                </button>
              </Link>
              <Link href="/recipe">
                <button className="w-40 rounded-full bg-base-100 py-3 font-satoshiBold text-xs text-base-content">
                  buscar recetas
                </button>
              </Link>
            </div>
            <Image
              src="/img/fondoCucharasSinFondo.png"
              width="700"
              height="400"
            />
          </div>
        </div>
        <div className="rounded-xl bg-base-100">
          <p className="mx-5 mb-10 p-8 font-raleway text-lg lg:text-2xl">
            NUESTRAS RECETAS
          </p>
          {mostRecentRecipes?.length != 0 && (
            <RecipeDisplayer recipes={mostRecentRecipes}></RecipeDisplayer>
          )}
          <div className="mx-5 flex flex-row justify-between">
            <p className="mb-10 p-8 font-raleway text-lg lg:text-2xl">
              TODAS LAS RECETAS
            </p>
            <button onClick={() => setOpenFilter(!openFilter)}>
              <BsFilterSquare size="2rem" className="peer" />
            </button>
          </div>
          <hr className="border-1 mx-5 border-kym3"></hr>
          <div className={`mt-2 w-full ${!openFilter ? "hidden" : "flex"}`}>
            <FilterRecipe filter={filter} setFilter={setFilter} />
          </div>
          <VerticalRecipeDisplayer
            recipes={filteredRecipes}
          ></VerticalRecipeDisplayer>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;
