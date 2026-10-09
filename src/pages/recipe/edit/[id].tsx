import CreateEdit from "@components/recipe/CreateEdit";
import { createContextInner } from "@server/trpc/context";
import { appRouter } from "@server/trpc/router/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { trpc } from "@utils/trpc";
import { ICreateRecipe, IUpdateRecipe } from "@utils/validations/recipe";
import { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import superjson from "superjson";
import Layout from "../../../components/Layout";

export async function getServerSideProps() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const units = await ssg.recipe.getIngredientUnitInSpanish.fetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      units,
    },
  };
}

export default function EditRecipe(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { status } = useSession();
  const router = useRouter();
  const id = router.query.id as string;
  const { data: recipe } = trpc.recipe.getById.useQuery({ id });

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (!recipe) {
    return (
      <Layout
        bgColor={"bg-base-100"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <p>Cargando...</p>
      </Layout>
    );
  }
  const ingredients = recipe.RecipeIngredient.map((i) => ({
    amount: i.amount,
    name: i.Ingredient.name,
    unit: i.unit,
  })) as ICreateRecipe["ingredients"];

  const directions = recipe.directions.map((d, index) => ({
    direction: d.direction,
    index: index,
  })) as ICreateRecipe["directions"];

  const recipeArgs: IUpdateRecipe = {
    id: recipe.id,
    description: recipe.description,
    difficulty: recipe.difficulty,
    directions,
    imageURL: recipe.imageURL,
    ingredients,
    name: recipe.name,
    portions: recipe.portions,
    cookingTime: {
      hour: Math.floor(recipe.cookingTime / 60),
      minute: recipe.cookingTime % 60,
    },
    preparationTime: {
      hour: Math.floor(recipe.preparationTime / 60),
      minute: recipe.preparationTime % 60,
    },
  };

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <CreateEdit units={props.units} recipe={recipeArgs}></CreateEdit>
    </Layout>
  );
}
