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
    <div className=" relative grid min-h-[120px] grid-cols-[32%_56%_12%] overflow-hidden rounded-md border-[1px] border-neutral  bg-base-100">
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="notfound"
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="p-2">
        <p className="mb-2 font-raleway text-[14px] uppercase sm:text-[16px]">
          {name}
        </p>

        <div className=" h- absolute bottom-2 flex items-end">
          <div className="mb-2 md:mb-0 lg:mb-2 xl:mb-0">
            <Link href={`/recipe/${id}`}>
              <a className="btn btn-sm rounded-full bg-base-content px-4  text-base-100">
                ver receta
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Heart removeFavorite={deleteRecipe} id={id} />
    </div>
  );
}

export default FavouriteRecipes;
