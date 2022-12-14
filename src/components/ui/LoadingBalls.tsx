import Image from "next/image";

export default function Loading({ black }: { black?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pl-[25%] md:pl-[10%]">
      <div className="flex flex-col">
        <Image
          src={`/gif/gif-bolas${black ? "-negro" : ""}.gif`}
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
