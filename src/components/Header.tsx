import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Client_Header from "./Client_Header";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  let right = null;

  if (status == "loading") {
    right = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="flex gap-6 py-2">
        <Link href="/login">Iniciar sesión</Link>
        <Link href="/register">Registrarse</Link>
      </div>
    );
  }

  if (session) {
    console.log(session.user);
    right = (
      <nav className="mx-auto flex flex-row items-center justify-between">
        <div>
          <p>{session.user?.name}</p>
        </div>
        <Client_Header />
      </nav>
    );
  }

  return (
    <div className="bg-header py-4">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <Link href={`/`}>
          <h3 className="cursor-pointer font-sans text-xl font-semibold">
            Kilo Y Medio
          </h3>
        </Link>
        <div className="">{right}</div>
      </div>
    </div>
  );
};

export default Header;
