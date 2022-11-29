import CategoriesHub from "@components/category/CategoriesHub";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";

function NavBarClient() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(false);

  function openPopup() {
    setCategories(true);
  }
  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  const buttonShopStyle =
    "lg:items-center lg:rounded-full lg:bg-base-content lg:mb-0 lg:px-3 lg:font-satoshiBold lg:text-base-100";

  return (
    <nav>
      <div className="flex flex-col"> </div>
      <div className="flex justify-end lg:hidden">
        <button onClick={() => setOpen(!open)} className="py-2">
          <RiMenuLine className="h-7 w-7" />
        </button>
      </div>
      <div
        className={clsx(
          { hidden: !open },
          "block flex-grow items-center gap-6 lg:flex lg:w-auto",
        )}
      >
        <div onClick={openPopup}>
          <a
            className={`${buttonShopStyle} mb-1 flex cursor-pointer flex-row justify-end gap-2`}
          >
            <TbGridDots className="hidden h-3 w-3 lg:flex" />
            tienda
          </a>
        </div>
        <div className="flex flex-col gap-2 text-end lg:flex-row lg:gap-6">
          <Link href={`/recipe`}>salud y bienestar</Link>
          <Link href={`/recipe`}>recetas</Link>
          <Link href={`/workshops`}>talleres</Link>
        </div>
        {!session && open && (
          <div className="flex flex-col pt-6 text-end">
            <Link href="/login">iniciar sesión</Link>
            <Link href="/register">registrarse</Link>
          </div>
        )}
        {!isAdmin && session && (
          <div className="flex flex-col pt-6 text-end lg:hidden">
            <Link href="/cart">cesta</Link>
            <Link href={`/profile`}>perfil</Link>
          </div>
        )}
      </div>
      <CategoriesHub open={categories} setOpen={setCategories} />
    </nav>
  );
}

export default NavBarClient;
