import EnrollButton from "@components/workshop/tinyComponents/EnrollButon";
import Image from "next/image";

function EnrolledWorkshops({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) {
  return (
    <div className="relative  grid min-h-[120px] grid-cols-[32%_56%_12%] overflow-hidden rounded-md border-[1px] border-neutral  bg-base-100">
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="notfound"
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="p-2">
        <p className="mb-2 font-raleway text-[14px] uppercase sm:text-[16px]">
          {name}
        </p>

        <div className=" h- absolute bottom-2 flex items-end">
          <div className="mb-2 md:mb-0 lg:mb-2 xl:mb-0">
            <EnrollButton OnsiteworkshopID={id} key={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledWorkshops;
