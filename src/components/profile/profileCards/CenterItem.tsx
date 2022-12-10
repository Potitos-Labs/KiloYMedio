import FavouriteRecipes from "../FavouriteRecipes";

function CenterItem({
  favoriteUserRecipes,
}: {
  favoriteUserRecipes:
    | {
        Recipe: {
          id: string;
          name: string;
          imageURL: string;
        };
      }[]
    | undefined;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-md border-[1px] border-neutral">
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        recetas guardadas
      </div>
      <div className="flex flex-col space-y-1 bg-neutral p-1">
        {favoriteUserRecipes ? (
          favoriteUserRecipes.map((e) => {
            return (
              <FavouriteRecipes
                key={e.Recipe.id}
                id={e.Recipe.id}
                name={e.Recipe.name}
                image={e.Recipe.imageURL}
              />
            );
          })
        ) : (
          <p>No tienes ninguna receta guardada todavía.</p>
        )}
      </div>
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        mis alergenos
      </div>
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        pedidos
      </div>
      <div className="py-6 px-4 text-lg">mis talleres</div>
    </div>
  );
}

export default CenterItem;
