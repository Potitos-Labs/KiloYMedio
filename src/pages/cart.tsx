import { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import Product from "../components/cart/Product";
import Bill from "../components/payment/Bill";
import { FormWrapper } from "../components/payment/FormWrapper";

const Cart: NextPage = () => {
  const { data: cartProducts } = trpc.cart.getAllCartProduct.useQuery();

  return (
    <Layout>
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 px-8 lg:grid-cols-[65%_35%]">
          <section>
            {/*Shopping cart*/}
            <FormWrapper title="Carrito de compra">
              <div className="m-0 grid gap-4">
                {cartProducts ? (
                  cartProducts.productList.map((cartProduct) => (
                    <div key={cartProduct.productId}>
                      <Product cartProduct={cartProduct}></Product>
                    </div>
                  ))
                ) : (
                  <p className="">Cargando...</p>
                )}
              </div>
            </FormWrapper>
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
