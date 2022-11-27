import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import DotMenu from "../DotMenu";

import Stars from "../Stars";
import SaveIcon from "./SaveIcon";

export function RecipeCard({
  id,
  name,
  imageURL,
  authorID,
}: {
  id: string;
  name: string;
  imageURL: string;
  authorID: string;
}) {
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

  const { data: stats } = trpc.user.client.getRecipeStatistics.useQuery({
    recipeId: id,
  });

  const { data: recipe } = trpc.recipe.getById.useQuery({ id });

  return (
    <div
      tabIndex={0}
      className="rounded-box mx-2 grid h-80 w-[600px] grid-cols-[60%_40%] border-[1px] border-base-300 bg-base-100"
    >
      <div className="p-8">
        <div className="absolute top-0 right-0 inline-flex">
          {(data?.user?.id == authorID || data?.user?.role == "admin") && (
            <DotMenu
              id={id}
              name={name}
              type="receta"
              updateFunction={editRecipe}
              deleteFunction={deleteRecipe}
            />
          )}
        </div>
        <p className="mx-1 mb-2 font-raleway text-lg uppercase">{name}</p>
        <p className="mb-2">{recipe?.description}</p>
        <div>
          <div className="mb-4 flex justify-between">
            <p>
              {recipe?.cookingTime ?? 0 + (recipe?.preparationTime ?? 0)} min
            </p>
            <p>{recipe?.portions} pers</p>
            <Stars average={stats?.average ?? 0}></Stars>
          </div>
          <div className="flex items-center justify-between">
            <Link href={`/recipe/${id}`}>
              <a className="rounded-full bg-base-content px-4 py-1 text-base-100">
                ver receta completa
              </a>
            </Link>
            <SaveIcon recipeId={id} />
          </div>
        </div>
      </div>
      <Link href={`/recipe/${id}`}>
        <Image
          src={imageURL}
          className="rounded-r-box"
          objectFit="cover"
          width={300}
          height={370}
          alt="notfound"
        ></Image>
      </Link>
    </div>
  );
}
