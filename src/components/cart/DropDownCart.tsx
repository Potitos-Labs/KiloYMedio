import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = myCart?.productList.length ?? 0;
  return (
    <div className=" absolute right-0 z-10 hidden group-hover:block ">
      <div className="scrollbar-hide flex h-[200px]  w-[350px] flex-col overflow-y-scroll rounded-md bg-white   text-black shadow-sm shadow-kym4">
        <div className="relative  bg-background pt-3 pl-3">
          <div className="flex">
            <p className="text-md mb-5">
              {numberCartProducts}{" "}
              {numberCartProducts > 1 ? "productos" : "producto"} en la cesta
            </p>
            <p className="absolute right-2 top-2 text-lg font-semibold">
              {myCart?.totalPrice} €
            </p>
          </div>
          <div className="flex flex-col px-3 pb-3 font-medium ">
            <Link
              className="flex flex-col px-3 pb-3 font-medium "
              href={"/cart"}
            >
              <a className="m-2 rounded-md border border-button bg-white text-center text-kym4 hover:bg-button hover:text-white">
                Ver cesta
              </a>
            </Link>
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
