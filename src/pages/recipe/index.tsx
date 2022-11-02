import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import { trpc } from "../../utils/trpc";

const recipes = () => {
  const { data: allRecipes } = trpc.recipe.getAllRecipes.useQuery();
  return (
    <Layout>
      <div>
        {!allRecipes && (
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
