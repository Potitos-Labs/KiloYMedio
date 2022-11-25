import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbGridDots } from "react-icons/tb";

function NavBarClient() {
  const [open, setOpen] = useState(false);
  function openPopup() {
    setOpen(true);
  }
  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  return (
    <nav>
      <div className="flex flex-col"> </div>
      <div className="flex justify-end lg:hidden">
        <button onClick={() => setOpen(!open)} className="  py-2">
          <GiHamburgerMenu className="h-7 w-7" />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "block flex-grow items-center gap-6 lg:flex lg:w-auto",
        )}
      >
        <div className="group">
          <div onClick={openPopup}>
            <a className="peer flex flex-row items-center gap-2 rounded-full bg-base-content px-3 font-satoshiBold text-base-100">
              <TbGridDots className="h-3 w-3" />
              tienda
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-end sm:gap-6 md:flex-row">
          <Link href={`/recipe`}>salud y bienestar</Link>
          <Link href={`/recipe`}>recetas</Link>
          <Link href={`/recipe`}>talleres</Link>
        </div>
        {!session && open && (
          <div className="flex flex-col pt-6 text-end">
            <Link href="/login">iniciar sesion</Link>
            <Link href="/register">registrarse</Link>
          </div>
        )}
        {!isAdmin && open && session && (
          <div className="flex flex-col pt-6 text-end">
            <Link href="/cart">Cesta</Link>
            <Link href={`/profile`}>Perfil</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBarClient;
