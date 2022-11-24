import DotMenu from "@components/DotMenu";
import Stars from "@components/Stars";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export function VerticalRecipeCard({
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
  const [focused, setFocused] = useState(false);
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
      className="mx-4 my-4 inline-block h-64 rounded-md bg-white text-center duration-200 hover:shadow-md motion-safe:hover:scale-105"
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      <div className="relative h-32 overflow-hidden rounded-t-md object-contain">
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
        <p
          className={`mx-1 mb-2 text-xl font-semibold first-letter:uppercase  ${
            focused && "underline decoration-kym3 duration-200"
          } `}
        >
          {name}
        </p>
        <div className="">
          <Stars average={ratings}></Stars>
        </div>
      </div>
    </div>
  );
}
