import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../utils/trpc";
function Category({
  name,
  imgUrl,
  id,
}: {
  name: string;
  imgUrl: string;
  id: string;
}) {
  return (
    <div className=" flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
      <div className="py-6">
        <Link href={`/product/${id}`}>
          <a></a>
        </Link>
      </div>
      <h1 className="capitalize">{name}</h1>
    </div>
  );
}
export default Category;
