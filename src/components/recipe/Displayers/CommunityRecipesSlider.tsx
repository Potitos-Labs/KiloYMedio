import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../Arrows";
import LoadingCard from "../LoadingCard";
import VerticalRecipeCard from "./OurRecipesCard";

const CommunityRecipesSlider = ({
  recipes,
}: {
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) => {
  return (
    <div className="my-8">
      <div className="rounded-md ">
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          options={{
            ratio: 0.9,
            rootMargin: "0px",
            threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
          }}
        >
          {recipes
            ? recipes.map((recipe) => (
                <VerticalRecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  imageURL={recipe.imageURL}
                  authorID={recipe.userId}
                  key={recipe.id}
                ></VerticalRecipeCard>
              ))
            : [...Array(10)].map((e, i) => <LoadingCard key={i} />)}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default CommunityRecipesSlider;
