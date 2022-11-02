import Layout from "../../components/Layout";
import RecipeDisplayer from "../../components/recipe/RecipeSlider";
import { trpc } from "../../utils/trpc";

const recipes = () => {
  const { data } = trpc.recipe.getAllRecipes.useQuery();
  console.log(data?.length);
  /*
  const Testing = [
    {
      id: 162,
      name: "Receta",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 152,
      name: "Receta2",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 142,
      name: "Receta3",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 132,
      name: "Receta4",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 112,
      name: "Receta5",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 120,
      name: "Receta6",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
    {
      id: 1202,
      name: "Hamburguesa de pollo al estilo thai con patatas fritas",
      imageURL:
        "https://pbs.twimg.com/profile_images/1571904629209812996/KGxejjwy_400x400.jpg",
    },
  ];
*/
  return (
    <Layout>
      <div>
        <RecipeDisplayer
          title={"Todas las recetas"}
          recipes={data}
        ></RecipeDisplayer>
        <RecipeDisplayer
          title={"Mis recetas favoritas"}
          recipes={data}
        ></RecipeDisplayer>
        <RecipeDisplayer
          title={"Las recetas más pochas"}
          recipes={data}
        ></RecipeDisplayer>
      </div>
    </Layout>
  );
};

export default recipes;
