import Image from "next/image";
import Link from "next/link";

import { trpc } from "../../utils/trpc";

const Bill = ({
  showExtras,
  postcode,
}: {
  showExtras: boolean;
  postcode: boolean;
}) => {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const shippingCosts = null;

  return (
    <div className="grid h-full">
      <div className="flex flex-col">
        <div>
          <h1 className="font-raleway text-lg lg:text-2xl">Factura</h1>
        </div>
        <section>
          {/* Bill -> Products */}
          <div className="grid pl-1 text-xs lg:text-sm">
            {myCart ? (
              myCart.productList.map((cartProduct) => (
                <div key={cartProduct.productId}>
                  <div className="mb-4 grid grid-cols-[50%_25%_25%] items-center">
                    <div className="flex flex-row items-center">
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
                    <div className="ml-2">
                      {cartProduct.amount}{" "}
                      {cartProduct.product.Edible ? "g" : "u"}
                    </div>
                    <span className="ml-2 justify-self-end">
                      {cartProduct.price.toFixed(2)} €
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-right text-sm">Cargando...</p>
            )}
          </div>
          {/* End Bill Products */}
          {/* Bill details */}
          <hr className="border-1 mt-5 border-gray-400"></hr>
          <div>
            <div className="my-4 grid grid-cols-[50%_25%_25%] items-center text-xs lg:text-sm">
              <div className="justify-center">Subtotal</div>
              <div className="ml-2 grid">
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
              <div className="grid justify-end">{myCart?.totalPrice} €</div>
            </div>
            {showExtras && (
              <div className="grid grid-cols-[70%_30%] items-end">
                <h2 className="pt-4">Gastos de envío</h2>
                <p className="grid justify-end text-red-500">
                  {postcode ? shippingCosts : "Gratis"}
                </p>
              </div>
            )}
          </div>
          {/* End Bill details */}
          {/* Bill total */}
          <hr className="border-1 mt-5 border-gray-400"></hr>
          <div className="grid grid-cols-[20%_80%] items-end">
            <h2 className="pt-4 text-lg">Total</h2>
            <div className="grid justify-end font-satoshiBold text-lg">
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
            <div className="mt-10 flex flex-col justify-end">
              <Link href={"/checkout"}>
                <button className="btn rounded-[30px] py-2 font-raleway text-sm text-base-100">
                  Comprar
                </button>
              </Link>
            </div>
          </section>
        )}
        {/* End Button */}
      </div>
    </div>
  );
};

export default Bill;
