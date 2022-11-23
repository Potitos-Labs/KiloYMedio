import Link from "next/link";

function CategoryCards() {
  return (
    <Link href="">
      <div className="relative flex cursor-pointer flex-col rounded-md border-[1px] border-black px-5 pt-3 active:border-primary active:bg-primary active:text-white">
        <h1 className="pb-6  font-serif text-lg">
          FRUTOS SECOS Y FRUTAS DESHIDRATADAS
        </h1>
        <div className="absolute bottom-5 gap-2 ">
          <button className="z-10 mr-2 rounded-full border-[1px] border-base-100 px-2 hover:border-black active:border-primary active:bg-primary active:text-white">
            Deshidratadas
          </button>

          <button className="z-10 mr-2 rounded-full border-[1px] border-base-100 px-2 hover:border-black active:border-primary active:bg-primary active:text-white">
            Deshidratadas
          </button>

          <button className=" z-10 mr-2 rounded-full border-[1px] border-base-100 px-2 hover:border-black active:border-primary active:bg-primary active:text-white">
            Deshidratadas
          </button>
        </div>
      </div>
    </Link>
  );
}
export default CategoryCards;
