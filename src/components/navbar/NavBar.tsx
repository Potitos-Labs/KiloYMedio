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
        <div className="ml-auto">
          <p>Validating session ...</p>
        </div>
      </>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <>
        <NavBarClient />
        <div>
          <div className="gap-4 absolute top-5 right-10 md:top-8 md:flex lg:top-9">
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
        <nav className="mx-auto w-full flex flex-row lg:absolute top-2 -right-4">
          <div className="absolute right-40 top-8">
            <p className="hidden gap-1 md:flex">{session.user?.name}</p>
          </div>
          <div className="absolute right-6 top-6">
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
        <nav className="mx-auto w-full flex flex-row lg:absolute top-2 -right-4">
          <div className="absolute right-24 top-8">
            <p className="hidden gap-1 md:flex">{session.user?.name}</p>
            <span>(Admin)</span>
          </div>
          <div className="absolute right-6 top-6">
            <AdminHeader />
          </div>
        </nav>
      </>
    );
  }

  return <div>NavBar</div>;
}
