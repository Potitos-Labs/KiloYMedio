import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Product from "../../components/product/Product";
import Layout from "../../components/Layout";

const ProductDetails: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllProducts"]);
  return (
    <Layout>
      <div className="grid gap-4 grid-cols-5 p-12">
        {data ? (
          data.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              imgUrl={product.imageURL}
            ></Product>
          ))
        ) : (
          <p className="text-right">Loading..</p>
        )}
      </div>
    </Layout>
  );
};
export default ProductDetails;
