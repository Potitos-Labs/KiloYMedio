import { useState, useEffect } from "react";
import { inferQueryOutput, trpc } from "../../utils/trpc";
import Image from "next/image";
import IncDecButtons from "../product/IncDecButtons";
import { IoTrashOutline } from "react-icons/io5";
type Unpacked<T> = T extends (infer U)[] ? U : T;

function Product({
  cartProduct,
}: {
  cartProduct: Unpacked<inferQueryOutput<"cart.getAllCartProduct">>;
}) {
  const stock = cartProduct.product.stock;
  const stockLeft = stock * 1000 >= 100;
  const isEdible = Boolean(cartProduct.product.Edible);

  const utils = trpc.useContext();
  const [amount, setAmount] = useState(cartProduct.amount);

  const { mutateAsync: deleteMutation } = trpc.useMutation(
    ["cart.deleteProduct"],
    {
      onSuccess() {
        utils.invalidateQueries("cart.getAllCartProduct");
      },
    },
  );
  const { mutateAsync: updateMutation } = trpc.useMutation(
    ["cart.updateAmountProduct"],
    {
      onSuccess() {
        utils.invalidateQueries("cart.getAllCartProduct");
      },
    },
  );
  useEffect(() => {
    updateMutation({ amount, productId: cartProduct.productId });
  }, [amount, updateMutation, cartProduct.productId]);

  return (
    <div key={cartProduct.productId}>
      <div className="flex flex-row border-2 border-solid border-black">
        <div className="flex flex-col p-2 align-middle">
          <Image
            className=""
            src={cartProduct.product.imageURL}
            alt={cartProduct.product.name + " imagen"}
            width={100}
            height={100}
            layout="fixed"
            objectFit="cover"
          />
        </div>
        <div className=" m-2 w-full p-2">
          <div className="flex h-1/2 flex-col justify-center text-lg font-bold capitalize">
            <div>{cartProduct.product.name}</div>
          </div>
          {/* Amount */}
          <IncDecButtons
            setAmount={setAmount}
            amount={amount}
            stock={stock}
            stockLeft={stockLeft}
            isEdible={isEdible}
          />
        </div>
        <div className="flex w-[20%] flex-col">
          {/* trash can */}
          <div className="flex flex-row-reverse">
            <button
              className="h-10 bg-transparent px-2 font-semibold text-red-600"
              onClick={() =>
                deleteMutation({ productId: cartProduct.productId })
              }
              title="Eliminar del carrito"
            >
              <IoTrashOutline className="h-6 w-6"></IoTrashOutline>
            </button>
          </div>
          {/* price */}
          <div className="flex h-full flex-row-reverse">
            <span className="self-end px-3 py-2">
              {cartProduct.price.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
