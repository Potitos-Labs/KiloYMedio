import { IRecipe } from "@utils/validations/recipe";
import LoadingCard from "../LoadingCard";
import BigRecipeCard from "./BigRecipeCard";

const OurRecipesDisplayer = ({ recipes }: { recipes?: IRecipe[] }) => {
  return (
    <div className="grid gap-y-10 gap-x-4 lg:grid-cols-2">
      {recipes
        ? recipes.map((recipe) => (
            <BigRecipeCard key={recipe.id} recipe={recipe} />
          ))
        : [...Array(10)].map((e, i) => <LoadingCard key={i} />)}
    </div>
  );
};

export default OurRecipesDisplayer;
