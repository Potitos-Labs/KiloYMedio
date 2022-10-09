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
      <div className="flex gap-6">
        <Link href="/login">Log in</Link>
        <Link href="/register">Register</Link>
      </div>
    );
  }

  if (session) {
    console.log(session.user);
    right = (
      <nav className="flex flex-wrap items-center justify-between">
        <div>
          <p>{session.user?.name}</p>
        </div>
        <Client_Header />
      </nav>
    );
  }

  return (
    <div className="bg-kym2 py-4">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <h3>Kilo Y Medio</h3>
        <div className="">{right}</div>
      </div>
    </div>
  );
};

export default Header;
