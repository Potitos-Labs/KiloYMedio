//import Loading from "@components/ui/Loading";
import { useSession } from "next-auth/react";
import Link from "next/link";

import AdminHeader from "./AdminHeader";
import CartHeader from "./CartHeader";

export default function NavBar() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="right-5 top-9 hidden gap-2 lg:flex">
          <div>
            <Link href="/register">registrarse</Link>
          </div>
          <p className="hidden md:flex">/</p>
          <div>
            <Link href="/login">iniciar sesión</Link>
          </div>
        </div>
      </>
    );
  }

  const isAdmin = session?.user?.role == "admin";

  if (session && !isAdmin) {
    return (
      <>
        <nav className="hidden flex-row gap-8 lg:flex">
          <Link href={`/profile`}>
            <p className="hidden cursor-pointer gap-1 md:flex">perfil</p>
          </Link>
          <CartHeader />
        </nav>
      </>
    );
  }

  if (session && isAdmin) {
    return (
      <>
        <nav className="top-4 right-8 hidden flex-row gap-2 lg:flex">
          <p className=" hidden gap-1 pt-4 md:flex">
            {session.user?.name}
            <span>(Admin)</span>
          </p>

          <div className="right-1 top-3 md:right-6">
            <AdminHeader />
          </div>
        </nav>
      </>
    );
  }

  return <div>NavBar</div>;
}
