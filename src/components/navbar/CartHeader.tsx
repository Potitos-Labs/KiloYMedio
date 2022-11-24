import Link from "next/link";
import React from "react";
import { BsCartCheckFill } from "react-icons/bs";

import { trpc } from "../../utils/trpc";
import DropDownCart from "../cart/DropDownCart";

export default function CartHeader() {
  const { data: allCartProduct } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = allCartProduct?.productList.length ?? 0;

  return (
    <div className="group relative mr-5 flex cursor-pointer items-center">
      <Link href={"/cart"}>
        <BsCartCheckFill className="h-5 w-5 hover:text-kym4" />
      </Link>
      <span className="absolute -mt-7 ml-3 h-5 w-5 rounded-full bg-gray-700 pt-0.5 pl-1.5 text-xs font-bold text-white">
        {numberCartProducts}
      </span>
      <div className="invisible sm:visible">
        <DropDownCart />
      </div>
    </div>
  );
}
