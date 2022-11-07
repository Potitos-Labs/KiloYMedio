import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = myCart?.productList.length ?? 0;
  return (
    <div className=" absolute right-0 z-10  hidden group-hover:block">
      <div className=" flex h-[200px]  w-[300px] flex-col overflow-y-scroll rounded-md bg-white py-2 text-kym4 shadow-sm shadow-kym4">
        <div>
          <p className="text-md mb-10 bg-background pl-3">
            {numberCartProducts} productos en la cesta
          </p>
        </div>
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
              </div>
            ))
          ) : (
            <p className="text-right">Cargando...</p>
          )}
        </div>
        <div className="grid grid-cols-[80%_20%] p-5 font-medium">
          <p>Subtotal:</p>
          {myCart?.totalPrice} €
        </div>
        <Link href={"/cart"}>
          <a className="mb-2 w-full rounded-xl border border-button bg-transparent px-12 text-center text-kym4 hover:bg-button">
            Acceder al carrito
          </a>
        </Link>
      </div>
    </div>
  );
}
export default DropDownCart;
