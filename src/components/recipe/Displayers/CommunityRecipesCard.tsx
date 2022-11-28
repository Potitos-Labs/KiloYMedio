import DotMenu from "@components/DotMenu";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";

export default function RecipeCard({
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
      role="button"
      tabIndex={0}
      className="rounded-box mx-4 my-4 h-64 border-[1px] border-base-300"
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
        <p className="mx-1 mb-2 font-raleway uppercase">{name}</p>
      </div>
    </div>
  );
}
