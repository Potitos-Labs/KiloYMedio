import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

const Bill = ({
  showExtras,
  postcode,
}: {
  showExtras: boolean;
  postcode: boolean;
}) => {
  const { data: myCart } = trpc.useQuery(["cart.getAllCartProduct"]);
  const shippingCosts = null;

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
                myCart.productList.map((cartProduct) => (
                  <div key={cartProduct.productId}>
                    <div className="mb-4 grid grid-cols-[40%_30%_30%] items-center font-medium">
                      <div className="flex flex-row items-center gap-2">
                        {showExtras && (
                          <Image
                            className="rounded-md"
                            src={cartProduct.product.imageURL}
                            alt="notfound"
                            width="70"
                            height="70"
                            layout="intrinsic"
                            objectFit="cover"
                          ></Image>
                        )}
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
            {/* End Bill Products */}
            {/* Bill details */}
            <hr className="border-1 mt-5 border-gray-400"></hr>
            <div>
              <div className="my-4 grid grid-cols-[40%_30%_30%] items-center">
                <div className="justify-center">Subtotal</div>
                <div className="ml-4 grid font-medium">
                  {/* PROVISIONAL */}
                  {myCart?.totalWeightEdible
                    ? myCart?.totalWeightEdible + " g"
                    : ""}
                  {myCart?.totalWeightEdible && myCart?.totalAmountNEdible ? (
                    <br></br>
                  ) : (
                    ""
                  )}
                  {myCart?.totalAmountNEdible
                    ? myCart?.totalAmountNEdible + " u"
                    : ""}
                  {/* ^^^ */}
                </div>
                <div className="grid justify-end font-medium">
                  {myCart?.totalPrice} €
                </div>
              </div>
              {showExtras && (
                <div className="grid grid-cols-[70%_30%] items-end">
                  <h2 className="pt-4">Gastos de envío</h2>
                  <p className="grid justify-end text-red-500">
                    {postcode ? shippingCosts : "Calculando..."}
                  </p>
                </div>
              )}
            </div>
            {/* End Bill details */}
            {/* Bill total */}
            <hr className="border-1 mt-5 border-gray-400"></hr>
            <div className="grid grid-cols-[20%_80%] items-end">
              <h2 className="pt-4 text-lg">Total</h2>
              <div className="grid justify-end text-2xl font-semibold">
                {/* Hay que sumar los gastos de envío y el IVA* */}
                {myCart?.totalPrice} €
              </div>
            </div>
            {/* End Bill total */}
          </section>
          {/* End Bill -> Summary */}
          {/* Button */}
          {!showExtras && !(myCart?.productList.length == 0) && (
            <section>
              <div className="mt-10 flex flex-col justify-end px-5">
                <Link href={"/checkout"}>
                  <button className="mx-5 h-10 border border-black font-semibold text-black">
                    Comprar
                  </button>
                </Link>
              </div>
            </section>
          )}
          {/* End Button */}
        </div>
      </div>
    </div>
  );
};

export default Bill;
