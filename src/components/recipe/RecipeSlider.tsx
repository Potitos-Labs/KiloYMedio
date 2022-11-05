import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows";

import { RecipeCard } from "./RecipeCard";

const RecipeDisplayer = ({
  title,
  recipes,
}: {
  title: string;
  recipes?: { id: string; name: string; imageURL: string }[];
}) => {
  return (
    <div className="mx-6 mt-4">
      <p className="mb-2 text-2xl font-bold  normal-case text-kym3">{title}</p>

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
                ratings={0}
                imageURL={recipe.imageURL}
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
