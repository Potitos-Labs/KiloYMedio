import Link from "next/link";
import Product from "./Product";
import { trpc } from "../../utils/trpc";
import { FaArrowRight } from "react-icons/fa";

function DropDownCart() {
  const { data: myCart } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = myCart?.productList.length ?? 0;
  return (
    <div className="absolute top-[42px] right-4 z-10 flex cursor-default flex-col rounded-[20px] shadow-2xl shadow-black">
      <div className="z-10 hidden group-hover:block">
        <div className="scrollbar-hide flex h-auto max-h-[650px] w-[580px] flex-col overflow-y-scroll rounded-[20px] bg-base-100 text-black">
          <div className="relative pt-3">
            {numberCartProducts > 0 ? (
              <div className="flex flex-col">
                <p className="mb-3 ml-5 font-raleway text-lg">CESTA</p>
                <hr className="border-1 w-full border-black opacity-60"></hr>
              </div>
            ) : (
              <div className="flex">
                <p className="text-md mb-5">
                  ¡Aún no hay ningún producto en tu carrito!
                </p>
              </div>
            )}
          </div>

          <div className="m-5 grid gap-3 text-xs lg:text-sm">
            {myCart ? (
              myCart.productList.map((cartProduct) => (
                <div key={cartProduct.productId}>
                  <Product cartProduct={cartProduct}></Product>
                </div>
              ))
            ) : (
              <p className="text-right text-sm">Cargando...</p>
            )}
          </div>
        </div>
      </div>
      <div className="hidden group-hover:block">
        <div className="scrollbar-hide modal-middle -mt-[30px] flex h-[110px] w-[580px] justify-between overflow-y-scroll rounded-[20px] bg-base-300 px-[40px] pt-[40px] text-base-100">
          <div className="flex flex-col">
            <div className="font-raleway text-xs">total</div>
            <div className="font-raleway text-lg">{myCart?.totalPrice} €</div>
          </div>
          <Link href={"/cart"}>
            <div className="inline-flex cursor-pointer">
              <a className="font-raleway text-sm text-base-100">
                Tramitar pedido
              </a>
              <FaArrowRight className="h-8 w-8 pl-3 font-bold" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DropDownCart;
