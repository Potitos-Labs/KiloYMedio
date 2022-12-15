import { signOut } from "next-auth/react";
import Link from "next/link";

function FooterProfile() {
  return (
    <div className="mt-[20px] grid grid-cols-[35%_25%_40%] rounded-md border-[1px] border-neutral p-3 text-[18px] sm:p-[20px] xl:py-8">
      <div className=" flex items-center justify-end justify-items-end">
        <p
          className="cursor-pointer text-center"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          cerrar sesión
        </p>
      </div>
      <div className=" flex items-center justify-center">
        <Link href={"/profile/edit"}>
          <p className="cursor-pointer text-center">editar perfil</p>
        </Link>
      </div>
      <div className=" flex items-center ">
        <Link href={""}>
          <p className="cursor-pointer text-left">envíos y devoluciones</p>
        </Link>
      </div>
    </div>
  );
}

export default FooterProfile;
