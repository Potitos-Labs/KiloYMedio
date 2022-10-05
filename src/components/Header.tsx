import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Client_Header from "./Client_Header";
const Header: React.FC = () => {
  const { data: session, status } = useSession();

  let right = null;
  let left = null;

  if (true) {
    left = (
      <div>
        <Client_Header />
      </div>
    );
  }

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
      <div className="flex flex-auto gap-4">
        <button
          className="p-3 m-2"
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
        <div>
          <p>
            {session.user?.name} {session.user?.email}
          </p>
          <p className="text-right">{session.user?.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-600 py-4">
      <div className="container mx-auto">{right}</div>
      <div>{left}</div>
    </div>
  );
};

export default Header;
