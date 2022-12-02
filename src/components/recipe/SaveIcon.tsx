import { trpc } from "../../utils/trpc";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { IRecipe } from "@utils/validations/recipe";
import { useState } from "react";

function SaveIcon({
  recipe,
  isBig,
}: {
  recipe: IRecipe | undefined;
  isBig: boolean;
}) {
  const utils = trpc.useContext();
  const [isFav, setFav] = useState(recipe?.isFav);

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
    saveMutation.mutateAsync({ recipeId: recipe?.id ?? "" });
    setFav(true);
  }
  function unsaveRecipe() {
    unsaveMutation.mutateAsync({ recipeId: recipe?.id ?? "" });
    setFav(false);
  }

  return (
    <button
      onClick={isFav ? unsaveRecipe : saveRecipe}
      disabled={saveMutation.isLoading || unsaveMutation.isLoading}
      className={`${
        isBig
          ? "flex gap-2 border-[1px] border-base-content bg-base-100 px-3 pt-0.5 pb-1 hover:bg-base-content hover:text-base-100"
          : "bg-base-content bg-opacity-80 py-2 px-2.5 text-base-100 hover:bg-opacity-100"
      } z-10 rounded-full`}
    >
      {isBig && isFav && "eliminar"}
      {isBig && !isFav && "guardar"}
      {!isBig && ""}
      {isFav ? (
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
