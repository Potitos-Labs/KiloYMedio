import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";

const Recipes = () => {
  const { data: allRecipes } = trpc.recipe.getAllRecipes.useQuery();
  const { data: mostRecentRecipes } = trpc.recipe.getRecentRecipes.useQuery();
  console.log(allRecipes);
  //const [filter, setFilter] = useState(allRecipes);
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Layout>
      <div className="my-6">
        {mostRecentRecipes?.length != 0 && (
          <RecipeDisplayer recipes={mostRecentRecipes}></RecipeDisplayer>
        )}
        <div className="flex flex-row">
          <p className=" ml-5 mb-2 text-2xl font-bold  normal-case text-kym3">
            Todas las recetas
          </p>
          <button onClick={() => setOpenFilter(!openFilter)}>
            <BsFilterSquare size="2rem" className="ml-3" />
          </button>
          <div className={`${!openFilter ? "hidden" : "flex"}`}>
            <FilterRecipe />
          </div>
        </div>
        {allRecipes?.length != 0 && (
          <RecipeDisplayer recipes={allRecipes}></RecipeDisplayer>
        )}
      </div>
    </Layout>
  );
};

export default Recipes;
