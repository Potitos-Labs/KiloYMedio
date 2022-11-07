import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = myCart?.productList.length ?? 0;
  return (
    <div className=" absolute right-0 z-10 hidden group-hover:block">
      <div className=" flex h-[200px]  w-[350px] flex-col overflow-y-scroll rounded-md bg-white  text-kym4 shadow-sm shadow-kym4">
        <div>
          <p className="text-md mb-5 bg-background pl-3">
            {numberCartProducts} productos en la cesta
          </p>
        </div>
        <div className="flex flex-col px-2 pb-2 font-medium ">
          <p className="py-2">Total: {myCart?.totalPrice} €</p>
          <Link href={"/cart"}>
            <a className="m-2 rounded-md border border-button bg-transparent text-center text-kym4 hover:bg-button">
              Ver cesta
            </a>
          </Link>
        </div>
        <hr className=" border-1 mt-5 w-full border-gray-400 py-2"></hr>
        {/* Bill -> Products */}
        <div className="grid pl-1">
          {myCart ? (
            myCart.productList.map((cartProduct) => (
              <div key={cartProduct.productId}>
                <div className="font-small mb-4 grid grid-cols-[40%_30%_30%] items-center">
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
                  <span className="justify-self-end">
                    {cartProduct.price.toFixed(2)} €
                  </span>
                </div>
                <hr className=" border-1 mt-5 border-gray-400 py-2"></hr>
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
