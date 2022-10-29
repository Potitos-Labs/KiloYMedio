//import { Recipe } from "@prisma/client";
import RecipeCard from "./RecipeCard";

const RecipeDisplayer = ({
  title,
  recipes,
}: {
  title: string;
  recipes: { id: string; name: string }[];
}) => {
  return (
    <div className="mt-4">
      <p>{title}</p>
      <div>
        {recipes.map((recipe) => (
          <RecipeCard
            id={recipe.id}
            name={recipe.name}
            ratings={0}
            key={recipe.id}
          ></RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default RecipeDisplayer;
