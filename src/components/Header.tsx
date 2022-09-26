import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

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
    right = (
      <div>
        <p>
          {session.user?.name} ({session.user?.email})
        </p>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-yellow-600 py-4">
      <div className="container mx-auto">
        <div className="flex flex-row">{right}</div>
      </div>
    </div>
  );
};

export default Header;
