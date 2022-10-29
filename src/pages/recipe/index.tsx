import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
//import { trpc } from "../../utils/trpc";

const recipes = () => {
  //const { data } = trpc.recipe.getTinyRecipes.useQuery();

  return (
    <Layout>
      <div>
        <RecipeDisplayer
          title={"Todas las recetas"}
          recipes={[]}
        ></RecipeDisplayer>
      </div>
    </Layout>
  );
};

export default recipes;
