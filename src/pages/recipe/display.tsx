import Layout from "@components/Layout";
import OurRecipesDisplayer from "@components/recipe/Displayers/OurRecipesDisplayer";
import FilterRecipe from "@components/recipe/FilterRecipe";
import { IFilterRecipe } from "@utils/validations/recipe";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useState } from "react";
import { BsArrowLeftShort, BsFilterSquareFill } from "react-icons/bs";

export default function Display() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<IFilterRecipe>({
    adminRecipes: true,
  });
  const { data: recipesAdmin } = trpc.recipe.getFilteredRecipes.useQuery({
    adminRecipes: true,
    ...filter,
  });
  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div>
        {/* Botón atrás (Recetas) */}
        <Link href={`/recipe`}>
          <div className="btn mt-10 flex w-[220px] cursor-pointer gap-4 sm:w-[320px] ">
            <div className="rounded-lg bg-accent p-0.5">
              <BsArrowLeftShort className="text-base-100" size={25} />
            </div>
            <h3 className="flex font-raleway text-base-100 sm:text-lg">
              TODAS LAS RECETAS
            </h3>
          </div>
        </Link>
        {/* End Botón atrás (Recetas) */}
        <div className="rounded-box mx-4 mb-10 mt-4 bg-base-100 p-10 2xl:m-8 2xl:p-20">
          <div className="my-4 flex justify-between">
            <p className="w-[400px] font-raleway text-lg lg:text-2xl">
              NUESTRAS RECETAS
            </p>
            {/* Filtros */}
            <button
              className="peer self-end px-1 pb-2 font-raleway text-secondary sm:rounded-full sm:bg-secondary sm:px-6 sm:pt-2.5 sm:text-base-100"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <p className="hidden sm:flex">FILTRAR POR:</p>
              <BsFilterSquareFill className="sm:hidden" size={30} />
            </button>
          </div>
          <div className={`mt-2 w-full ${!openFilter ? "hidden" : "flex"}`}>
            <FilterRecipe filter={filter} setFilter={setFilter} />
          </div>
          {/* End Filtros */}
          <OurRecipesDisplayer
            recipes={recipesAdmin}
            count={undefined}
          ></OurRecipesDisplayer>
        </div>
      </div>
    </Layout>
  );
}
