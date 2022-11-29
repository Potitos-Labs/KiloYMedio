import LittleRecipeCard from "./recipe/Displayers/LittleRecipeCard";
import LoadingCard from "./recipe/LoadingCard";

function Slider({
  isBig,
  recipes,
}: {
  isBig: boolean;
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) {
  return (
    <div className={`${isBig ?? "w-full"}`}>
      <div className="rounded-md ">
        {recipes
          ? recipes.map((recipe) => (
              <LittleRecipeCard
                id={recipe.id}
                name={recipe.name}
                imageURL={recipe.imageURL}
                authorID={recipe.userId}
                key={recipe.id}
              ></LittleRecipeCard>
            ))
          : [...Array(10)].map((e, i) => <LoadingCard key={i} />)}
      </div>
    </div>
  );
}
export default Slider;
