import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Client_Header from "./Client_Header";
import NavBarAdmin from "./NavBarAdmin";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  let rightItems = null;
  let headerItems = null;

  if (status == "loading") {
    rightItems = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (session?.user?.role == "admin") {
    headerItems = <NavBarAdmin />;
  }

  if (!session) {
    rightItems = (
      <div className="absolute top-6 right-10 flex items-center gap-6 py-2">
        <Link href="/login">Iniciar sesión</Link>
        <Link href="/register">Registrarse</Link>
      </div>
    );
  }

  if (session) {
    rightItems = (
      <nav className="mx-auto flex flex-row items-center justify-between">
        <div className="absolute right-40 top-10">
          <p>{session.user?.name}</p>
        </div>
        <div className="absolute right-6 top-8">
          <Client_Header />
        </div>
      </nav>
    );
  }

  return (
    <div className="bg-header py-6">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <Link href={`/`}>
          <h3 className="w-[500px] cursor-pointer font-sans text-2xl font-semibold">
            Kilo Y Medio
          </h3>
        </Link>
        {session?.user?.role == "admin" ? <NavBarAdmin /> : undefined}
        {/* cambiar 'undefined' por la navbar de cliente */}
        <div className="w-full">{rightItems}</div>
      </div>
    </div>
  );
};

export default Header;
