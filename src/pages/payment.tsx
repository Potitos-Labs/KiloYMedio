import { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

const Cart: NextPage = () => {
  const { data } = trpc.useQuery(["cart.getAllCartProduct"]);

  return (
    <Layout>
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-[65%_35%]">
          <section>
            {/*Shopping cart*/}
            <div className="ml-12 h-full border-2 border-solid border-black">
              <div className="bg-gray-400 pb-3">
                <h1 className="pt-3 pl-3 text-3xl font-bold">
                  Carrito de compra
                </h1>
              </div>
              <div className="m-0 grid gap-4 p-4"></div>
            </div>
          </section>
          {/*End Shopping cart*/}

          {/* Bill */}
          <div className="m-0 mr-12 ml-6 grid h-full gap-4">
            <div className="border-2 border-solid border-black">
              <div className="flex flex-col">
                <div className="bg-gray-400 pb-3">
                  <h1 className="pt-3 pl-3 text-3xl font-bold">Factura</h1>
                </div>
                <section>
                  {/* Bill -> Products */}
                  <h2 className="p-3 text-xl font-bold">Productos:</h2>
                  <div className="m-0 grid gap-4 pl-6 pr-3">
                    {data ? (
                      data.map((cartProduct) => (
                        <div key={cartProduct.productId}>
                          <div className="grid grid-cols-[50%_30%_20%] items-center">
                            <div className="capitalize">
                              {cartProduct.product.name}
                            </div>
                            <div>{cartProduct.amount} gr</div>
                            <div className="grid justify-end">Precio</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-right">Cargando...</p>
                    )}
                  </div>
                </section>
                {/* End Bill -> Products */}
                {/* Bill -> Shipping */}
                <div className="grid grid-cols-[80%_20%] items-center">
                  <h2 className="p-3 text-xl font-bold">Gastos de Envío:</h2>
                  <p className="grid justify-end py-3 pr-3">Gratuito</p>
                </div>
                {/* End Bill -> Shipping */}
                {/* Bill -> Summary */}
                <section>
                  <hr className="border-1.5 mx-3 border-black"></hr>
                  <div className="grid grid-cols-2 items-center px-3 pt-3">
                    <h2 className="text-xl font-bold">IVA:</h2>
                    <div className="grid justify-end">Precio</div>
                    <h2 className="text-xl font-bold">Total:</h2>
                    <div className="grid justify-end">Precio</div>
                  </div>
                </section>
                {/* End Bill -> Summary */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Grid */}
    </Layout>
  );
};

export default Cart;
