//import Loading from "@components/ui/Loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";

import AdminHeader from "./AdminHeader";
import CartHeader from "./CartHeader";

export default function NavBar() {
  const { data: session } = useSession();

  // if (status == "loading") {
  //   return (
  //     <>
  //       <Loading message="" />
  //     </>
  //   );
  // }

  // Not authenticated
  if (!session) {
    return (
      <>
        <div className="top-5 right-5 hidden gap-2 sm:top-8 sm:flex lg:top-9">
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
        <nav className="top-4 right-8 hidden flex-row gap-2 lg:flex">
          <p className="hidden gap-1 md:flex">{session.user?.name}</p>
          <Link href={`/profile`}>
            <BsFillPersonFill className="mr-4 h-6 w-6 fill-base-content" />
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
