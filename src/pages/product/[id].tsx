import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ProductDetail from "../../components/product/ProductDetail";
import { trpc } from "../../utils/trpc";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isFetched } = trpc.useQuery(["product.getById", { id }]);
  const isEdible = Boolean(data?.Edible);
  if (data)
    return (
      <Layout>
        <ProductDetail
          name={data.name}
          img={data.imageURL}
          description={data.description}
          isEdible={isEdible}
          allergensList={data.Edible?.allergens.map((e) => e.allergen) ?? []}
          price={data.Edible?.priceByWeight ?? data.NonEdible?.price ?? 0}
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

export default ProductDetails;
