import { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import Product from "../components/cart/Product";
import Bill from "../components/payment/Bill";

const Cart: NextPage = () => {
  const { data: cartProducts } = trpc.useQuery(["cart.getAllCartProduct"]);

  return (
    <Layout>
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[65%_35%]">
          <section>
            {/*Shopping cart*/}
            <div className="mx-3 h-full border-2 border-solid border-black md:mx-6">
              <div className="bg-gray-400 pb-3">
                <h1 className="pt-3 pl-3 text-3xl font-bold">
                  Carrito de compra
                </h1>
              </div>
              <div className="m-0 grid gap-4 p-4">
                {cartProducts ? (
                  cartProducts.productList.map((cartProduct) => (
                    <div key={cartProduct.productId}>
                      <Product cartProduct={cartProduct}></Product>
                    </div>
                  ))
                ) : (
                  <p className="text-right">Cargando...</p>
                )}
              </div>
            </div>
          </section>
          {/*End Shopping cart*/}
          <Bill showExtras={false} postcode={false}></Bill>
        </div>
      </section>
      {/* End Grid */}
    </Layout>
  );
};

export default Cart;
