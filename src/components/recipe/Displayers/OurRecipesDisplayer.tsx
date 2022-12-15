import { IRecipe } from "@utils/validations/recipe";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import LoadingCard from "../LoadingCard";
import BigRecipeCard from "./BigRecipeCard";

const OurRecipesDisplayer = ({
  recipes,
  count,
}: {
  recipes?: IRecipe[];
  count: number | undefined;
}) => {
  return (
    <div className="grid">
      <div className="grid gap-y-10 gap-x-4 lg:grid-cols-2">
        {recipes
          ? recipes
              .slice(0, count)
              .map((recipe) => (
                <BigRecipeCard key={recipe.id} recipe={recipe} />
              ))
          : [...Array(10)].map((i) => <LoadingCard key={i} />)}
      </div>
      <Link href="/recipe/display">
        <button
          className={`${
            count != 4 && "hidden"
          } btn mt-8 gap-2 justify-self-end rounded-full bg-base-100 font-raleway text-sm hover:bg-base-100`}
        >
          VER TODO
          <BsArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default OurRecipesDisplayer;
