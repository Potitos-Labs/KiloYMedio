import Image from "next/image";

function WorskhopCard({
  name,
  description,
  date,
  imageURL,
  setImageURL,
  displayed,
  index,
  setIndex,
}: {
  name: string;
  description: string;
  date: Date | undefined | null;
  imageURL: string;
  displayed: boolean;
  index: number;
  setImageURL: (name: string) => void;
  setIndex: (index: number) => void;
}) {
  console.log(date);
  return (
    <div
      className={` ${
        displayed
          ? "grid-cols-[30%_70%]"
          : "grid-cols-[30%_70%] md:grid-cols-1 "
      } mt-2 grid   h-[160px] w-full cursor-pointer overflow-hidden rounded-md border-[1px] border-base-content active:bg-base-content active:text-background sm:h-[180px]`}
      onMouseEnter={() => {
        setImageURL(imageURL);
        setIndex(index);
      }}
    >
      <div
        className={`${
          displayed ? "relative h-full  " : " relative block h-full md:hidden"
        } `}
      >
        <Image
          src={imageURL}
          objectFit="cover"
          className="rounded-l-md"
          alt="notfound"
          layout="fill"
        />
      </div>
      <div className="w-fill h-fill relative p-2 md:p-4">
        {
          <div className="mb-1 flex  w-full justify-end align-middle text-[10px] md:text-xs">
            <p>{date?.getDay() + "/" + date?.getMonth()}</p>
          </div>
        }
        <h1 className=" font-raleway text-[16px] uppercase lg:text-[35px]">
          {name}
        </h1>
        <p className=" flex w-fit text-[15px] line-clamp-3  md:text-xs">
          {description}
        </p>
        <button
          className={` ${
            !displayed && "block md:hidden"
          } absolute right-2 bottom-2 rounded-full border-[1px] border-base-content bg-transparent  px-2  active:border-primary active:bg-primary active:text-background`}
        >
          Inscribirse
        </button>
      </div>
    </div>
  );
}
export default WorskhopCard;
