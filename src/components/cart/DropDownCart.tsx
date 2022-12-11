import Image from "next/image";
import Link from "next/link";

import { trpc } from "../../utils/trpc";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = myCart?.productList.length ?? 0;
  return (
    <div className="absolute right-4 top-10 z-10 hidden group-hover:block ">
      <div className="scrollbar-hide flex h-auto max-h-[226px] w-[300px] flex-col overflow-y-scroll rounded-md bg-base-100 text-black">
        <div className="relative pt-3">
          {numberCartProducts > 0 ? (
            <div className="flex flex-col">
              <p className="mb-3 ml-3 font-raleway text-lg">CESTA</p>
              {/* <p className="absolute right-2 top-2 text-lg font-semibold">
                {myCart?.totalPrice} €
              </p> */}
              <hr className="border-1 w-full border-black opacity-60"></hr>
            </div>
          ) : (
            <div className="flex">
              <p className="text-md mb-5">
                ¡Aún no hay ningún producto en tu carrito!
              </p>
            </div>
          )}

          <div className="flex flex-col px-3 pb-3 font-medium ">
            {numberCartProducts > 0 ? (
              <Link
                className="flex flex-col px-3 pb-3 font-medium "
                href={"/cart"}
              >
                <a className="m-2 rounded-md border border-kym3 bg-white text-center text-kym4 hover:bg-kym3 hover:text-white">
                  Ver cesta
                </a>
              </Link>
            ) : (
              <Link
                className="flex flex-col px-3 pb-3 font-medium "
                href={"/product"}
              >
                <a className="m-2 rounded-md border border-kym3 bg-white text-center text-kym4 hover:bg-kym3 hover:text-white">
                  Buscar productos
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="grid ">
          {myCart ? (
            myCart.productList.map((cartProduct) => (
              <div key={cartProduct.productId}>
                <div className="my-4 mb-4 grid grid-cols-[40%_30%_30%] items-center px-2 text-sm font-light">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      className="rounded-md"
                      src={cartProduct.product.imageURL}
                      alt="notfound"
                      width="70"
                      height="70"
                      layout="intrinsic"
                      objectFit="cover"
                    ></Image>

                    <div className="first-letter:uppercase">
                      {cartProduct.product.name}
                    </div>
                  </div>
                  <div className="ml-4">
                    {cartProduct.amount}{" "}
                    {cartProduct.product.Edible ? "g" : "u"}
                  </div>
                  <span className="justify-self-end font-normal">
                    {cartProduct.price.toFixed(2)} €
                  </span>
                </div>
                <hr className=" border-1 mt-5 border-gray-400 "></hr>
              </div>
            ))
          ) : (
            <p className="text-right">Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default DropDownCart;
