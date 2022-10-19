import { trpc } from "../../utils/trpc";
import Image from "next/image";

const Bill = () => {
  const { data: myCart } = trpc.useQuery(["cart.getAllCartProduct"]);
  const { data: cartProducts } = trpc.useQuery(["cart.getAllCartProduct"]);

  return (
    <div className="mr-20 ml-6 grid h-full">
      <div className="">
        <div className="flex flex-col">
          <div className="">
            <h1 className="mb-10 bg-background py-2 pl-3 text-xl">Factura</h1>
          </div>
          <section>
            {/* Bill -> Products */}
            <div className="grid pl-1">
              {myCart ? (
                myCart.map((cartProduct) => (
                  <div key={cartProduct.productId}>
                    <div className="mb-4 grid grid-cols-[35%_35%_30%] items-center font-medium">
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
                        <div className="capitalize">
                          {cartProduct.product.name}
                        </div>
                      </div>
                      <div className="ml-4">{cartProduct.amount} g</div>
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
            <hr className="border-1 mt-5 border-gray-400"></hr>
            <div className="pt-4">Subtotal</div>
            <div className="grid grid-cols-[80%_20%] items-center">
              <h2 className="pt-4">Gastos de envío</h2>
              <p className="grid justify-end">Gratuito</p>
            </div>
            <hr className="border-1 mt-5 border-gray-400"></hr>

            <div className="grid grid-cols-[80%_20%] items-center">
              <h2 className="pt-4">IVA</h2>
              <p className="grid justify-end">Precio</p>
            </div>
            <div className="grid grid-cols-[80%_20%] items-center">
              <h2 className="pt-4 text-lg">Total</h2>
              <div className="grid justify-end text-2xl font-semibold">
                {/* Hay que sumar los gastos de envío y el IVA* */}
                {cartProducts?.reduce((sum, i) => sum + i.price, 0)} €
              </div>
            </div>
          </section>
          {/* End Bill -> Summary */}
        </div>
      </div>
    </div>
  );
};

export default Bill;
