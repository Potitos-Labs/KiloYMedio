import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import ProductDetail from "../../components/product/ProductDetail";
import { trpc } from "../../utils/trpc";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isFetched } = trpc.product.getById.useQuery({ id });
  if (data)
    return (
      <Layout>
        <ProductDetail product={data} />
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
