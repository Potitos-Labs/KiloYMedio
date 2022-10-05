import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
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
      <nav className="flex items-center justify-between flex-wrap bg-yellow-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <h3>Kilo Y Medio</h3>
        </div>
        <div>
          <p>{session.user?.name}</p>
        </div>
        <Client_Header />
        {/* <button
          className="p-3 m-2"
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button> */}
      </nav>
    );
  }

  return (
    <div className="bg-yellow-600 py-4">
      <div className="container mx-auto">{right}</div>
    </div>
  );
};

export default Header;
