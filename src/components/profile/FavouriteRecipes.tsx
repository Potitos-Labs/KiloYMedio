import Link from "next/link";
import Image from "next/image";
import Heart from "../../components/Heart";
import { trpc } from "@utils/trpc";
import { toast } from "react-toastify";
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
  const notifyDeleted = () => toast.success("Receta eliminada");

  const { mutateAsync } = trpc.user.client.deleteFavouriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
    },
  });
  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
    notifyDeleted();
  };
  return (
    <div className="flex flex-row shadow-lg hover:shadow-kym4">
      <Link href={`/recipe/${id}`}>
        <a>
          <Image
            src={image}
            alt="notfound"
            width="75"
            height="75"
            layout="fixed"
            objectFit="cover"
            className="rounded-md"
          ></Image>
        </a>
      </Link>
      <p className="m-5"> {name} </p>
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
