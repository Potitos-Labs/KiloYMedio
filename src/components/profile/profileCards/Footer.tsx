import Link from "next/link";

function Footer() {
  return (
    <div className="mt-6  grid grid-cols-[35%_25%_40%] rounded-md border-[1px] border-neutral p-3 align-middle text-[18px] sm:p-6 ">
      <div className=" flex items-center justify-end justify-items-end">
        <Link href={""}>
          <p className="text-center">cerrar sesion</p>
        </Link>
      </div>
      <div className=" flex items-center justify-center">
        <Link href={""}>
          <p className="text-center">editar perfil</p>
        </Link>
      </div>
      <div className=" flex items-center ">
        <Link href={""}>
          <p className="text-left">envios y devoluciones</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
