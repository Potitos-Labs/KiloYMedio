import Link from "next/link";
import React from "react";

import { trpc } from "../../utils/trpc";
import DropDownCart from "../cart/DropDownCart";

export default function CartHeader() {
  const { data: allCartProduct } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = allCartProduct?.productList.length ?? 0;

  return (
    <div className="group flex cursor-pointer items-center">
      <Link href={"/cart"}>
        <div className="flex gap-1">
          <div>cesta</div>
          <div className="h-6 w-6 rounded-full bg-gray-700 text-center text-xs text-base-100">
            {numberCartProducts}
          </div>
        </div>
      </Link>
      <div className="invisible sm:visible">
        <DropDownCart />
      </div>
    </div>
  );
}
