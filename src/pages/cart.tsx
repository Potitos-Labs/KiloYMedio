import Layout from "../components/Layout";
import Product from "../components/cart/Product";
import Bill from "../components/payment/Bill";
import { FormWrapper } from "../components/payment/FormWrapper";
import { trpc } from "../utils/trpc";
import { NextPage } from "next";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Loading from "@components/ui/Loading";

const Cart: NextPage = () => {
  const { data: cartProducts } = trpc.cart.getAllCartProduct.useQuery();

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <Layout>
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 px-8 lg:grid-cols-[65%_35%]">
          <section>
            {/*Shopping cart*/}
            <FormWrapper title="Carrito de compra">
              <div className="m-0 grid gap-4" ref={listRef}>
                {cartProducts ? (
                  cartProducts.productList.length > 0 ? (
                    cartProducts.productList.map((cartProduct) => (
                      <div key={cartProduct.productId}>
                        <Product cartProduct={cartProduct}></Product>
                      </div>
                    ))
                  ) : (
                    <p className="absolute mt-20 self-center justify-self-center font-light text-kym4">
                      Todavía no tienes ningún producto en el carrito 😢
                    </p>
                  )
                ) : (
                  <Loading message="Cargando productos..." />
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
