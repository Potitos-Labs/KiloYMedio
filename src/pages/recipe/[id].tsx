import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import RecipeDetail from "../../components/recipe/RecipeDetail";
import { trpc } from "../../utils/trpc";

const RecipeDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isFetched } = trpc.recipe.getById.useQuery({ id });
  if (data)
    return (
      <Layout
        bgColor={"bg-base-content"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <RecipeDetail id={id} />
      </Layout>
    );

  if (!data && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div>Cargando...</div>
    </Layout>
  );
};

export default RecipeDetails;
