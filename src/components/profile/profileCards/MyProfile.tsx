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
        <h1 className="md:text-[26x] py-8 font-raleway text-[16px] uppercase  xl:text-[31px]">
          {name}
        </h1>
        <div className="grid grid-cols-2 py-2 lg:grid-cols-[65%_35%] ">
          <div className="flex items-center justify-end px-2 align-middle">
            <p className="hidden text-right text-[18px] sm:block">Mis puntos</p>
          </div>
          <div className="flex items-center justify-center  align-middle">
            <p className="rounded-full bg-primary py-3 px-4 font-satoshiBold text-sm uppercase text-base-100 md:text-[30px] lg:py-4 lg:px-5 xl:py-5 xl:px-6">
              36
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
