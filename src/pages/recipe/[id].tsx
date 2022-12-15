import LoadingBalls from "@components/ui/LoadingBalls";
import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import RecipeDetail from "../../components/recipe/RecipeDetail";
import { trpc } from "../../utils/trpc";

const RecipeDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: recipe, isFetched } = trpc.recipe.getById.useQuery({ id });
  if (recipe)
    return (
      <Layout
        bgColor={"bg-base-content"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <RecipeDetail recipe={recipe} />
      </Layout>
    );

  if (!recipe && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div className="flex min-h-90% flex-col place-content-center bg-base-content pb-[8%]">
        <LoadingBalls />
      </div>
    </Layout>
  );
};

export default RecipeDetails;
