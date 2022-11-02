import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import RecipeDetail from "../../components/recipe/RecipeDetail";
import { trpc } from "../../utils/trpc";

const RecipeDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isFetched } = trpc.product.getById.useQuery({ id });

  if (data)
    return (
      <Layout>
        <RecipeDetail
          name={data.name}
          img={data.imageURL}
          description={data.description}
          allergensList={data.Edible?.allergens.map((e) => e.allergen) ?? []}
          id={data.id}
        />
      </Layout>
    );

  if (!data && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  return (
    <Layout>
      <div>Cargando...</div>
    </Layout>
  );
};

export default RecipeDetails;
