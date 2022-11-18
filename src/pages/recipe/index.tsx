import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import FilterRecipe from "components/recipe/FilterRecipe";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { IFilterRecipe } from "@utils/validations/recipe";
import VerticalRecipeDisplayer from "@components/recipe/verticalRecipe/VerticalRecipeDisplayer";

const Recipes = () => {
  const { data: mostRecentRecipes } = trpc.recipe.getRecentRecipes.useQuery();
  const [filter, setFilter] = useState<IFilterRecipe>({});
  const { data: filteredRecipes } =
    trpc.recipe.getFilteredRecipes.useQuery(filter);
  console.log(filteredRecipes);
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Layout>
      <div className="my-6">
        <p className="mx-5 my-2 mb-2 grow whitespace-nowrap text-2xl  normal-case">
          Lo más nuevo
        </p>
        <hr className="border-1 mx-5 border-kym3"></hr>
        {mostRecentRecipes?.length != 0 && (
          <RecipeDisplayer recipes={mostRecentRecipes}></RecipeDisplayer>
        )}
        <div className="mx-5 flex flex-row">
          <p className="my-2 mr-5 mb-2 grow whitespace-nowrap text-2xl  normal-case">
            Todas las recetas
          </p>
          <button onClick={() => setOpenFilter(!openFilter)}>
            <BsFilterSquare size="1.5rem" className="peer mt-1.5 text-kym4" />
          </button>
        </div>
        <hr className="border-1 mx-5 border-kym3"></hr>
        <div className={` mt-2 w-full ${!openFilter ? "hidden" : "flex"}`}>
          <FilterRecipe filter={filter} setFilter={setFilter} />
        </div>
        <VerticalRecipeDisplayer
          recipes={filteredRecipes}
        ></VerticalRecipeDisplayer>
      </div>
    </Layout>
  );
};

export default Recipes;
