import { IRecipe } from "@utils/validations/recipe";
//import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import LoadingCard from "../LoadingCard";
import BigRecipeCard from "./BigRecipeCard";

const OurRecipesDisplayer = ({ recipes }: { recipes?: IRecipe[] }) => {
  return (
    <div className="text-end">
      <div className="grid gap-y-10 gap-x-4 lg:grid-cols-2">
        {recipes
          ? recipes.map((recipe) => (
              <BigRecipeCard key={recipe.id} recipe={recipe} />
            ))
          : [...Array(10)].map((i) => <LoadingCard key={i} />)}
      </div>
      {/* <Link href="/allOurRecipes"> //PENSANDO CÓMO PLANTEARLO */}
      <button className="btn mt-8 gap-2 rounded-full bg-base-100 font-raleway text-sm hover:bg-base-100">
        VER TODO
        <BsArrowRight />
      </button>
      {/* </Link> */}
    </div>
  );
};

export default OurRecipesDisplayer;
