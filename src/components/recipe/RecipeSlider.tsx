import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { RecipeCard } from "./RecipeCard";
import { LeftArrow, RightArrow } from "./Arrows";

const RecipeDisplayer = ({
  recipes,
}: {
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) => {
  return (
    <div className="mx-6 mt-6 mb-8">
      <div className="rounded-md border-2  shadow-md">
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          options={{
            ratio: 0.9,
            rootMargin: "5px",
            threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
          }}
        >
          {recipes ? (
            recipes.map((recipe) => (
              <RecipeCard
                id={recipe.id}
                name={recipe.name}
                ratings={4}
                imageURL={recipe.imageURL}
                authorID={recipe.userId}
                key={recipe.id}
              ></RecipeCard>
            ))
          ) : (
            <p> Cargando... </p>
          )}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default RecipeDisplayer;
