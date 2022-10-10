import { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

const Cart: NextPage = () => {
  const { data } = trpc.useQuery(["cart.getAllCartProduct"]);

  const [weight, setWeight] = useState(100);
  function incrementClick() {
    if (weight != 10000) {
      setWeight(weight + 100);
    }
  }
  function decrementClick() {
    if (weight != 0) {
      setWeight(weight - 100);
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 p-12">
        {data ? (
          data.map((cartProduct) => (
            <div key={cartProduct.productId}>
              <div className="flex flex-row border-2 border-solid border-black">
                <div className="flex flex-col p-2 align-middle">
                  <Image
                    className=""
                    src={cartProduct.product.imageURL}
                    alt={cartProduct.product.name + " imagen"}
                    width={100}
                    height={100}
                    layout="fixed"
                    objectFit="cover"
                  />
                </div>
                <div className=" m-2 p-2">
                  <div className="flex h-1/2 flex-col justify-center text-lg font-bold capitalize">
                    <div>{cartProduct.product.name}</div>
                  </div>

                  <div className="mx-0 flex h-1/2 flex-row items-center">
                    <button
                      className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
                      onClick={decrementClick}
                    >
                      -
                    </button>
                    <p className="mx-2 flex min-w-[100px] flex-row justify-center rounded-md border-2 px-4">
                      {cartProduct.amount} g
                    </p>
                    <button
                      className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
                      onClick={incrementClick}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex flex-row-reverse">
                    <button className=" h-10 bg-transparent px-2 font-semibold text-red-600">
                      <IoTrashOutline className="h-6 w-6"></IoTrashOutline>
                    </button>
                  </div>
                  <div className="flex h-full flex-row-reverse">
                    <span className="self-end px-3 py-2">
                      *insertar precio*€
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
