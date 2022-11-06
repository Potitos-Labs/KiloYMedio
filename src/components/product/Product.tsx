import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import { IProduct } from "../../utils/validations/product";
import DotMenu from "../DotMenu";
import IncDecButtons from "./IncDecButtons";

function Product({ product }: { product: IProduct }) {
  const { data } = useSession();
  const isEdible = product.Edible != null;
  const notify = () => toast.success("Producto añadido");
  const notifyDeleted = () => toast.success("Producto eliminado");
  const stockLeft = product.stock * 1000 >= 100;
  const [amount, setAmount] = useState(isEdible ? 100 : 1);
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  const { mutateAsync } = trpc.product.delete.useMutation({
    onSuccess() {
      utils.product.getAllProducts.invalidate();
    },
  });

  const updateProduct = (id: string) => {
    router.push(`/product/edit/${id}`);
  };

  const deleteProduct = (id: string) => {
    mutateAsync({ productId: id });
    router.push(`/product`);
    notifyDeleted();
  };

  function addToCart() {
    if (stockLeft) {
      notify();
      mutation.mutateAsync({ productId: product.id, amount: amount });
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center rounded-md py-8 text-center shadow-lg hover:shadow-kym4">
      <div className="py-3">
        <Link href={`/product/${product.id}`}>
          <a>
            <Image
              src={product.imageURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
              className="rounded-md"
            ></Image>
          </a>
        </Link>
      </div>
      {data?.user?.role == "admin" && (
        <div className="absolute top-0 right-0">
          <DotMenu
            id={product.id}
            updateFunction={updateProduct}
            deleteFunction={deleteProduct}
          />
        </div>
      )}
      <p className="pb-2 font-semibold text-kym4 first-letter:uppercase">
        {product.name}
      </p>
      {data?.user?.role != "admin" && (
        <div>
          <IncDecButtons
            setAmount={setAmount}
            amount={amount}
            stock={product.stock}
            stockLeft={stockLeft}
            isEdible={isEdible}
          />
          <button
            disabled={!stockLeft}
            onClick={addToCart}
            className={`w-full rounded-xl border border-button bg-transparent px-12 text-kym4 ${
              !stockLeft
                ? "cursor-not-allowed px-10 opacity-50"
                : "hover:border-transparent hover:bg-button_hover hover:text-white"
            }`}
          >
            {stockLeft ? "Añadir" : "Agotado"}
          </button>
        </div>
      )}
    </div>
  );
}
export default Product;
