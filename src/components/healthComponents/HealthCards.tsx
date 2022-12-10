import Image from "next/image";

function HealthCard({
  name,
  subText,
  image,
}: {
  name: string;
  subText: string;
  image: string | undefined | null;
}) {
  return (
    <div className="mb-6 grid grid-cols-1 rounded-md border-[1px] border-neutral sm:grid-cols-[65%_35%] lg:min-h-[456px]">
      <div className="grid py-10 pl-10 pr-14">
        <h1 className="mb-10 font-raleway sm:text-lg md:text-xl">{name}</h1>
        <p className="text-[16px] md:text-base">{subText}</p>
        {/* <div className="flex">
          <button className="mr-[6px] rounded-full border-[1px] border-neutral bg-neutral px-[10px] py-1 text-base-100 sm:mr-3 sm:px-4 md:py-2 md:px-8 md:text-sm">
            Más información
          </button>
          <button className="rounded-full border-[1px] border-neutral px-[10px] py-1 sm:px-4 md:py-2 md:px-8 md:text-sm ">
            Comentar
          </button>
        </div> */}
      </div>
      <div className="relative h-32 w-full overflow-hidden border-l-[1px] border-l-neutral sm:h-full sm:w-auto">
        <Image
          src={image ? image : "notfound"}
          alt="Mi imagen"
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  );
}

export default HealthCard;
