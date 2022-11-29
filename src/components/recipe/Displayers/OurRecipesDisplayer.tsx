import LoadingCard from "../LoadingCard";
import BigRecipeCard from "./BigRecipeCard";

const OurRecipesDisplayer = ({
  recipes,
}: {
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) => {
  return (
    <div className="grid gap-y-10 gap-x-4 lg:grid-cols-2">
      {recipes
        ? recipes.map((recipe) => (
            <BigRecipeCard
              id={recipe.id}
              name={recipe.name}
              imageURL={recipe.imageURL}
              authorID={recipe.userId}
              key={recipe.id}
            ></BigRecipeCard>
          ))
        : [...Array(10)].map((e, i) => <LoadingCard key={i} />)}
    </div>
  );
};

export default OurRecipesDisplayer;
