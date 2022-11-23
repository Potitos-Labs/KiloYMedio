import Link from "next/link";
import Image from "next/image";
import Heart from "../../components/Heart";
import { trpc } from "@utils/trpc";

function FavouriteRecipes({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) {
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.user.client.deleteFavouriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
    },
  });

  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
  };

  return (
    <div className="flex flex-row rounded-md p-4 shadow-md shadow-kym4 hover:shadow-lg hover:shadow-kym4">
      <Link href={`/recipe/${id}`}>
        <div className="flex w-full cursor-pointer items-center gap-4">
          <Image
            src={image}
            alt="notfound"
            width="75"
            height="75"
            layout="fixed"
            objectFit="cover"
            className="rounded-md"
          ></Image>
          <p className="first-letter:uppercase">{name}</p>
        </div>
      </Link>

      <Heart
        id={id}
        favorite={true}
        addFavorite={deleteRecipe}
        removeFavorite={deleteRecipe}
      />
    </div>
  );
}

export default FavouriteRecipes;
