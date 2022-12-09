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
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 px-5 xl:grid-cols-[60%_40%] xl:gap-0">
          <section className="rounded-xl bg-base-100 py-10 px-6 sm:px-10 xl:mr-2 2xl:p-20">
            {/*Shopping cart*/}
            <FormWrapper title="Carrito de compra">
              <div className="m-0 mt-4 grid gap-4" ref={listRef}>
                {cartProducts ? (
                  cartProducts.productList.length > 0 ? (
                    cartProducts.productList.map((cartProduct) => (
                      <div key={cartProduct.productId}>
                        <Product cartProduct={cartProduct}></Product>
                      </div>
                    ))
                  ) : (
                    <p className="mx-2 font-light text-kym4">
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
          <section className="rounded-xl bg-base-100 p-6 sm:p-14 lg:ml-2 2xl:p-20">
            <Bill showExtras={false} postcode={false}></Bill>
          </section>
        </div>
      </section>
      {/* End Grid */}
    </Layout>
  );
};

export default Cart;
