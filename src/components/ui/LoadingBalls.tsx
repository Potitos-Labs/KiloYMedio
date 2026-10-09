import Image from "@components/ui/Image";

export default function Loading({ black }: { black?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pl-[25%] md:pl-[10%]">
      <div className="flex flex-col">
        <Image
          src={
            black
              ? "/api/images/site/b5b4c507-78b9-b1fe-4ada-1edc177ad96e.webp"
              : "/api/images/site/961ca5a2-8d2a-9cd2-5313-d4469b2d0314.webp"
          }
          width={250}
          height={250}
          alt="cargando..."
          className="opacity-80"
        />
        <p className={`ml-[30px] ${!black && "text-base-100"} opacity-80`}>
          Cargando...
        </p>
      </div>
    </div>
  );
}
