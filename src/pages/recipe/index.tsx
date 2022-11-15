import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { IFilterRecipe } from "@utils/validations/recipe";

const Recipes = () => {
  const { data: allRecipes } = trpc.recipe.getAllRecipes.useQuery();
  const { data: mostRecentRecipes } = trpc.recipe.getRecentRecipes.useQuery();
  console.log(allRecipes);
  const [filter, setFilter] = useState<IFilterRecipe>({
    dificultty: "all",
  });
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Layout>
      <div className="my-6">
        {mostRecentRecipes?.length != 0 && (
          <RecipeDisplayer recipes={mostRecentRecipes}></RecipeDisplayer>
        )}
        <div className="flex flex-row">
          <p className="mx-5 my-2 text-2xl font-bold text-kym3">
            Todas las recetas
          </p>
          <button onClick={() => setOpenFilter(!openFilter)}>
            <BsFilterSquare size="1.5rem" className="peer mt-1.5 text-kym4" />
          </button>
        </div>
        <div className={`w-full ${!openFilter ? "hidden" : "flex"}`}>
          <FilterRecipe filter={filter} setFilter={setFilter} />
        </div>
        {allRecipes?.length != 0 && (
          <RecipeDisplayer recipes={allRecipes}></RecipeDisplayer>
        )}
      </div>
    </Layout>
  );
};

export default Recipes;
