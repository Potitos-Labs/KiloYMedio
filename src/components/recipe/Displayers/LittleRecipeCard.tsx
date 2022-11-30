import DotMenu from "@components/DotMenu";
import Stars from "@components/Stars";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";

export default function LittleRecipeCard({
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

  return (
    <div
      tabIndex={0}
      className="rounded-box my-4 h-64 w-auto border-[1px] border-base-300"
    >
      <div className="rounded-t-box relative h-32 overflow-hidden object-contain">
        <Link href={`/recipe/${id}`}>
          <Image
            src={imageURL}
            objectFit="cover"
            alt="notfound"
            layout="fill"
          ></Image>
        </Link>
      </div>
      <div className="relative h-auto py-2">
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
        <div className="mx-2 grid content-between gap-4">
          <div>
            <Stars average={4}></Stars>
            <p className="mx-1 my-2 font-raleway first-letter:uppercase">
              {name}
            </p>
          </div>
          <div className="ml-1 flex justify-between gap-4">
            <p>17 min</p>
            <p>6 pers</p>
            <div className="mb-2 md:mb-0 lg:mb-2 2xl:mb-0">
              <Link href={`/recipe/${id}`}>
                <a className="w-full rounded-full bg-base-content px-4 py-1 text-base-100">
                  ver receta
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
