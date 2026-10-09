import { defaultUserImage } from "@utils/image";
import Image from "@components/ui/Image";
import { AiOutlineUser } from "react-icons/ai";

function MyProfile({
  name,
  image,
}: {
  name: string;
  image: string | undefined | null;
}) {
  return (
    <div className="grid grid-cols-[20%_80%] overflow-hidden rounded-md border-[1px] border-neutral align-middle">
      <div className="relative grid h-full place-items-center overflow-hidden border-r-[1px] border-base-content">
        {image && image != defaultUserImage ? (
          <Image
            src={image ? image : "notfound"}
            alt="Mi imagen"
            objectFit="cover"
            layout="fill"
          />
        ) : (
          <AiOutlineUser size={56} />
        )}
      </div>
      <div className="grid grid-cols-[58%_42%] px-4">
        <h1 className="py-6 font-raleway text-[16px] uppercase md:text-[26x] xl:py-8 xl:text-[31px]">
          {name}
        </h1>
        <div className="grid grid-cols-2 py-2 lg:grid-cols-[65%_35%]">
          <div className="flex items-center justify-end pr-4 align-middle">
            <p className="hidden text-right text-[18px] sm:block">Mis puntos</p>
          </div>
          <div className="flex items-center justify-center align-middle">
            <p className="rounded-full bg-primary px-4 py-3 font-satoshiBold text-sm uppercase text-base-100 md:text-[30px] lg:px-5 lg:py-4">
              36
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
