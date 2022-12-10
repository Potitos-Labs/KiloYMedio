import Image from "next/image";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import { AppRouterTypes, trpc } from "../../utils/trpc";
import IncDecButtons from "../ui/IncDecButtons";

type Unpacked<T> = T extends (infer U)[] ? U : T;

function Product({
  cartProduct,
}: {
  cartProduct: Unpacked<
    AppRouterTypes["cart"]["getAllCartProduct"]["output"]["productList"]
  >;
}) {
  const stock = cartProduct.product.stock;

  const utils = trpc.useContext();
  const [amount, setAmount] = useState(cartProduct.amount);

  const { mutateAsync: deleteMutation } = trpc.cart.deleteProduct.useMutation({
    onMutate({}) {
      // utils.cart.getAllCartProduct.setData((data) => ({
      //   productList:
      //     data?.productList?.filter(
      //       (product) => product.productId !== productId,
      //     ) ?? [],
      //   totalAmountNEdible: data?.totalAmountNEdible ?? 0,
      //   totalPrice: data?.totalPrice ?? "0",
      //   totalWeightEdible: data?.totalWeightEdible ?? 0,
      // }));
    },
    onSuccess() {
      utils.cart.getAllCartProduct.refetch();
    },
  });
  const { mutateAsync: updateMutation } =
    trpc.cart.updateAmountProduct.useMutation({
      onSuccess() {
        utils.cart.getAllCartProduct.refetch();
      },
    });
  useEffect(() => {
    updateMutation({ amount, productId: cartProduct.productId });
  }, [amount, updateMutation, cartProduct.productId]);

  return (
    <div key={cartProduct.productId}>
      <div className="flex flex-row rounded-[15px] border-[1px] border-solid border-neutral">
        <div className="flex flex-col py-2 align-middle sm:p-2">
          <Image
            className="rounded-md"
            src={cartProduct.product.imageURL}
            alt={cartProduct.product.name + " imagen"}
            width={100}
            height={100}
            layout="fixed"
            objectFit="cover"
          />
        </div>
        <div className="my-2 ml-1 flex w-full flex-col justify-between py-2 sm:m-2 sm:p-2">
          <div className="text-sm text-neutral first-letter:uppercase">
            {cartProduct.product.name}
          </div>
          {/* Amount */}
          <div className="max-w-fit">
            <IncDecButtons
              setAmount={setAmount}
              amount={amount}
              max={stock}
              className="h-[35px] w-[120px] rounded-[30px] border-[1px] border-base-300"
              unit={cartProduct.product.ProductUnit}
            />
          </div>
        </div>
        <div className="flex w-[60%] flex-col justify-between sm:pr-3 md:w-[40%] lg:w-[30%] xl:w-[20%]">
          {/* trash can */}
          <div className="flex flex-row-reverse">
            <button
              className="h-10 bg-transparent font-semibold text-red-600"
              onClick={() =>
                deleteMutation({ productId: cartProduct.productId })
              }
              title="Eliminar del carrito"
            >
              <IoTrashOutline className="h-6 w-6"></IoTrashOutline>
            </button>
          </div>
          {/* price */}
          <div className="flex flex-row-reverse">
            <span className="self-end px-1 py-2 text-xs">
              {cartProduct.price.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
