import { trpc } from "../../utils/trpc";
import Image from "next/image";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  return (
    <div className=" absolute right-0 z-10  hidden group-hover:block">
      <div className="flex  h-[200px] w-[300px] flex-col overflow-y-scroll rounded-md bg-white text-kym4 shadow-sm shadow-kym4">
        <div>
          <h1 className="mb-10 bg-background py-2 pl-3 text-xl">Factura</h1>
        </div>
        {/* Bill -> Products */}
        <div className="grid pl-1">
          {myCart ? (
            myCart.productList.map((cartProduct) => (
              <div key={cartProduct.productId}>
                <div className="mb-4 grid grid-cols-[40%_30%_30%] items-center font-medium">
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
        <button> Comprar</button>
      </div>
    </div>
  );
}
export default DropDownCart;
