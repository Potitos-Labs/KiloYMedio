import Link from "next/link";
import Image from "next/image";
import DotMenu from "@components/DotMenu";
import { trpc } from "@utils/trpc";
import { toast } from "react-toastify";

function MyRecipes({
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
  const notifyUpdate = () => toast.warn("METODO POR IMPLEMENTAR");

  const { mutateAsync } = trpc.recipe.delete.useMutation({
    onSuccess() {
      utils.user.client.getOwnRecipes.invalidate();
    },
  });
  const editRecipe = (id: string) => {
    //ACABAR
    notifyUpdate();
    console.log(id + "HAY QUE COMPLETAR METODO WOO");
  };

  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
    notifyDeleted();
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
      <DotMenu
        id={id}
        name={name}
        type="receta"
        updateFunction={editRecipe}
        deleteFunction={deleteRecipe}
      />
    </div>
  );
}

export default MyRecipes;
