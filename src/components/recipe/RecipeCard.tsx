import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import DotMenu from "../DotMenu";

import Stars from "../Stars";

export function RecipeCard({
  id,
  name,
  ratings,
  imageURL,
  authorID,
}: {
  id: string;
  name: string;
  ratings: number;
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
    //ACABAR
    router.push(`/recipe/edit/${id}`);
    console.log(id + "HAY QUE COMPLETAR METODO WOO");
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
      className="border-2a mx-2 my-4 inline-block h-48  w-32 rounded-md bg-white text-center hover:scale-110 hover:shadow-md sm:mx-4 sm:h-64  sm:w-48"
    >
      <div className="w-fill  relative h-24 overflow-hidden rounded-t-md object-contain sm:h-32">
        <Link href={`/recipe/${id}`}>
          <a>
            <Image
              src={imageURL}
              objectFit="cover"
              alt="notfound"
              layout="fill"
            ></Image>
          </a>
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
        <p className="mx-1 mb-2 text-lg  font-semibold first-letter:uppercase sm:text-xl  ">
          {name}
        </p>
        <div className="">
          <Stars average={ratings}></Stars>
        </div>
      </div>
    </div>
  );
}
