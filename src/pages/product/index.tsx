import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Product from "../../components/product/Product";
import Layout from "../../components/Layout";

const ProductDetails: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllProducts"]);
  console.log(data);
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data ? (
          data.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              imgUrl={product.imageURL}
              id={product.id}
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
