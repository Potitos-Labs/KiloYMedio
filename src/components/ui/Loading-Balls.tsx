import Image from "next/image";

export default function Loading() {
  return (
    <div className="mt-12 flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src={"gif/gif-bolas.gif"}
        width={471}
        height={450}
        alt="cargando..."
      ></Image>
    </div>
  );
}
