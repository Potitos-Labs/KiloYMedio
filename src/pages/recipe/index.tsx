import Layout from "../../components/Layout";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { IFilterRecipe } from "@utils/validations/recipe";

import Link from "next/link";
import Image from "next/image";

import OurRecipesDisplayer from "@components/recipe/Displayers/OurRecipesDisplayer";
import SliderRecipes from "@components/SliderRecipes";

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
  // const { data: filteredRecipes } =
  //   trpc.recipe.getFilteredRecipes.useQuery(filter);

  const { data: recipes } = trpc.recipe.getAllRecipes.useQuery();
  // const ourRecipes = recipes?.filter((recipe) => {
  //   recipe.User?.role != "admin";
  // });

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div className="m-4 2xl:m-8">
        {/* Intro Recipes */}
        <div>
          <h1 className="mx-10 my-20 font-raleway text-xl text-base-100 lg:mr-40 lg:text-3xl">
            ¿QUÉ TE APETECE COCINAR HOY?
          </h1>
          <div className="flex justify-between pr-14">
            <div className="ml-10 flex w-48 flex-col gap-6">
              <Link href="/recipe/create">
                <button className="rounded-full bg-base-100 py-3 font-satoshiBold text-base-content 2xl:text-sm">
                  compartir recetas
                </button>
              </Link>
              <Link href="/recipe">
                <button className="w-40 rounded-full bg-base-100 py-3 font-satoshiBold text-base-content 2xl:text-sm">
                  buscar recetas
                </button>
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
            <div className="flex justify-between">
              <p className="my-10 w-[400px] font-raleway text-lg lg:text-2xl">
                NUESTRAS RECETAS
              </p>
              {/* Filtros */}
              <button onClick={() => setOpenFilter(!openFilter)}>
                <BsFilterSquare size="2rem" className="peer" />
              </button>
            </div>
            <div className={`mt-2 w-full ${!openFilter ? "hidden" : "flex"}`}>
              <FilterRecipe filter={filter} setFilter={setFilter} />
            </div>
            {/* End Filtros */}
            <OurRecipesDisplayer recipes={recipes}></OurRecipesDisplayer>
          </div>
          {/* End Our recipes Section */}
          <div>
            <p className="mb-10 font-raleway text-lg md:w-[600px] lg:text-2xl">
              RECETAS DE LA COMUNIDAD
            </p>
            {mostRecentRecipes?.length != 0 && (
              <SliderRecipes isBig={false} recipes={recipes} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;
