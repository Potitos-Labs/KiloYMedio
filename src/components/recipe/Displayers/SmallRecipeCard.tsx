import DotMenu from "@components/DotMenu";
import Stars from "@components/Stars";
import { trpc } from "@utils/trpc";
import { IRecipe } from "@utils/validations/recipe";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";
import SaveIcon from "../SaveIcon";

export default function SmallRecipeCard({ recipe }: { recipe: IRecipe }) {
  const { data } = useSession();
  const utils = trpc.useContext();
  const notifyDeleted = () => toast.success("Receta eliminada");
  const { mutateAsync } = trpc.recipe.delete.useMutation({
    onSuccess() {
      utils.recipe.getAllRecipes.invalidate();
      utils.recipe.getRecentRecipes.invalidate();
    },
  });

  const editRecipe = (id: string) => {
    router.push(`/recipe/edit/${id}`);
  };

  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
    router.push(`/recipe`);
    notifyDeleted();
  };

  return (
    <div className="rounded-box my-4 h-80 w-[270px] border-[1px] border-base-300 bg-base-100">
      <div className="absolute bottom-[280px] left-4 z-10">
        <SaveIcon recipe={recipe} isBig={false} />
      </div>
      <div className="rounded-t-box relative h-40 overflow-hidden object-contain">
        <Image
          src={recipe.imageURL}
          objectFit="cover"
          alt="notfound"
          layout="fill"
        />
      </div>
      <div className="relative pt-2">
        <div className="absolute top-0 -right-2">
          {(data?.user?.id == recipe.userId || data?.user?.role == "admin") && (
            <DotMenu
              id={recipe.id}
              name={recipe.name}
              type="receta"
              updateFunction={editRecipe}
              deleteFunction={deleteRecipe}
            />
          )}
        </div>

        <div className="mx-2">
          <Stars average={recipe?.rating ?? 0}></Stars>
          <p className="m-1 font-raleway first-letter:uppercase">
            {recipe.name}
          </p>

          {/* Features and Button */}
          <div className="mx-2 flex justify-between">
            <p>
              {(recipe?.cookingTime ?? 0) + (recipe?.preparationTime ?? 0)} min
            </p>
            <p>{recipe?.portions} pers</p>
            <Link href={`/recipe/${recipe.id}`}>
              <a className="btn btn-xs rounded-full bg-base-content px-4 pb-0.5 text-base-100">
                ver receta
              </a>
            </Link>
          </div>
          {/* End Features and Button */}
        </div>
      </div>
    </div>
  );
}
