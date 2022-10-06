import Image from "next/image";
function Product({ name, imgUrl }: { name: string; imgUrl: string }) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
export default Product;
