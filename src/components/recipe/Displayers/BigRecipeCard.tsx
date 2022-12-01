import DotMenu from "@components/DotMenu";
import Stars from "@components/Stars";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";
import SaveIcon from "../SaveIcon";

export default function BigRecipeCard({
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
      className="rounded-box flex grid-cols-[58%_42%] flex-col border-[1px] border-base-300 bg-base-100 sm:grid"
    >
      <div className="grid content-between p-6">
        <div>
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
          <p className="mb-2 font-raleway text-lg uppercase">{name}</p>
          <p className="mb-2">{recipe?.description}</p>
        </div>
        {/* Features and Buttons */}
        <div className="mr-2">
          <div className="mb-4 flex justify-between">
            <p>
              {recipe?.cookingTime ?? 0 + (recipe?.preparationTime ?? 0)} min
            </p>
            <p>{recipe?.portions} pers</p>
            <Stars average={stats?.average ?? 0}></Stars>
          </div>
          <div className="block items-center justify-between md:flex lg:block 2xl:flex">
            <div className="mb-2 md:mb-0 lg:mb-2 2xl:mb-0">
              <Link href={`/recipe/${id}`}>
                <a className="w-full rounded-full bg-base-content px-4 py-1 text-base-100">
                  ver receta completa
                </a>
              </Link>
            </div>
            <SaveIcon recipeId={id} isBig={true} />
          </div>
        </div>
        {/* End Features and Buttons */}
      </div>
      <Image
        className="rounded-b-box sm:rounded-r-box sm:rounded-bl-none"
        src={imageURL}
        objectFit="cover"
        width={300}
        height={370}
        alt="notfound"
      ></Image>
    </div>
  );
}
