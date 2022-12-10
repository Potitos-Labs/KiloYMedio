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
    <div className=" mb-6 grid grid-cols-1 rounded-md border-[1px] border-neutral sm:grid-cols-[65%_35%] lg:min-h-[456px]">
      <div className=" pl-2 pr-4 pt-4 pb-2 md:pt-16 md:pb-8 md:pl-8 md:pr-16">
        <h1 className="mb-2 font-raleway sm:mb-8 sm:text-lg md:text-xl xl:h-[128px] ">
          {name}
        </h1>

        <p className="mb-5 text-[16px] md:text-base xl:h-[168px] ">{subText}</p>

        <div className="flex sm:place-items-center sm:items-center">
          <button className="mr-[6px] rounded-full border-[1px] border-neutral bg-neutral px-[10px] py-1 text-white sm:mr-3 sm:px-4 md:py-2 md:px-8 md:text-sm">
            Más Información
          </button>
          <button className="rounded-full border-[1px] border-neutral px-[10px] py-1 sm:px-4 md:py-2 md:px-8 md:text-sm ">
            Comentar
          </button>
        </div>
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
