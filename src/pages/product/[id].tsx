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
  if (data)
    return (
      <Layout>
        <ProductDetail
          name={data.name}
          img={data.imageURL}
          description={data.description}
        />
      </Layout>
    );

  if (!data && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  return <div>Cargando...</div>;
};

export default ProductDetails;
