import EnrollButton from "@components/workshop/tinyComponents/EnrollButon";
import Image from "next/image";

function EnrolledWorkshops({
  name,
  description,
  date,
  image,
  id,
}: {
  name: string;
  date: Date;
  description: string;
  image: string;
  id: string;
}) {
  return (
    <div className="relative   grid min-h-[145px] grid-cols-[32%_68%] overflow-hidden rounded-md border-[1px] border-neutral  bg-base-100">
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="notfound"
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="p-2">
        <p className="mb-2 font-raleway  text-[14px] uppercase sm:text-[16px]">
          {name}
        </p>
        <p className="mb-8 text-[12px] line-clamp-3 sm:text-xs">
          {description}
        </p>
        <div className="flex items-end justify-between">
          {date.toLocaleDateString()}
          <EnrollButton
            OnsiteworkshopID={id}
            OnsiteWorkshopName={name}
            key={id}
          />
        </div>
      </div>
    </div>
  );
}

export default EnrolledWorkshops;
