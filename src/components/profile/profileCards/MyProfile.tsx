import Image from "next/image";

function MyProfile({
  name,
  image,
}: {
  name: string;
  image: string | undefined | null;
}) {
  return (
    <div className="grid grid-cols-[20%_80%] overflow-hidden rounded-md border-[1px] border-neutral align-middle ">
      <div className="relative h-full overflow-hidden">
        <Image
          src={image ? image : "notfound"}
          alt="Mi imagen"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="grid grid-cols-[60%_40%] px-4 ">
        <h1 className="py-8 font-raleway text-[16px] uppercase md:text-[31px]">
          {name}
        </h1>
        <div className="grid grid-cols-[65%_35%] py-2 ">
          <div className="flex items-center justify-end px-2 align-middle">
            <p className="text-right text-[18px]">Mis puntos</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-primary align-middle">
            <p className="font-satoshiBold text-[30px] uppercase text-base-100">
              36
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
