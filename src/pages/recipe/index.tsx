import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import { trpc } from "../../utils/trpc";

const recipes = () => {
  const { data: allRecipes } = trpc.recipe.getAllRecipes.useQuery();
  const { data: mostRecentRecipes } = trpc.recipe.getRecentRecipes.useQuery();
  console.log(allRecipes);
  return (
    <Layout>
      <div className="my-6">
        {mostRecentRecipes?.length != 0 && (
          <RecipeDisplayer
            title={"Lo más nuevo"}
            recipes={mostRecentRecipes}
          ></RecipeDisplayer>
        )}
        {allRecipes?.length != 0 && (
          <RecipeDisplayer
            title={"Todas las recetas"}
            recipes={allRecipes}
          ></RecipeDisplayer>
        )}
      </div>
    </Layout>
  );
};

export default recipes;
