import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import Client_Header from "./Client_Header";
import NavBarAdmin from "./navbar/NavBarAdmin";
import NavBarClient from "./navbar/NavBarClient";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  let rightItems = null;

  if (status == "loading") {
    rightItems = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    rightItems = (
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
    );
  }

  if (session) {
    rightItems = (
      <nav className="mx-auto w-full flex flex-row lg:absolute top-2 -right-4">
        <div
          className={`absolute ${
            session?.user?.role == "admin" ? "right-24 top-8" : "right-40 top-8"
          }`}
        >
          <p className="hidden gap-1 md:flex">
            {session.user?.name}
            {session?.user?.role == "admin" ? <span>(Admin)</span> : undefined}
          </p>
        </div>
        <div className="absolute right-6 top-6">
          <Client_Header />
        </div>
      </nav>
    );
  }

  return (
    <div className="z-10 w-full fixed bg-header py-6">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <Link href={`/`}>
          <h3 className="w-[500px] cursor-pointer font-sans text-2xl font-semibold">
            Kilo Y Medio
          </h3>
        </Link>
        {session?.user?.role == "admin" ? <NavBarAdmin /> : <NavBarClient />}
        <div className="w-full">{rightItems}</div>
      </div>
    </div>
  );
};

export default Header;
