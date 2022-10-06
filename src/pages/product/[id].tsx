import { NextPage } from "next";
import { useRouter } from "next/router";
import ProductDetail from "../../components/product/ProductDetail";
import { trpc } from "../../utils/trpc";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = trpc.useQuery(["product.getById", { id }]);
  //<div>{router.query.id}</div>
  if (data)
    return (
      <ProductDetail
        name={data.name}
        img={data.imageURL}
        description={data.description}
      />
    );
  return <div>Cargando...</div>;
};

export default ProductDetails;
