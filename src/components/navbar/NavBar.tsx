import { useSession } from "next-auth/react";
import Link from "next/link";

import AdminHeader from "./AdminHeader";
import ClientHeader from "./ClientHeader";
import NavBarAdmin from "./NavBarAdmin";
import NavBarClient from "./NavBarClient";

export default function NavBar() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <>
        <NavBarClient />
      </>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <>
        <NavBarClient />
        <div>
          <div className="absolute top-5 right-5 gap-4 md:top-8 md:flex lg:top-9">
            <div className="hover:text-kym4">
              <Link href="/login">INICIAR SESIÓN</Link>
            </div>
            <p className="hidden md:flex">|</p>
            <div className="hover:text-kym4">
              <Link href="/register">REGISTRARSE</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isAdmin = session?.user?.role == "admin";

  if (session && !isAdmin) {
    return (
      <>
        <NavBarClient />
        <nav className="top-2 -right-4 mx-auto flex w-full flex-row lg:absolute">
          <div className="absolute right-40 top-2">
            <p className="hidden gap-1 md:flex">{session.user?.name}</p>
          </div>
          <div className="absolute right-6 -top-2">
            <ClientHeader />
          </div>
        </nav>
      </>
    );
  }

  if (session && isAdmin) {
    return (
      <>
        <NavBarAdmin />
        <nav className="top-2 -right-4 mx-auto flex w-full flex-row lg:absolute">
          <div className="absolute right-24 top-6 flex gap-2 md:top-8">
            <p className="hidden gap-1 md:flex">{session.user?.name}</p>
            <span className="absolute top-2.5 -right-8 md:static">(Admin)</span>
          </div>
          <div className="absolute right-1 top-3 md:right-6">
            <AdminHeader />
          </div>
        </nav>
      </>
    );
  }

  return <div>NavBar</div>;
}
