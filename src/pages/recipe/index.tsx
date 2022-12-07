import Layout from "../../components/Layout";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { IFilterRecipe } from "@utils/validations/recipe";

import Link from "next/link";
import Image from "next/image";

import OurRecipesDisplayer from "@components/recipe/Displayers/OurRecipesDisplayer";
import SliderRecipes from "@components/SliderRecipes";

const Recipes = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<IFilterRecipe>({
    adminRecipes: true,
  });

  const { data: recipesAdmin } = trpc.recipe.getFilteredRecipes.useQuery({
    adminRecipes: true,
  });
  const { data: recipesCommunity } = trpc.recipe.getFilteredRecipes.useQuery({
    adminRecipes: false,
  });

  const buttonStyle =
    "w-40 rounded-full bg-base-100 py-3 font-satoshiBold text-base-content sm:w-52 sm:text-sm";

  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div className="m-4 2xl:m-8">
        {/* Intro Recipes */}
        <div>
          <h1 className="mx-10 my-10 font-raleway text-xl text-base-100 sm:my-20 lg:mr-40 lg:text-3xl">
            ¿QUÉ TE APETECE COCINAR HOY?
          </h1>
          <div className="flex flex-col justify-between sm:flex-row sm:pr-14">
            <div className="ml-10 mb-20 flex w-48 flex-col gap-6 sm:mb-0">
              <Link href="/recipe/create">
                <button className={buttonStyle}>compartir recetas</button>
              </Link>
              <Link href="/recipe">
                <button className={buttonStyle}>buscar recetas</button>
              </Link>
            </div>
            <Image
              src="/img/fondoCucharasSinFondo.png"
              alt=""
              width="700"
              height="400"
            />
          </div>
        </div>
        {/* End Intro Recipes */}
        <div className="rounded-xl bg-base-100 p-6 sm:p-14 2xl:p-20">
          {/* Our recipes Section */}
          <div className="mb-32">
            <div className="my-10 flex justify-between">
              <p className="w-[400px] font-raleway text-lg lg:text-2xl">
                NUESTRAS RECETAS
              </p>
              {/* Filtros */}
              <button
                className="peer h-10 self-end rounded-full bg-secondary px-6 pb-2 pt-2.5 font-raleway text-base-100"
                onClick={() => setOpenFilter(!openFilter)}
              >
                FILTRAR POR:
              </button>
            </div>
            <div className={`mt-2 w-full ${!openFilter ? "hidden" : "flex"}`}>
              <FilterRecipe filter={filter} setFilter={setFilter} />
            </div>
            {/* End Filtros */}
            <OurRecipesDisplayer recipes={recipesAdmin}></OurRecipesDisplayer>
          </div>
          {/* End Our recipes Section */}
          <div className="w-full">
            <p className="font-raleway text-lg md:w-[600px] lg:text-2xl">
              RECETAS DE LA COMUNIDAD
            </p>
            {recipesCommunity?.length != 0 && (
              <SliderRecipes isBig={false} recipes={recipesCommunity} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;
