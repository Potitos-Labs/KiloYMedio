import LoadingCard from "../LoadingCard";
import { VerticalRecipeCard } from "./VerticalRecipeCard";

const RecipeDisplayer = ({
  recipes,
}: {
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) => {
  return (
    <div className="mb-8">
      <br></br>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {recipes
          ? recipes.map((recipe) => (
              <VerticalRecipeCard
                id={recipe.id}
                name={recipe.name}
                ratings={4}
                imageURL={recipe.imageURL}
                authorID={recipe.userId}
                key={recipe.id}
              ></VerticalRecipeCard>
            ))
          : [...Array(10)].map((e, i) => <LoadingCard key={i} />)}
      </div>
    </div>
  );
};

export default RecipeDisplayer;
