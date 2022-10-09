import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Product from "../../components/product/Product";
import Layout from "../../components/Layout";
import Link from "next/link";

const ProductDetails: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllProducts"]);
  console.log(data);
  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4 p-12">
        {data ? (
          data.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              imgUrl={product.imageURL}
            ></Product>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
    </Layout>
  );
};
export default ProductDetails;
