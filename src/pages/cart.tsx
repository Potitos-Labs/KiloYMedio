import { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Cart: NextPage = () => {
  const { data } = trpc.useQuery(["cart.getAllCartProduct"]);

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4 p-12">
        {data ? (
          data.map((cartProduct) => (
            <h2 key={cartProduct.productId}>
              <p>{cartProduct.product.name}</p>
              <p>{cartProduct.amount}</p>
            </h2>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
