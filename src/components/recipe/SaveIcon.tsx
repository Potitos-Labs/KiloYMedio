import { trpc } from "../../utils/trpc";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

function SaveIcon({ recipeId, isBig }: { recipeId: string; isBig: boolean }) {
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
      className={`${
        isBig
          ? "flex gap-2 border-[1px] border-base-content bg-base-100 px-3 pt-0.5 pb-1 hover:bg-base-content hover:text-base-100"
          : "bg-base-content bg-opacity-80 py-2 px-2.5 text-base-100 hover:bg-opacity-100"
      } z-10 rounded-full`}
    >
      {isBig && recipe?.isFav && "eliminar"}
      {isBig && !recipe?.isFav && "guardar"}
      {!isBig && ""}
      {recipe?.isFav ? (
        <IoBookmark
          size={isBig ? 18 : 20}
          className={`${isBig ? "mt-1" : "mt-0.5"}`}
        />
      ) : (
        <IoBookmarkOutline
          size={isBig ? 18 : 20}
          className={`${isBig ? "mt-1" : "mt-0.5"}`}
        />
      )}
    </button>
  );
}

export default SaveIcon;
