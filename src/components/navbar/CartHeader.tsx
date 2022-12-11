import Link from "next/link";
import React from "react";

import { trpc } from "../../utils/trpc";
import DropDownCart from "../cart/DropDownCart";

export default function CartHeader() {
  const { data: allCartProduct } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = allCartProduct?.productList.length ?? 0;

  return (
    <div className="group mr-5 flex cursor-pointer items-center">
      <Link href={"/cart"}>cesta</Link>
      <div className="absolute ml-10 h-6 w-6 rounded-full bg-gray-700 pl-2 text-xs text-base-100">
        {numberCartProducts}
      </div>
      <div className="invisible sm:visible">
        <DropDownCart />
      </div>
    </div>
  );
}
