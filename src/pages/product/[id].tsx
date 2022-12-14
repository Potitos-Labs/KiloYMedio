import LoadingBalls from "@components/ui/LoadingBalls";
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
      <Layout
        bgColor={"lg:bg-base-200 bg-base-100"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <ProductDetail product={data} />
      </Layout>
    );

  if (!data && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  return (
    <Layout bgColor={"bg-base-200"} headerBgLight={true} headerTextDark={true}>
      <div className="flex min-h-90% flex-col place-content-center bg-base-200 pb-[8%]">
        <LoadingBalls />
      </div>
    </Layout>
  );
};

export default ProductDetails;
