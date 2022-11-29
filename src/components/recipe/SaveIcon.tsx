import { trpc } from "../../utils/trpc";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

function SaveIcon({
  recipeId,
  isAbsolute,
}: {
  recipeId: string;
  isAbsolute: boolean;
}) {
  const isAbs = isAbsolute
    ? "lg:absolute -bottom-4 static right-44"
    : "border-base-content border-[1px]";

  const utils = trpc.useContext();
  const { data: recipe } = trpc.recipe.getById.useQuery({ id: recipeId });

  const saveMutation = trpc.user.client.addFavoriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
      utils.recipe.getById.invalidate();
    },
  });
  const unsaveMutation = trpc.user.client.deleteFavouriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
      utils.recipe.getById.invalidate();
    },
  });
  function saveRecipe() {
    saveMutation.mutateAsync({ recipeId: recipeId });
  }
  function unsaveRecipe() {
    unsaveMutation.mutateAsync({ recipeId: recipeId });
  }

  return (
    <button
      onClick={recipe?.isFav ? unsaveRecipe : saveRecipe}
      className={`${isAbs} z-10 flex gap-2 rounded-full bg-base-100 px-3 pt-0.5 pb-1 hover:bg-base-content hover:text-base-100`}
    >
      {recipe?.isFav ? "eliminar" : "guardar"}
      {recipe?.isFav ? (
        <IoBookmark className="mt-1.5" />
      ) : (
        <IoBookmarkOutline className="mt-1.5" />
      )}
    </button>
  );
}

export default SaveIcon;
