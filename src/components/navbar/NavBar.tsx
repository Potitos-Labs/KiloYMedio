import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";

import AdminHeader from "./AdminHeader";
import CartHeader from "./CartHeader";

export default function NavBar() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <>
        <NavBar />
      </>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <>
        <div className="top-5 right-5 gap-4 md:top-8 md:flex lg:top-9">
          <div>
            <Link href="/login">INICIAR SESIÓN</Link>
          </div>
          <p className="hidden md:flex">|</p>
          <div>
            <Link href="/register">REGISTRARSE</Link>
          </div>
        </div>
      </>
    );
  }

  const isAdmin = session?.user?.role == "admin";

  if (session && !isAdmin) {
    return (
      <>
        <nav className="top-4 right-8 flex flex-row gap-2">
          <p className="hidden gap-1 md:flex">{session.user?.name}</p>
          <BsFillPersonFill className="mr-4 h-6 w-6 fill-base-content" />
          <CartHeader />
        </nav>
      </>
    );
  }

  if (session && isAdmin) {
    return (
      <>
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
