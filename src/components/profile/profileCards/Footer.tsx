import Link from "next/link";

function Footer() {
  return (
    <div className="mt-6 grid grid-cols-[35%_25%_40%] rounded-md border-[1px] border-neutral py-6 px-6 text-[18px] ">
      <Link href={""}>
        <p className="text-right ">cerrar sesion</p>
      </Link>
      <Link href={""}>
        <p className="text-center">editar perfil</p>
      </Link>
      <Link href={""}>
        <p className="text-left">envios y devoluciones</p>
      </Link>
    </div>
  );
}

export default Footer;
